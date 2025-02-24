import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

/**
 * 批量删除文件/单文件删除
 * @param { string | string[] } path 文件路径，多文件传入一个文件路径数组
 */
export function batchDeleteFiles(path: string | string[]): Promise<boolean> {
	return new Promise((resolve, reject) => {
		// 单文件删除
		if (typeof path === 'string') {
			try {
				fs.unlinkSync(path);
				resolve(true);
			} catch (error: unknown) {
				reject(error as Error);
			}
			return;
		}

		// 多文件删除
		if (path instanceof Array) {
			path.forEach((item: string): void => {
				try {
					fs.unlinkSync(item);
				} catch (error: unknown) {
					reject(error as Error);
				}
			});
			resolve(true);
			return;
		}
		throw new Error('参数 `path` 类型错误，应为 string | string[]');
	});
}

/**
 * 获取文件 MD5
 * @param { string } filePath 文件路径
 */
export function getFileMD5(filePath: string): Promise<string> {
	return new Promise((resolve, reject) => {
		const hash = crypto.createHash('md5');
		const stream = fs.createReadStream(filePath);

		stream.on('data', (data) => hash.update(data));
		stream.on('end', () => {
			const md5 = hash.digest('hex');
			resolve(md5);
		});
		stream.on('error', (err) => reject(err));
	});
}

export type FileMD5List = { file: string; md5: string }[];

/**
 * 获取目录下所有文件的 MD5
 * @param { string } dirPath 指定目录
 */
export async function getAllFilesMD5(dirPath: string) {
	const filesMD5: FileMD5List = [];

	async function traverseDir(currentPath: string) {
		const entries = await fs.promises.readdir(currentPath, { withFileTypes: true });

		for (const entry of entries) {
			const fullPath = path.join(currentPath, entry.name);

			if (entry.isDirectory()) {
				await traverseDir(fullPath); // 递归遍历子目录
			} else {
				const md5 = await getFileMD5(fullPath);
				filesMD5.push({ file: fullPath, md5 });
			}
		}
	}

	try {
		await traverseDir(dirPath);
		return filesMD5;
	} catch (error) {
		console.error('Error:', error);
		return [];
	}
}
