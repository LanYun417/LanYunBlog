import request from '@/utils/u.request';

/**
 * 获取访问记录列表
 * @param { number } currentPage 当前页
 * @param { number } pageSize 每页条数
 * @param { string } keyword 搜索关键词
 */
export function fetchAccessRecordList(
  currentPage?: number,
  pageSize?: number,
  keyword: string = ''
) {
  if (!currentPage || !pageSize) {
    return request.get(`/admin/access/list?keyword=${keyword}`);
  }

  return request.get(
    `/admin/access/list?currentPage=${currentPage}&pageSize=${pageSize}&keyword=${keyword}`
  );
}

/**
 * 删除访问记录
 * @param { number | number[] } id 标签ID
 */
export function deleteAccessRecordApi(id: number | number[]) {
  let ids: string = `${id}`;

  if (id instanceof Array) {
    ids = id.join(',');
  }

  return request.delete(`/admin/access/delete?ids=${ids}`);
}

/**
 * 清空日志记录
 * @param { string } text “ 确认清空访问日志记录 ” 文本
 */
export function clearAllAccessRecordApi(text: string) {
  return request.delete(`/admin/access/clearAll?text=${text}`);
}
