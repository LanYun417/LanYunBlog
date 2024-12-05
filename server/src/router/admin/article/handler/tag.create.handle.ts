import { categoryTagSchema } from '@/validation';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import TagModel, { Tag } from '@/models/article/tags.model';

export function tagCreateHandle(req: Request, res: Response, next: NextFunction): void {
	const tag: Tag = req.body.tag;

	const validate = categoryTagSchema.validate({ ...tag }).error?.message;

	if (validate && validate !== void 0) {
		sendResult(res, 400, validate);
		return;
	}

	// 创建文章标签
	TagModel.findOrCreate({
		where: { name: tag.name },
		defaults: { ...tag },
	})
		.then((result: [TagModel, boolean]) => {
			if (result[1]) {
				sendResult(res, 201, '创建成功');
				return;
			}
			sendResult(res, 409, '创建失败，请检查标签是否已存在');
		})
		.catch((err: Error) => {
			next(err);
		});
}
