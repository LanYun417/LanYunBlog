import { sendResult } from '@/utils/u.sendResult';
import { siteInfoUpdateSchema } from '@/validation';
import { NextFunction, Request, Response } from 'express';
import SiteInfoModel, { SiteInfo } from '@/models/site/site_info.model';

export async function updateHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const siteInfo: SiteInfo | undefined = req.body.siteInfo;

	if (!siteInfo || siteInfo === void 0) {
		sendResult(res, 400, '缺少参数 `siteInfo`');
		return;
	}

	const validate: string | undefined = siteInfoUpdateSchema.validate({ ...siteInfo })
		.error?.message;

	if (validate || validate !== void 0) {
		sendResult(res, 400, validate);
		return;
	}

	try {
		// 更新站点信息
		const updateResult: [affectedCount: number] = await SiteInfoModel.update(
			{ ...siteInfo },
			{ where: { id: siteInfo.id } }
		);

		if (updateResult[0] > 0) {
			sendResult(res, 200, '更新成功');
			return;
		}

		sendResult(res, 400, '更新失败');
	} catch (error) {
		next(error);
	}
}
