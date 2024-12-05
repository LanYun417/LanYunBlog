import FriendlyLinkModel, {
	FriendlyLink,
} from '@/models/friendlyLink/friendly_link.model';
import { sendResult } from '@/utils/u.sendResult';
import { friendlyLinkUpdateSchema } from '@/validation';
import { NextFunction, Request, Response } from 'express';

export function updateHandle(req: Request, res: Response, next: NextFunction): void {
	const friendlyLink: FriendlyLink = req.body.friendlyLink;

	const validate = friendlyLinkUpdateSchema.validate({ ...friendlyLink }).error?.message;

	if (validate && validate !== void 0) {
		sendResult(res, 400, validate);
		return;
	}

	// 更新友情链接
	FriendlyLinkModel.update({ ...friendlyLink }, { where: { id: friendlyLink.id } })
		.then((result: [affectedCount: number]) => {
			if (result[0] > 0) {
				sendResult(res, 200, '更新成功');
				return;
			}
			sendResult(res, 400, '更新失败，请检查友链是否存在');
		})
		.catch((err: Error) => {
			next(err);
		});
}
