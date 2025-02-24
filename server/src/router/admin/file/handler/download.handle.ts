import fs from 'node:fs';
import path from 'node:path';
import FileModel from '@/models/file/files.model';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';

export function downloadHandle(req: Request, res: Response, next: NextFunction): void {
	const fileId = req.query.id as string | undefined;

	if (!fileId || isNaN(Number(fileId))) {
		sendResult(res, 400, '参数错误');
		return;
	}

	// 查找文件
	FileModel.findOne({
		where: { id: Number(fileId) },
	})
		.then(async (result: FileModel | null) => {
			if (!result) {
				sendResult(res, 404, '文件不存在');
				return;
			}
			// 文件信息
			const fileInfo = result.dataValues;
			try {
				// 读取文件
				const buffer = fs.readFileSync(path.join(process.cwd(), fileInfo.path));
				// 设置响应头
				res.setHeader('Content-Type', fileInfo.mimetype);
				res.setHeader('Content-Disposition', `attachment; filename=${fileInfo.name}`);
				res.send(buffer);
			} catch (error) {
				next(error);
			}
		})
		.catch((err: Error) => {
			next(err);
		});
}
