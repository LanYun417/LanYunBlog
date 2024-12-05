import request from '@/utils/u.request';
import type { ArticleTag } from '@/types';

/**
 * 新增文章标签
 * @param { object } data 标签信息
 */
export function addArticleTagApi(data: ArticleTag) {
  return request.post('/admin/article/tag/create', {
    tag: data
  });
}

/**
 * 删除文章标签
 * @param { number | number[] } id 标签ID
 */
export function deleteArticleTagApi(id: number | number[]) {
  let ids: string = `${id}`;

  if (id instanceof Array) {
    ids = id.join(',');
  }

  return request.delete(`/admin/article/tag/delete?ids=${ids}`);
}

/**
 * 更新文章标签
 * @param { object } data 标签信息
 */
export function updateArticleTagApi(data: ArticleTag) {
  return request.put('/admin/article/tag/update', {
    tag: data
  });
}

/**
 * 获取文章标签列表
 * @param { number } currentPage 当前页
 * @param { number } pageSize 每页条数
 * @param { string } keyword 搜索关键词
 */
export function fetchArticleTagList(currentPage?: number, pageSize?: number, keyword: string = '') {
  if (!currentPage || !pageSize) {
    return request.get(`/client/article/tag/list?keyword=${keyword}`);
  }

  return request.get(
    '/client/article/tag/list?' +
      `currentPage=${currentPage}&pageSize=${pageSize}&keyword=${keyword}`
  );
}
