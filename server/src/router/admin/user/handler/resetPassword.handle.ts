import { md5, sha256 } from '@/utils/u.crypto';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import AdminUserModel from '@/models/user/admin_users.model';
import sequelize from '@/models';

export async function resetPasswordHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const id: number | undefined = req.body.id;

	if (!id || typeof id !== 'number') {
		sendResult(res, 400, '缺少参数 `id`');
		return;
	}

	try {
		// 判断要修改的用户是否是 admin
		const [findResult] = await sequelize.query(
			`
			SELECT user.id, permission.name as permissionName
			FROM admin_users as user
			JOIN admin_permission as permission 
			ON user.permissionId = permission.id
			WHERE user.id = :id
		`,
			{ replacements: { id } }
		);

		if ((findResult as any[])[0].permissionName === 'admin') {
			sendResult(res, 403, '不能重置 admin 账户的密码');
			return;
		}

		const password: string = md5('123456');

		const result: [affectedCount: number] = await AdminUserModel.update(
			{ password: sha256(md5(password)) },
			{ where: { id } }
		);
		if (result[0] > 0) {
			sendResult(res, 200, '重置成功');
			return;
		}
		sendResult(res, 400, '重置失败');
	} catch (error) {
		next(error);
	}
}
