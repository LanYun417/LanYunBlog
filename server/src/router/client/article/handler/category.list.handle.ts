import { Op } from 'sequelize';
import sequelize from '@/models';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import CategoryModel from '@/models/article/categories.model';

export async function categoryListHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const pageSize: number = Number(req.query.pageSize);
	const currentPage: number = Number(req.query.currentPage);
	const keyword: string | undefined = req.query.keyword as string | undefined;

	const baseSql = `
    SELECT ca.*, COUNT(ar.categoryId) as articleCount
    FROM categories ca
    LEFT JOIN articles ar ON ca.id = ar.categoryId
	`;
	let whereClause = '';
	let limitClause = '';

	try {
		// 获取一级分类总数
		let total: number = await CategoryModel.count();

		if (!isNaN(pageSize) && !isNaN(currentPage)) {
			limitClause = ` LIMIT ${pageSize} OFFSET ${(currentPage - 1) * pageSize} `;
		}

		if (keyword) {
			whereClause = ` WHERE ca.name LIKE :keyword OR ca.description LIKE :keyword `;
			total = total = await CategoryModel.count({
				where: {
					[Op.or]: {
						name: { [Op.like]: `%${keyword}%` },
						description: { [Op.like]: `%${keyword}%` },
					},
				},
			});
		}

		// 组合完整的SQL语句
		const sql = `${baseSql}${whereClause} GROUP BY ca.id ${limitClause}`;

		const queryOptions = {
			replacements: {
				keyword: `%${keyword}%`,
			},
		};

		const [findResult] = await sequelize.query(sql, queryOptions);

		const categories = (findResult as any[]).map((category) => {
			return {
				...category,
			};
		});

		sendResult(res, 200, '获取成功', { list: categories, total });
	} catch (error) {
		next(error);
	}
}
