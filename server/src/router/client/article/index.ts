import express, { Router } from 'express';

const router: Router = express.Router();

/**
 * @api {get} /client/article/list 获取文章列表
 * @apiName 获取文章列表
 * @apiGroup 文章模块
 * @apiDescription 获取文章列表，支持分页查询，不传分页参数则表示获取全部
 *
 * @apiPermission admin & client
 *
 * @apiSampleRequest /client/article/list
 *
 * @apiQuery {Number} currentPage 页码
 * @apiQuery {Number} pageSize 每页数量
 * @apiQuery {String} keyword 搜索关键词
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {Number} total 总数
 * @apiSuccess {Article[]} list 用户列表
 * @apiSuccess {Number} list.id 文章 ID
 * @apiSuccess {String} list.title 文章标题
 * @apiSuccess {String} list.cover 文章封面 URL
 * @apiSuccess {String} list.content 文章内容
 * @apiSuccess {String} list.categoryId 一级分类 ID
 * @apiSuccess {String} list.categoryName 一级分类名称
 * @apiSuccess {String} list.secCategoryId 二级分类 ID
 * @apiSuccess {String} list.secCategoryName 二级分类名称
 * @apiSuccess {Tag[]}  list.tags 文章标签
 * @apiSuccess {String} list.tags.id 标签 ID
 * @apiSuccess {String} list.tags.name 标签名称
 * @apiSuccess {String} list.publishTime 发布时间
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "code": 200,
 *   "message": "获取成功",
 *   "total": 1,
 *   "list": [
 *     {
 *       "id": 1,
 *       "title": "文章标题",
 *       "cover": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
 *       "categoryId": 1,
 *       "categoryName": "一级分类名称",
 *       "secCategoryId": 2,
 *       "secCategoryName": "二级分类名称",
 *       "tags": [
 *         {
 *           "id": 1,
 *           "name": "标签名称"
 *         }
 *       ],
 *       "content": "文章内容",
 *       "publishTime": "2021-07-20T07:55:28.000Z"
 *     }
 *   ]
 * }
 */
import { listHandle } from './handler/list.handle';
router.get('/list', listHandle);

/**
 * @api {get} /client/article/category/list 获取一级文章分类列表
 * @apiName 获取一级文章分类列表
 * @apiGroup 文章模块
 * @apiDescription 获取一级文章分类列表，支持分页查询，不传分页参数则表示获取全部
 *
 * @apiPermission admin & client
 *
 * @apiSampleRequest /client/article/category/list
 *
 * @apiQuery {Number} currentPage 页码
 * @apiQuery {Number} pageSize 每页数量
 * @apiQuery {String} keyword 搜索关键词
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {Number} total 总数
 * @apiSuccess {Categories[]} list 分类列表
 * @apiSuccess {Number} list.id 分类 ID
 * @apiSuccess {String} list.name 分类名称
 * @apiSuccess {String} list.description 分类描述
 * @apiSuccess {Number} list.articleCount 分类文章数量
 * @apiSuccess {String} list.createdAt 创建时间
 * @apiSuccess {String} list.updatedAt 更新时间
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "code": 200,
 *   "message": "获取成功",
 *   "total": 1,
 *   "list": [
 *     {
 *       "id": 1,
 *       "name": "分类名称",
 *       "description": "分类描述",
 *       "articleCount": 1,
 *       "createdAt": "2021-07-20T07:55:28.000Z",
 *       "updatedAt": "2021-07-20T07:55:28.000Z"
 *     }
 *   ]
 * }
 */
import { categoryListHandle } from './handler/category.list.handle';
router.get('/category/list', categoryListHandle);

/**
 * @api {get} /client/article/secCategory/list 获取二级文章分类列表
 * @apiName 获取二级文章分类列表
 * @apiGroup 文章模块
 * @apiDescription 获取二级文章分类列表，支持分页查询，不传分页参数则表示获取全部
 *
 * @apiPermission admin & client
 *
 * @apiSampleRequest /client/article/secCategory/list
 *
 * @apiQuery {Number} currentPage 页码
 * @apiQuery {Number} pageSize 每页数量
 * @apiQuery {String} keyword 搜索关键词
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {Number} total 总数
 * @apiSuccess {SecCategories[]} list 二级分类列表
 * @apiSuccess {Number} list.id 二级分类 ID
 * @apiSuccess {String} list.name 二级分类名称
 * @apiSuccess {String} list.description 二级分类描述
 * @apiSuccess {Number} list.articleCount 二级分类文章数量
 * @apiSuccess {Number} list.parentId 父级分类 ID
 * @apiSuccess {String} list.parentName 父级分类名称
 * @apiSuccess {String} list.parentDescription 父级分类描述
 * @apiSuccess {String} list.createdAt 创建时间
 * @apiSuccess {String} list.updatedAt 更新时间
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "code": 200,
 *   "message": "获取成功",
 *   "total": 1,
 *   "list": [
 *     {
 *       "id": 1,
 *       "name": "二级分类名称",
 *       "description": "二级分类描述",
 *       "articleCount": 1,
 *       "parentId": 1,
 *       "parentName": "父级分类名称",
 *       "parentDescription": "父级分类描述",
 *       "createdAt": "2021-07-20T07:55:28.000Z",
 *       "updatedAt": "2021-07-20T07:55:28.000Z"
 *     }
 *   ]
 * }
 */
import { secCategoryListHandle } from './handler/secCategory.list.handle';
router.get('/secCategory/list', secCategoryListHandle);

/**
 * @api {get} /client/article/tag/list 获取文章标签列表
 * @apiName 获取文章标签列表
 * @apiGroup 文章模块
 * @apiDescription 获取文章标签列表，支持分页查询，不传分页参数则表示获取全部
 *
 * @apiPermission admin & client
 *
 * @apiSampleRequest /client/article/tag/list
 *
 * @apiQuery {Number} currentPage 页码
 * @apiQuery {Number} pageSize 每页数量
 * @apiQuery {String} keyword 搜索关键词
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {Number} total 总数
 * @apiSuccess {Tags[]} list 文章标签列表
 * @apiSuccess {Number} list.id 标签 ID
 * @apiSuccess {String} list.name 标签名称
 * @apiSuccess {String} list.description 标签描述
 * @apiSuccess {Number} list.articleCount 标签文章数量
 * @apiSuccess {String} list.createdAt 创建时间
 * @apiSuccess {String} list.updatedAt 更新时间
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "code": 200,
 *   "message": "获取成功",
 *   "total": 1,
 *   "list": [
 *     {
 *       "id": 1,
 *       "name": "标签名称",
 *       "description": "标签描述",
 *       "articleCount": 1,
 *       "createdAt": "2021-07-20T07:55:28.000Z",
 *       "updatedAt": "2021-07-20T07:55:28.000Z"
 *     }
 *   ]
 * }
 */
import { tagListHandle } from './handler/tag.list.handle';
router.get('/tag/list', tagListHandle);

/**
 * @api {get} /client/article/details/:id 获取文章详情
 * @apiName 获取文章详情
 * @apiGroup 文章模块
 * @apiDescription 获取文章详情
 *
 * @apiPermission admin & client
 *
 * @apiSampleRequest /client/article/details/:id
 *
 * @apiParam {Number} id 文章 ID
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {Object} article 文章信息
 * @apiSuccess {Number} article.id 文章 ID
 * @apiSuccess {String} article.title 文章标题
 * @apiSuccess {String} article.cover 文章封面
 * @apiSuccess {Number} article.content 文章内容
 * @apiSuccess {Number} article.categoryId 文章一级分类ID
 * @apiSuccess {String} article.categoryName 文章一级分类名称
 * @apiSuccess {Number} article.secCategoryId 文章二级分类 ID
 * @apiSuccess {String} article.secCategoryName 文章二级分类名称
 * @apiSuccess {String} article.createdAt 创建时间
 * @apiSuccess {String} article.updatedAt 更新时间
 * @apiSuccess {Tag[]} article.tags 文章标签
 * @apiSuccess {Number} article.tags.id 标签 ID
 * @apiSuccess {String} article.tags.name 标签名称
 * @apiSuccess {String} article.tags.description 标签描述
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "code": 200,
 *   "message": "获取成功",
 *   "article": {
 *     "id": 1,
 *     "title": "文章标题",
 *     "cover": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
 *     "content": "文章内容",
 *     "categoryId": 1,
 *     "categoryName": "一级分类名称",
 *     "secCategoryId": 2,
 *     "secCategoryName": "二级分类名称",
 *     "tags": [
 *       {
 *         "id": 1,
 *         "name": "标签名称",
 *         "description": "标签描述"
 *       }
 *     ],
 *     "createdAt": "2021-07-20T07:55:28.000Z",
 *     "updatedAt": "2021-07-20T07:55:28.000Z"
 *   }
 * }
 */
import { detailsHandle } from './handler/details.handle';
router.get('/details/:id', detailsHandle);

/**
 * @api {get} /client/article/category/all 获取所有分类列表
 * @apiName 获取所有分类列表
 * @apiGroup 文章模块
 * @apiDescription 获取所有分类列表，支持分页查询，不传分页参数则表示获取全部
 *
 * @apiPermission admin & client
 *
 * @apiSampleRequest /client/article/category/all
 *
 * @apiQuery {Number} currentPage 页码
 * @apiQuery {Number} pageSize 每页数量
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {Number} total 总数
 * @apiSuccess {Array} list 分类列表
 * @apiSuccess {Number} list.id 一级分类 ID
 * @apiSuccess {String} list.name 一级分类名称
 * @apiSuccess {String} list.description 一级分类描述
 * @apiSuccess {Number} list.subCategories 二级分类列表
 * @apiSuccess {Number} list.subCategories.id 二级分类 ID
 * @apiSuccess {String} list.subCategories.name 二级分类名称
 * @apiSuccess {String} list.subCategories.description 二级分类描述
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "code": 200,
 *   "message": "获取成功",
 *   "total": 1,
 *   "list": [
 *     {
 *       "id": 1,
 *       "name": "一级分类名称",
 *       "description": "一级分类描述",
 *       "subCategories": [
 *         {
 *           "id": 1,
 *           "name": "二级分类名称",
 *           "description": "二级分类描述"
 *         }
 *       ]
 *     }
 *   ]
 * }
 */
import { getAllCategoriesHandle } from './handler/getAll.categories.handle';
router.get('/category/all', getAllCategoriesHandle);

/**
 * @api {get} /client/article/getAllByCategory 按分类获取文章列表
 * @apiName 按分类获取文章列表
 * @apiGroup 文章模块
 * @apiDescription 按分类获取文章列表，支持分页查询，不传分页参数则表示获取全部
 *
 * @apiPermission admin & client
 *
 * @apiSampleRequest /client/article/getAllByCategory
 *
 * @apiQuery {Number} currentPage 页码
 * @apiQuery {Number} pageSize 每页数量
 * @apiQuery {Number} categoryId 一级分类 ID
 * @apiQuery {Number} secCategoryId 二级分类 ID
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {Number} total 总数
 * @apiSuccess {Article[]} list 用户列表
 * @apiSuccess {Number} list.id 文章 ID
 * @apiSuccess {String} list.title 文章标题
 * @apiSuccess {String} list.cover 文章封面 URL
 * @apiSuccess {String} list.content 文章内容
 * @apiSuccess {String} list.categoryId 一级分类 ID
 * @apiSuccess {String} list.categoryName 一级分类名称
 * @apiSuccess {String} list.secCategoryId 二级分类 ID
 * @apiSuccess {String} list.secCategoryName 二级分类名称
 * @apiSuccess {Tag[]} list.tags 文章标签
 * @apiSuccess {String} list.tags.id 标签 ID
 * @apiSuccess {String} list.tags.name 标签名称
 * @apiSuccess {String} list.publishTime 发布时间
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "code": 200,
 *   "message": "获取成功",
 *   "total": 1,
 *   "list": [
 *     {
 *       "id": 1,
 *       "title": "文章标题",
 *       "cover": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
 *       "categoryId": 1,
 *       "categoryName": "一级分类名称",
 *       "secCategoryId": 2,
 *       "secCategoryName": "二级分类名称",
 *       "tags": [
 *         {
 *           "id": 1,
 *           "name": "标签名称"
 *         }
 *       ],
 *       "content": "文章内容",
 *       "publishTime": "2021-07-20T07:55:28.000Z"
 *     }
 *   ]
 * }
 */
import { getArticleByCategoriesHandle } from './handler/getArticlebyCategories.handle';
router.get('/getAllByCategory', getArticleByCategoriesHandle);

/**
 * @api {get} /client/article/getAllByTag 按标签获取文章列表
 * @apiName 按标签获取文章列表
 * @apiGroup 文章模块
 * @apiDescription 按标签获取文章列表，支持分页查询，不传分页参数则表示获取全部
 *
 * @apiPermission admin & client
 *
 * @apiSampleRequest /client/article/getAllByTag
 *
 * @apiQuery {Number} currentPage 页码
 * @apiQuery {Number} pageSize 每页数量
 * @apiQuery {Number} tagId 标签 ID
 *
 * @apiSuccess {Number} code 响应状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {Number} total 总数
 * @apiSuccess {Article[]} list 文章列表
 * @apiSuccess {Number} list.id 文章 ID
 * @apiSuccess {String} list.title 文章标题
 * @apiSuccess {String} list.cover 文章封面 URL
 * @apiSuccess {String} list.content 文章内容
 * @apiSuccess {String} list.categoryId 一级分类 ID
 * @apiSuccess {String} list.categoryName 一级分类名称
 * @apiSuccess {String} list.secCategoryId 二级分类 ID
 * @apiSuccess {String} list.secCategoryName 二级分类名称
 * @apiSuccess {Tag[]} list.tags 文章标签
 * @apiSuccess {String} list.tags.id 标签 ID
 * @apiSuccess {String} list.tags.name 标签名称
 * @apiSuccess {String} list.publishTime 发布时间
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "code": 200,
 *   "message": "获取成功",
 *   "total": 1,
 *   "list": [
 *     {
 *       "id": 1,
 *       "title": "文章标题",
 *       "cover": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
 *       "categoryId": 1,
 *       "categoryName": "一级分类名称",
 *       "secCategoryId": 2,
 *       "secCategoryName": "二级分类名称",
 *       "tags": [
 *         {
 *           "id": 1,
 *           "name": "标签名称"
 *         }
 *       ],
 *       "content": "文章内容",
 *       "publishTime": "2021-07-20T07:55:28.000Z"
 *     }
 *   ]
 * }
 */
import { getArticleByTagHandle } from './handler/getArticleByTag.handle';
router.get('/getAllByTag', getArticleByTagHandle);

export default router;
