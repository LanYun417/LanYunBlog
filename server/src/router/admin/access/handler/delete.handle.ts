import { Op } from 'sequelize';
import { sendResult } from '@/utils/u.sendResult';
import AccessModel from '@/models/access/access.model';
import { NextFunction, Request, Response } from 'express';

export async function deleteHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const ids = req.query.ids as string | undefined;

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
		// 删除数据
		const delResult: number = await AccessModel.destroy({
			where: { id: { [Op.in]: idsArr } },
		});

		if (delResult > 0) {
			sendResult(res, 200, '删除成功');
			return;
		}
		sendResult(res, 400, '删除失败，记录不存在');
	} catch (error) {
		next(error);
	}
}