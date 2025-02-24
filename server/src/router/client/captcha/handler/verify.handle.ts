import { signToken } from '@/utils/u.crypto';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';

export async function verifyHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const userInput = req.query.captcha;
	const storedCaptcha = req.session['captcha'];

	if (userInput === storedCaptcha) {
		// 验证码正确

		// 生成 token
		const token = await signToken({ success: true }, 1);

		sendResult(res, 200, '验证码正确', { token });
	} else {
		// 验证码错误
		sendResult(res, 400, '验证码错误');
	}
}
