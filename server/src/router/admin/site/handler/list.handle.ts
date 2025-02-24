import { Op } from 'sequelize';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import SiteInfoModel, { SiteInfoList } from '@/models/site/site_info.model';

export async function listHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const pageSize: number = Number(req.query.pageSize);
	const currentPage: number = Number(req.query.currentPage);
	const keyword: string | undefined = req.query.keyword as string | undefined;

	try {
		let total: number = await SiteInfoModel.count();

		if (keyword) {
			total = await SiteInfoModel.count({
				where: {
					[Op.or]: {
						title: { [Op.like]: `%${keyword}%` },
						domain: { [Op.like]: `%${keyword}%` },
						keywords: { [Op.like]: `%${keyword}%` },
						description: { [Op.like]: `%${keyword}%` },
					},
				},
			});
		}

		const findResult: SiteInfoModel[] = await SiteInfoModel.findAll({
			limit: pageSize || undefined,
			offset: (currentPage - 1) * pageSize || undefined,
			order: [['createdAt', 'DESC']],
			where: {
				[Op.or]: {
					title: { [Op.like]: `%${keyword}%` },
					domain: { [Op.like]: `%${keyword}%` },
					keywords: { [Op.like]: `%${keyword}%` },
					description: { [Op.like]: `%${keyword}%` },
				},
			},
		});

		const list: SiteInfoList = findResult.map((item: SiteInfoModel) => item.dataValues);

		sendResult(res, 200, '获取成功', { total, list });
	} catch (error) {
		next(error);
	}
}
