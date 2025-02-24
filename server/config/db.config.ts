import { Dialect } from 'sequelize';

export interface DatabaseConfig {
	host: string;
	user: string;
	database: string;
	password: string;
	dialect: Dialect;
	pool: {
		max: number;
		min: number;
		acquire: number;
		idle: number;
	};
	timezone: string;
}

export const dbConfig: DatabaseConfig = {
	host: 'localhost', // 数据库地址
	user: 'root', // 数据库用户名
	database: 'lyblog', // 数据库名称
	password: 'Abc123987', // 数据库密码
	dialect: 'mysql', // 数据库类型
	pool: {
		// 连接池配置
		max: 10, // 最大连接数
		min: 1, // 最小连接数
		acquire: 30000, // 最大连接时间
		idle: 10000, // 空闲连接回收时间
	},
	timezone: '+08:00', //东八时区
};
