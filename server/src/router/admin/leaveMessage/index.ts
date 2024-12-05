import express, { Router } from 'express';

const router: Router = express.Router();

/**
 * @api {delete} /admin/leaveMessage/delete 删除留言
 * @apiName 删除留言
 * @apiGroup 留言模块
 * @apiDescription 删除留言，支持批量删除
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/leaveMessage/delete
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
 * @api {get} /admin/leaveMessage/list 获取留言列表
 * @apiName 获取留言列表
 * @apiGroup 留言模块
 * @apiDescription 获取留言列表，支持分页查询，不传分页参数则表示获取全部
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/leaveMessage/list
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
 * @apiSuccess {LeaveMessage[]} list 照片列表
 * @apiSuccess {Number} list.id 留言 ID
 * @apiSuccess {String} list.email 留言邮箱
 * @apiSuccess {String} list.message 留言内容
 * @apiSuccess {String} list.ip 留言着所在 IP
 * @apiSuccess {String} list.country 留言者所在国家
 * @apiSuccess {String} list.province 留言者所在省份
 * @apiSuccess {String} list.city 留言者所在城市
 * @apiSuccess {String} list.isp 留言者所使用运营商
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
 *       "email": "test@test.com",
 *       "message": "test message",
 *       "ip": "127.0.0.1",
 *       "province": "上海",
 *       "city": "上海",
 *       "isp": "电信",
 *       "createdAt": "2021-11-11T00:00:00.000Z",
 *       "updatedAt": "2021-11-11T00:00:00.000Z"
 *     }
 * }
 */
import { listHandle } from './handler/list.handle';
router.get('/list', listHandle);

export default router;
