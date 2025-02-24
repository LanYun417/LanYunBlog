import crypto from 'crypto-js';

/**
 * MD5加密
 * @param payload 加密数据
 * @returns { string } 加密后的字符串
 */
export function md5(payload: any): string {
  return crypto.MD5(payload).toString();
}
