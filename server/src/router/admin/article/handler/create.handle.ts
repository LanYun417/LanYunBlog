import { articleSchema } from '@/validation';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import TagModel, { TagList } from '@/models/article/tags.model';
import ArticleTagModel from '@/models/article/article_tag.model';
import ArticleModel, { Article } from '@/models/article/articles.model';

export async function createHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const article: Article = req.body.article;

	const validate = articleSchema.validate({ ...article }).error?.message;

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

		// 创建文章
		const createResult = await ArticleModel.findOrCreate({
			where: { title: article.title },
			defaults: { ...article },
		});

		if (createResult[1]) {
			// 创建文章标签关系
			const ids = tagsId.map((id) => {
				return { articleId: createResult[0].id, tagId: id };
			});

			const articleTagResult: ArticleTagModel[] = await ArticleTagModel.bulkCreate(ids);

			if (articleTagResult.length > 0) {
				sendResult(res, 201, '文章创建成功');
				return;
			} else {
				sendResult(res, 500, '文章标签关系创建失败');
				return;
			}
		} else {
			sendResult(res, 400, '文章创建失败，请检查文章是否已存在');
		}
	} catch (error) {
		next(error);
	}
}
