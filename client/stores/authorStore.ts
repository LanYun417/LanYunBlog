import type { AuthorInfo } from '~/types';

export const useAuthorStore = defineStore('author', () => {
	const { $request } = useNuxtApp();

	// 作者信息
	const authorInfo = ref<AuthorInfo>({
		id: 0,
		name: 'LanYun',
		avatar: '',
		ps: '无数普通人中的一个.',
		biography:
			'你好呀，欢迎来到蓝云博客，我是一名热爱前端技术的前端开发者，' +
			'我将在这里分享我的日常生活、技术教程、照片记录等内容，感谢您的关注。🥰',
		email: '168847242@qq.com',
		github: 'https://gitee.com/lanyun417',
		weibo: '',
		wechat: 'LanYunQAQ',
		qq: 168847242,
	});

	// 获取作者信息配置
	const getAuthorInfo = async (): Promise<void> => {
		const { data } = await useAsyncData('getAuthorInfo', () => {
			return $request('/client/author/config');
		});

		if ((data.value as any).code === 200) {
			authorInfo.value = {
				...(data.value as any).list[0],
			};
		}
	};

	return {
		authorInfo,
		getAuthorInfo,
	};
});
