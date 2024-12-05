import { sendResult } from '@/utils/u.sendResult';
import { categoryTagUpdateSchema } from '@/validation';
import { NextFunction, Request, Response } from 'express';
import TagModel, { Tag } from '@/models/article/tags.model';

export function tagUpdateHandle(req: Request, res: Response, next: NextFunction): void {
	const tag: Tag = req.body.tag;

	const validate = categoryTagUpdateSchema.validate({ ...tag }).error?.message;

	if (validate && validate !== void 0) {
		sendResult(res, 400, validate);
		return;
	}

	// 更新文章标签
	TagModel.update({ ...tag }, { where: { id: tag.id } })
		.then((result: [affectedCount: number]) => {
			if (result[0] > 0) {
				sendResult(res, 200, '更新成功');
				return;
			}
			sendResult(res, 400, '更新失败，请检查标签是否存在');
		})
		.catch((err: Error) => {
			next(err);
		});
}
