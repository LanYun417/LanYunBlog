import request from '@/utils/u.request';
import type { FriendlyLink } from '@/types';

/**
 * 新增友链
 * @param { object } data 友链信息
 */
export function addFriendlyLinkApi(data: FriendlyLink) {
  return request.post('/admin/friendlyLink/create', {
    friendlyLink: data
  });
}

/**
 * 删除友链
 * @param { number | number[] } id 友链ID
 */
export function deleteFriendlyLinkApi(id: number | number[]) {
  let ids: string = `${id}`;

  if (id instanceof Array) {
    ids = id.join(',');
  }

  return request.delete(`/admin/friendlyLink/delete?ids=${ids}`);
}

/**
 * 更新友链信息
 * @param { object } data 友链信息
 */
export function updateFriendlyLinkApi(data: FriendlyLink) {
  return request.put('/admin/friendlyLink/update', {
    friendlyLink: data
  });
}

/**
 * 获取友链列表
 * @param { number } currentPage 当前页
 * @param { number } pageSize 每页条数
 * @param { string } keyword 搜索关键词
 */
export function fetchFriendlyLinkListApi(
  currentPage?: number,
  pageSize?: number,
  keyword: string = ''
) {
  if (!currentPage || !pageSize) {
    return request.get('/admin/friendlyLink/list');
  }

  return request.get(
    `/admin/friendlyLink/list?currentPage=${currentPage}&pageSize=${pageSize}&keyword=${keyword}`
  );
}
