import userRouter from './user/index';
import fileRouter from './file/index';
import siteRouter from './site/index';
import photoRouter from './photo/index';
import authorRouter from './author/index';
import express, { Router } from 'express';
import accessRouter from './access/index';
import articleRouter from './article/index';
import permissionRouter from './permission/index';
import { homeHandle } from './handler/home.handle';
import friendlyLinkRouter from './friendlyLink/index';
import leaveMessageRouter from './leaveMessage/index';
import { permissionsValidation } from '@/middleware/permissionsValidation';

const router: Router = express.Router();

// 首屏数据
router.get('/home', homeHandle);

// 用户模块
router.use('/user', userRouter);

// 站点管理模块
router.use('/site', permissionsValidation('admin'), siteRouter);

// 文件模块
router.use('/file', permissionsValidation('admin'), fileRouter);

// 照片模块
router.use('/photo', permissionsValidation('admin'), photoRouter);

// 作者信息模块
router.use('/author', permissionsValidation('admin'), authorRouter);

// 访问记录
router.use('/access', permissionsValidation('admin'), accessRouter);

// 文章模块
router.use('/article', permissionsValidation('admin'), articleRouter);

// 管理员用户权限模块
router.use('/permission', permissionsValidation('admin'), permissionRouter);

// 留言模块
router.use('/leaveMessage', permissionsValidation('admin'), leaveMessageRouter);

// 友情链接模块
router.use('/friendlyLink', permissionsValidation('admin'), friendlyLinkRouter);

export default router;
