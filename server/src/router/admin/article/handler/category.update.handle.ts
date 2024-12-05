import { sendResult } from '@/utils/u.sendResult';
import { categoryTagUpdateSchema } from '@/validation';
import { NextFunction, Request, Response } from 'express';
import CategoryModel, { Category } from '@/models/article/categories.model';

export function categoryUpdateHandle(
	req: Request,
	res: Response,
	next: NextFunction
): void {
	const category: Category = req.body.category;

	const validate = categoryTagUpdateSchema.validate({ ...category }).error?.message;

	if (validate && validate !== void 0) {
		sendResult(res, 400, validate);
		return;
	}

	// 更新文章分类
	CategoryModel.update({ ...category }, { where: { id: category.id } })
		.then((result: [affectedCount: number]) => {
			if (result[0] > 0) {
				sendResult(res, 200, '更新成功');
				return;
			}
			sendResult(res, 400, '更新失败，请检查分类是否存在');
		})
		.catch((err: Error) => {
			if ((err as Error).message === 'Validation error') {
				sendResult(res, 400, '更新失败，同名分类已存在');
				return;
			}
			next(err);
		});
}
