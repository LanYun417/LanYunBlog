import { verifyToken } from '@/utils/u.crypto';
import { sendResult } from '@/utils/u.sendResult';
import FriendlyLinkModel, {
	FriendlyLink,
} from '@/models/friendlyLink/friendly_link.model';
import { friendlyLinkApplySchema } from '@/validation';
import { NextFunction, Request, Response } from 'express';

export async function applyHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const firendlyLinkInfo: FriendlyLink = req.body.friendlyLink;

	const validate = friendlyLinkApplySchema.validate({ ...firendlyLinkInfo }).error
		?.message;

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

		// 创建申请友链
		const result: [FriendlyLinkModel, boolean] = await FriendlyLinkModel.findOrCreate({
			where: { url: firendlyLinkInfo.url },
			defaults: { ...firendlyLinkInfo, status: 'pending' },
		});

		if (result[1]) {
			sendResult(res, 200, '申请提交成功，请等待管理员审核');
			return;
		}
		sendResult(res, 400, '该友链已经存在，或已提交申请');
	} catch (error) {
		next(error);
	}
}
