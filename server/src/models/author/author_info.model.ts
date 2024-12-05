import sequelize from '..';
import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize';

export interface AuthorInfo {
	id?: number;
	avatar: string;
	name: string;
	ps: string;
	biography: string;
	qq: string;
	wechat: string;
	email: string;
	github: string;
	weibo: string;
	isUse: 'yes' | 'no';
	createdAt?: string;
	updatedAt?: string;
}

export type AuthorInfoList = AuthorInfo[];

class AuthorInfoModel extends Model<
	InferAttributes<AuthorInfoModel>,
	InferCreationAttributes<AuthorInfoModel>
> {
	declare id: CreationOptional<number>;
	declare avatar: string;
	declare name: string;
	declare ps: string;
	declare biography: string;
	declare qq: CreationOptional<string>;
	declare wechat: CreationOptional<string>;
	declare email: CreationOptional<string>;
	declare github: CreationOptional<string>;
	declare weibo: CreationOptional<string>;
	declare isUse: 'yes' | 'no';
}

AuthorInfoModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			unique: 'AuthorId',
			allowNull: false,
			comment: '作者信息ID',
		},
		avatar: {
			type: DataTypes.STRING(255),
			allowNull: false,
			comment: '头像URL',
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: 'AuthorName',
			comment: '作者名称',
		},
		ps: {
			type: DataTypes.STRING(255),
			allowNull: false,
			comment: '个性签名',
		},
		biography: {
			type: DataTypes.TEXT,
			allowNull: false,
			comment: '作者简介',
		},
		qq: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: '168847242',
			comment: 'QQ号',
		},
		wechat: {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: '微信号',
			defaultValue: '#',
		},
		email: {
			type: DataTypes.STRING(255),
			comment: '邮箱',
			allowNull: true,
			defaultValue: '168847242@qq.com',
		},
		github: {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: 'GitHub',
			defaultValue: 'https://gitee.com/lanyun417',
		},
		weibo: {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: '微博',
			defaultValue: 'https://weibo.com/',
		},
		isUse: {
			type: DataTypes.ENUM('yes', 'no'),
			allowNull: false,
			comment: '是否启用',
		},
	},
	{
		sequelize,
		tableName: 'author_info',
		createdAt: true,
		updatedAt: true,
		comment: '作者信息表',
	}
);

export default AuthorInfoModel;
