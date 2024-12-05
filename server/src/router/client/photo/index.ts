import express, { Router } from 'express';

const router: Router = express.Router();

/**
 * @api {get} /client/photo/list 获取照片列表
 * @apiName 获取相册列表
 * @apiGroup 照片模块
 * @apiDescription 获取照片列表，支持分页查询，不传分页参数则表示获取全部
 *
 * @apiPermission admin & client
 *
 * @apiSampleRequest /client/photo/list
 *
 * @apiQuery {Number} currentPage 页码
 * @apiQuery {Number} pageSize 每页数量
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {Number} total 总数
 * @apiSuccess {Photo[]} list 照片列表
 * @apiSuccess {Number} list.id 友链 ID
 * @apiSuccess {String} list.url 友链地址
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
 *       "url": "https://example.com/photo1.jpg",
 *       "description": "照片描述"
 *     }
 *   ]
 * }
 */
import { listHandle } from './handler/list.handle';
router.get('/list', listHandle);

/**
 * @api {get} /client/photo/download 下载照片
 * @apiName 下载照片
 * @apiGroup 照片模块
 * @apiDescription 下载照片，返回一个 Buffer
 *
 * @apiPermission admin & client
 *
 * @apiSampleRequest /client/photo/download
 *
 * @apiQuery {Number} id 照片 ID
 */
import { downloadHandle } from './handler/download.handle';
router.get('/download', downloadHandle);

export default router;
