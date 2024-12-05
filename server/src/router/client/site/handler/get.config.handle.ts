import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import SiteInfoModel, { SiteInfoList } from '@/models/site/site_info.model';

export function getConfigHandle(req: Request, res: Response, next: NextFunction): void {
	// 获取站点配置信息
	SiteInfoModel.findAll({
		attributes: {
			exclude: ['isUse', 'createdAt', 'updatedAt'],
		},
		where: { isUse: 'yes' },
	})
		.then((result: SiteInfoModel[]) => {
			const siteInfo: SiteInfoList = result.map((item: SiteInfoModel) => {
				return item.dataValues;
			});

			sendResult(res, 200, '获取成功', { list: siteInfo });
		})
		.catch((err) => {
			next(err);
		});
}
