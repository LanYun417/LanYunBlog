import { Op } from 'sequelize';
import sequelize from '@/models';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import SecCategoryModel from '@/models/article/sec_categories.model';

export async function secCategoryListHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const pageSize: number = Number(req.query.pageSize);
	const currentPage: number = Number(req.query.currentPage);
	const keyword: string | undefined = req.query.keyword as string | undefined;

	const baseSql = `
    SELECT 
      sc.id,
      sc.name,
      sc.description,
      sc.createdAt,
      sc.updatedAt,
      c.id AS parentId,
      c.name AS parentName,
      c.description AS parentDescription,
      COUNT(a.id) AS articleCount
    FROM 
      sec_categories sc
    LEFT JOIN 
      categories c ON sc.parentId = c.id
    LEFT JOIN 
      articles a ON sc.id = a.secCategoryId
	`;
	let whereClause = '';
	let limitClause = '';

	try {
		// 获取一级分类总数
		let total: number = await SecCategoryModel.count();

		if (!isNaN(pageSize) && !isNaN(currentPage)) {
			// 构建分页相关的语句
			limitClause = ` LIMIT ${pageSize} OFFSET ${(currentPage - 1) * pageSize} `;
		}

		if (keyword) {
			whereClause = ` WHERE sc.name LIKE :keyword OR sc.description LIKE :keyword `;
			total = total = await SecCategoryModel.count({
				where: {
					[Op.or]: {
						name: { [Op.like]: `%${keyword}%` },
						description: { [Op.like]: `%${keyword}%` },
					},
				},
			});
		}

		// 组合完整的SQL语句
		const sql = `${baseSql} ${whereClause} GROUP BY 
      sc.id, sc.name, sc.description, c.id, c.name, c.description ${limitClause}`;

		const queryOptions = {
			replacements: {
				keyword: `%${keyword}%`,
			},
		};

		const [findResult] = await sequelize.query(sql, queryOptions);

		const secCategories = (findResult as any[]).map((category) => {
			return {
				...category,
			};
		});

		sendResult(res, 200, '获取成功', { list: secCategories, total });
	} catch (error) {
		next(error);
	}
}
