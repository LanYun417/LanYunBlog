import { Op } from 'sequelize';
import sequelize from '@/models';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import AdminUserModel from '@/models/user/admin_users.model';

export async function listHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const pageSize: number = Number(req.query.pageSize);
	const currentPage: number = Number(req.query.currentPage);
	const keyword: string | undefined = req.query.keyword as string | undefined;

	const baseSql = `
        SELECT user.*, permission.name as permissionName
        FROM admin_users as user
        JOIN admin_permission as permission 
        ON user.permissionId = permission.id
    `;
	let whereClause: string = '';
	let limitClause: string = '';

	try {
		// 获取用户总数，根据是否有搜索关键词来决定总数统计的条件
		let total: number = await AdminUserModel.count();

		if (!isNaN(pageSize) && !isNaN(currentPage)) {
			// 构建分页相关的语句
			limitClause = ` LIMIT ${pageSize} OFFSET ${(currentPage - 1) * pageSize} `;
		}

		if (keyword) {
			whereClause = ` WHERE (user.username LIKE :keyword OR user.nickname LIKE :keyword) `;
			total = await AdminUserModel.count({
				where: {
					[Op.or]: {
						username: { [Op.like]: `%${keyword}%` },
						nickname: { [Op.like]: `%${keyword}%` },
					},
				},
			});
		}

		// 组合完整的SQL语句
		const sql = `${baseSql} ${whereClause} ${limitClause}`;

		// 执行查询操作，使用参数化方式传递参数
		const queryOptions = {
			replacements: {
				keyword: `%${keyword}%`,
			},
		};

		const [findResult] = await sequelize.query(sql, queryOptions);

		const users = (findResult as any[]).map((user) => {
			delete user.password;
			return {
				...user,
			};
		});

		sendResult(res, 200, '获取成功', { list: users, total });
	} catch (error) {
		next(error);
	}
}
