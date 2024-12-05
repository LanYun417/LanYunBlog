// 侧边栏导航项
export interface SideNavItem {
  name: string;
  path: string;
  children?: SideNavItem[];
  meta: {
    title: string;
    icon?: string;
    hidden?: boolean;
  };
}

// 侧边栏导航列表
export type SideNavList = SideNavItem[];

// 标签页
export interface TabItem {
  name: string;
  title: string;
  closable: boolean; // 是否可关闭
}

// 标签页列表
export type TabList = TabItem[];
