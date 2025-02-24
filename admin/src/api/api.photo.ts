import type { Photo } from '@/types';
import request from '@/utils/u.request';

/**
 * 照片上传
 * @param { File } file 文件
 * @param { 'yes' | 'no' } toWebp 是否转换为 webp 格式
 */
export function uploadPhotoApi(file: any, desc: string, toWebp: 'yes' | 'no' = 'no') {
  const data = new FormData();
  data.append('toWebp', toWebp);
  data.append('description', desc);

  if (file instanceof Array) {
    file.forEach((item) => {
      data.append('photo', item);
    });
    return request.post('/admin/photo/upload', data);
  }

  data.append('photo', file as any);
  return request.post('/admin/photo/upload', data);
}

/**
 * 删除照片
 * @param { number | number[] } id 照片ID
 */
export function deletePhotoApi(id: number | number[]) {
  let ids: string = `${id}`;

  if (id instanceof Array) {
    ids = id.join(',');
  }

  return request.delete(`/admin/photo/delete?ids=${ids}`);
}

/**
 * 更新照片信息
 * @param { object } data 照片信息
 */
export function updatePhotoApi(data: Photo) {
  return request.put('/admin/photo/update', {
    photo: data
  });
}

/**
 * 获取照片列表
 * @param { number } currentPage 当前页
 * @param { number } pageSize 每页条数
 * @param { string } keyword 搜索关键词
 */
export function fetchPhotoListApi(currentPage?: number, pageSize?: number, keyword: string = '') {
  if (!currentPage || !pageSize) {
    return request.get(`/admin/photo/list?keyword=${keyword}`);
  }

  return request.get(
    `/admin/photo/list?currentPage=${currentPage}&pageSize=${pageSize}&keyword=${keyword}`
  );
}

/**
 * 下载照片
 * @param { number } id 照片ID
 */
export function downloadPhotoApi(id: number) {
  return request.get(`/client/photo/download?id=${id}`, {
    responseType: 'blob'
  });
}
