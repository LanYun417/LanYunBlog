import express, { Router } from 'express';
import { permissionsValidation } from '@/middleware/permissionsValidation';

const router: Router = express.Router();

/**
 * @api {post} /admin/user/create 创建用户
 * @apiName 创建用户
 * @apiGroup 后台用户
 * @apiDescription 创建后台管理用户
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/user/create
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiBody {Object} user 用户对象
 * @apiBody {String} user.nickname 昵称
 * @apiBody {String} user.avatar 头像 URL
 * @apiBody {String} user.username 用户名
 * @apiBody {String} user.password 密码
 * @apiBody {Number} user.permissionId 权限 ID
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
router.post('/create', permissionsValidation('admin'), createHandle);

/**
 * @api {post} /admin/user/login 用户登录
 * @apiName 用户登录
 * @apiGroup 后台用户
 * @apiDescription 后台管理员用户登录，可携带Authorization进行免密登录，使用账号密码登录则会返回Authorization Token
 *
 * @apiSampleRequest /admin/user/login
 *
 * @apiHeader {String} [Authorization] 用户授权 Token
 *
 * @apiBody {String} username 用户名
 * @apiBody {String} password 密码
 * @apiBody {String} [captchaToken] 验证码 Token，账号密码登录时需要
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "message": "登录成功"
 *     }
 */
import { loginHandle } from './handler/login.handle';
router.post('/login', loginHandle);

/**
 * @api {delete} /admin/user/delete 删除用户
 * @apiName 删除用户
 * @apiGroup 后台用户
 * @apiDescription 删除后台管理用户
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/user/delete
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
router.delete('/delete', permissionsValidation('admin'), deleteHandle);

/**
 * @api {get} /admin/user/list 获取用户列表
 * @apiName 获取用户列表
 * @apiGroup 后台用户
 * @apiDescription 获取用户列表，支持分页查询，不传分页参数则表示获取全部
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/user/list
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
 * @apiSuccess {User[]} list 用户列表
 * @apiSuccess {Number} list.id 用户 ID
 * @apiSuccess {String} list.nickname 昵称
 * @apiSuccess {String} list.avatar 头像 URL
 * @apiSuccess {String} list.username 用户名
 * @apiSuccess {Number} list.permissionId 权限 ID
 * @apiSuccess {String} list.permissionName 权限名称
 * @apiSuccess {String} list.createdAt 创建时间
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
 *       "nickname": "lanyun",
 *       "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
 *       "username": "lanyun",
 *       "permissionId": 1,
 *       "permissionName": "admin",
 *       "createdAt": "2021-07-20T07:55:28.000Z",
 *       "updatedAt": "2021-07-20T07:55:28.000Z"
 *     }
 *   ]
 * }
 */
import { listHandle } from './handler/list.handle';
router.get('/list', permissionsValidation('admin'), listHandle);

/**
 * @api {patch} /admin/user/update 更新用户资料
 * @apiName 更新用户资料
 * @apiGroup 后台用户
 * @apiDescription 后台管理用户修改资料
 *
 * @apiSampleRequest /admin/user/update
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiBody {Object} user 用户对象
 * @apiBody {String} user.nickname 昵称
 * @apiBody {String} user.avatar 头像 URL
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
router.patch('/update', permissionsValidation('*'), updateHandle);

/**
 * @api {patch} /admin/user/resetPassword 重置用户密码
 * @apiName 重置用户密码
 * @apiGroup 后台用户
 * @apiDescription 重置后台管理用户密码
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/user/resetPassword
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiBody {Number} id 用户对象
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "message": "重置成功"
 *     }
 */
import { resetPasswordHandle } from './handler/resetPassword.handle';
router.patch('/resetPassword', permissionsValidation('admin'), resetPasswordHandle);

/**
 * @api {patch} /admin/user/updatePassword 更新用户密码
 * @apiName 更新用户密码
 * @apiGroup 后台用户
 * @apiDescription 后台管理用户修改密码
 *
 * @apiSampleRequest /admin/user/updatePassword
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiBody {String} oldPassword 原密码
 * @apiBody {String} newPassword 新密码
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "message": "密码修改成功"
 *     }
 */
import { updatePasswordHandle } from './handler/updatePassword.handle';
router.patch('/updatePassword', permissionsValidation('*'), updatePasswordHandle);

/**
 * @api {get} /admin/user/profile 获取用户资料
 * @apiName 获取用户资料
 * @apiGroup 后台用户
 * @apiDescription 后台管理用户获取用户资料
 *
 * @apiSampleRequest /admin/user/profile
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {User} user 用户列表
 * @apiSuccess {Number} user.id 用户 ID
 * @apiSuccess {String} user.nickname 昵称
 * @apiSuccess {String} user.avatar 头像 URL
 * @apiSuccess {String} user.username 用户名
 * @apiSuccess {Number} user.permissionId 权限 ID
 * @apiSuccess {String} user.permissionName 权限名称
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "message": "获取成功",
 *       "user": {
 *         "id": 1,
 *         "nickname": "lanyun",
 *         "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
 *         "username": "lanyun",
 *         "permissionId": 1,
 *         "permissionName": "admin"
 *       }
 *     }
 */
import { getUserProfile } from './handler/get.userProfile';
router.get('/profile', permissionsValidation('*'), getUserProfile);

export default router;
