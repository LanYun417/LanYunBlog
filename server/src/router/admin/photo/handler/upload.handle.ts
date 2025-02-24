import { sendResult } from '@/utils/u.sendResult';
import PhotoModel from '@/models/photo/photo.model';
import { FileList } from '@/models/file/files.model';
import { NextFunction, Request, Response } from 'express';

export function uploadHandle(req: Request, res: Response, next: NextFunction): void {
	const fileInfo: FileList = req['fileInfo'];
	const description: string | undefined = req.body.description;

	if (!fileInfo) {
		sendResult(res, 400, '请上传文件');
		return;
	}

	if (!description) {
		sendResult(res, 400, '缺少参数 `description`');
		return;
	}

	PhotoModel.findOrCreate({
		where: { url: fileInfo[0].url },
		defaults: { url: fileInfo[0].url, description, path: fileInfo[0].path },
	})
		.then((result: [PhotoModel, boolean]) => {
			if (result[1]) {
				sendResult(res, 201, '上传成功', { files: fileInfo });
				return;
			}
			sendResult(res, 400, '照片已存在');
		})
		.catch((err: Error) => {
			next(err);
		});
}
