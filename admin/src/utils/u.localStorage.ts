/**
 * 设置 localStorage
 * @param { string } key 键
 * @param { any } value 值
 */
export function localStorageSet(key: string, value: any): any {
  localStorage.setItem(`ly-admin-${key}`, value);
  return value;
}

/**
 * 获取 localStorage
 * @param key 键
 */
export function localStorageGet(key: string): any {
  return localStorage.getItem(`ly-admin-${key}`);
}

/**
 * 删除 localStorage
 * @param key 键
 */
export function localStorageRemove(key: string): void {
  localStorage.removeItem(`ly-admin-${key}`);
}
