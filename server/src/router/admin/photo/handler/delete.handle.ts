import path from 'node:path';
import { Op } from 'sequelize';
import { batchDeleteFiles } from '@/utils/u.file';
import { sendResult } from '@/utils/u.sendResult';
import FileModel from '@/models/file/files.model';
import PhotoModel from '@/models/photo/photo.model';
import { NextFunction, Request, Response } from 'express';

export async function deleteHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const ids = req.query.ids as string;

	// 参数校验
	if (!ids || ids.trim() === '' || typeof ids !== 'string') {
		sendResult(res, 400, '缺少参数 `ids`');
		return;
	}

	// 格式化 ids
	const idsArr: number[] = [];
	if (ids.includes(',')) {
		// 去重
		const idsSet = [...new Set(ids.split(','))];
		idsArr.push(...idsSet.map((id) => Number(id.trim())));
	} else {
		idsArr.push(Number(ids.trim()));
	}

	try {
		// 查找照片路径
		const photos = await PhotoModel.findAll({
			where: { id: { [Op.in]: idsArr } },
		});
		const photoPaths: string[] = photos.map((p: PhotoModel) => {
			return path.join(process.cwd(), p.path);
		});

		// 删除照片
		await PhotoModel.destroy({
			where: { id: { [Op.in]: idsArr } },
		});

		// 删除文件
		await FileModel.destroy({
			where: { path: { [Op.in]: photoPaths } },
		});

		// 在磁盘中删除文件
		const delFileResult: boolean = await batchDeleteFiles(photoPaths);
		if (delFileResult) {
			sendResult(res, 200, '删除成功');
		} else {
			sendResult(res, 500, '删除失败');
		}
	} catch (error: unknown) {
		const msg = (error as Error).message;
		if (msg.includes('no such file or directory')) {
			sendResult(res, 200, '文件已从数据库中移除，但文件在磁盘中不存在');
			return;
		}
		next(error as Error);
	}
}
