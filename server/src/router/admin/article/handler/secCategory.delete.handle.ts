import { Op } from 'sequelize';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import SecCategoryModel from '@/models/article/sec_categories.model';

export function secCategoryDeleteHandle(
	req: Request,
	res: Response,
	next: NextFunction
): void {
	const ids = req.query.ids as string;

	// 参数校验
	if (!ids || ids.trim() === '') {
		sendResult(res, 400, '缺少参数 `ids`');
		return;
	}

	// 格式化 ids
	const idsArr: number[] = [];
	if (ids.includes(',')) {
		// 去重
		const idsSet = [...new Set(ids.split(','))];
		idsArr.push(...idsSet.map((id) => Number(id.trim())));
	} else {
		idsArr.push(Number(ids.trim()));
	}

	// 删除二级分类
	SecCategoryModel.destroy({
		where: { id: { [Op.in]: idsArr } },
	})
		.then((result: number) => {
			if (result > 0) {
				sendResult(res, 200, '删除成功');
				return;
			}
			sendResult(res, 400, '删除失败，请检查二级分类是否存在');
		})
		.catch((err: Error) => {
			next(err);
		});
}
