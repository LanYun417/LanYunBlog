import type { NavList } from '~/components/LyTopNav/index.vue';

// Element Plus Icons https://element-plus.org/zh-CN/component/icon.html
export const useNavStore = defineStore('navStore', () => {
	const navList: NavList = [
		{
			name: '首页',
			path: '/',
			icon: 'HomeFilled',
		},
		{
			name: '分类',
			path: '/category',
			icon: 'List',
		},
		{
			name: '标签',
			path: '/tags',
			icon: 'Ticket',
		},
		{
			name: '友链',
			path: '/friendlyLink',
			icon: 'HelpFilled',
		},
		{
			name: '相册',
			path: '/photoAlbum',
			icon: 'PictureFilled',
		},
		{
			name: '留言',
			path: '/leaveMessage',
			icon: 'Promotion',
		},
		{
			name: '关于',
			path: '/about',
			icon: 'InfoFilled',
		},
	];

	return {
		navList,
	};
});
