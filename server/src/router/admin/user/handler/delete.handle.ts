import { Op } from 'sequelize';
import sequelize from '@/models';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import AdminUserModel from '@/models/user/admin_users.model';

export async function deleteHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const ids = req.query.ids as string;

	// 参数校验
	if (!ids || ids.trim() === '' || typeof ids !== 'string') {
		sendResult(res, 400, '缺少参数 `ids`');
		return;
	}

	// 格式化 ids
	const idsArr: number[] = [];
	if (ids.includes(',')) {
		// 去重
		const idsSet = [...new Set(ids.split(','))];
		idsArr.push(...idsSet.map((id) => Number(id.trim())));
	} else {
		idsArr.push(Number(ids.trim()));
	}

	// 判断用户是否为 admin
	try {
		const query = `
    SELECT user.id, permission.name
    FROM admin_users as user
    JOIN admin_permission as permission 
    ON user.permissionId = permission.id
    WHERE user.id IN (:ids);
  `;
		const [findResult] = await sequelize.query(query, {
			replacements: {
				ids: idsArr.toString(),
			},
		});

		if (findResult.length > 0) {
			const arr: Array<{ id: number; name: string }> = findResult as any[];
			const index: number = arr.findIndex((item) => item.name === 'admin');
			if (index !== -1) {
				sendResult(res, 403, '禁止删除 admin 用户');
				return;
			}
		} else {
			sendResult(res, 404, '用户不存在');
			return;
		}
	} catch (error) {
		next(error);
	}

	// 删除用户
	try {
		const result: number = await AdminUserModel.destroy({
			where: { id: { [Op.in]: idsArr } },
		});
		if (result > 0) {
			sendResult(res, 200, '删除成功');
			return;
		}
		sendResult(res, 400, '删除失败');
	} catch (error) {
		next(error);
	}
}
