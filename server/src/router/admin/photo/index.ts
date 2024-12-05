import express, { Router } from 'express';
import { fileUpload, UploadOptions } from '@/middleware/fileUpload';

const router: Router = express.Router();
const uploadOption: UploadOptions = {
	dest: '/photo',
	fields: 'photo',
	maxCount: 1,
	maxSize: 3,
	mimetype: ['image/png', 'image/jpeg', 'image/webp'],
};

/**
 * @api {post} /admin/photo/upload 照片上传
 * @apiName 上传照片
 * @apiGroup 照片模块
 * @apiDescription 照片上传，最大上传文件大小为 10M，最大上传文件数量 10
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/photo/upload
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiBody {File} photo 照片文件
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
 * @api {delete} /admin/photo/delete 删除照片
 * @apiName 删除照片
 * @apiGroup 照片模块
 * @apiDescription 后台删除照片
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/photo/delete
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
 * @api {put} /admin/photo/update 更新照片信息
 * @apiName 更新照片信息
 * @apiGroup 照片模块
 * @apiDescription 更新照片信息（更新描述信息）
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/photo/update
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiBody {Object} photo 照片信息
 * @apiBody {Number} photo.id 照片 ID
 * @apiBody {String} photo.description 描述信息
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 * 	"code": 200,
 * 	"message": "更新成功"
 * }
 */
import { updateHandle } from './handler/update.handle';
router.put('/update', updateHandle);

/**
 * @api {get} /admin/photo/list 获取照片列表（后台）
 * @apiName 获取照片列表（后台）
 * @apiGroup 照片模块
 * @apiDescription 获取照片列表（后台）
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/photo/list
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
 * @apiSuccess {Photo[]} list 照片列表
 * @apiSuccess {Number} list.id 友链 ID
 * @apiSuccess {String} list.url 友链地址
 * @apiSuccess {String} list.path 存储路径
 * @apiSuccess {String} list.description 友链描述
 * @apiSuccess {Date} list.createdAt 友链创建时间
 * @apiSuccess {Date} list.updatedAt 友链更新时间
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
 *       "path": "/upload/photo/photo1.jpg",
 *       "description": "照片描述",
 *       "createdAt": "2021-07-20T07:55:28.000Z",
 *       "updatedAt": "2021-07-20T07:55:28.000Z"
 *     }
 *   ]
 * }
 */
import { listHandle } from './handler/list.handle';
router.get('/list', listHandle);

export default router;
