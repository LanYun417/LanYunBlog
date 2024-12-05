import svgCaptcha from 'svg-captcha';
import { NextFunction, Request, Response } from 'express';

export function getHandle(req: Request, res: Response, next: NextFunction): void {
	const captcha = svgCaptcha.create();

	// 将验证码文本存储在会话中，以便后续验证
	req.session['captcha'] = captcha.text;

	res.type('svg');

	captcha.data = captcha.data
		.replace('width="150"', 'width="100%"')
		.replace('height="50"', 'height="100%"');

	res.status(200).send(captcha.data);
}
