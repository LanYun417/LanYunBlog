import Joi from 'joi';

// 字段校验

// 创建用户校验
export const userSchema = Joi.object({
	avatar: Joi.string().uri().required(),
	nickname: Joi.string().min(2).required(),
	username: Joi.string().min(2).required(),
	password: Joi.string().min(8).required(),
	permissionId: Joi.number().min(1).required(),
});

// 密码校验
export const passwordSchema = Joi.string()
	.min(8) // 密码最小长度为8
	.max(32) // 密码最大长度为32
	.pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d]+$')) // 密码必须包含至少一个字母和一个数字
	.required()
	.messages({
		'string.base': '密码必须是字符串',
		'string.empty': '密码不能为空',
		'string.min': '密码长度不能少于 {#limit} 个字符',
		'string.max': '密码长度不能超过 {#limit} 个字符',
		'string.pattern.base': '密码必须包含至少一个字母和一个数字',
		'any.required': '密码是必填字段',
	});

// 创建文章校验
export const articleSchema = Joi.object({
	title: Joi.string().min(1).required(),
	cover: Joi.string().uri().required(),
	content: Joi.string().min(1).required(),
	categoryId: Joi.number().min(1).required(),
	secCategoryId: Joi.number().min(1).required(),
	tagsId: Joi.array().min(1).items(Joi.number()).required(),
});

// 文章更新校验
export const articleUpdateSchema = Joi.object({
	id: Joi.number().min(1).required(),
	title: Joi.string().min(1).required(),
	cover: Joi.string().uri().required(),
	content: Joi.string().min(1).required(),
	categoryId: Joi.number().min(1).required(),
	secCategoryId: Joi.number().min(1).required(),
	tagsId: Joi.array().min(1).items(Joi.number()).required(),
});

// 创建一级文章分类/标签校验
export const categoryTagSchema = Joi.object({
	name: Joi.string().min(2).required(),
	description: Joi.string().min(2).required(),
});

// 一级文章分类/标签更新校验
export const categoryTagUpdateSchema = Joi.object({
	id: Joi.number().min(1).required(),
	name: Joi.string().min(2).required(),
	description: Joi.string().min(2).required(),
});

// 创建二级文章分类校验
export const secCategorySchema = Joi.object({
	name: Joi.string().min(2).required(),
	description: Joi.string().min(2).required(),
	parentId: Joi.number().min(1).required(),
});

// 二级文章分类更新校验
export const secCategoryUpdateSchema = Joi.object({
	id: Joi.number().min(1).required(),
	name: Joi.string().min(2).required(),
	description: Joi.string().min(2).required(),
	parentId: Joi.number().min(1).required(),
});

// 创建友链校验
export const friendlyLinkSchema = Joi.object({
	name: Joi.string().min(1).required(),
	url: Joi.string().uri().required(),
	icon: Joi.string().uri().required(),
	status: Joi.string().valid('pending', 'approved', 'rejected').required(),
	description: Joi.string().min(2).required(),
	email: Joi.string().email().required(),
	remark: Joi.string().min(0),
});

// 友链更新校验
export const friendlyLinkUpdateSchema = Joi.object({
	id: Joi.number().min(1).required(),
	name: Joi.string().min(1).required(),
	url: Joi.string().uri().required(),
	icon: Joi.string().uri().required(),
	status: Joi.string().valid('pending', 'approved', 'rejected').required(),
	description: Joi.string().min(2).required(),
	email: Joi.string().email().required(),
	remark: Joi.string().min(0),
});

// 申请友链校验
export const friendlyLinkApplySchema = Joi.object({
	name: Joi.string().min(1).required(),
	url: Joi.string().uri().required(),
	icon: Joi.string().uri().required(),
	email: Joi.string().email().required(),
	description: Joi.string().min(2).required(),
	remark: Joi.string().min(0),
});

// 发布留言校验
export const messageSchema = Joi.object({
	email: Joi.string().email().required(),
	message: Joi.string().min(2).required(),
});

// 更新照片信息交谈
export const photoUpdateSchema = Joi.object({
	id: Joi.number().min(1).required(),
	description: Joi.string().min(2).required(),
});

// 创建站点信息校验
export const siteInfoSchema = Joi.object({
	title: Joi.string().min(2).required(),
	keywords: Joi.string().min(0).required(),
	description: Joi.string().min(0).required(),
	logo: Joi.string().uri().required(),
	globalStyle: Joi.string().min(0),
	globalScript: Joi.string().min(0),
	isUse: Joi.string().valid('yes', 'no').required(),
	domain: Joi.string().uri().required(),
});

// 更新站点信息校验
export const siteInfoUpdateSchema = Joi.object({
	id: Joi.number().min(1).required(),
	title: Joi.string().min(2).required(),
	keywords: Joi.string().min(0).required(),
	description: Joi.string().min(0).required(),
	logo: Joi.string().uri().required(),
	globalStyle: Joi.string().min(0),
	globalScript: Joi.string().min(0),
	isUse: Joi.string().valid('yes', 'no').required(),
	domain: Joi.string().uri().required(),
});

// 创建站点作者信息校验
export const authorInfoSchema = Joi.object({
	name: Joi.string().min(2).required(),
	avatar: Joi.string().uri().required(),
	ps: Joi.string().min(0),
	biography: Joi.string().min(0),
	email: Joi.string().email().required(),
	github: Joi.string().uri().min(0),
	qq: Joi.number().min(0),
	wechat: Joi.string().min(2),
	weibo: Joi.string().uri().min(0),
	isUse: Joi.string().valid('yes', 'no').required(),
});

// 更新站点作者信息校验
export const authorInfoUpdateSchema = Joi.object({
	id: Joi.number().min(1).required(),
	name: Joi.string().min(2).required(),
	avatar: Joi.string().uri().required(),
	ps: Joi.string().min(2),
	biography: Joi.string().min(2),
	email: Joi.string().email().required(),
	github: Joi.string().uri(),
	qq: Joi.number(),
	wechat: Joi.string().min(2),
	weibo: Joi.string().uri(),
	isUse: Joi.string().valid('yes', 'no').required(),
});

// 创建管理员权限校验
export const adminPermissionSchema = Joi.object({
	name: Joi.string().min(2).required(),
	description: Joi.string().min(2).required(),
});

// 更新管理员权限校验
export const adminPermissionUpdateSchema = Joi.object({
	id: Joi.number().min(1).required(),
	name: Joi.string().min(2).required(),
	description: Joi.string().min(2).required(),
});
