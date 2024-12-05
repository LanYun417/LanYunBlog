import request from '@/utils/u.request';
import type { ArticleCategory, ArticleSecCategory } from '@/types';

/**
 * 新增一级分类
 * @param { object } data 分类信息
 */
export function addArticleCategoryApi(data: ArticleCategory) {
  return request.post('/admin/article/category/create', {
    category: data
  });
}

/**
 * 删除一级分类
 * @param { string | number} id 分类ID
 */
export function deleteArticleCategoryApi(id: number | number[]) {
  let ids: string = `${id}`;

  if (id instanceof Array) {
    ids = id.join(',');
  }

  return request.delete(`/admin/article/category/delete?ids=${ids}`);
}

/**
 * 更新一级分类信息
 * @param { object } data 分类信息
 */
export function updateArticleCategoryApi(data: ArticleCategory) {
  return request.put('/admin/article/category/update', {
    category: data
  });
}

/**
 * 获取一级分类列表
 * @param { number } currentPage 当前页
 * @param { number } pageSize 每页条数
 * @param { string } keyword 搜索关键词
 */
export function fetchArticleCategoryList(
  currentPage?: number,
  pageSize?: number,
  keyword: string = ''
) {
  if (!currentPage || !pageSize) {
    return request.get('/client/article/category/list');
  }

  return request.get(
    `/client/article/category/list?currentPage=${currentPage}&pageSize=${pageSize}&keyword=${keyword}`
  );
}

/**
 * 新增二级分类
 * @param { object } data 二级分类信息
 */
export function addArticleSecCategoryApi(data: ArticleSecCategory) {
  return request.post('/admin/article/secCategory/create', {
    secCategory: data
  });
}

/**
 * 删除二级分类
 * @param { number | number[] } id 二级分类ID
 */
export function deleteArticleSecCategoryApi(id: number | number[]) {
  let ids: string = `${id}`;

  if (id instanceof Array) {
    ids = id.join(',');
  }

  return request.delete(`/admin/article/secCategory/delete?ids=${ids}`);
}

/**
 * 更新二级分类信息
 * @param { object } data 二级分类信息
 */
export function updateArticleSecCategoryApi(data: ArticleSecCategory) {
  return request.put('/admin/article/secCategory/update', {
    secCategory: data
  });
}

/**
 * 获取二级分类列表
 * @param { number } currentPage 当前页
 * @param { number } pageSize 每页条数
 * @param { string } keyword 搜索关键词
 */
export function fetchArticleSecCategoryList(
  currentPage?: number,
  pageSize?: number,
  keyword: string = ''
) {
  if (!currentPage || !pageSize) {
    return request.get('/client/article/secCategory/list');
  }

  return request.get(
    `/client/article/secCategory/list?currentPage=${currentPage}&pageSize=${pageSize}&keyword=${keyword}`
  );
}

/**
 * 获取分类树
 * @param currentPage 当前页
 * @param pageSize 每页条数
 */
export function fetchArticleCategoryTree(currentPage?: number, pageSize?: number) {
  if (!currentPage || !pageSize) {
    return request.get('/client/article/category/all');
  }

  return request.get(
    `/client/article/category/all?currentPage=${currentPage}&pageSize=${pageSize}`
  );
}
