import AccessModel from '@/models/access/access.model';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';

export function clearAllHandle(req: Request, res: Response, next: NextFunction): void {
	const text: string | null = req.query.text as string | null;
	if (!text || typeof text !== 'string') return;

	if (text === '确认清空访问日志记录') {
		AccessModel.destroy({ truncate: true })
			.then(() => {
				sendResult(res, 200, '清空访问日志记录成功');
			})
			.catch((err: Error) => {
				next(err);
			});
	}
}
