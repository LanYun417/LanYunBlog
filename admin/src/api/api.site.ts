import type { SiteInfo } from '@/types';
import request from '@/utils/u.request';

/**
 * 新增站点信息
 * @param { object } data 站点信息
 */
export function addSiteInfoApi(data: SiteInfo) {
  return request.post('/admin/site/create', {
    siteInfo: data
  });
}

/**
 * 删除站点信息
 * @param { number | number[] } id 站点ID
 */
export function deleteSiteInfoApi(id: number | number[]) {
  let ids: string = `${id}`;

  if (id instanceof Array) {
    ids = id.join(',');
  }

  return request.delete(`/admin/site/delete?ids=${ids}`);
}

/**
 * 更新站点信息
 * @param { object } data 站点信息
 */
export function updateSiteInfoApi(data: SiteInfo) {
  return request.put('/admin/site/update', {
    siteInfo: data
  });
}

/**
 * 获取站点信息列表
 * @param { number } currentPage 当前页
 * @param { number } pageSize 每页条数
 * @param { string } keyword 搜索关键词
 */
export function fetchSiteInfoListApi(
  currentPage?: number,
  pageSize?: number,
  keyword: string = ''
) {
  if (!currentPage || !pageSize) {
    return request.get('/admin/site/list');
  }

  return request.get(
    `/admin/site/list?currentPage=${currentPage}&pageSize=${pageSize}&keyword=${keyword}`
  );
}
