import sequelize from '..';
import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize';

export interface Category {
	id?: number;
	name: string;
	description: string;
	createdAt?: string;
	updatedAt?: string;
}

export type CategoryList = Category[];

class CategoryModel extends Model<
	InferAttributes<CategoryModel>,
	InferCreationAttributes<CategoryModel>
> {
	declare id: CreationOptional<number>;
	declare name: string;
	declare description: string;
}

CategoryModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
			unique: 'CategoryId',
			comment: '分类ID',
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: 'CategoryName',
			comment: '分类名称',
		},
		description: {
			type: DataTypes.STRING(200),
			allowNull: false,
			comment: '分类描述',
		},
	},
	{
		sequelize,
		tableName: 'categories',
		comment: '文章一级分类表',
		createdAt: true,
		updatedAt: true,
	}
);

export default CategoryModel;
