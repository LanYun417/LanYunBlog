import FriendlyLinkModel, {
	FriendlyLink,
} from '@/models/friendlyLink/friendly_link.model';
import { sendResult } from '@/utils/u.sendResult';
import { friendlyLinkSchema } from '@/validation';
import { NextFunction, Request, Response } from 'express';

export function createHandle(req: Request, res: Response, next: NextFunction): void {
	const friendlyLink: FriendlyLink = req.body.friendlyLink;

	if (!friendlyLink || friendlyLink === void 0) {
		sendResult(res, 400, '缺少参数 `friendlyLink`');
		return;
	}

	const validate: string | undefined = friendlyLinkSchema.validate({ ...friendlyLink })
		.error?.message;

	if (validate && validate !== void 0) {
		sendResult(res, 400, validate);
		return;
	}

	// 创建友链
	FriendlyLinkModel.findOrCreate({
		where: { url: friendlyLink.url },
		defaults: { ...friendlyLink },
	})
		.then((result: [FriendlyLinkModel, boolean]) => {
			if (result[1]) {
				sendResult(res, 201, '创建成功');
				return;
			}
			sendResult(res, 409, '创建失败，请检查友链是否已存在');
		})
		.catch((err: Error) => {
			next(err);
		});
}
