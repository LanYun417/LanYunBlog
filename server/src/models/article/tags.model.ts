import sequelize from '..';
import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize';

export interface Tag {
	id?: number;
	name: string;
	description: string;
	createdAt?: string;
	updatedAt?: string;
}

export type TagList = Tag[];

class TagModel extends Model<
	InferAttributes<TagModel>,
	InferCreationAttributes<TagModel>
> {
	declare id: CreationOptional<number>;
	declare name: string;
	declare description: string;
	declare createdAt?: string;
	declare updatedAt?: string;
}

TagModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			unique: 'TagId',
			allowNull: false,
			comment: '标签ID',
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: 'TagName',
			comment: '标签名称',
		},
		description: {
			type: DataTypes.STRING(200),
			allowNull: false,
			comment: '标签描述',
		},
	},
	{
		sequelize,
		tableName: 'tags',
		createdAt: true,
		updatedAt: true,
		comment: '标签表',
	}
);

export default TagModel;
