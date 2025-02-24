import CategoryModel from '@/models/article/categories.model';
import SecCategoryModel, { SecCategory } from '@/models/article/sec_categories.model';
import { sendResult } from '@/utils/u.sendResult';
import { secCategoryUpdateSchema } from '@/validation';
import { NextFunction, Request, Response } from 'express';

export async function secCategoryUpdateHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const secCategory: SecCategory = req.body.secCategory;

	const validate = secCategoryUpdateSchema.validate({ ...secCategory }).error?.message;

	if (validate && validate !== void 0) {
		sendResult(res, 400, validate);
		return;
	}

	try {
		// 检查父级分类是否存在
		const parent = await CategoryModel.findOne({ where: { id: secCategory.parentId } });

		if (!parent || parent === null) {
			sendResult(res, 400, '父级分类不存在');
			return;
		}

		// 更新二级分类
		const updateResult: [affectedCount: number] = await SecCategoryModel.update(
			{ ...secCategory },
			{ where: { id: secCategory.id } }
		);

		if (updateResult[0] > 0) {
			sendResult(res, 200, '更新成功');
			return;
		}
		sendResult(res, 400, '更新失败，请检查二级分类是否存在');
	} catch (error) {
		if ((error as Error).message === 'Validation error') {
			sendResult(res, 400, '更新失败，同名二级分类已存在');
			return;
		}
		next(error);
	}
}
