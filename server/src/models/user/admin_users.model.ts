import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize';
import sequelize from '..';

export interface AdminUser {
	id?: number;
	avatar: string;
	nickname: string;
	username: string;
	password: string;
	permissionId: number;
	createdAt?: string;
	updatedAt?: string;
}

export type AdminUserList = AdminUser[];

class AdminUserModel extends Model<
	InferAttributes<AdminUserModel>,
	InferCreationAttributes<AdminUserModel>
> {
	declare id: CreationOptional<number>;
	declare avatar: string;
	declare nickname: string;
	declare username: string;
	declare password: string;
	declare permissionId: number;
}

AdminUserModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
			unique: 'UserId',
			comment: '用户ID',
		},
		avatar: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
			comment: '头像URL',
		},
		nickname: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '昵称',
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: 'UserName',
			comment: '用户名',
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '密码',
		},
		permissionId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '权限ID',
		},
	},
	{
		sequelize,
		tableName: 'admin_users',
		createdAt: true,
		updatedAt: true,
		comment: '管理员用户表',
	}
);

export default AdminUserModel;
