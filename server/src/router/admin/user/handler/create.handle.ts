import { md5, sha256 } from '@/utils/u.crypto';
import { sendResult } from '@/utils/u.sendResult';
import { passwordSchema, userSchema } from '@/validation';
import { NextFunction, Request, Response } from 'express';
import AdminUserModel, { AdminUser } from '@/models/user/admin_users.model';

export function createHandle(req: Request, res: Response, next: NextFunction): void {
	const user: AdminUser = req.body.user;

	if (!user || user === void 0) {
		sendResult(res, 400, '缺少参数 `user`');
		return;
	}

	// 参数校验
	const validation: string | undefined = userSchema.validate({ ...user }).error?.message;

	if (validation && validation !== void 0) {
		sendResult(res, 400, validation);
		return;
	}

	// 校验密码安全性
	const validatePassword = passwordSchema.validate(user.password).error?.message;
	if (validatePassword && validatePassword !== void 0) {
		sendResult(res, 400, validatePassword);
		return;
	}

	AdminUserModel.findOrCreate({
		where: { username: user.username },
		defaults: { ...user, password: sha256(md5(user.password)) },
	})
		.then((result: [AdminUserModel, boolean]) => {
			if (result[1]) {
				sendResult(res, 201, '创建成功');
				return;
			}
			sendResult(res, 409, '用户已存在');
		})
		.catch((err: Error) => {
			next(err);
		});
}
