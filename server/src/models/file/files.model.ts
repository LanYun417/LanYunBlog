import sequelize from '../index';
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface FileInfo {
	id?: number;
	name: string;
	mimetype: string;
	url: string;
	path: string;
	md5: string;
	size: number;
	createdAt?: string;
	updatedAt?: string;
}

export type FileList = FileInfo[];

export class FileModel extends Model<
	InferAttributes<FileModel>,
	InferCreationAttributes<FileModel>
> {
	declare id?: number;
	declare name: string;
	declare path: string;
	declare url: string;
	declare md5: string;
	declare mimetype: string;
	declare size: number;
}

FileModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			unique: 'ID',
			comment: 'ID',
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '文件名',
			unique: 'FileName',
		},
		path: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '文件路径',
			unique: 'FilePath',
		},
		url: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '文件链接',
		},
		md5: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: 'FileMD5',
			comment: '文件MD5',
		},
		mimetype: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '文件类型',
		},
		size: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '文件大小（字节）',
		},
	},
	{
		sequelize,
		tableName: 'files',
		createdAt: true,
		updatedAt: true,
		comment: '文件信息表',
	}
);

export default FileModel;
