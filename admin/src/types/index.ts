// 站点信息
export interface SiteInfo {
  id?: number;
  title: string;
  keywords: string;
  description: string;
  globalStyle: string;
  globalScript: string;
  domain: string;
  logo: string;
  isUse: 'yes' | 'no';
  createdAt?: string;
  updatedAt?: string;
}
export type SiteInfoList = SiteInfo[];

// 作者信息
export interface AuthorInfo {
  id?: number;
  avatar: string;
  name: string;
  ps: string;
  biography: string; // 作者简介
  qq: string;
  wechat: string;
  email: string;
  github: string;
  weibo: string;
  isUse: 'yes' | 'no';
  createdAt?: string;
  updatedAt?: string;
}
export type AuthorInfoList = AuthorInfo[];

// 文章
export interface ArticleCreate {
  id?: number;
  title: string;
  cover: string;
  content: string;
  categoryId: number;
  secCategoryId: number;
  tagsId: number[];
}
export interface ArticleItem {
  id: number;
  title: string;
  cover: string;
  categoryId: number;
  categoryName: string;
  secCategoryId: number;
  secCategoryName: string;
  tags: [
    {
      id: number;
      name: string;
    }
  ];
  views: number;
  content: string;
  publishTime: string;
}
export type ArticleList = ArticleItem[];

// 文章标签
export interface ArticleTag {
  id?: number;
  name: string;
  description: string;
  articleCount?: number;
  createdAt?: string;
  updatedAt?: string;
}
export type ArticleTagList = ArticleTag[];

// 一级文章分类
export interface ArticleCategory {
  id?: number;
  name: string;
  description: string;
  articleCount?: number;
  createdAt?: string;
  updatedAt?: string;
}
export type ArticleCategoryList = ArticleCategory[];

// 二级文章分类
export interface ArticleSecCategory {
  id?: number;
  name: string;
  description: string;
  articleCount?: number;
  parentId?: number;
  parentName?: string;
  parentDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}
export type ArticleSecCategoryList = ArticleSecCategory[];

// 文章分类树
export interface ArticleCategoryTree {
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
export type ArticleCategoryTreeList = ArticleCategoryTree[];

// 管理用户
export interface AdminUser {
  id?: number;
  nickname: string;
  avatar: string;
  username: string;
  permissionId?: number;
  permissionName?: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}
export type AdminUserList = AdminUser[];

// 管理员权限
export interface AdminPermission {
  id?: number;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}
export type AdminPermissionList = AdminPermission[];

// 文件信息
export interface FileInfo {
  id: number;
  name: string;
  path: string;
  url: string;
  md5: string;
  mimetype: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

// 文件信息
export interface FileInfo {
  id: number;
  name: string;
  mimetype: string;
  path: string;
  md5: string;
  size: number;
  url: string;
  selected?: boolean;
  createdAt: string;
  updatedAt: string;
}
export type FileList = FileInfo[];

// 友链
export interface FriendlyLink {
  id?: number;
  name: string;
  url: string;
  icon: string;
  status: 'pending' | 'approved' | 'rejected'; // pending: 待审核、 approved: 已通过、rejected: 已拒绝
  remark: string;
  email: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}
export type FriendlyLinkList = FriendlyLink[];

// 照片
export interface Photo {
  id?: number;
  url?: string;
  path?: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}
export type PhotoList = Photo[];

// 首页数据
export interface HomeData {
  siteUrl: string;
  tagCount: number;
  articleCount: number;
  siteViewCount: number;
  todayTagCount: number;
  articleViewCount: number;
  todayArticleCount: number;
  todaySiteViewCount: number;
  todayArticleViewCount: number;
}

// 留言
export interface LeaveMessage {
  id: number;
  email: string;
  message: string;
  ip: string;
  country: string;
  province: string;
  city: string;
  isp: string;
  createdAt: string;
  updatedAt: string;
}
export type LeaveMessageList = LeaveMessage[];

// 访问记录
export interface AccessInfo {
  id: number;
  method: string;
  url: string;
  ip: string;
  country: string;
  province: string;
  city: string;
  isp: string;
  createdAt: string;
  updatedAt: string;
}
export type AccessList = AccessInfo[];
