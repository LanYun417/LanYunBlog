import { TokenInfo } from '@/types';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import AdminUserModel, { AdminUser } from '@/models/user/admin_users.model';

export function updateHandle(req: Request, res: Response, next: NextFunction): void {
	const verifyInfo: TokenInfo | undefined = req['verifyInfo'];
	const user: AdminUser | undefined = req.body.user;

	if (!verifyInfo || typeof user !== 'object') {
		sendResult(res, 401, '请先登录');
		return;
	}

	if (!user || typeof user !== 'object') {
		sendResult(res, 400, '缺少参数 `user`');
		return;
	}

	// 不可修改的字段
	const immutableFields = [
		'id',
		'username',
		'createdAt',
		'updatedAt',
		'password',
		'permissionId',
	];
	const keys = Object.keys(user);
	const index = keys.findIndex((key) => immutableFields.includes(key));
	if (index !== -1) {
		sendResult(res, 400, `不可修改的字段: \`${keys[index]}\``);
		return;
	}

	// 更新用户信息
	AdminUserModel.update({ ...user }, { where: { id: verifyInfo.id } })
		.then((result: [affectedCount: number]) => {
			if (result.length > 0 && result[0] > 0) {
				sendResult(res, 200, '更新成功');
				return;
			}
			sendResult(res, 400, '更新失败');
		})
		.catch((err: Error) => {
			next(err);
		});
}
