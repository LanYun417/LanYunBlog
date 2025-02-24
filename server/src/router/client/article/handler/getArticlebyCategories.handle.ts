import sequelize from '@/models';
import { sendResult } from '@/utils/u.sendResult';
import { markdownToText } from '@/utils/u.markdownToText';
import { NextFunction, Request, Response } from 'express';
import ArticleModel from '@/models/article/articles.model';

export async function getArticleByCategoriesHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const categoryId = Number(req.query.categoryId); // 一级分类 ID
	const secCategoryId = Number(req.query.secCategoryId); // 二级分类 ID

	if (!categoryId && !secCategoryId) {
		sendResult(res, 400, '至少需要提供一个分类ID');
		return;
	}

	const { pageSize, currentPage } = req.query;

	const sql: string = `
		SELECT 
			a.id,
			a.title,
			a.cover,
			a.categoryId,
			a.content,
			c.name AS categoryName,
			a.secCategoryId,
			sc.name AS secCategoryName,
			a.createdAt AS publishTime,
			JSON_ARRAYAGG(JSON_OBJECT('id', t.id, 'name', t.name)) AS tags
		FROM 
			articles a
		LEFT JOIN 
			categories c ON a.categoryId = c.id
		LEFT JOIN 
			sec_categories sc ON a.secCategoryId = sc.id
		LEFT JOIN 
			article_tag at ON a.id = at.articleId
		LEFT JOIN 
			tags t ON at.tagId = t.id
		WHERE 
			(:categoryId IS NULL OR a.categoryId = :categoryId) 
			AND (:secCategoryId IS NULL OR a.secCategoryId = :secCategoryId)
		GROUP BY 
			a.id, a.title, a.cover, a.categoryId, c.name, a.secCategoryId, sc.name, a.createdAt 
		ORDER BY a.createdAt DESC  -- 添加这一行按照发布时间降序排序
	`;

	try {
		// 获取文章总数
		const total = (
			await ArticleModel.findAll({
				where: {
					[categoryId ? 'categoryId' : 'secCategoryId']: categoryId || secCategoryId,
				},
			})
		).length;

		// 获取所有文章数据
		if (!pageSize || !currentPage) {
			const [findResult] = await sequelize.query(sql, {
				replacements: {
					categoryId: categoryId || null,
					secCategoryId: secCategoryId || null,
				},
			});
			const articles = (findResult as any[]).map((article) => {
				let content = markdownToText(article.content).slice(0, 300);
				if (content.length >= 300) {
					content = content.slice(0, 300) + '...';
				}

				return {
					...article,
					content,
				};
			});
			sendResult(res, 200, '获取成功', { list: articles, total });
			return;
		}

		// 分页查询
		const limit = Number(pageSize);
		const offset = (Number(currentPage) - 1) * limit;

		// 校验参数是否有效
		if (isNaN(limit) || isNaN(offset)) {
			sendResult(res, 400, '分页参数无效');
			return;
		}

		const [findResult] = await sequelize.query(sql + ' LIMIT :limit OFFSET :offset', {
			replacements: {
				limit,
				offset,
				categoryId: categoryId || null,
				secCategoryId: secCategoryId || null,
			},
		});

		const articles = (findResult as any[]).map((article) => {
			let content = markdownToText(article.content).slice(0, 300);
			if (content.length >= 300) {
				content = content.slice(0, 300) + '...';
			}

			return {
				...article,
				content,
			};
		});

		sendResult(res, 200, '获取成功', { list: articles, total });
	} catch (error) {
		next(error);
	}
}
