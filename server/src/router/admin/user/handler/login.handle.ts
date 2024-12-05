import { TokenInfo } from '@/types';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import AdminUserModel from '@/models/user/admin_users.model';
import { sha256, signToken, verifyToken } from '@/utils/u.crypto';

export async function loginHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const username: string | undefined = req.body.username; // 用户名
	const password: string | undefined = req.body.password; // 密码
	const token: string | undefined = req.headers.authorization; // 获取 token

	// Token 登录
	if (!username && !password) {
		// 判断是否有 Token
		if (token) {
			// 解析 Token
			try {
				if (!token.includes('Bearer')) {
					sendResult(res, 401, 'Token 格式错误');
					return;
				}
				const formatToken = token.split('Bearer')[1].trim();
				const decoded: TokenInfo | undefined = await verifyToken(formatToken);

				if (decoded) {
					sendResult(res, 200, '登录成功');
				}
			} catch (error) {
				next(error);
			}
		} else {
			// 没有 Token 则返回 401 错误
			sendResult(res, 401, '登录失败');
			return;
		}
		return;
	}

	// 校验验证码
	const captchaToken: string | undefined = req.body.captchaToken;
	if (!captchaToken) {
		sendResult(res, 401, '验证码错误');
		return;
	}
	const verifyResult = await verifyToken(captchaToken);
	if (!verifyResult.success) {
		sendResult(res, 401, '验证码错误');
		return;
	}

	// 用户名密码登录
	if (!username || !password) {
		sendResult(res, 401, '用户名或密码错误');
		return;
	}

	try {
		const findResult = await AdminUserModel.findOne({
			where: { username, password: sha256(password) },
		});

		if (findResult) {
			// 生成 Token
			const token = await signToken(
				{
					...findResult.dataValues,
					password: undefined,
					createdAt: undefined,
					updatedAt: undefined,
				},
				7
			);

			// 返回登录结果
			res.setHeader('Authorization', `Bearer ${token}`);
			sendResult(res, 200, '登录成功');
		} else {
			// 用户名或密码错误
			sendResult(res, 401, '用户名或密码错误');
		}
	} catch (error) {
		next(error);
	}
}
