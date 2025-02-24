import { Op } from 'sequelize';
import AdminPermissionModel, {
	AdminPermission,
} from '@/models/user/admin_permission.model';
import { sendResult } from '@/utils/u.sendResult';
import { adminPermissionSchema } from '@/validation';
import { NextFunction, Request, Response } from 'express';

export async function createHandle(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const permission: AdminPermission | undefined = req.body.permission;

	if (!permission || permission === void 0) {
		sendResult(res, 400, '缺少参数 `permission`');
		return;
	}

	const validate: string | undefined = adminPermissionSchema.validate({ ...permission })
		.error?.message;

	if (validate && validate !== void 0) {
		sendResult(res, 400, validate);
		return;
	}

	try {
		// 创建站点配置信息
		const result: [AdminPermissionModel, boolean] =
			await AdminPermissionModel.findOrCreate({
				where: {
					name: { [Op.eq]: permission.name },
				},
				defaults: { ...permission },
			});

		if (result[1]) {
			sendResult(res, 201, '创建成功');
			return;
		}

		sendResult(res, 409, '创建失败，请检查权限是否已存在');
	} catch (error) {
		next(error);
	}
}
