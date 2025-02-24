import { authorInfoSchema } from '@/validation';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import AuthorInfoModel, { AuthorInfo } from '@/models/author/author_info.model';

export async function createHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const authorInfo: AuthorInfo | undefined = req.body.authorInfo;

	if (!authorInfo || authorInfo === void 0) {
		sendResult(res, 400, '缺少参数 `authorInfo`');
		return;
	}

	const validate: string | undefined = authorInfoSchema.validate({ ...authorInfo }).error
		?.message;

	if (validate && validate !== void 0) {
		sendResult(res, 400, validate);
		return;
	}

	try {
		// 创建作者信息
		const result: [AuthorInfoModel, boolean] = await AuthorInfoModel.findOrCreate({
			where: { name: authorInfo.name },
			defaults: { ...authorInfo },
		});

		if (result[1]) {
			sendResult(res, 201, '创建成功');
			return;
		}

		sendResult(res, 409, '创建失败，请检查作者信息是否已存在');
	} catch (error) {
		next(error);
	}
}
