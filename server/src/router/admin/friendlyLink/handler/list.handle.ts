import { Op } from 'sequelize';
import { sendResult } from '@/utils/u.sendResult';
import FriendlyLinkModel, {
	FriendlyLinkList,
} from '@/models/friendlyLink/friendly_link.model';
import { NextFunction, Request, Response } from 'express';

export async function listHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const pageSize: number = Number(req.query.pageSize);
	const currentPage: number = Number(req.query.currentPage);
	const keyword: string | undefined = req.query.keyword as string | undefined;

	try {
		let total: number = await FriendlyLinkModel.count();

		if (keyword) {
			total = await FriendlyLinkModel.count({
				where: {
					[Op.or]: {
						url: { [Op.like]: `%${keyword}%` },
						name: { [Op.like]: `%${keyword}%` },
						email: { [Op.like]: `%${keyword}%` },
						description: { [Op.like]: `%${keyword}%` },
					},
				},
			});
		}

		const findResult: FriendlyLinkModel[] = await FriendlyLinkModel.findAll({
			limit: pageSize || undefined,
			offset: (currentPage - 1) * pageSize || undefined,
			order: [['createdAt', 'DESC']],
			where: {
				[Op.or]: {
					url: { [Op.like]: `%${keyword}%` },
					name: { [Op.like]: `%${keyword}%` },
					email: { [Op.like]: `%${keyword}%` },
					description: { [Op.like]: `%${keyword}%` },
				},
			},
		});

		const friendlyLinkList: FriendlyLinkList = findResult.map(
			(item: FriendlyLinkModel) => item.dataValues
		);

		sendResult(res, 200, '获取成功', { total, list: friendlyLinkList });
	} catch (error) {
		next(error);
	}
}
