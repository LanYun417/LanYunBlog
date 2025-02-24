import { TokenInfo } from '@/types';
import { sha256 } from '@/utils/u.crypto';
import { passwordSchema } from '@/validation';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import AdminUserModel from '@/models/user/admin_users.model';

export async function updatePasswordHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const verifyInfo: TokenInfo | undefined = req['verifyInfo'];

	const { oldPassword, newPassword } = req.body;

	if (!verifyInfo || typeof verifyInfo !== 'object') {
		sendResult(res, 401, '请先登录');
		return;
	}

	// 校验密码安全性
	const validatePassword = passwordSchema.validate(newPassword).error?.message;
	if (validatePassword && validatePassword !== void 0) {
		sendResult(res, 400, validatePassword);
		return;
	}

	try {
		// 获取原密码
		const checkPasswordResult = await AdminUserModel.findOne({
			where: { id: verifyInfo.id },
			attributes: ['password'],
		});

		// 校验原密码
		if (sha256(oldPassword) === checkPasswordResult?.dataValues.password) {
			// 新密码不能与旧密码相同
			if (oldPassword === newPassword) {
				sendResult(res, 400, '新密码不能与旧密码相同');
				return;
			}
			// 更新密码
			const updateResult: [affectedCount: number] = await AdminUserModel.update(
				{ password: sha256(newPassword) },
				{ where: { id: verifyInfo.id } }
			);
			if (updateResult.length > 0 && updateResult[0] > 0) {
				sendResult(res, 200, '密码修改成功');
				return;
			}
			sendResult(res, 400, '密码修改失败');
		} else {
			sendResult(res, 400, '原密码错误');
			return;
		}
	} catch (error) {
		next(error);
	}
}
