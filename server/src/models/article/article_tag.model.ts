import sequelize from '..';
import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize';

export interface ArticleTag {
	id?: number;
	articleId: number;
	tagId: number;
	createdAt?: string;
	updatedAt?: string;
}

export type ArticleTagList = ArticleTag[];

class ArticleTagModel extends Model<
	InferAttributes<ArticleTagModel>,
	InferCreationAttributes<ArticleTagModel>
> {
	declare id: CreationOptional<number>;
	declare articleId: number;
	declare tagId: number;
}

ArticleTagModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			unique: 'ArticleTagID',
			autoIncrement: true,
			allowNull: false,
			comment: 'ID',
		},
		articleId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '文章ID',
		},
		tagId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '标签ID',
		},
	},
	{
		sequelize,
		tableName: 'article_tag',
		createdAt: true,
		updatedAt: true,
		comment: '文章标签关联表',
	}
);

export default ArticleTagModel;
