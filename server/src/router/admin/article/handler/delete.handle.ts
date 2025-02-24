import { Op } from 'sequelize';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import ArticleModel from '@/models/article/articles.model';
import ArticleTagModel from '@/models/article/article_tag.model';

export async function deleteHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const ids = req.query.ids as string;

	// 参数校验
	if (!ids || ids.trim() === '') {
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
		// 删除文章
		const deleteArticleResult: number = await ArticleModel.destroy({
			where: { id: { [Op.in]: idsArr } },
		});

		if (deleteArticleResult > 0) {
			// 删除标签关联
			const deleteTagResult: number = await ArticleTagModel.destroy({
				where: { articleId: { [Op.in]: idsArr } },
			});
			if (deleteTagResult > 0) {
				sendResult(res, 200, '删除成功');
			} else {
				sendResult(res, 500, '删除标签关联失败');
			}
		} else {
			sendResult(res, 400, '删除文章失败，请检查文章是否存在');
		}
	} catch (error) {
		next(error);
	}
}
