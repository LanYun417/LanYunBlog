import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize';
import sequelize from '..';

export interface AccessInfo {
	id?: number;
	method: string;
	url: string;
	ip: string;
	country: string;
	province: string;
	city: string;
	isp: string;
	createdAt?: string;
	updatedAt?: string;
}
export type AccessList = AccessInfo[];

class AccessModel extends Model<
	InferAttributes<AccessModel>,
	InferCreationAttributes<AccessModel>
> {
	declare id?: CreationOptional<number>;
	declare method: string;
	declare url: string;
	declare ip: string;
	declare country: string;
	declare province: string;
	declare city: string;
	declare isp: string;
	declare createdAt?: string;
	declare updatedAt?: string;
}

AccessModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			comment: 'ID',
			unique: true,
			allowNull: false,
		},
		method: {
			type: DataTypes.STRING(10),
			comment: '请求方法',
			allowNull: false,
		},
		url: {
			type: DataTypes.STRING(255),
			comment: '请求路径',
			allowNull: false,
		},
		ip: {
			type: DataTypes.STRING(20),
			comment: 'IP地址',
			allowNull: false,
		},
		province: {
			type: DataTypes.STRING(20),
			comment: '省份',
			allowNull: false,
		},
		city: {
			type: DataTypes.STRING(20),
			comment: '城市',
			allowNull: false,
		},
		isp: {
			type: DataTypes.STRING(20),
			comment: '运营商',
			allowNull: false,
		},
		country: {
			type: DataTypes.STRING(20),
			allowNull: false,
			comment: '国家',
		},
	},
	{
		sequelize,
		tableName: 'access',
		createdAt: true,
		updatedAt: true,
		comment: '访问日志表',
	}
);

export default AccessModel;
