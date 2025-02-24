import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';

export function uploadHandle(req: Request, res: Response, next: NextFunction): void {
	const fileInfo: FileList = req['fileInfo'];

	if (fileInfo.length > 0) {
		sendResult(res, 200, '上传成功', { files: fileInfo });
	} else {
		sendResult(res, 400, '上传失败');
	}
}
