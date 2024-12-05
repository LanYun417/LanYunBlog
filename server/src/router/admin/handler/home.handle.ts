import { Op, Sequelize } from 'sequelize';
import { sendResult } from '@/utils/u.sendResult';
import TagModel from '@/models/article/tags.model';
import AccessModel from '@/models/access/access.model';
import SiteInfoModel from '@/models/site/site_info.model';
import { NextFunction, Request, Response } from 'express';
import ArticleModel from '@/models/article/articles.model';
import ArticleViewModel from '@/models/article/artice_view.model';
import sequelize from '@/models';

export async function homeHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		// 文章总数
		const articleCount: number = await ArticleModel.count();
		// 今日新增文章数量
		const todayArticleCount: number = await ArticleModel.count({
			where: {
				createdAt: {
					[Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
				},
			},
		});

		// 标签总数
		const tagCount: number = await TagModel.count();
		// 今日新增标签数量
		const todayTagCount: number = await TagModel.count({
			where: {
				createdAt: {
					[Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
				},
			},
		});

		// 文章浏览量
		const [articleViewCount] = await sequelize.query(`
			SELECT SUM(total_views) AS total_views_all_articles
			FROM (
				SELECT articleId, COUNT(DISTINCT ip) AS total_views
				FROM article_views
				GROUP BY articleId
			) AS article_view_counts;
		`);
		// 今日新增文章浏览量
		const [todayArticleViewCount] = await sequelize.query(`
			SELECT articleId, COUNT(DISTINCT ip) AS total_views_today
			FROM article_views
			WHERE DATE(createdAt) = CURDATE()  -- 过滤出今天的记录
			GROUP BY articleId;
		`);

		// 站点访问量
		const siteViewCount: number = await AccessModel.count({
			distinct: true,
			col: 'ip',
			where: {
				url: {
					[Op.like]: '/client/%',
				},
			},
		});
		// 今日新增站点访问量
		const todaySiteViewCount: number = await AccessModel.count({
			distinct: true,
			col: 'ip',
			where: {
				[Op.and]: {
					url: {
						[Op.like]: '/client/%',
					},
					createdAt: {
						[Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
					},
				},
			},
		});

		// 站点链接
		const siteInfo = await SiteInfoModel.findOne({
			where: { isUse: 'yes' },
		});

		sendResult(res, 200, '获取成功', {
			tagCount,
			articleCount,
			todayTagCount,
			siteViewCount,
			todayArticleCount,
			todaySiteViewCount,
			siteUrl: siteInfo?.dataValues.domain,
			articleViewCount: (articleViewCount[0] as any)?.total_views_all_articles || 0,
			todayArticleViewCount: (todayArticleViewCount[0] as any)?.total_views_today || 0,
		});
	} catch (error) {
		next(error);
	}
}
