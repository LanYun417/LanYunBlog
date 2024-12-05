import sequelize from '..';
import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize';

export interface ArticleView {
	id?: number;
	articleId: number;
	ip: string;
	country: string;
	province: string;
	city: string;
	isp: string;
	createdAt?: string;
	updatedAt?: string;
}
export type ArticleViewList = ArticleView[];

class ArticleViewModel extends Model<
	InferAttributes<ArticleViewModel>,
	InferCreationAttributes<ArticleViewModel>
> {
	declare id: CreationOptional<number>;
	declare articleId: number;
	declare ip: string;
	declare province: string;
	declare city: string;
	declare isp: string;
	declare createdAt?: string;
	declare updatedAt?: string;
}

ArticleViewModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			unique: true,
			allowNull: false,
			comment: 'ID',
		},
		articleId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '文章ID',
		},
		ip: {
			type: DataTypes.STRING(50),
			allowNull: false,
			comment: 'IP地址',
		},
		province: {
			type: DataTypes.STRING(50),
			allowNull: false,
			comment: '省份',
		},
		city: {
			type: DataTypes.STRING(50),
			allowNull: false,
			comment: '城市',
		},
		isp: {
			type: DataTypes.STRING(50),
			allowNull: false,
			comment: '运营商',
		},
	},
	{
		sequelize,
		tableName: 'article_views',
		createdAt: true,
		updatedAt: true,
		comment: '文章浏览记录',
	}
);

export default ArticleViewModel;
