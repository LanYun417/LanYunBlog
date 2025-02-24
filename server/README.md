# 💎 NodeJS 接口服务项目模板

## 📢 项目介绍

本项目是一个基于 Node.js 的接口服务项目模板，主要用于快速搭建一个基于 RESTful API 的服务。项目已内置部分中间件，如日志记录、文件上传、路由、数据库连接等，可以直接使用。

## ✨ 更新日志

- 2024-08-21：更新项目结构，新增接口文档生成工具 apidoc。

## 🎯 项目结构

```
├── apidoc
├── config
│   ├── db.config.ts
│   ├── log4js.config.ts
│   └── swagger.config.ts
├── logs
│   ├── db.log
│   ├── error.log
│   └── info.log
├── public
│   └── index.html
├── sql
├── src
│   ├── express
│   ├── middleware
│   ├── models
│   ├── router
│   └── utils
├── upload
├── .env
├── apidoc.json
```

```
1. apidoc 接口文档

2. `config`：配置文件目录，用于配置项目参数。
  2.1 db.config.ts 数据库配置
  2.2 log4js.config.ts 日志中间件（log4js）配置
	2.3 swagger.config.ts Swagger 接口文档配置

3. `logs`：日志目录，用于记录日志。
  3.1 db.log 数据库日志
  3.2 error.log 错误日志
  3.3 info.log 信息日志

4. `public`：静态资源目录，用于存放静态文件。
  4.1 index.html 首页

5. `sql`：数据库脚本目录，用于初始化数据库。

6. `src`：源码目录，用于存放项目代码。
  6.1 express Express 框架实例以及相关配置
  6.2 middlewares 中间件目录，用于处理请求前后相关操作
  6.3 models 模型目录，用于定义数据模型
  6.4 router 路由目录，用于定义接口路由
  6.5 utils 工具目录，用于定义工具函数

7. `upload`：上传文件目录，用于存放上传的文件。

8. `.env`：环境变量文件，用于配置环境变量。

9. `index.ts`：入口文件，用于启动服务。

10. `apidoc.json`：接口文档配置文件。
```

## ♾️ 项目依赖

```json
{
	"dependencies": {
		"cookie-parser": "^1.4.6",
		"cors": "^2.8.5",
		"dotenv": "^16.4.5",
		"express": "^4.19.2",
		"jsonwebtoken": "^9.0.2",
		"log4js": "^6.9.1",
		"morgan": "^1.10.0",
		"multer": "^1.4.5-lts.1",
		"mysql2": "^3.10.2",
		"sequelize": "^6.37.3"
	},
	"devDependencies": {
		"@types/cookie-parser": "^1.4.7",
		"@types/cors": "^2.8.17",
		"@types/express": "^4.17.21",
		"@types/jsonwebtoken": "^9.0.6",
		"@types/morgan": "^1.9.9",
		"@types/multer": "^1.4.11",
		"apidoc": "^1.2.0",
		"nodemon": "^3.1.4",
		"ts-node": "^10.9.2",
		"tsconfig-paths": "^4.2.0",
		"typescript": "^5.5.3"
	}
}
```

## \*️⃣ 项目使用

### 安装依赖

```
npm install
```

### 启动服务

```
直接启动
npm start

项目热启动
npm run dev
```

### 访问接口

```
http://localhost:3000/
或
http://localhost:3000/api/user/getUser
浏览器能够成功访问说明服务已启动成功。
```

### 接口文档

```
http://localhost:3000/apiDoc/

apiDoc 使用文档
https://apidocjs.com/
```

## 🐼 项目配置

### 端口号

```
.env

# 接口运行端口
SERVER_PORT=3000

# 接口域名 || 地址
SERVER_HOST=http://localhost:3000

# Token 密钥
TOKEN_SECRET=secret
```
