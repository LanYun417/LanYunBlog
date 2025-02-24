import { sendResult } from '@/utils/u.sendResult';
import { authorInfoUpdateSchema } from '@/validation';
import { NextFunction, Request, Response } from 'express';
import AuthorInfoModel, { AuthorInfo } from '@/models/author/author_info.model';

export function updateHandle(req: Request, res: Response, next: NextFunction): void {
	const authorInfo: AuthorInfo | undefined = req.body.authorInfo;

	if (!authorInfo || authorInfo === void 0) {
		sendResult(res, 400, '缺少参数 `authorInfo`');
		return;
	}

	const validate: string | undefined = authorInfoUpdateSchema.validate({ ...authorInfo })
		.error?.message;

	if (validate || validate !== void 0) {
		sendResult(res, 400, validate);
		return;
	}

	// 更新作者信息
	AuthorInfoModel.update({ ...authorInfo }, { where: { id: authorInfo.id } })
		.then((result: [affectedCount: number]) => {
			if (result[0] > 0) {
				sendResult(res, 200, '更新成功');
				return;
			}
			sendResult(res, 400, '更新失败，请检查数据是否存在');
		})
		.catch((err: Error) => {
			next(err);
		});
}
