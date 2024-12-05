import { photoUpdateSchema } from '@/validation';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import PhotoModel, { Photo } from '@/models/photo/photo.model';

export function updateHandle(req: Request, res: Response, next: NextFunction): void {
	const photo: Photo | undefined = req.body.photo;

	if (!photo) {
		sendResult(res, 400, '缺少参数 `photo`');
		return;
	}

	const validate = photoUpdateSchema.validate({ ...photo }).error?.message;

	if (validate && validate !== void 0) {
		sendResult(res, 400, validate);
		return;
	}

	// 更新照片信息
	PhotoModel.update({ ...photo }, { where: { id: photo.id } })
		.then((result: [affectedCount: number]) => {
			if (result[0] > 0) {
				sendResult(res, 200, '更新成功');
				return;
			}
			sendResult(res, 400, '更新失败');
		})
		.catch((err: Error) => {
			next(err);
		});
}
