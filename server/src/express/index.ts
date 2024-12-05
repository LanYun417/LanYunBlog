import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { error } from '@/utils/u.logger';
import adminRouter from '@/router/admin/index';
import { AccessLog } from '@/middleware/access';
import clientRouter from '@/router/client/index';
import { morganMiddleware } from '@/middleware/morgan';
import express, { Request, Response, NextFunction } from 'express';

const app = express();

// Express 中间件
app.use(
	cors({
		origin: ['http://localhost:5173', 'http://localhost:3000'], // 指定前端域
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
		allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
		exposedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
		credentials: true, // 允许发送凭证
	})
);
app.use(
	session({
		secret: '8db15492b211935eb0b8f12686515b145ee62741fdd17716bdefe229896a1df7', // 对 cookie 进行签名
		name: 'session', // cookie名称，默认为 connect.sid
		resave: false, // 强制将会话保存回会话容器
		rolling: false, // 强制在每个 response 上设置会话标识符 cookie
		cookie: {
			// 3天验证码过期
			maxAge: 300000,
			secure: false, // cookie 只能通过 https 协议传输
		},
		saveUninitialized: true, // 强制将未初始化的会话保存到会话容器
	})
);
app.use(AccessLog);
app.use(cookieParser());
app.use(express.json());
app.use(morganMiddleware());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// 设置跨域和响应数据格式
app.all('/api/*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, token');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization');
	res.header('Content-Type', 'application/json; charset=UTF-8');
	res.header(
		'Access-Control-Allow-Headers',
		'Content-Type,Content-Length, Authorization, Accept, X-Requested-With'
	);
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');
	if (req.method == 'OPTIONS') res.send(200); // 让 options 请求快速返回
	else next();
});

// Router
app.use('/admin', adminRouter);
app.use('/client', clientRouter);
app.use('/apiDoc', express.static('apidoc'));
app.use('/static', express.static('upload'));

// Express 统一错误处理
app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
	res.status(500).json({ message: err.message });
	error(err);
});

export const exp = app;
