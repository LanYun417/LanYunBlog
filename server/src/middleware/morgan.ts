import morgan from 'morgan';
import { info } from '@/utils/u.logger';
import { Handler, Request, Response } from 'express';

// express 日志输出中间件
export function morganMiddleware(): Handler {
	return morgan(function (tokens, req: Request, res: Response) {
		const msg: string = [
			tokens.method(req, res),
			tokens.url(req, res),
			tokens.status(req, res),
			'-',
			tokens['response-time'](req, res),
			'ms',
		].join(' ');
		info(msg);
		return null;
	});
}
