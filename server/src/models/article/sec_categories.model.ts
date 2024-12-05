import sequelize from '..';
import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize';

export interface SecCategory {
	id?: number;
	name: string;
	parentId: number;
	description: string;
	createdAt?: string;
	updatedAt?: string;
}

class SecCategoryModel extends Model<
	InferAttributes<SecCategoryModel>,
	InferCreationAttributes<SecCategoryModel>
> {
	declare id: CreationOptional<number>;
	declare name: string;
	declare parentId: number;
	declare description: string;
}

SecCategoryModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			unique: 'SecCategoryId',
			comment: '分类ID',
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: 'SecCategoryName',
			comment: '分类名称',
		},
		parentId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '父级分类ID',
		},
		description: {
			type: DataTypes.STRING(200),
			allowNull: false,
			comment: '分类描述',
		},
	},
	{
		sequelize,
		tableName: 'sec_categories',
		createdAt: true,
		updatedAt: true,
		comment: '文章二级分类表',
	}
);

export default SecCategoryModel;
