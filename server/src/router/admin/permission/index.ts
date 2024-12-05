import express, { Router } from 'express';

const router: Router = express.Router();

/**
 * @api {get} /admin/permission/list 获取权限列表
 * @apiName 获取权限列表
 * @apiGroup 权限管理
 * @apiDescription 获取权限列表
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/permission/list
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiQuery {Number} currentPage 页码
 * @apiQuery {Number} pageSize 每页数量
 * @apiQuery {String} keyword 搜索关键词
 *
 * @apiSuccess {Permission[]} list 权限列表
 * @apiSuccess {Number} list.id 权限ID
 * @apiSuccess {String} list.name 权限名称
 * @apiSuccess {String} list.description 权限描述
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
 *       "list": [
 *          {
 *            "id": 1,
 *            "name": "权限1",
 *            "description": "权限描述1",
 *            "createdAt": "2021-01-01 00:00:00",
 *            "updatedAt": "2021-01-01 00:00:00"
 *          }
 *        ]
 *     }
 */
import { listHandle } from './handler/list.handle';
router.get('/list', listHandle);

/**
 * @api {delete} /admin/permission/delete 删除管理员权限
 * @apiName 删除管理员权限
 * @apiGroup 权限管理
 * @apiDescription 删除管理员权限
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/permission/delete
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
 * @api {post} /admin/permission/create 创建管理员权限
 * @apiName 创建管理员权限
 * @apiGroup 权限管理
 * @apiDescription 创建管理员权限
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/permission/create
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiBody {Object} permission 权限信息
 * @apiBody {String} permission.name 权限名称
 * @apiBody {String} permission.description 权限描述
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
 * @api {put} /admin/permission/update 更新权限信息
 * @apiName 更新权限信息
 * @apiGroup 权限管理
 * @apiDescription 更新权限信息
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/permission/update
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiBody {Object} permission 权限信息
 * @apiBody {Number} permission.id 权限ID
 * @apiBody {String} permission.name 权限名称
 * @apiBody {String} permission.description 权限描述
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
