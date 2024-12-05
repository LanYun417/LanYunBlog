import express, { Router } from 'express';

const router: Router = express.Router();

/**
 * @api {post} /admin/article/create 创建文章
 * @apiName 创建文章
 * @apiGroup 文章模块
 * @apiDescription 后台发布文章
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/article/create
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiBody {Object} article 文章对象
 * @apiBody {String} article.title 文章标题
 * @apiBody {String} article.cover 封面 URL
 * @apiBody {String} article.content 文章内容
 * @apiBody {Number[]} article.tagsId 标签 ID
 * @apiBody {Number} article.categoryId 一级分类 ID
 * @apiBody {Number} article.secCategoryId 二级分类 ID
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
 * @api {delete} /admin/article/delete 删除文章
 * @apiName 删除文章
 * @apiGroup 文章模块
 * @apiDescription 后台删除文章
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/article/delete
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiQuery {String} ids 文章 ID，多个 ID 用逗号分隔（如：1,2,3）即可批量删除
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
 * @api {put} /admin/article/update 更新文章
 * @apiName 更新文章
 * @apiGroup 文章模块
 * @apiDescription 后台更新文章
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/article/update
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiBody {Object} article 文章对象
 * @apiBody {Number} article.id 文章 ID
 * @apiBody {String} article.title 文章标题
 * @apiBody {String} article.cover 封面 URL
 * @apiBody {String} article.content 文章内容
 * @apiBody {Number[]} article.tagsId 标签 ID
 * @apiBody {Number} article.categoryId 一级分类 ID
 * @apiBody {Number} article.secCategoryId 二级分类 ID
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
 * @api {post} /admin/article/category/create 创建一级文章分类
 * @apiName 创建一级文章分类
 * @apiGroup 文章模块
 * @apiDescription 后台创建一级文章分类
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/article/category/create
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiBody {Object} category 文章分类对象
 * @apiBody {String} category.name 分类名称
 * @apiBody {String} category.description 分类描述
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
import { categoryCreateHandle } from './handler/category.create.handle';
router.post('/category/create', categoryCreateHandle);

/**
 * @api {delete} /admin/article/category/delete 删除一级文章分类
 * @apiName 删除一级文章分类
 * @apiGroup 文章模块
 * @apiDescription 后台删除一级文章分类
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/article/category/delete
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiQuery {String} ids 分类 ID，多个 ID 用逗号分隔（如：1,2,3）即可批量删除
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
import { categoryDeleteHandle } from './handler/category.delete.handle';
router.delete('/category/delete', categoryDeleteHandle);

/**
 * @api {put} /admin/article/category/update 更新一级文章分类
 * @apiName 更新一级文章分类
 * @apiGroup 文章模块
 * @apiDescription 后台更新一级文章分类
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/article/category/update
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiBody {Object} category 文章分类对象
 * @apiBody {Number} category.id 分类 ID
 * @apiBody {String} category.name 分类名称
 * @apiBody {String} category.description 分类描述
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
import { categoryUpdateHandle } from './handler/category.update.handle';
router.put('/category/update', categoryUpdateHandle);

/**
 * @api {post} /admin/article/secCategory/create 创建二级文章分类
 * @apiName 创建二级文章分类
 * @apiGroup 文章模块
 * @apiDescription 后台创建二级文章分类
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/article/secCategory/create
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiBody {Object} secCategory 二级文章分类对象
 * @apiBody {String} secCategory.name 分类名称
 * @apiBody {Number} secCategory.parentId 父级分类 ID
 * @apiBody {String} secCategory.description 分类描述
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
import { secCategoryCreateHandle } from './handler/secCategory.create.handle';
router.post(
	'/secCategory/create',

	secCategoryCreateHandle
);

/**
 * @api {delete} /admin/article/secCategory/delete 删除二级文章分类
 * @apiName 删除二级文章分类
 * @apiGroup 文章模块
 * @apiDescription 后台删除二级文章分类
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/article/secCategory/delete
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiQuery {String} ids 分类 ID，多个 ID 用逗号分隔（如：1,2,3）即可批量删除
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
import { secCategoryDeleteHandle } from './handler/secCategory.delete.handle';
router.delete(
	'/secCategory/delete',

	secCategoryDeleteHandle
);

/**
 * @api {put} /admin/article/secCategory/update 更新二级文章分类
 * @apiName 更新二级文章分类
 * @apiGroup 文章模块
 * @apiDescription 后台更新二级文章分类
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/article/secCategory/update
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiBody {Object} secCategory 二级文章分类对象
 * @apiBody {Number} secCategory.id 二级分类 ID
 * @apiBody {String} secCategory.name 分类名称
 * @apiBody {Number} secCategory.parentId 父级分类 ID
 * @apiBody {String} secCategory.description 分类描述
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
import { secCategoryUpdateHandle } from './handler/secCategory.update.handle';
router.put(
	'/secCategory/update',

	secCategoryUpdateHandle
);

/**
 * @api {post} /admin/article/tag/create 创建文章标签
 * @apiName 创建文章标签
 * @apiGroup 文章模块
 * @apiDescription 后台创建文章标签
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/article/tag/create
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiBody {Object} tag 文章标签对象
 * @apiBody {String} tag.name 标签名称
 * @apiBody {String} tag.description 标签描述
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
import { tagCreateHandle } from './handler/tag.create.handle';
router.post('/tag/create', tagCreateHandle);

/**
 * @api {delete} /admin/article/tag/delete 删除文章标签
 * @apiName 删除文章标签
 * @apiGroup 文章模块
 * @apiDescription 后台删除文章标签
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/article/tag/delete
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiQuery {String} ids 标签 ID，多个 ID 用逗号分隔（如：1,2,3）即可批量删除
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
import { tagDeleteHandle } from './handler/tag.delete.handle';
router.delete('/tag/delete', tagDeleteHandle);

/**
 * @api {put} /admin/article/tag/update 更新文章标签
 * @apiName 更新文章标签
 * @apiGroup 文章模块
 * @apiDescription 后台更新文章标签
 *
 * @apiPermission admin
 *
 * @apiSampleRequest /admin/article/tag/update
 *
 * @apiHeader {String} Authorization 用户授权 Token
 *
 * @apiBody {Object} tag 文章标签对象
 * @apiBody {Number} tag.id 标签 ID
 * @apiBody {String} tag.name 标签名称
 * @apiBody {String} tag.description 标签描述
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
import { tagUpdateHandle } from './handler/tag.update.handle';
router.put('/tag/update', tagUpdateHandle);

export default router;
