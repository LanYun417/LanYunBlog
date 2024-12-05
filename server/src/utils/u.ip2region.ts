import IP2Region, { IP2RegionResult } from 'ip2region';

const query = new IP2Region();

/**
 * 获取IP信息
 * @param { string } ip IP地址
 * @return { IP2RegionResult } IP信息
 */
export function getIpInfo(ip: string): IP2RegionResult {
	const result: IP2RegionResult | null = query.search(ip);
	if (result === null) {
		return {
			country: '未知',
			province: '未知',
			city: '未知',
			isp: '未知',
		};
	}
	return result;
}
