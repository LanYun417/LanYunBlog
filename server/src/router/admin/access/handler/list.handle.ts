import { Op } from 'sequelize';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import AccessModel, { AccessList } from '@/models/access/access.model';

export async function listHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const pageSize: number = Number(req.query.pageSize);
	const currentPage: number = Number(req.query.currentPage);
	const keyword: string | undefined = req.query.keyword as string | undefined;

	try {
		let total: number = await AccessModel.count();

		if (keyword) {
			total = await AccessModel.count({
				where: {
					[Op.or]: {
						method: { [Op.like]: `%${keyword}%` },
						url: { [Op.like]: `%${keyword}%` },
						country: { [Op.like]: `%${keyword}%` },
						province: { [Op.like]: `%${keyword}%` },
						city: { [Op.like]: `%${keyword}%` },
						isp: { [Op.like]: `%${keyword}%` },
						ip: { [Op.like]: `%${keyword}%` },
					},
				},
			});
		}

		const findResult: AccessModel[] = await AccessModel.findAll({
			limit: pageSize || undefined,
			offset: (currentPage - 1) * pageSize || undefined,
			order: [['createdAt', 'DESC']],
			where: {
				[Op.or]: {
					method: { [Op.like]: `%${keyword}%` },
					url: { [Op.like]: `%${keyword}%` },
					country: { [Op.like]: `%${keyword}%` },
					province: { [Op.like]: `%${keyword}%` },
					city: { [Op.like]: `%${keyword}%` },
					isp: { [Op.like]: `%${keyword}%` },
					ip: { [Op.like]: `%${keyword}%` },
				},
			},
		});

		const list: AccessList = findResult.map((item: AccessModel) => item.dataValues);

		sendResult(res, 200, '获取成功', { total, list });
	} catch (error) {
		next(error);
	}
}
