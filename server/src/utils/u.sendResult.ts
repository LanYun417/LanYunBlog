import { info } from './u.logger';
import { Response } from 'express';

export interface Result {
	code: number;
	message: string;
	data?: object;
}

/**
 * 发送响应结果
 * @param res Response 响应对象
 * @param code 响应状态码
 * @param msg 响应消息
 * @param data 响应数据
 */
export function sendResult(
	res: Response,
	code: number,
	message: string,
	data?: object
): Response<any, Record<string, any>> {
	const result: Result = {
		code,
		message,
		...data,
	};

	info(result); // 记录响应结果

	return res.status(code).json(result);
}
