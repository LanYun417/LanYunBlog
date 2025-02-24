import { IP2RegionResult } from 'ip2region';
import { getIpInfo } from '@/utils/u.ip2region';
import AccessModel from '@/models/access/access.model';
import { NextFunction, Request, Response } from 'express';

export async function AccessLog(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	// 获取IP
	const ip: string = String(req.headers['x-real-ip'] || req.ip);

	// IP信息
	const ipInfo: IP2RegionResult = getIpInfo(ip);

	// 记录访问信息
	const accessInfo = {
		...ipInfo,
		url: req.url,
		method: req.method,
		ip,
	};

	// 如果访问的是接口文档，则不记录本次访问
	if (req.path.includes('apidoc') || req.path === '/') {
		next();
		return;
	}

	try {
		await AccessModel.create({
			...accessInfo,
		});
		next();
	} catch (error) {
		next(error);
	}
}
