import LeaveMessageModel, {
	LeaveMessageList,
} from '@/models/leaveMessage/leave_message.model';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';

export async function listHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const pageSize: number = Number(req.query.pageSize);
	const currentPage: number = Number(req.query.currentPage);
	const keyword: string | undefined = req.query.keyword as string | undefined;

	try {
		let total: number = await LeaveMessageModel.count();

		if (keyword) {
			total = await LeaveMessageModel.count({
				where: {
					[Op.or]: {
						message: { [Op.like]: `%${keyword}%` },
						country: { [Op.like]: `%${keyword}%` },
						province: { [Op.like]: `%${keyword}%` },
						city: { [Op.like]: `%${keyword}%` },
					},
				},
			});
		}

		const findResult: LeaveMessageModel[] = await LeaveMessageModel.findAll({
			limit: pageSize || undefined,
			offset: (currentPage - 1) * pageSize || undefined,
			order: [['createdAt', 'DESC']],
			where: {
				[Op.or]: {
					message: { [Op.like]: `%${keyword}%` },
					country: { [Op.like]: `%${keyword}%` },
					province: { [Op.like]: `%${keyword}%` },
					city: { [Op.like]: `%${keyword}%` },
				},
			},
		});

		const list: LeaveMessageList = findResult.map(
			(item: LeaveMessageModel) => item.dataValues
		);

		sendResult(res, 200, '获取成功', { total, list });
	} catch (error) {
		next(error);
	}
}
