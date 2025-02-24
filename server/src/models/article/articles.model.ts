import sequelize from '..';
import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize';

export interface Article {
	id?: number;
	title: string;
	cover: string;
	content: string;
	categoryId: number;
	secCategoryId: number;
	tagsId: number[];
	createdAt?: string;
	updatedAt?: string;
}
export type ArticleList = Article[];

// 文章模型
class ArticleModel extends Model<
	InferAttributes<ArticleModel>,
	InferCreationAttributes<ArticleModel>
> {
	declare id: CreationOptional<number>;
	declare title: string;
	declare cover: string;
	declare content: string;
	declare categoryId: number;
	declare secCategoryId: number;
	declare createdAt?: string;
	declare updatedAt?: string;
}

ArticleModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			unique: 'ArticleId',
			allowNull: false,
			comment: '文章ID',
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: false,
			comment: '文章标题',
			unique: 'ArticleTitle',
		},
		cover: {
			type: DataTypes.STRING(255),
			allowNull: false,
			comment: '文章封面',
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
			comment: '文章内容',
		},
		categoryId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '一级分类ID',
		},
		secCategoryId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '二级分类ID',
		},
	},
	{
		sequelize,
		tableName: 'articles',
		createdAt: true,
		updatedAt: true,
		comment: '文章表',
	}
);

export default ArticleModel;
