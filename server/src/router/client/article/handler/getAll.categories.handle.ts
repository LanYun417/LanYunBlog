import sequelize from '@/models';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import CategoryModel from '@/models/article/categories.model';

export async function getAllCategoriesHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const { pageSize, currentPage } = req.query;

	const sql = `
    SELECT 
      c.id AS id,
      c.name AS name,
      c.description AS description,
        IFNULL(
          (
            SELECT JSON_ARRAYAGG(
              JSON_OBJECT(
                'id', sc.id,
                'name', sc.name,
                'description', sc.description
              )
            )
            FROM sec_categories sc
            WHERE sc.parentId = c.id
          ), 
          JSON_ARRAY()
        ) AS subCategories
    FROM categories c
  `;

	try {
		// 获取分类总数
		const total = await CategoryModel.count();

		// 获取所有分类
		if (!pageSize || !currentPage) {
			const [findResult] = await sequelize.query(sql);
			const list = (findResult as any[]).map((category) => {
				return {
					...category,
				};
			});
			sendResult(res, 200, '获取成功', { list, total });
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
			},
		});

		const list = (findResult as any[]).map((category) => {
			return {
				...category,
			};
		});

		sendResult(res, 200, '获取成功', { list, total });
	} catch (error) {
		next(error);
	}
}
