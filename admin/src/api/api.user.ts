import type { AdminUser } from '@/types';
import { md5 } from '@/utils/u.crypto';
import request from '@/utils/u.request';

/**
 * 用户登录
 * @param { string } username 用户名
 * @param { string } password 密码
 */
export function loginApi(username?: string, password?: string, captchaToken?: string) {
  if (!username && !password) {
    return request.post('/admin/user/login');
  }

  return request.post('/admin/user/login', {
    username,
    password: md5(password),
    captchaToken
  });
}

/**
 * 用户修改密码
 * @param { object } password 密码对象
 */
export function changePasswordApi(password: { oldPassword: string; newPassword: string }) {
  return request.patch('/admin/user/updatePassword', {
    oldPassword: md5(password.oldPassword),
    newPassword: md5(password.newPassword)
  });
}

// 获取用户信息
export function fetchUserInfoApi() {
  return request.get('/admin/user/profile');
}

/**
 * 更新用户信息
 * @param { object } user 用户信息
 */
export function updateUserInfoApi(user: { nickname: string; avatar: string }) {
  return request.patch('/admin/user/update', {
    user
  });
}

/**
 * 新增管理用户
 * @param { object } data 用户信息
 */
export function addAdminUserApi(data: AdminUser) {
  return request.post('/admin/user/create', {
    user: {
      ...data,
      password: md5(data.password)
    }
  });
}

/**
 * 删除管理用户
 * @param { number | number[] } id 标签ID
 */
export function deleteAdminUserApi(id: number | number[]) {
  let ids: string = `${id}`;

  if (id instanceof Array) {
    ids = id.join(',');
  }

  return request.delete(`/admin/user/delete?ids=${ids}`);
}

/**
 * 获取管理员用户列表
 * @param { number } currentPage 当前页
 * @param { number } pageSize 每页条数
 * @param { string } keyword 搜索关键词
 */
export function fetchAdminUserList(currentPage?: number, pageSize?: number, keyword: string = '') {
  if (!currentPage || !pageSize) {
    return request.get('/admin/user/list');
  }

  return request.get(
    `/admin/user/list?currentPage=${currentPage}&pageSize=${pageSize}&keyword=${keyword}`
  );
}
