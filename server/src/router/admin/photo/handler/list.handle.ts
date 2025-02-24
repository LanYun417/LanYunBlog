import { Op } from 'sequelize';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import PhotoModel, { PhotoList } from '@/models/photo/photo.model';

export async function listHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const pageSize: number = Number(req.query.pageSize);
	const currentPage: number = Number(req.query.currentPage);
	const keyword: string | undefined = req.query.keyword as string | undefined;

	try {
		let total: number = await PhotoModel.count();

		if (keyword) {
			total = await PhotoModel.count({
				where: {
					[Op.or]: {
						description: { [Op.like]: `%${keyword}%` },
					},
				},
			});
		}

		const findResult: PhotoModel[] = await PhotoModel.findAll({
			limit: pageSize || undefined,
			offset: (currentPage - 1) * pageSize || undefined,
			order: [['createdAt', 'DESC']],
			where: {
				[Op.or]: {
					description: { [Op.like]: `%${keyword}%` },
				},
			},
		});

		const photos: PhotoList = findResult.map((item: PhotoModel) => item.dataValues);

		sendResult(res, 200, '获取成功', { total, list: photos });
	} catch (error) {
		next(error);
	}
}
