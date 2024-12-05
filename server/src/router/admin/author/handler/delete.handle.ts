import { Op } from 'sequelize';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import AuthorInfoModel from '@/models/author/author_info.model';

export async function deleteHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const ids = req.query.ids as string;

	// 参数校验
	if (!ids || ids.trim() === '' || typeof ids !== 'string') {
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

	try {
		// 判断删除的数据中是否包含使用中的作者信息
		const findResult: AuthorInfoModel[] = await AuthorInfoModel.findAll({
			where: {
				id: { [Op.in]: idsArr },
				isUse: 'yes',
			},
		});

		if (findResult.length > 0) {
			sendResult(res, 400, '删除失败，不能删除正在使用的作者信息');
			return;
		}

		// 删除数据
		const result: number = await AuthorInfoModel.destroy({
			where: { id: { [Op.in]: idsArr } },
		});

		if (result > 0) {
			sendResult(res, 200, '删除成功');
			return;
		}

		sendResult(res, 400, '删除失败，请检查信息是否存在');
	} catch (error) {
		next(error);
	}
}
