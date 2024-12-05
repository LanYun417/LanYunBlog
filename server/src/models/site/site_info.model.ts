import sequelize from '..';
import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize';

export interface SiteInfo {
	id?: number;
	title: string;
	keywords: string;
	description: string;
	globalStyle: string;
	globalScript: string;
	domain: string;
	logo: string;
	isUse: 'yes' | 'no';
	createdAt?: string;
	updatedAt?: string;
}

export type SiteInfoList = SiteInfo[];

class SiteInfoModel extends Model<
	InferAttributes<SiteInfoModel>,
	InferCreationAttributes<SiteInfoModel>
> {
	declare id?: CreationOptional<number>;
	declare title: string;
	declare keywords: string;
	declare description: string;
	declare globalStyle: string;
	declare globalScript: string;
	declare domain: string;
	declare logo: string;
	declare isUse: 'yes' | 'no';
}

SiteInfoModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			unique: 'InfoId',
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			comment: '站点信息ID',
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: false,
			comment: '站点标题',
		},
		keywords: {
			type: DataTypes.STRING(255),
			allowNull: false,
			comment: '站点关键词',
		},
		description: {
			type: DataTypes.STRING(255),
			allowNull: false,
			comment: '站点描述',
		},
		globalStyle: {
			type: DataTypes.TEXT,
			allowNull: false,
			comment: '全局样式',
		},
		globalScript: {
			type: DataTypes.TEXT,
			allowNull: false,
			comment: '全局脚本',
		},
		domain: {
			type: DataTypes.STRING(255),
			allowNull: false,
			comment: '站点域名',
		},
		logo: {
			type: DataTypes.STRING(255),
			allowNull: false,
			comment: '站点 Logo URL',
		},
		isUse: {
			type: DataTypes.ENUM('yes', 'no'),
			allowNull: false,
			comment: '是否使用当前配置信息',
		},
	},
	{
		sequelize,
		tableName: 'site_info',
		createdAt: true,
		updatedAt: true,
		comment: '站点信息表',
	}
);

export default SiteInfoModel;
