import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import PhotoModel, { PhotoList } from '@/models/photo/photo.model';

export async function listHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const { pageSize, currentPage } = req.query;

	try {
		const total: number = await PhotoModel.count();

		const findResult: PhotoModel[] = await PhotoModel.findAll({
			limit: Number(pageSize) || undefined,
			offset: (Number(currentPage) - 1) * Number(pageSize) || undefined,
		});

		const photos: PhotoList = findResult.map((item: PhotoModel) => item.dataValues);

		sendResult(res, 200, '获取成功', { total, list: photos });
	} catch (error) {
		next(error);
	}
}
