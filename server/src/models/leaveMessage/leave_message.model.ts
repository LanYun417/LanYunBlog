import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize';
import sequelize from '..';

export interface LeaveMessage {
	id?: number;
	email: string;
	message: string;
	ip: string;
	country: string;
	province: string;
	city: string;
	isp: string;
	createdAt?: string;
	updatedAt?: string;
}

export type LeaveMessageList = LeaveMessage[];

class LeaveMessageModel extends Model<
	InferAttributes<LeaveMessageModel>,
	InferCreationAttributes<LeaveMessageModel>
> {
	declare id: CreationOptional<number>;
	declare email: string;
	declare message: string;
	declare ip: string;
	declare country: string;
	declare province: string;
	declare city: string;
	declare isp: string;
}

LeaveMessageModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			unique: 'LeaveMessageId',
			comment: '留言ID',
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			comment: '留言者邮箱',
		},
		message: {
			type: DataTypes.TEXT,
			allowNull: false,
			comment: '留言内容',
		},
		ip: {
			type: DataTypes.STRING(255),
			allowNull: false,
			comment: '留言者IP',
		},
		country: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: '未知',
			comment: '留言者所在国家',
		},
		province: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: '未知',
			comment: '留言者所在省份',
		},
		city: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: '未知',
			comment: '留言者所在城市',
		},
		isp: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: '未知',
			comment: '留言者所使用网络运营商',
		},
	},
	{
		sequelize,
		tableName: 'leave_message',
		createdAt: true,
		updatedAt: true,
		comment: '留言表',
	}
);

export default LeaveMessageModel;
