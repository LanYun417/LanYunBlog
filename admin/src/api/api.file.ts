import request from '@/utils/u.request';

/**
 * 文件上传
 * @param { File } file 上传文件参数
 * @param { 'yes' | 'no' } toWebp 是否转为 webp 格式
 */
export function uploadFileApi(file: any, toWebp: 'yes' | 'no' = 'no') {
  const data = new FormData();
  data.append('toWebp', toWebp);

  if (file instanceof Array) {
    file.forEach((item) => {
      data.append('file', item);
    });
    return request.post('/admin/file/upload', data);
  }

  data.append('file', file as any);
  return request.post('/admin/file/upload', data);
}

/**
 * 获取文件列表
 * @param { number } currentPage 当前页
 * @param { number } pageSize 每页获取数量
 */
export function fetchFileListApi(currentPage?: number, pageSize?: number) {
  if (!currentPage || !pageSize) {
    return request.get('/admin/file/list');
  }

  return request.get(`/admin/file/list?currentPage=${currentPage}&pageSize=${pageSize}`);
}

/**
 * 删除文件
 * @param { number | number[] } id 文件ID（批量删除用逗号 , 分隔（如：1,2,3）即可批量删除）
 */
export function deleteFileApi(id: number | number[]) {
  let ids: string = `${id}`;

  if (id instanceof Array) {
    ids = id.join(',');
  }

  return request.delete(`/admin/file/delete?ids=${ids}`);
}

/**
 * 下载文件
 * @param { number } id 文件ID
 */
export function downloadFileApi(id: number) {
  return request.get(`/admin/file/download?id=${id}`, {
    responseType: 'blob'
  });
}

/**
 * 获取图片文件列表
 * @param { number } currentPage 当前页
 * @param { number } pageSize 每页获取数量
 */
export function fetchImageFileListApi(currentPage?: number, pageSize?: number) {
  if (!currentPage || !pageSize) {
    return request.get('/admin/file/image/list');
  }

  return request.get(`/admin/file/image/list?currentPage=${currentPage}&pageSize=${pageSize}`);
}
