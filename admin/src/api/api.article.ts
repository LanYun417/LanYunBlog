import type { ArticleCreate } from '@/types';
import request from '@/utils/u.request';

/**
 * 发布文章
 * @param { object } article 文章信息
 */
export function publishArticleApi(article: ArticleCreate) {
  return request.post('/admin/article/create', { article });
}

/**
 * 删除文章
 * @param { number | number[] } id 文章ID
 */
export function deleteArticleApi(id: number | number[]) {
  let ids: string = `${id}`;

  if (id instanceof Array) {
    ids = id.join(',');
  }

  return request.delete(`/admin/article/delete?ids=${ids}`);
}

/**
 * 更新文章信息
 * @param { object } article 文章信息
 */
export function updateArticleApi(article: ArticleCreate) {
  return request.put('/admin/article/update', { article });
}

/**
 * 获取文章列表
 * @param { number } currentPage 当前页
 * @param { number } pageSize 每页获取数量
 * @param { string } keyword 搜索关键词
 */
export function fetchArticleListApi(currentPage?: number, pageSize?: number, keyword: string = '') {
  if (!currentPage || !pageSize) {
    return request.get('/client/article/list');
  }

  return request.get(
    `/client/article/list?currentPage=${currentPage}&pageSize=${pageSize}&keyword=${keyword}`
  );
}

/**
 * 获取文章详情
 * @param { number } id 文章ID
 */
export function getArticleDetailsApi(id: number) {
  return request.get(`/client/article/details/${id}`);
}
