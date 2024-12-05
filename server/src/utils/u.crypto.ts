import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';

/**
 * md5加密
 * @param { * } content 要加密的内容
 */
export function md5(content: any): string {
	return crypto.createHash('md5').update(content).digest('hex');
}

/**
 * sha256 加密
 * @param { * } content 要加密的内容
 */
export function sha256(content: any): string {
	return crypto.createHash('sha256').update(content).digest('hex');
}

/**
 * 生成 TOKEN
 * @param { * } payload TOKEN 内容
 * @param { number } expiresIn TOKEN 过期时间（天）
 */
export function signToken(payload: any, expiresIn: number): Promise<string | undefined> {
	return new Promise((resolve, reject): void => {
		jwt.sign(
			payload,
			process.env.TOKEN_SECRET || 'secret',
			{ expiresIn: `${expiresIn}d` },
			(err: Error | null, token: string | undefined): void => {
				if (err) {
					reject(err);
					return;
				}
				resolve(token);
			}
		);
	});
}

/**
 * 解析 TOKEN
 * @param { string } token TOKEN
 */
export function verifyToken(token: string): Promise<any> {
	return new Promise((resolve, reject): void => {
		jwt.verify(
			token,
			process.env.TOKEN_SECRET || 'secret',
			(
				err: jwt.VerifyErrors | null,
				decoded: string | jwt.JwtPayload | undefined
			): void => {
				if (err) {
					reject(err);
					return;
				}
				resolve(decoded);
			}
		);
	});
}
