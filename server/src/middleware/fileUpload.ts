import fs from 'node:fs';
import multer from 'multer';
import path from 'node:path';
import webp from 'webp-converter';
import { sendResult } from '@/utils/u.sendResult';
import FileModel, { FileList } from '@/models/file/files.model';
import { FileMD5List, getAllFilesMD5, getFileMD5 } from '@/utils/u.file';
import { Handler, NextFunction, Request, RequestHandler, Response } from 'express';

export interface UploadOptions {
	dest: string;
	fields: string;
	maxCount?: number;
	maxSize?: number;
	mimetype: string | string[];
}

/**
 * 文件上传中间件
 * @param { UploadOptions } options 文件上传配置项
 * @param { string } options.dest 文件上传路径，相对 upload/ 目录
 * @param { string } options.fields 文件字段名称
 * @param { number } options.maxCount 最大文件上传数量，默认值：1
 * @param { number } options.maxSize 最大文件上传大小，传入MB，默认值：50M
 * @param { string | string[] } options.mimetype 允许的文件类型，可以允许多类型文件，* 表示允许所有类型文件，例如：image/png, image/jpeg
 */
export function fileUpload(options: UploadOptions): Handler {
	return async (req: Request, res: Response, next: NextFunction) => {
		// 格式化路径，去除前后斜杠
		if (options.dest === '/' || options.dest === '') {
			options.dest = '';
		} else {
			if (options.dest[0] === '/') {
				options.dest = options.dest.slice(1);
			}

			if (options.dest[options.dest.length - 1] !== '/') {
				options.dest = options.dest + '/';
			}
		}

		const uploadPath: string = path.join(process.cwd(), '/upload/', options.dest);

		const upload: RequestHandler = multer({
			dest: uploadPath, // 文件上传路径
			limits: {
				// 文件上传大小限制
				fileSize: (options.maxSize ? options.maxSize : 50) * 1024 * 1024,
			},
			fileFilter(
				req: Request,
				file: Express.Multer.File,
				callback: multer.FileFilterCallback
			) {
				// 允许所有类型文件
				if (options.mimetype === '*') {
					callback(null, true);
					return;
				}

				// 允许指定类型文件
				if (Array.isArray(options.mimetype) && options.mimetype.includes(file.mimetype)) {
					callback(null, true);
					return;
				} else if (options.mimetype === file.mimetype) {
					callback(null, true);
					return;
				}

				sendResult(res, 400, '不允许的文件类型');
				callback(null, false);
				return;
			},
		}).array(options.fields, options.maxCount ? options.maxCount : 1);

		// 获取 upload/ 下所有文件的MD5
		let allFilesMd5: FileMD5List = [];
		try {
			allFilesMd5 = await getAllFilesMD5(path.join(process.cwd(), '/upload'));
		} catch (error: unknown) {
			next(error as Error);
		}

		upload(req, res, async (err: any) => {
			if (err) return next(err);

			if (!req.files || req.files.length === 0) {
				sendResult(res, 400, '未选择文件');
				return;
			}

			if (req.files instanceof Array) {
				const fileInfo: FileList = [];
				const uploadList = req.files; // 上传文件列表

				// 将图片文件转为webp
				if (req.body.toWebp === 'yes') {
					const allowType = ['image/jpeg', 'image/png', 'image/jpg']; // 允许转为webp的图片类型

					try {
						uploadList.forEach(async (item: Express.Multer.File, index: number) => {
							const targetFile: Express.Multer.File = {
								...item,
							};
							// 仅处理允许转为webp的图片类型
							let fileMd5: string = ''; // 文件md5
							if (item.mimetype && allowType.includes(item.mimetype)) {
								await webp.cwebp(item.path, `${item.path}.webp`, '-q 80');
								targetFile.path = `${item.path}.webp`; // 重命名为 .webp 后缀
								targetFile.mimetype = 'image/webp'; // 修改文件类型为 webp
								targetFile.originalname = `${item.filename}.webp`;

								fs.unlinkSync(item.path); // 删除原文件
								// 获取文件 MD5
								fileMd5 = await getFileMD5(`${item.path}.webp`);
								const findIndex: number = allFilesMd5.findIndex(
									(item) => item.md5 === fileMd5
								);
								if (findIndex !== -1) {
									// 删除重复文件
									fs.unlinkSync(`${item.path}.webp`);
								}
							} else {
								// 其他类型文件不处理
								fileMd5 = await getFileMD5(item.path);
								const findIndex: number = allFilesMd5.findIndex(
									(item) => item.md5 === fileMd5
								);
								targetFile.originalname = item.filename + path.extname(item.originalname);
								targetFile.path = path.join(uploadPath, targetFile.originalname);
								fs.renameSync(item.path, targetFile.path);
								if (findIndex !== -1) {
									// 删除重复文件
									fs.unlinkSync(targetFile.path);
								}
							}

							// 将文件信息保存到数据库中
							const createResult: [FileModel, boolean] = await FileModel.findOrCreate({
								where: { md5: fileMd5 },
								defaults: {
									name: targetFile.originalname,
									mimetype: targetFile.mimetype,
									url: `${process.env.SERVER_HOST}/static/${options.dest}${targetFile.originalname}`,
									path: `/upload/${options.dest}${targetFile.originalname}`,
									md5: fileMd5,
									size: item.size,
								},
							});

							fileInfo.push(createResult[0].dataValues);

							if (fileInfo.length === (req.files?.length as number)) {
								req['fileInfo'] = fileInfo; // 传递文件信息到下一级
								next();
								return;
							}
						});
					} catch (error) {
						next(error);
					}
					return;
				}

				uploadList.forEach(async (item: Express.Multer.File, index: number) => {
					try {
						// 重命名文件
						const filename: string = item.filename + path.extname(item.originalname); // 新的文件名
						const oldPath: string = item.path; // 原文件路径
						const newPath: string = path.join(uploadPath, filename); // 新文件地址
						fs.renameSync(oldPath, newPath);

						// 获取文件 MD5
						const fileMd5: string = await getFileMD5(newPath);
						// 查找重复文件
						const findIndex: number = allFilesMd5.findIndex(
							(item) => item.md5 === fileMd5
						);

						if (findIndex !== -1) {
							// 删除重复文件
							fs.unlinkSync(newPath);
						}

						// 将文件信息保存到数据库中
						const createResult: [FileModel, boolean] = await FileModel.findOrCreate({
							where: { md5: fileMd5 },
							defaults: {
								name: filename,
								mimetype: item.mimetype,
								url: `${process.env.SERVER_HOST}/static/${options.dest}${filename}`,
								path: `/upload/${options.dest}${filename}`,
								md5: fileMd5,
								size: item.size,
							},
						});

						fileInfo.push(createResult[0].dataValues);

						if (fileInfo.length === (req.files?.length as number)) {
							req['fileInfo'] = fileInfo; // 传递文件信息到下一级
							next();
							return;
						}
					} catch (error: unknown) {
						next(error as Error);
					}
				});
				return;
			}

			next(new Error('文件上传失败'));
		});
	};
}
