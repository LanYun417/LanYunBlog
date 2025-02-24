import { sendResult } from '@/utils/u.sendResult';
import { articleUpdateSchema } from '@/validation';
import { NextFunction, Request, Response } from 'express';
import TagModel, { TagList } from '@/models/article/tags.model';
import ArticleTagModel from '@/models/article/article_tag.model';
import ArticleModel, { Article } from '@/models/article/articles.model';

export async function updateHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const article: Article = req.body.article;

	const validate = articleUpdateSchema.validate({ ...article }).error?.message;

	if (validate && validate !== void 0) {
		sendResult(res, 400, validate);
		return;
	}

	try {
		// 处理 tagsId 参数
		const tagsId = article.tagsId.map((id) => Number(id));

		// 验证 tagsId 是否存在
		const tagList: TagList = (await TagModel.findAll()).map((item) => item.dataValues);
		for (const id of tagsId) {
			if (!tagList.some((item) => item.id === id)) {
				sendResult(res, 400, `标签 id:${id} 不存在`);
				return;
			}
		}

		// 更新文章
		const updateResult = await ArticleModel.update(
			{ ...article },
			{ where: { id: article.id } }
		);

		// 更新文章标签
		if (updateResult[0] > 0) {
			// 先删除原有标签关系
			await ArticleTagModel.destroy({ where: { articleId: article.id } });

			// 再添加新标签关系
			const ids = tagsId.map((id) => {
				return { articleId: <number>article.id, tagId: id };
			});

			// 创建新的标签关系
			await ArticleTagModel.bulkCreate(ids);

			sendResult(res, 200, '更新成功');
		} else {
			sendResult(res, 400, '更新失败，请检查文章是否存在');
		}
	} catch (error) {
		if ((error as Error).message === 'Validation error') {
			sendResult(res, 400, '更新失败，相同标题文章已存在');
			return;
		}
		next(error);
	}
}
