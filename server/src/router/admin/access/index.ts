import express, { Router } from 'express';

const router: Router = express.Router();

/**
 * @api {get} /admin/access/list 获取访问记录列表
 * @apiName 获取访问记录列表
 * @apiGroup 访问记录
 * @apiDescription 获取访问记录列表
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/access/list
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiQuery {Number} currentPage 页码
 * @apiQuery {Number} pageSize 每页数量
 * @apiQuery {String} [keyword] 搜索关键词
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {Number} total 总数
 * @apiSuccess {Access[]} list 记录列表
 * @apiSuccess {Number} list.id 记录ID
 * @apiSuccess {String} list.method 请求方法
 * @apiSuccess {String} list.ip 访问者IP
 * @apiSuccess {String} list.province 访问者所在省份
 * @apiSuccess {String} list.city 访问者所在城市
 * @apiSuccess {String} list.isp 访问者所属运营商
 * @apiSuccess {String} list.country 访问者所在国家
 * @apiSuccess {String} list.url 访问路径
 * @apiSuccess {String} list.createdAt 留言时间
 * @apiSuccess {String} list.updatedAt 更新时间
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "code": 200,
 *   "message": "获取成功",
 *   "total": 1,
 *   "list": [
 *     {
 *       "id": 1,
 *       "method": "GET",
 *       "ip": "127.0.0.1",
 *       "province": "上海",
 *       "city": "上海",
 *       "isp": "电信",
 *       "url": "/admin/access/list",
 *       "createdAt": "2021-07-20T16:00:00.000Z",
 *       "updatedAt": "2021-07-20T16:00:00.000Z"
 *     }
 * }
 */
import { listHandle } from './handler/list.handle';
router.get('/list', listHandle);

/**
 * @api {delete} /admin/access/delete 删除访问记录
 * @apiName 删除访问记录
 * @apiGroup 访问记录
 * @apiDescription 删除访问记录
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/access/delete
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiQuery {String} ids 站点 ID，多个 ID 用逗号分隔（如：1,2,3）即可批量删除
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
 * @api {delete} /admin/access/clearAll 清空日志记录
 * @apiName 清空日志记录
 * @apiGroup 访问记录
 * @apiDescription 清空日志记录
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/access/clearAll
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiQuery {String} text “ 确认清空访问日志记录 ” 文本
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
import { clearAllHandle } from './handler/clearAll.handle';
router.delete('/clearAll', clearAllHandle);

export default router;
