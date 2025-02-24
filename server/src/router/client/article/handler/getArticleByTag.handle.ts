import sequelize from '@/models';
import { sendResult } from '@/utils/u.sendResult';
import { markdownToText } from '@/utils/u.markdownToText';
import { NextFunction, Request, Response } from 'express';
import ArticleTagModel from '@/models/article/article_tag.model';

export async function getArticleByTagHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const { pageSize, currentPage } = req.query;

	const tagId = Number(req.query.tagId);

	// 校验标签ID
	if (!tagId || isNaN(tagId)) {
		sendResult(res, 400, '标签ID不能为空');
		return;
	}

	const sql: string = `
    SELECT 
      a.id AS articleId,
      a.title,
      a.cover,
      a.content,
      a.createdAt AS publishTime,
      t.id AS tagId,
      t.name AS tagName,
      c.id AS categoryId,
      c.name AS categoryName,
      sc.id AS secCategoryId,
      sc.name AS secCategoryName,
      JSON_ARRAYAGG(JSON_OBJECT('id', t.id, 'name', t.name)) AS tags
    FROM 
      articles a
    LEFT JOIN 
      article_tag at ON a.id = at.articleId
    LEFT JOIN 
      tags t ON at.tagId = t.id
    LEFT JOIN 
      categories c ON a.categoryId = c.id
    LEFT JOIN 
      sec_categories sc ON a.secCategoryId = sc.id
    WHERE 
      t.id = :tagId
    GROUP BY 
      a.id, a.title, a.cover, a.content, a.createdAt, t.id, t.name, t.description, c.id, c.name, sc.id, sc.name
		ORDER BY a.createdAt DESC  -- 添加这一行按照发布时间降序排序
  `;

	try {
		// 获取文章总数
		const total: number = await ArticleTagModel.count({
			where: { tagId },
		});

		// 如果没有分页参数，直接返回所有符合条件的文章
		if (!pageSize || !currentPage) {
			const [findResult] = await sequelize.query(sql, {
				replacements: { tagId },
			});

			const articles = (findResult as any[]).map((article) => {
				let content = markdownToText(article.content).slice(0, 300);
				if (content.length >= 300) {
					content = content.slice(0, 300) + '...';
				}

				return {
					id: article.articleId,
					title: article.title,
					cover: article.cover,
					categoryId: article.categoryId,
					categoryName: article.categoryName,
					secCategoryId: article.secCategoryId,
					secCategoryName: article.secCategoryName,
					content,
					publishTime: article.publishTime,
					tags: [
						{
							id: article.tagId,
							name: article.tagName,
						},
					],
				};
			});

			sendResult(res, 200, '获取成功', { list: articles, total });
			return;
		}

		// 分页处理
		const limit = Number(pageSize);
		const offset = (Number(currentPage) - 1) * limit;

		// 校验分页参数有效性
		if (isNaN(limit) || isNaN(offset) || limit <= 0 || offset < 0) {
			sendResult(res, 400, '分页参数无效');
			return;
		}

		// 执行分页查询
		const [findResult] = await sequelize.query(sql + ' LIMIT :limit OFFSET :offset', {
			replacements: {
				tagId,
				limit,
				offset,
			},
		});

		const articles = (findResult as any[]).map((article) => {
			let content = markdownToText(article.content).slice(0, 300);
			if (content.length >= 300) {
				content = content.slice(0, 300) + '...';
			}

			return {
				id: article.articleId,
				title: article.title,
				cover: article.cover,
				categoryId: article.categoryId,
				categoryName: article.categoryName,
				secCategoryId: article.secCategoryId,
				secCategoryName: article.secCategoryName,
				content,
				publishTime: article.publishTime,
				tags: [
					{
						id: article.tagId,
						name: article.tagName,
					},
				],
			};
		});

		sendResult(res, 200, '获取成功', { list: articles, total });
	} catch (error) {
		next(error);
	}
}
