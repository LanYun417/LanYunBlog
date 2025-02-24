import { Op } from 'sequelize';
import { siteInfoSchema } from '@/validation';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import SiteInfoModel, { SiteInfo } from '@/models/site/site_info.model';

export async function createHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const siteInfo: SiteInfo | undefined = req.body.siteInfo;

	if (!siteInfo || siteInfo === void 0) {
		sendResult(res, 400, '缺少参数 `siteInfo`');
		return;
	}

	const validate: string | undefined = siteInfoSchema.validate({ ...siteInfo }).error
		?.message;

	if (validate && validate !== void 0) {
		sendResult(res, 400, validate);
		return;
	}

	try {
		// 创建站点配置信息
		const result: [SiteInfoModel, boolean] = await SiteInfoModel.findOrCreate({
			where: {
				[Op.or]: [{ title: siteInfo.title }, { domain: siteInfo.domain }],
			},
			defaults: { ...siteInfo },
		});

		if (result[1]) {
			sendResult(res, 201, '创建成功');
			return;
		}

		sendResult(res, 409, '创建失败，请检查站点信息是否已存在');
	} catch (error) {
		next(error);
	}
}
