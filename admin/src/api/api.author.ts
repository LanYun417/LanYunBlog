import request from '@/utils/u.request';
import type { AuthorInfo } from '@/types';

/**
 * 新增作者信息
 * @param { object } data 作者信息
 */
export function addAuthorInfoApi(data: AuthorInfo) {
  return request.post('/admin/author/create', {
    authorInfo: data
  });
}

/**
 * 删除作者信息
 * @param { number | number[] } id 站点ID
 */
export function deleteAuthorInfoApi(id: number | number[]) {
  let ids: string = `${id}`;

  if (id instanceof Array) {
    ids = id.join(',');
  }

  return request.delete(`/admin/author/delete?ids=${ids}`);
}

/**
 * 更新作者信息
 * @param { object } data 站点信息
 */
export function updateAuthorInfoApi(data: AuthorInfo) {
  return request.put('/admin/author/update', {
    authorInfo: data
  });
}

/**
 * 获取作者信息列表
 * @param { number } currentPage 当前页
 * @param { number } pageSize 每页条数
 * @param { string } keyword 搜索关键词
 */
export function fetchAuthorInfoList(currentPage?: number, pageSize?: number, keyword: string = '') {
  if (!currentPage || !pageSize) {
    return request.get('/admin/author/list');
  }

  return request.get(
    `/admin/author/list?currentPage=${currentPage}&pageSize=${pageSize}&keyword=${keyword}`
  );
}
