import express, { Router } from 'express';

const router: Router = express.Router();

/**
 * @api {get} /client/friendlyLink/list 获取友情链接列表
 * @apiName 获取友情链接列表
 * @apiGroup 友情链接
 * @apiDescription 获取友情链接列表，仅返回已审核通过的友链，支持分页查询，不传分页参数则表示获取全部
 *
 * @apiPermission admin & client
 *
 * @apiSampleRequest /client/friendlyLink/list
 *
 * @apiQuery {Number} currentPage 页码
 * @apiQuery {Number} pageSize 每页数量
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {Number} total 总数
 * @apiSuccess {FriendlyLink[]} list 友情链接列表
 * @apiSuccess {Number} list.id 友链 ID
 * @apiSuccess {String} list.name 友链名称
 * @apiSuccess {String} list.url 友链地址
 * @apiSuccess {String} list.icon 友链 Icon URL
 * @apiSuccess {String} list.description 友链描述
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "code": 200,
 *   "message": "获取成功",
 *   "total": 1,
 *   "list": [
 *     {
 *       "id": 1,
 *       "name": "友链1",
 *       "url": "https://www.baidu.com",
 *       "icon": "https://www.baidu.com/favicon.ico",
 *       "description": "这是友链1的描述",
 *     }
 *   ]
 * }
 */
import { listHandle } from './handler/list.handle';
router.get('/list', listHandle);

/**
 * @api {post} /client/friendlyLink/apply 申请友链
 * @apiName 申请友链
 * @apiGroup 友情链接
 * @apiDescription 前台用户申请友链
 *
 * @apiPermission admin & client
 *
 * @apiSampleRequest /client/friendlyLink/apply
 *
 * @apiBody {String} captchaToken 验证码 Token
 * @apiBody {Object} friendlyLink 友链信息
 * @apiBody {String} friendlyLink.name 友链名称
 * @apiBody {String} friendlyLink.url 友链地址
 * @apiBody {String} friendlyLink.icon 友链 Icon URL
 * @apiBody {String} friendlyLink.description 友链描述
 * @apiBody {String} friendlyLink.email 友链联系邮箱
 * @apiBody {String} friendlyLink.remark 补充（备注）
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "code": 200,
 *   "message": "申请提交成功，请等待管理员审核"
 * }
 */
import { applyHandle } from './handler/apply.handle';
router.post('/apply', applyHandle);

export default router;
