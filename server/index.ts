import dotenv from 'dotenv';
import { exp } from '@/express';
import sequelize from '@/models';
import { error } from '@/utils/u.logger';

dotenv.config();

const port: number = Number(process.env.SERVER_PORT) || 3000;

async function bootstrap(): Promise<void> {
	try {
		// 测试连接数据库
		await sequelize.authenticate();
		// 同步数据模型
		await sequelize.sync({ alter: true });
		console.log('😃 数据库连接成功');
		// 启动接口服务
		exp.listen(port || 3000, (): void => {
			console.log(`🚀 接口服务启动成功，运行在：http://localhost:${port}`);
			console.log(`🎈 接口文档地址：http://localhost:${port}/apidoc`);
		});
	} catch (err: any) {
		console.error('😅 数据库连接失败：', err.message);
		error(err);
	}
}

bootstrap();
