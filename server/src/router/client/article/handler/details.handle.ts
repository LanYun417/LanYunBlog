import sequelize from '@/models';
import { QueryTypes } from 'sequelize';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import ArticleViewModel from '@/models/article/artice_view.model';
import { getIpInfo } from '@/utils/u.ip2region';
import { IP2RegionResult } from 'ip2region';

export async function detailsHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const id: string = req.params.id;

	const articleId: number = Number(id);

	if (isNaN(articleId)) {
		sendResult(res, 400, '参数 `id` 无效');
		return;
	}

	const sql: string = `
    SELECT 
      a.id AS id,
      a.title AS title,
      a.cover AS cover,
      a.content AS content,
      a.categoryId AS categoryId,
      c1.name AS categoryName,
      a.secCategoryId AS secCategoryId,
      c2.name AS secCategoryName,
      a.createdAt AS createdAt,
      a.updatedAt AS updatedAt,
        (
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', t.id,
              'name', t.name,
              'description', t.description
            )
          )
          FROM tags t
          JOIN article_tag at ON t.id = at.tagId
          WHERE at.articleId = a.id
        ) AS tags
    FROM 
      articles a
    LEFT JOIN 
      categories c1 ON a.categoryId = c1.id
    LEFT JOIN 
      sec_categories c2 ON a.secCategoryId = c2.id
    WHERE 
      a.id = :id;
  `;

	try {
		const result: object[] = await sequelize.query(sql, {
			replacements: { id: articleId },
			type: QueryTypes.SELECT,
		});

		if (result.length < 1) {
			sendResult(res, 404, '文章不存在');
			return;
		}

		// 创建文章浏览记录
		const ip: string = String(req.headers['x-real-ip'] || req.ip);
		const ipInfo: IP2RegionResult = getIpInfo(ip);
		await ArticleViewModel.create({
			articleId: articleId,
			ip,
			...ipInfo,
		});

		sendResult(res, 200, '获取成功', { article: result[0] });
	} catch (error) {
		next(error);
	}
}
