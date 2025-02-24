import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize';
import sequelize from '..';

export interface AdminPermission {
	id?: number;
	name: string;
	description: string;
	createdAt?: string;
	updatedAt?: string;
}

export type AdminPermissionList = AdminPermission[];

class AdminPermissionModel extends Model<
	InferAttributes<AdminPermissionModel>,
	InferCreationAttributes<AdminPermissionModel>
> {
	declare id: CreationOptional<number>;
	declare name: string;
	declare description: string;
}

AdminPermissionModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			unique: 'PermissionId',
			comment: '主键ID',
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: 'PermissionName',
			comment: '权限名称',
		},
		description: {
			type: DataTypes.STRING(200),
			allowNull: false,
			comment: '权限描述',
		},
	},
	{
		sequelize,
		tableName: 'admin_permission',
		createdAt: true,
		updatedAt: true,
		comment: '管理员权限表',
	}
);

export default AdminPermissionModel;
