import request from '@/utils/u.request';
import type { AdminPermission } from '@/types';

/**
 * 新增管理员权限
 * @param { object } data 权限信息
 */
export function addAdminPermissionApi(data: AdminPermission) {
  return request.post('/admin/permission/create', {
    permission: data
  });
}

/**
 * 删除管理员权限
 * @param { number | number[] }  id 权限ID
 */
export function deleteAdminPermissionApi(id: number | number[]) {
  let ids: string = `${id}`;

  if (id instanceof Array) {
    ids = id.join(',');
  }

  return request.delete(`/admin/permission/delete?ids=${ids}`);
}

/**
 * 更新管理员权限信息
 * @param { object } data 权限信息
 */
export function updateAdminPermissionApi(data: AdminPermission) {
  return request.put('/admin/permission/update', {
    permission: data
  });
}

/**
 * 获取管理权限列表
 * @param { number } currentPage 当前页
 * @param { number } pageSize 每页条数
 * @param { string } keyword 搜索关键词
 */
export function fetchAdminPermissionList(
  currentPage?: number,
  pageSize?: number,
  keyword: string = ''
) {
  if (!currentPage || !pageSize) {
    return request.get('/admin/permission/list');
  }

  return request.get(
    `/admin/permission/list?currentPage=${currentPage}&pageSize=${pageSize}&keyword=${keyword}`
  );
}
