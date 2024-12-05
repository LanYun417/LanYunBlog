import { categoryTagSchema } from '@/validation';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import CategoryModel, { Category } from '@/models/article/categories.model';

export function categoryCreateHandle(
	req: Request,
	res: Response,
	next: NextFunction
): void {
	const category: Category = req.body.category;

	const validate = categoryTagSchema.validate({ ...category }).error?.message;

	if (validate && validate !== void 0) {
		sendResult(res, 400, validate);
		return;
	}

	// 创建文章分类
	CategoryModel.findOrCreate({
		where: { name: category.name },
		defaults: { ...category },
	})
		.then((result: [CategoryModel, boolean]) => {
			if (result[1]) {
				sendResult(res, 201, '创建成功');
				return;
			}
			sendResult(res, 409, '创建失败，请检查分类是否已存在');
		})
		.catch((err: Error) => {
			next(err);
		});
}
