import express, { Router } from 'express';

const router: Router = express.Router();

/**
 * @api {get} /client/site/config 获取站点配置信息
 * @apiName 获取站点配置信息
 * @apiGroup 站点管理
 * @apiDescription 获取站点配置信息
 *
 * @apiPermission admin & client
 *
 * @apiSampleRequest /client/site/config
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {SiteInfo[]} list 配置信息列表
 * @apiSuccess {Number} list.id 配置 ID
 * @apiSuccess {String} list.title 站点标题
 * @apiSuccess {String} list.keywords 站点关键词
 * @apiSuccess {String} list.description 站点描述
 * @apiSuccess {String} list.globalStyle 全局样式
 * @apiSuccess {String} list.globalScript 全局脚本（JS）
 * @apiSuccess {String} list.domain 站点域名
 * @apiSuccess {String} list.logo 站点 Logo URL
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "code": 200,
 *   "message": "获取成功",
 *   "list": [
 *     {
 *       "id": 1,
 *       "title": "LYBlog",
 *       "keywords": "LYBlog,博客,个人博客",
 *       "description": "LYBlog 是一个基于 Node.js 的个人博客系统",
 *       "globalStyle": "",
 *       "globalScript": "",
 *       "domain": "http://localhost:3000",
 *       "logo": "https://cdn.jsdelivr.net/gh/LanYunQian/cdn@latest/img/logo.png"
 *     }
 *   ]
 * }
 */
import { getConfigHandle } from './handler/get.config.handle';
router.get('/config', getConfigHandle);

export default router;
