import { secCategorySchema } from '@/validation';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import CategoryModel from '@/models/article/categories.model';
import SecCategoryModel, { SecCategory } from '@/models/article/sec_categories.model';

export async function secCategoryCreateHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const secCategory: SecCategory = req.body.secCategory;

	const validate = secCategorySchema.validate({ ...secCategory }).error?.message;

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

		// 创建二级分类
		const createResult: [SecCategoryModel, boolean] = await SecCategoryModel.findOrCreate(
			{
				where: { name: secCategory.name },
				defaults: { ...secCategory },
			}
		);

		if (createResult[1]) {
			sendResult(res, 201, '创建成功');
			return;
		}

		sendResult(res, 400, '创建失败，请检查二级分类是否已存在');
	} catch (error) {
		next(error);
	}
}
