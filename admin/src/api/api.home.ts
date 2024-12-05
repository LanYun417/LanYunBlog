import request from '@/utils/u.request';

// 获取首页数据
export function fetchHomeDataApi() {
  return request.get('/admin/home');
}
