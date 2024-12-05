import { Op } from 'sequelize';
import sequelize from '@/models';
import { sendResult } from '@/utils/u.sendResult';
import { markdownToText } from '@/utils/u.markdownToText';
import { NextFunction, Request, Response } from 'express';
import ArticleModel from '@/models/article/articles.model';

export async function searchHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const { pageSize, currentPage, keyword } = req.query;

	const sql: string = `
		SELECT 
			a.id AS articleId,
			a.title,
			a.cover,
      a.content,
			a.categoryId,
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
      a.title LIKE :keyword OR a.content LIKE :keyword
		GROUP BY 
			a.id, a.title, a.cover, a.categoryId, c.name, a.secCategoryId, sc.name, a.createdAt 
	`;

	try {
		// 获取文章总数
		const total = await ArticleModel.count({
			where: {
				[Op.or]: {
					title: {
						[Op.like]: `%${keyword}%`,
					},
					content: {
						[Op.like]: `%${keyword}%`,
					},
				},
			},
		});

		// 获取所有文章数据
		if (!pageSize || !currentPage) {
			const [findResult] = await sequelize.query(sql, {
				replacements: {
					keyword: `%${keyword}%`,
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
			sendResult(res, 200, '获取成功', { articles, total });
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

		const [findResult] = await sequelize.query(sql + 'LIMIT :limit OFFSET :offset', {
			replacements: {
				limit,
				offset,
				keyword: `%${keyword}%`,
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

		sendResult(res, 200, '获取成功', { articles, total });
	} catch (error) {
		next(error);
	}
}
