import { Op } from 'sequelize';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import AuthorInfoModel, { AuthorInfoList } from '@/models/author/author_info.model';

export async function listHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const pageSize: number = Number(req.query.pageSize);
	const currentPage: number = Number(req.query.currentPage);
	const keyword: string | undefined = req.query.keyword as string | undefined;

	try {
		let total: number = await AuthorInfoModel.count();

		if (keyword) {
			total = await AuthorInfoModel.count({
				where: {
					[Op.or]: {
						name: { [Op.like]: `%${keyword}%` },
						email: { [Op.like]: `%${keyword}%` },
						ps: { [Op.like]: `%${keyword}%` },
						biography: { [Op.like]: `%${keyword}%` },
					},
				},
			});
		}

		const findResult: AuthorInfoModel[] = await AuthorInfoModel.findAll({
			limit: pageSize || undefined,
			offset: (currentPage - 1) * pageSize || undefined,
			order: [['createdAt', 'DESC']],
			where: {
				[Op.or]: {
					name: { [Op.like]: `%${keyword}%` },
					email: { [Op.like]: `%${keyword}%` },
					ps: { [Op.like]: `%${keyword}%` },
					biography: { [Op.like]: `%${keyword}%` },
				},
			},
		});

		const authorInfo: AuthorInfoList = findResult.map(
			(item: AuthorInfoModel) => item.dataValues
		);

		sendResult(res, 200, '获取成功', { total, list: authorInfo });
	} catch (error) {
		next(error);
	}
}
