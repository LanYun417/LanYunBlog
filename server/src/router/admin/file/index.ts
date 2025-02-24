import express, { Router } from 'express';
import { fileUpload, UploadOptions } from '@/middleware/fileUpload';

const router: Router = express.Router();
const uploadOption: UploadOptions = {
	dest: '/',
	fields: 'file',
	maxCount: 10,
	maxSize: 1024,
	mimetype: '*',
};

/**
 * @api {post} /admin/file/upload 文件上传
 * @apiName 文件上传
 * @apiGroup 文件模块
 * @apiDescription 后台文件上传，最大上传文件大小为 1024M，最大上传文件数量 10
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/file/upload
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiBody {File} file 文件
 * @apiBody {String} [toWebp] 图片文件是否转换为 Webp 格式（yes, no），默认值：no
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {File[]} files 上传成功的文件列表
 * @apiSuccess {Number} files.id 文件 ID
 * @apiSuccess {String} files.name 文件名
 * @apiSuccess {String} files.path 文件路径
 * @apiSuccess {String} files.url 文件 URL
 * @apiSuccess {String} files.md5 文件 MD5 值
 * @apiSuccess {String} files.mimetype 文件 MIME 类型
 * @apiSuccess {Date} files.createdAt 文件创建时间
 * @apiSuccess {Date} files.updatedAt 文件更新时间
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 * 	"code": 200,
 * 	"message": "上传成功",
 * 	"files": [
 * 		{
 * 			"id": 1,
 * 			"name": "pandaer.jpg",
 * 			"path": "/upload/avatar/pandaer.jpg",
 * 			"url": "http://localhost:3000/static/avatar/pandaer.jpg",
 * 			"md5": "304b98387b4a1e4ce908213819f6af6a",
 * 			"mimetype": "image/jpeg",
 * 			"createdAt": "2021-07-20T07:55:28.000Z",
 * 			"updatedAt": "2021-07-20T07:55:28.000Z"
 * 		}
 * 	]
 * }
 */
import { uploadHandle } from './handler/upload.handle';
router.post('/upload', fileUpload(uploadOption), uploadHandle);

/**
 * @api {get} /admin/file/download 下载文件
 * @apiName 下载文件
 * @apiGroup 文件模块
 * @apiDescription 后台文件下载，返回一个 Buffer
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/file/download
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiQuery {Number} id 文件 ID
 */
import { downloadHandle } from './handler/download.handle';
router.get('/download', downloadHandle);

/**
 * @api {delete} /admin/file/delete 删除文件
 * @apiName 删除文件
 * @apiGroup 文件模块
 * @apiDescription 后台文件删除
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/file/delete
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiQuery {String} ids 文件 ID，多个 ID 用逗号分隔（如：1,2,3）即可批量删除
 *
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
 * @api {get} /admin/file/list 获取文件列表
 * @apiName 获取文件列表
 * @apiGroup 文件模块
 * @apiDescription 获取文件列表，支持分页查询，不传分页参数则表示获取全部
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/file/list
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiQuery {Number} currentPage 页码
 * @apiQuery {Number} pageSize 每页数量
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {Number} total 总数
 * @apiSuccess {Number} totalSize 文件总大小
 * @apiSuccess {File[]} list 文件列表
 * @apiSuccess {Number} list.id 文件 ID
 * @apiSuccess {String} list.name 文件名
 * @apiSuccess {String} list.mimetype 文件 MIME 类型
 * @apiSuccess {String} list.path 文件路径
 * @apiSuccess {String} list.md5 文件 MD5 值
 * @apiSuccess {String} list.url 文件链接
 * @apiSuccess {Number} list.size 文件大小
 * @apiSuccess {String} list.createdAt 创建时间
 * @apiSuccess {String} list.updatedAt 更新时间
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "code": 200,
 *   "message": "获取成功",
 *   "total": 1,
 *   "totalSize": 1024,
 *   "list": [
 *     {
 *       "id": 1,
 *       "name": "pandaer.jpg",
 *       "mimetype": "image/jpeg",
 *       "path": "/upload/avatar/pandaer.jpg",
 *       "md5": "304b98387b4a1e4ce908213819f6af6a",
 *       "size": 1024,
 *       "url": "http://localhost:3000/static/avatar/pandaer.jpg",
 *       "createdAt": "2021-07-20T07:55:28.000Z",
 *       "updatedAt": "2021-07-20T07:55:28.000Z"
 *     }
 *   ]
 * }
 */
import { listHandle } from './handler/list.handle';
router.get('/list', listHandle);

/**
 * @api {get} /admin/file/image/list 获取图片文件列表
 * @apiName 获取图片文件列表
 * @apiGroup 文件模块
 * @apiDescription 获取图片文件列表
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/file/image/list
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiQuery {Number} currentPage 页码
 * @apiQuery {Number} pageSize 每页数量
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {Number} total 总数
 * @apiSuccess {Number} totalSize 文件总大小
 * @apiSuccess {File[]} list 文件列表
 * @apiSuccess {Number} list.id 文件 ID
 * @apiSuccess {String} list.name 文件名
 * @apiSuccess {String} list.mimetype 文件 MIME 类型
 * @apiSuccess {String} list.path 文件路径
 * @apiSuccess {String} list.md5 文件 MD5 值
 * @apiSuccess {String} list.url 文件链接
 * @apiSuccess {Number} list.size 文件大小
 * @apiSuccess {String} list.createdAt 创建时间
 * @apiSuccess {String} list.updatedAt 更新时间
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "code": 200,
 *   "message": "获取成功",
 *   "total": 1,
 *   "totalSize": 1024,
 *   "list": [
 *     {
 *       "id": 1,
 *       "name": "pandaer.jpg",
 *       "mimetype": "image/jpeg",
 *       "path": "/upload/avatar/pandaer.jpg",
 *       "md5": "304b98387b4a1e4ce908213819f6af6a",
 *       "size": 1024,
 *       "url": "http://localhost:3000/static/avatar/pandaer.jpg",
 *       "createdAt": "2021-07-20T07:55:28.000Z",
 *       "updatedAt": "2021-07-20T07:55:28.000Z"
 *     }
 *   ]
 * }
 */
import { imageListHandle } from './handler/image.list.handle';
router.get('/image/list', imageListHandle);

export default router;
