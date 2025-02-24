import request from '@/utils/u.request';

/**
 * 删除文留言
 * @param { number | number[] } id 标签ID
 */
export function deleteLeaveMessageApi(id: number | number[]) {
  let ids: string = `${id}`;

  if (id instanceof Array) {
    ids = id.join(',');
  }

  return request.delete(`/admin/leaveMessage/delete?ids=${ids}`);
}

/**
 * 获取留言列表
 * @param { number } currentPage 当前页
 * @param { number } pageSize 每页条数
 * @param { string } keyword 搜索关键字
 */
export function fetchLeaveMessageApi(
  currentPage?: number,
  pageSize?: number,
  keyword: string = ''
) {
  if (!currentPage || !pageSize) {
    return request.get(`/admin/leaveMessage/list?keyword=${keyword}`);
  }

  return request.get(
    '/admin/leaveMessage/list?' +
      `currentPage=${currentPage}&pageSize=${pageSize}&keyword=${keyword}`
  );
}
