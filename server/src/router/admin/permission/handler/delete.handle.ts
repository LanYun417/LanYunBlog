import { Op } from 'sequelize';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import AdminPermissionModel from '@/models/user/admin_permission.model';

export async function deleteHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const ids = req.query.ids as string | undefined;

	// 参数校验
	if (!ids || ids.trim() === '' || typeof ids !== 'string') {
		sendResult(res, 400, '缺少参数 `ids`');
		return;
	}

	// 格式化 ids
	const idsArr: number[] = [];
	if (ids.includes(',')) {
		// 去重
		const idsSet = [...new Set(ids.split(','))];
		idsArr.push(...idsSet.map((id) => Number(id.trim())));
	} else {
		idsArr.push(Number(ids.trim()));
	}

	try {
		// 禁止删除 admin 权限
		const isAdmin: AdminPermissionModel[] = await AdminPermissionModel.findAll({
			where: { id: { [Op.in]: idsArr }, name: 'admin' },
		});

		if (isAdmin.length > 0) {
			sendResult(res, 400, '禁止删除 admin 权限');
			return;
		}

		// 删除数据
		const delResult: number = await AdminPermissionModel.destroy({
			where: { id: { [Op.in]: idsArr } },
		});

		if (delResult > 0) {
			sendResult(res, 200, '删除成功');
			return;
		}
		sendResult(res, 400, '删除失败，请检查权限是否存在');
	} catch (error) {
		next(error);
	}
}
