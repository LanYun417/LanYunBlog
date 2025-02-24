import { sendResult } from '@/utils/u.sendResult';
import FriendlyLinkModel, {
	FriendlyLinkList,
} from '@/models/friendlyLink/friendly_link.model';
import { NextFunction, Request, Response } from 'express';

export async function listHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const { pageSize, currentPage } = req.query;

	try {
		const total: number = await FriendlyLinkModel.count();

		const findResult: FriendlyLinkModel[] = await FriendlyLinkModel.findAll({
			where: {
				status: 'approved',
			},
			attributes: ['id', 'name', 'url', 'icon', 'description'],
			limit: Number(pageSize) || undefined,
			offset: (Number(currentPage) - 1) * Number(pageSize) || undefined,
		});

		const friendlyLinkList: FriendlyLinkList = findResult.map(
			(item: FriendlyLinkModel) => item.dataValues
		);

		sendResult(res, 200, '获取成功', { total, list: friendlyLinkList });
	} catch (error) {
		next(error);
	}
}
