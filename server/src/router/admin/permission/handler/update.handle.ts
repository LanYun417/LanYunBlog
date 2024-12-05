import AdminPermissionModel, {
	AdminPermission,
} from '@/models/user/admin_permission.model';
import { sendResult } from '@/utils/u.sendResult';
import { NextFunction, Request, Response } from 'express';
import { adminPermissionUpdateSchema } from '@/validation';

export async function updateHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const permission: AdminPermission | undefined = req.body.permission;

	if (!permission || permission === void 0) {
		sendResult(res, 400, '缺少参数 `permission`');
		return;
	}

	console.log('permission: ', permission);

	const validate: string | undefined = adminPermissionUpdateSchema.validate({
		...permission,
	}).error?.message;

	if (validate || validate !== void 0) {
		sendResult(res, 400, validate);
		return;
	}

	try {
		// 检查权限是否为 admin
		const isAdmin: AdminPermissionModel | null = await AdminPermissionModel.findOne({
			where: { id: permission.id },
		});

		if (isAdmin && isAdmin.dataValues.name === 'admin') {
			sendResult(res, 400, '禁止修改 admin 权限');
			return;
		}

		// 更新权限信息
		const updateResult: [affectedCount: number] = await AdminPermissionModel.update(
			{ ...permission },
			{ where: { id: permission.id } }
		);

		if (updateResult[0] > 0) {
			sendResult(res, 200, '更新成功');
			return;
		}

		sendResult(res, 400, '更新失败');
	} catch (error) {
		next(error);
	}
}
