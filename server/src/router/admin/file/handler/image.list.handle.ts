import { Op } from 'sequelize';
import FileModel from '@/models/file/files.model';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';

export async function imageListHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const { pageSize, currentPage } = req.query;

	try {
		// 图片文件总数
		const total = await FileModel.count({ where: { mimetype: { [Op.like]: 'image%' } } });

		// 图片文件总大小
		const totalSize = await FileModel.sum('size', {
			where: { mimetype: { [Op.like]: 'image%' } },
		});

		// 图片列表
		const list = await FileModel.findAll({
			where: { mimetype: { [Op.like]: 'image%' } },
			order: [['createdAt', 'DESC']],
			limit: Number(pageSize) || undefined,
			offset: (Number(currentPage) - 1) * Number(pageSize) || undefined,
		});

		sendResult(res, 200, '获取成功', { list, total, totalSize });
	} catch (error) {
		next(error);
	}
}
