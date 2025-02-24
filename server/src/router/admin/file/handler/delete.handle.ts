import path from 'node:path';
import { Op } from 'sequelize';
import { batchDeleteFiles } from '@/utils/u.file';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import FileModel, { FileInfo } from '@/models/file/files.model';

export async function deleteHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const ids = req.query.ids as string;

	// 参数校验
	if (!ids || ids.trim() === '' || typeof ids !== 'string') {
		sendResult(res, 400, '缺少参数 `ids`');
		return;
	}

	// 格式化 ids
	const idsArr: number[] = [];
	if (ids.includes(',')) {
		// 去重
		const idsSet = [...new Set(ids.split(','))];
		idsArr.push(...idsSet.map((id) => Number(id.trim())));
	} else {
		idsArr.push(Number(ids.trim()));
	}

	try {
		// 查找文件
		const findResult: FileModel[] = await FileModel.findAll({
			where: { id: { [Op.in]: idsArr } },
		});

		if (findResult.length < 1) {
			sendResult(res, 404, '文件不存在');
			return;
		}

		// 在数据库中删除文件
		await FileModel.destroy({ where: { id: { [Op.in]: idsArr } } });

		const filePaths: string[] = findResult.map((file: FileInfo): string => {
			return path.join(process.cwd(), file.path);
		});

		// 批量在磁盘中删除文件
		const delFileResult: boolean = await batchDeleteFiles(filePaths);

		if (delFileResult) {
			sendResult(res, 200, '删除成功');
		} else {
			sendResult(res, 500, '删除失败');
		}
	} catch (error: unknown) {
		const msg = (error as Error).message;
		if (msg.includes('no such file or directory')) {
			sendResult(res, 200, '文件已从数据库中移除，但文件在磁盘中不存在');
			return;
		}
		next(error as Error);
	}
}
