import dayjs from 'dayjs';

/**
 * 计算指定日期（YYYY-MM-DD）至今的天数差。
 * @param dateString 指定日期的字符串表示，格式为 'YYYY-MM-DD'
 * @returns 如果日期无效，则返回 -1；否则返回经过的天数。
 */
export function getDaysElapsedSince(dateString: string): number {
	// 解析传入的日期字符串
	const startDate = new Date(dateString);
	if (isNaN(startDate.getTime())) {
		return -1; // 返回 -1 表示无效日期
	}

	// 获取当前时间的 Date 对象
	const currentDate = new Date();

	// 将日期对象转换为 UTC 以处理时区差异
	const utcStart = Date.UTC(
		startDate.getFullYear(),
		startDate.getMonth(),
		startDate.getDate()
	);
	const utcCurrent = Date.UTC(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		currentDate.getDate()
	);

	// 计算天数差
	const elapsedDays = Math.floor((utcCurrent - utcStart) / (1000 * 60 * 60 * 24));

	return elapsedDays;
}

/**
 * 将指定的天数转换为年、月、日的形式。
 * @param days 要转换的天数
 * @returns 包含年、月、日的对象
 */
export function convertDaysToYearsMonthsDays(days: number): {
	years: number;
	months: number;
	days: number;
} {
	if (days <= 0) {
		return { years: 0, months: 0, days: 0 };
	}

	let years = 0;
	let months = 0;
	let remainingDays = days;

	// 计算年份
	if (remainingDays >= 365) {
		years = Math.floor(remainingDays / 365);
		remainingDays %= 365;
	}

	// 计算月份
	if (remainingDays >= 30) {
		months = Math.floor(remainingDays / 30);
		remainingDays %= 30;
	}

	// 剩余的天数即为最终的天数
	const finalDays = remainingDays;

	return { years, months, days: finalDays };
}

// 获取日期
export function getDateString(date: string | number): string {
	return new Date(date).toLocaleDateString();
}

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
