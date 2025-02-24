import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import FileModel, { FileList } from '@/models/file/files.model';

export async function listHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const { pageSize, currentPage } = req.query;

	try {
		const total: number = await FileModel.count();

		// 文件总大小
		const totalSize = await FileModel.sum('size');

		const findResult: FileModel[] = await FileModel.findAll({
			limit: Number(pageSize) || undefined,
			offset: (Number(currentPage) - 1) * Number(pageSize) || undefined,
			order: [['createdAt', 'DESC']],
		});

		const files: FileList = findResult.map((item: FileModel) => item.dataValues);

		sendResult(res, 200, '获取成功', { total, list: files, totalSize });
	} catch (error) {
		next(error);
	}
}
