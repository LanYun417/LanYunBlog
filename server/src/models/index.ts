import { Sequelize } from 'sequelize';
import { dbLog } from '@/utils/u.logger';
import { dbConfig } from 'config/db.config';

// 数据库连接配置
const { host, user, password, database, dialect, pool, timezone } = dbConfig;

// 创建 Sequelize 实例
const sequelize: Sequelize = new Sequelize(database, user, password, {
	host,
	pool,
	dialect,
	timezone,
	logging: (log: string): void => dbLog(log),
});

export default sequelize;
