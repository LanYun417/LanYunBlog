import { CreationOptional, DataTypes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '..';

export interface Photo {
	id?: number;
	url: string;
	path: string;
	description: string;
	createdAt?: string;
	updatedAt?: string;
}

export type PhotoList = Photo[];

class PhotoModel extends Model<
	InferCreationAttributes<PhotoModel>,
	InferCreationAttributes<PhotoModel>
> {
	declare id: CreationOptional<number>;
	declare url: string;
	declare description: string;
	declare path: string;
}

PhotoModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			unique: 'PhotoId',
		},
		url: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '照片URL',
			unique: 'PhotoUrl',
		},
		path: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '照片路径',
			unique: 'PhotoPath',
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '照片描述',
		},
	},
	{
		sequelize,
		tableName: 'photos',
		createdAt: true,
		updatedAt: true,
		comment: '相册',
	}
);

export default PhotoModel;
