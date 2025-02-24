import siteRouter from './site/index';
import photoRouter from './photo/index';
import authorRouter from './author/index';
import express, { Router } from 'express';
import articleRouter from './article/index';
import captchaRouter from './captcha/index';
import friendlyLinkRouter from './friendlyLink/index';
import leaveMessageRouter from './leaveMessage/index';

const router: Router = express.Router();

// 站点管理
router.use('/site', siteRouter);

// 照片模块
router.use('/photo', photoRouter);

// 作者信息模块
router.use('/author', authorRouter);

// 验证码模块
router.use('/captcha', captchaRouter);

// 文章模块
router.use('/article', articleRouter);

// 留言模块
router.use('/leaveMessage', leaveMessageRouter);

// 友情链接模块
router.use('/friendlyLink', friendlyLinkRouter);

export default router;
