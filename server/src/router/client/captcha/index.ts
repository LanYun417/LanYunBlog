import express, { Router } from 'express';

const router: Router = express.Router();

/**
 * @api {get} /client/captcha/get 获取验证码
 * @apiName 获取验证码
 * @apiGroup 验证码
 * @apiDescription 获取验证码，返回 svg
 *
 * @apiPermission admin & client
 *
 * @apiSampleRequest /client/captcha/get
 */
import { getHandle } from './handler/get.handle';
router.get('/get', getHandle);

/**
 * @api {post} /client/captcha/verify 校验验证码
 * @apiName 校验验证码
 * @apiGroup 验证码
 * @apiDescription 校验验证码
 *
 * @apiPermission admin & client
 *
 * @apiSampleRequest /client/captcha/verify
 *
 * @apiQuery {String} captcha 验证码
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {String} token 访问令牌
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "code": 200,
 *   "message": "校验成功",
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * }
 */
import { verifyHandle } from './handler/verify.handle';
router.post('/verify', verifyHandle);

export default router;
