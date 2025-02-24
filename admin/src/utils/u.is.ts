const toString = Object.prototype.toString;

/**
 * 判断是否是指定类型
 * @param { any } val 要判断的值
 * @param { string } type 指定类型
 * @returns { boolean }
 */
export function is(val: any, type: string): boolean {
  return toString.call(val) === `[object ${type}]`;
}

/**
 * 判断是否是字符串
 * @param val 要判断的值
 * @returns { boolean }
 */
export function isNumber(val: any): boolean {
  return is(val, 'Number');
}
