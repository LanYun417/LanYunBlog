// 文章
export interface ArticleItem {
	id: number;
	title: string;
	cover?: string;
	categoryId?: number;
	categoryName: string;
	secCategoryId?: number;
	secCategoryName: string;
	tags: [
		{
			id: number;
			name: string;
		}
	];
	category?: any;
	content: string;
	views: number;
	createdAt?: string;
	publishTime?: string;
}
export type ArticleList = ArticleItem[];

// 站点信息
export interface SiteInfo {
	id: number;
	title: string;
	keywords: string;
	description: string;
	globalStyle: string;
	globalScript: string;
	domain: string;
	logo: string;
}
export type SiteInfoList = SiteInfo[];

// 作者信息
export interface AuthorInfo {
	id: number;
	name: string;
	avatar: string;
	ps: string;
	biography: string;
	email: string;
	github: string;
	weibo: string;
	wechat: string;
	qq: number;
}
export type AuthorInfoList = AuthorInfo[];

// 文章分类
export interface CategoryItem {
	id: number;
	name: string;
	description: string;
	subCategories: [
		{
			id: number;
			name: string;
			description: string;
		}
	];
}
export type CategoryList = CategoryItem[];

// 文章标签
export interface TagItem {
	id: number;
	name: string;
	description: string;
	articleCount: number;
	createdAt: string;
	updatedAt: string;
}
export type TagList = TagItem[];

// 选择树
export interface SelectTreeItem {
	value: string;
	label: string;
	children?: SelectTreeItem[];
}
export type SelectTree = SelectTreeItem[];

// 友链 View
export interface FriendlyLinkView {
	id: number;
	name: string;
	url: string;
	icon: string;
	description: string;
}
export type FriendlyLinkList = FriendlyLinkView[];

// 友链 Create
export interface FriendlyLinkCreate {
	name: string;
	url: string;
	icon: string;
	description: string;
	email: string;
	remark: string;
	verifyCode?: string;
}

// 照片
export interface PhotoItem {
	id: number;
	url: string;
	description: string;
}
export type PhotoList = PhotoItem[];
