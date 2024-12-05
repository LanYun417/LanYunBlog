import express, { Router } from 'express';

const router: Router = express.Router();

/**
 * @api {post} /admin/site/create 创建站点信息
 * @apiName 创建站点信息
 * @apiGroup 站点管理
 * @apiDescription 创建前台站点信息，禁止创建同标题或同域名的站点配置信息
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/site/create
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiBody {Object} siteInfo 站点信息
 * @apiBody {String} siteInfo.title 站点标题
 * @apiBody {String} siteInfo.keywords 站点关键词
 * @apiBody {String} siteInfo.description 站点描述
 * @apiBody {String} siteInfo.domain 站点域名
 * @apiBody {String} siteInfo.logo 站点 Logo URL
 * @apiBody {String} siteInfo.globalStyle 站点全局样式
 * @apiBody {String} siteInfo.globalScript 站点全局脚本
 * @apiBody {String} siteInfo.isUse 是否使用当前配置信息 (yes/no)
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
 * @api {put} /admin/site/update 更新站点信息
 * @apiName 更新站点信息
 * @apiGroup 站点管理
 * @apiDescription 更新站点信息
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/site/update
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiBody {Object} siteInfo 站点信息
 * @apiBody {Number} siteInfo.id 站点 ID
 * @apiBody {String} siteInfo.title 站点标题
 * @apiBody {String} siteInfo.keywords 站点关键词
 * @apiBody {String} siteInfo.description 站点描述
 * @apiBody {String} siteInfo.domain 站点域名
 * @apiBody {String} siteInfo.logo 站点 Logo URL
 * @apiBody {String} siteInfo.globalStyle 站点全局样式
 * @apiBody {String} siteInfo.globalScript 站点全局脚本
 * @apiBody {String} siteInfo.isUse 是否使用当前配置信息 (yes/no)
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
 * @api {delete} /admin/site/delete 删除站点配置信息
 * @apiName 删除站点配置信息
 * @apiGroup 站点管理
 * @apiDescription 删除站点配置信息
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/site/delete
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
 * @api {get} /admin/site/list 获取站点信息列表
 * @apiName 获取站点信息列表
 * @apiGroup 站点管理
 * @apiDescription 获取站点信息列表
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/site/list
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiQuery {Number} currentPage 页码
 * @apiQuery {Number} pageSize 每页数量
 * @apiQuery {String} keyword 搜索关键词
 *
 * @apiSuccess {SiteInfo[]} list 站点信息列表
 * @apiSuccess {Number} list.id 站点 ID
 * @apiSuccess {String} list.title 站点标题
 * @apiSuccess {String} list.keywords 站点关键词
 * @apiSuccess {String} list.description 站点描述
 * @apiSuccess {String} list.domain 站点域名
 * @apiSuccess {String} list.logo 站点 Logo URL
 * @apiSuccess {String} list.globalStyle 站点全局样式
 * @apiSuccess {String} list.globalScript 站点全局脚本
 * @apiSuccess {String} list.isUse 是否使用当前配置信息 (yes/no)
 * @apiSuccess {String} list.createdAt 创建时间
 * @apiSuccess {String} list.updatedAt 更新时间
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "message": "获取成功",
 *       "total": 1,
 *       "list": [
 *         {
 *           "id": 1,
 *           "title": "网站标题",
 *           "keywords": "网站关键词",
 *           "description": "网站描述",
 *           "domain": "www.example.com",
 *           "logo": "http://example.com/logo.png",
 *           "globalStyle": "",
 *           "globalScript": "",
 *           "isUse": "yes",
 *           "createdAt": "2021-07-20T07:55:28.000Z",
 *           "updatedAt": "2021-07-20T07:55:28.000Z"
 *         }
 *       ]
 *     }
 */
import { listHandle } from './handler/list.handle';
router.get('/list', listHandle);

export default router;
