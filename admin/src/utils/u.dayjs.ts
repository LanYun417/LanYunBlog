import dayjs from 'dayjs';

/**
 * 格式化时间字符串
 * @param date 时间字符串
 * @param format 格式化字符串，默认值：YYYY-MM-DD HH:mm:ss
 * @returns { string }
 */
export function formatDate(date: string, format?: string): string {
  if (!date) {
    throw new Error('date is required');
  }

  if (!format) {
    format = 'YYYY-MM-DD HH:mm:ss';
  }

  return dayjs(date).format(format);
}
