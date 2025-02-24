import { Op } from 'sequelize';
import sequelize from '@/models';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import ArticleModel from '@/models/article/articles.model';
import { markdownToText } from '@/utils/u.markdownToText';

export async function listHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	// 从请求查询参数中获取页面大小、当前页码以及搜索关键词（用于同时搜索标题和内容）
	const pageSize: number = Number(req.query.pageSize);
	const currentPage: number = Number(req.query.currentPage);
	const keyword: string | undefined = req.query.keyword as string | undefined;

	// 构建基础的SQL语句，预留条件和分页相关占位符，这里查询的字段可根据实际需求调整
	const baseSql = `
		SELECT 
			a.id,
			a.title,
			a.cover,
			a.content,
			a.categoryId,
			c.name AS categoryName,
			a.secCategoryId,
			sc.name AS secCategoryName,
			a.createdAt AS publishTime,
			JSON_ARRAYAGG(
				JSON_OBJECT('id', t.id, 'name', t.name)
			) AS tags,
			COUNT(DISTINCT av.ip) AS views  -- 计算独立IP数量，表示访问量
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
		LEFT JOIN 
			article_views av ON a.id = av.articleId
	`;

	let whereClause: string = '';
	let limitClause: string = '';
	let orderBy: string = ` ORDER BY a.createdAt DESC `;
	let groupBy: string = `
		GROUP BY 
		a.id, a.title, a.cover, a.content, a.categoryId, c.name, a.secCategoryId, sc.name, a.createdAt
	`;

	try {
		// 获取文章总数
		let total = await ArticleModel.count();

		// 根据是否传入分页参数以及是否有搜索关键词来构建不同的查询条件
		if (!isNaN(pageSize) && !isNaN(currentPage)) {
			// 构建分页相关的语句
			limitClause = ` LIMIT ${pageSize} OFFSET ${(currentPage - 1) * pageSize} `;
		}

		if (keyword) {
			// 构建WHERE子句用于同时搜索文章标题和内容，使用参数化查询来防止SQL注入等安全问题，且保证语法正确
			whereClause = ` WHERE a.title LIKE :keyword OR a.content LIKE :keyword `;
			total = await ArticleModel.count({
				where: {
					[Op.or]: {
						title: { [Op.like]: `%${keyword}%` },
						content: { [Op.like]: `%${keyword}%` },
					},
				},
			});
		}

		// 组合完整的SQL语句
		const sql = `${baseSql}${whereClause} ${groupBy} ${orderBy} ${limitClause}`;

		// 执行查询操作，使用参数化方式传递参数
		const queryOptions = {
			replacements: {
				keyword: `%${keyword}%`,
			},
		};

		const [findResult] = await sequelize.query(sql, queryOptions);

		const articles = (findResult as any[]).map((article) => {
			// 使用 Set 来去重 tags 中的重复标签
			const uniqueTags = Array.from(
				new Set(article.tags.map((tag: any) => tag.id)) // 去重 by id
			).map((id) => article.tags.find((tag: any) => tag.id === id)); // 根据 id 重新排序 tags

			let content = markdownToText(article.content).slice(0, 300);
			if (content.length >= 300) {
				content = content.slice(0, 300) + '...';
			}

			return {
				...article,
				content,
				tags: uniqueTags,
			};
		});

		// 返回结果
		sendResult(res, 200, '获取成功', { list: articles, total });
	} catch (error) {
		// 除了将错误传递给下一个中间件，这里可以添加日志记录功能，方便排查问题
		console.error('获取文章列表时出现错误:', error);
		next(error);
	}
}
