import fs from 'node:fs';
import path from 'node:path';
import { sendResult } from '@/utils/u.sendResult';
import PhotoModel from '@/models/photo/photo.model';
import { NextFunction, Request, Response } from 'express';

export async function downloadHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const id = req.query.id as string | undefined;

	if (!id || isNaN(Number(id))) {
		sendResult(res, 400, '参数错误');
		return;
	}

	try {
		// 查询照片路径
		const photoPath: string | undefined = (
			await PhotoModel.findOne({
				where: { id: Number(id) },
			})
		)?.dataValues.path;

		if (photoPath) {
			// 读取文件
			const buffer: Buffer = fs.readFileSync(path.join(process.cwd(), photoPath));

			const etName: string = path.extname(photoPath);

			// 设置响应头
			res.setHeader('Content-Disposition', `attachment; filename=${Date.now() + etName}`);
			res.send(buffer);
		}
	} catch (error) {
		next(error);
	}
}
