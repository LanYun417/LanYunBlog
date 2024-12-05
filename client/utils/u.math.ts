/**
 * 生成一个 min - max 之间的随机数
 * @param min 最小值
 * @param max 最大值
 * @returns { number }
 */
export function random(min: number, max: number): number {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
