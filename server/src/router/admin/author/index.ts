import express, { Router } from 'express';

const router: Router = express.Router();

/**
 * @api {post} /admin/author/create 创建作者信息
 * @apiName 创建作者信息
 * @apiGroup 作者信息
 * @apiDescription 创建作者信息
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/author/create
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiBody {Object} authorInfo 作者信息
 * @apiBody {String} authorInfo.name 作者名称
 * @apiBody {String} authorInfo.avatar 作者头像 URL
 * @apiBody {String} authorInfo.ps 作者签名
 * @apiBody {String} authorInfo.biography 关于信息
 * @apiBody {String} authorInfo.email 作者邮箱
 * @apiBody {String} authorInfo.github GitHub 地址
 * @apiBody {String} authorInfo.weibo 微博主页地址
 * @apiBody {String} authorInfo.wechat 微信
 * @apiBody {Number} authorInfo.qq QQ
 * @apiBody {String} authorInfo.isUse 是否启用（yes/no）
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
 * @api {delete} /admin/author/delete 删除作者信息
 * @apiName 删除作者信息
 * @apiGroup 作者信息
 * @apiDescription 删除作者信息
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/author/delete
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiQuery {String} ids 用户 ID，多个 ID 用逗号分隔（如：1,2,3）即可批量删除
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
 * @api {get} /admin/author/list 获取作者信息列表
 * @apiName 获取作者信息列表
 * @apiGroup 作者信息
 * @apiDescription 获取作者信息列表
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/author/list
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiQuery {Number} currentPage 页码
 * @apiQuery {Number} pageSize 每页数量
 * @apiQuery {String} keyword 搜索关键词
 *
 * @apiSuccess {Number} total 总数
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
 * @apiSuccess {String} list.isUse 是否启用（yes/no）
 * @apiSuccess {String} list.createdAt 创建时间
 * @apiSuccess {String} list.updatedAt 更新时间
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "code": 201,
 *       "message": "创建成功",
 *       "total": 1,
 *       "list": [
 *         {
 *           "id": 1,
 *           "name": "LanYun",
 *           "avatar": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
 *           "ps": "Hello, I'm LanYun.",
 *           "biography": "I'm a web developer.",
 *           "email": "lanyun@example.com",
 *           "github": "https://github.com/LanYunQian",
 *           "weibo": "https://weibo.com/u/62512345678",
 *           "wechat": "lanyun123",
 *           "qq": 12345678,
 *           "isUse": "yes",
 *           "createdAt": "2021-10-12T03:55:32.000Z",
 *           "updatedAt": "2021-10-12T03:55:32.000Z"
 *         }
 *       ]
 *     }
 */
import { listHandle } from './handler/list.handle';
router.get('/list', listHandle);

/**
 * @api {put} /admin/author/update 更新作者信息
 * @apiName 更新作者信息
 * @apiGroup 作者信息
 * @apiDescription 更新作者信息
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/author/update
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiBody {Object} authorInfo 作者信息
 * @apiBody {Number} authorInfo.id 信息 ID
 * @apiBody {String} authorInfo.name 作者名称
 * @apiBody {String} authorInfo.avatar 作者头像 URL
 * @apiBody {String} authorInfo.ps 作者签名
 * @apiBody {String} authorInfo.biography 关于信息
 * @apiBody {String} authorInfo.email 作者邮箱
 * @apiBody {String} authorInfo.github GitHub 地址
 * @apiBody {String} authorInfo.weibo 微博主页地址
 * @apiBody {String} authorInfo.wechat 微信
 * @apiBody {Number} authorInfo.qq QQ
 * @apiBody {String} authorInfo.isUse 是否启用（yes/no）
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

export default router;
