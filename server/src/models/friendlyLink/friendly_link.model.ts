import sequelize from '..';
import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize';

/**
 * pending - 待审核
 * approved - 已通过
 * rejected - 已拒绝
 */

export interface FriendlyLink {
	id: number;
	name: string;
	url: string;
	icon: string;
	status: 'pending' | 'approved' | 'rejected';
	description: string;
	email: string;
	remark: string;
	createdAt?: string;
	updatedAt?: string;
}

export type FriendlyLinkList = FriendlyLink[];

class FriendlyLinkModel extends Model<
	InferAttributes<FriendlyLinkModel>,
	InferCreationAttributes<FriendlyLinkModel>
> {
	declare id: CreationOptional<number>;
	declare name: string;
	declare status: 'pending' | 'approved' | 'rejected';
	declare url: string;
	declare icon: string;
	declare email: string;
	declare description: string;
	declare remark: string;
}

FriendlyLinkModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			unique: 'FriendlyLinkId',
			comment: '友链ID',
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '友链名称',
		},
		url: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '友链地址',
			unique: 'FriendlyLinkUrl',
		},
		icon: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '友链图标URL',
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '友链描述',
		},
		status: {
			type: DataTypes.ENUM('pending', 'approved', 'rejected'),
			allowNull: false,
			comment: '友链审核状态',
			defaultValue: 'pending',
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '友链站长联系邮箱',
		},
		remark: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '',
			comment: '备注',
		},
	},
	{
		sequelize,
		tableName: 'friendly_link',
		createdAt: true,
		updatedAt: true,
		comment: '友情链接表',
	}
);

export default FriendlyLinkModel;
