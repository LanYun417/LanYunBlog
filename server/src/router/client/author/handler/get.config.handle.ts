import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import AuthorInfoModel, { AuthorInfoList } from '@/models/author/author_info.model';

export function getConfigHandle(req: Request, res: Response, next: NextFunction): void {
	AuthorInfoModel.findAll({
		where: { isUse: 'yes' },
		attributes: {
			exclude: ['isUse', 'createdAt', 'updatedAt'],
		},
	})
		.then((result: AuthorInfoModel[]) => {
			const authorInfo: AuthorInfoList = result.map((item: AuthorInfoModel) => {
				return item.dataValues;
			});

			sendResult(res, 200, '获取成功', { list: authorInfo });
		})
		.catch((err: Error) => {
			next(err);
		});
}
