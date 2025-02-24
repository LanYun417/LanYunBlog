import express, { Router } from 'express';

const router: Router = express.Router();

/**
 * @api {post} /client/leaveMessage/create 发布留言
 * @apiName 发布留言
 * @apiGroup 留言模块
 * @apiDescription 发布留言，需要验证码验证
 *
 * @apiPermission admin & client
 *
 * @apiSampleRequest /client/leaveMessage/create
 *
 * @apiBody {String} captchaToken 验证码 Token
 * @apiBody {Object} message 友情链接对象
 * @apiBody {String} message.email 留言者邮箱
 * @apiBody {String} message.message 留言内容
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "code": 201,
 *       "message": "发布成功"
 *     }
 */
import { createHandle } from './handler/create.handle';
router.post('/create', createHandle);

export default router;
