import sequelize from '@/models';
import { TokenInfo } from '@/types';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';

export function getUserProfile(req: Request, res: Response, next: NextFunction): void {
	const verifyInfo: TokenInfo = req['verifyInfo'];

	const sql: string = `
    SELECT 
      au.id,
      au.nickname,
      au.avatar,
      au.username,
      au.permissionId,
      ap.name AS permissionName
    FROM 
      admin_users au
    JOIN 
      admin_permission ap ON au.permissionId = ap.id
    WHERE 
      au.id = :userId
  `;

	sequelize
		.query(sql, {
			replacements: {
				userId: verifyInfo.id,
			},
		})
		.then(([result]) => {
			sendResult(res, 200, '获取成功', {
				user: result[0],
			});
		})
		.catch((err: Error) => {
			next(err);
		});
}
