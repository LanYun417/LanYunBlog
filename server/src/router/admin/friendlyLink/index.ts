import express, { Router } from 'express';

const router: Router = express.Router();

/**
 * @api {post} /admin/friendlyLink/create 创建友情链接
 * @apiName 创建友情链接
 * @apiGroup 友情链接
 * @apiDescription 创建友情链接
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/friendlyLink/create
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiBody {Object} friendlyLink 友情链接对象
 * @apiBody {String} friendlyLink.name 友链站点名称
 * @apiBody {String} friendlyLink.url 友链站点地址
 * @apiBody {String} friendlyLink.icon 友链站点图标 URL
 * @apiBody {String} friendlyLink.status 友链状态（pending:审核中、approved:已通过、rejected:已拒绝）
 * @apiBody {String} friendlyLink.description 友链站点描述
 * @apiBody {String} friendlyLink.email 友链站长联系邮箱
 * @apiBody {String} friendlyLink.remark 补充（备注）
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "code": 201,
 *       "message": "创建成功"
 *     }
 */
import { createHandle } from './handler/create.handle';
router.post('/create', createHandle);

/**
 * @api {delete} /admin/friendlyLink/delete 删除友情链接
 * @apiName 删除友情链接
 * @apiGroup 友情链接
 * @apiDescription 删除友情链接
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/friendlyLink/delete
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiQuery {String} ids 友链 ID，多个 ID 用逗号分隔（如：1,2,3）即可批量删除
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "message": "删除成功"
 *     }
 */
import { deleteHandle } from './handler/delete.handle';
router.delete('/delete', deleteHandle);

/**
 * @api {put} /admin/friendlyLink/update 更新友情链接
 * @apiName 更新友情链接
 * @apiGroup 友情链接
 * @apiDescription 更新友情链接
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/friendlyLink/update
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiBody {Object} friendlyLink 友情链接对象
 * @apiBody {Number} friendlyLink.id 友链 ID
 * @apiBody {String} friendlyLink.name 友链站点名称
 * @apiBody {String} friendlyLink.url 友链站点地址
 * @apiBody {String} friendlyLink.icon 友链站点图标 URL
 * @apiBody {String} friendlyLink.status 友链状态（pending:审核中、approved:已通过、rejected:已拒绝）
 * @apiBody {String} friendlyLink.description 友链站点描述
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "message": "更新成功"
 *     }
 */
import { updateHandle } from './handler/update.handle';
router.put('/update', updateHandle);

/**
 * @api {get} /admin/friendlyLink/list 获取友情链接列表（后台）
 * @apiName 获取友情链接列表（后台）
 * @apiGroup 友情链接
 * @apiDescription 获取友情链接列表，后台使用
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/friendlyLink/list
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiQuery {Number} currentPage 页码
 * @apiQuery {Number} pageSize 每页数量
 * @apiQuery {String} keyword 搜索关键词
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

export default router;
