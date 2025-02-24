import { IP2RegionResult } from 'ip2region';
import { messageSchema } from '@/validation';
import { verifyToken } from '@/utils/u.crypto';
import { getIpInfo } from '@/utils/u.ip2region';
import { sendResult } from '@/utils/u.sendResult';
import LeaveMessageModel, {
	LeaveMessage,
} from '@/models/leaveMessage/leave_message.model';
import { NextFunction, Request, Response } from 'express';

export async function createHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const message: LeaveMessage = req.body.message;

	const validate = messageSchema.validate({ ...message }).error?.message;

	try {
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

		if (validate && validate !== void 0) {
			sendResult(res, 400, validate);
			return;
		}

		// 获取ip信息
		const ip: string = req.ip || '';
		const ipInfo: IP2RegionResult = getIpInfo(ip);

		// 保存留言
		await LeaveMessageModel.create({
			...message,
			...ipInfo,
			ip,
		});

		sendResult(res, 201, '发布成功');
	} catch (error) {
		next(error);
	}
}
