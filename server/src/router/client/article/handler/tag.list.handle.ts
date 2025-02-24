import { Op } from 'sequelize';
import sequelize from '@/models';
import { sendResult } from '@/utils/u.sendResult';
import TagModel from '@/models/article/tags.model';
import { NextFunction, Request, Response } from 'express';

export async function tagListHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	// 从请求查询参数中解构出页面大小、当前页码和关键词，并进行基本的类型转换（将字符串转为可能的数字类型）
	const pageSize: number = Number(req.query.pageSize);
	const currentPage: number = Number(req.query.currentPage);
	const keyword: string | undefined = req.query.keyword as string | undefined;

	// 构建基础的SQL语句，预留条件和分页相关占位符
	const baseSql = `
				SELECT t.*, COUNT(at.tagId) as articleCount
				FROM tags t
				LEFT JOIN article_tag at ON t.id = at.tagId 
    `;
	let whereClause = '';
	let limitClause = '';

	try {
		// 获取一级分类总数
		let total: number = await TagModel.count();

		// 根据是否传入分页参数来构建不同的查询条件
		if (!isNaN(pageSize) && !isNaN(currentPage)) {
			// 构建分页相关的语句
			limitClause = ` LIMIT ${pageSize} OFFSET ${(currentPage - 1) * pageSize} `;
		}

		if (keyword) {
			// 构建WHERE子句，使用参数化查询来防止SQL注入等安全问题，且保证语法正确
			whereClause = ` WHERE t.name LIKE :keyword `;
			total = total = await TagModel.count({
				where: {
					name: {
						[Op.like]: `%${keyword}%`,
					},
				},
			});
		}

		// 组合完整的SQL语句
		const sql = `${baseSql}${whereClause} GROUP BY t.id ${limitClause}`;

		// 执行查询操作，使用参数化方式传递参数
		const queryOptions = {
			replacements: {
				keyword: `%${keyword}%`,
			},
		};

		const [findResult] = await sequelize.query(sql, queryOptions);

		const tags = (findResult as any[]).map((tag) => {
			return {
				...tag,
			};
		});

		sendResult(res, 200, '获取成功', { list: tags, total });
	} catch (error) {
		next(error);
	}
}
