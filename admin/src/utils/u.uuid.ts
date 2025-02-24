export function buildShortUUID(prefix = '') {
  let unique: number = 0;

  const time = Date.now();

  const random = Math.floor(Math.random() * 1000000000);

  unique++;

  return prefix + '_' + random + unique + String(time);
}
