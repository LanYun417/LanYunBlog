import AdminPermissionModel, {
	AdminPermissionList,
} from '@/models/user/admin_permission.model';
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
		let total: number = await AdminPermissionModel.count();

		if (keyword) {
			total = await AdminPermissionModel.count({
				where: {
					[Op.or]: {
						name: { [Op.like]: `%${keyword}%` },
						description: { [Op.like]: `%${keyword}%` },
					},
				},
			});
		}

		const findResult: AdminPermissionModel[] = await AdminPermissionModel.findAll({
			limit: pageSize || undefined,
			offset: (currentPage - 1) * pageSize || undefined,
			order: [['createdAt', 'DESC']],
			where: {
				[Op.or]: {
					name: { [Op.like]: `%${keyword}%` },
					description: { [Op.like]: `%${keyword}%` },
				},
			},
		});

		const list: AdminPermissionList = findResult.map(
			(item: AdminPermissionModel) => item.dataValues
		);

		sendResult(res, 200, '获取成功', { total, list });
	} catch (error) {
		next(error);
	}
}
