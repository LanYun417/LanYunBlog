import express, { Router } from 'express';

const router: Router = express.Router();

/**
 * @api {get} /client/author/config 获取作者信息配置
 * @apiName 获取作者信息配置
 * @apiGroup 作者信息
 * @apiDescription 获取作者信息配置
 *
 * @apiPermission admin & client
 *
 * @apiSampleRequest /client/author/config
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {AuthorInfo[]} list 作者信息
 * @apiSuccess {Number} list.id 作者 ID
 * @apiSuccess {String} list.name 作者名称
 * @apiSuccess {String} list.avatar 作者头像 URL
 * @apiSuccess {String} list.ps 作者签名
 * @apiSuccess {String} list.biography 关于信息
 * @apiSuccess {String} list.email 作者邮箱
 * @apiSuccess {String} list.github GitHub 地址
 * @apiSuccess {String} list.weibo 微博主页地址
 * @apiSuccess {String} list.wechat 微信
 * @apiSuccess {Number} list.qq QQ
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "code": 200,
 *   "message": "获取成功",
 *   "list": [
 *     {
 *       "id": 1,
 *       "name": "LanYun",
 *       "avatar": "https://cdn.jsdelivr.net/gh/LanYunQAQ/blog-image@main/avatar.jpg",
 *       "ps": "一名 Web 开发者",
 *       "biography": "一名 Web 开发者，热爱编程，喜欢分享，希望通过技术改变世界。",
 *       "email": "lanyunq<EMAIL>",
 *       "github": "https://github.com/LanYunQAQ",
 *       "weibo": "https://weibo.com/u/7317751142",
 *       "wechat": "LanYunQAQ",
 *       "qq": 123456789
 *     }
 *   ]
 * }
 */
import { getConfigHandle } from './handler/get.config.handle';
router.get('/config', getConfigHandle);

export default router;
