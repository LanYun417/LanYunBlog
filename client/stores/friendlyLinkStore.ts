import type { FriendlyLinkCreate, FriendlyLinkList } from '~/types';

export const useFriendlyLinkStore = defineStore('friendlyLink', () => {
	const { $request } = useNuxtApp();

	// 友链列表
	const friendlyLinkList = ref<FriendlyLinkList>([]);

	// 获取友链列表
	const getFriendlyLinkList = async (): Promise<void> => {
		const result: any = await $request('/client/friendlyLink/list');

		if (result.code === 200) {
			friendlyLinkList.value = result.list;
		}
	};

	// 申请友链
	const applyFriendlyLink = async (
		data: FriendlyLinkCreate,
		captchaToken: string
	): Promise<void> => {
		const result: any = await $request('/client/friendlyLink/apply', {
			body: {
				friendlyLink: { ...data },
				captchaToken,
			},
			method: 'POST',
		});

		if (result.code === 201) {
			ElMessage.success(result.message);
		}
	};

	return {
		friendlyLinkList,
		applyFriendlyLink,
		getFriendlyLinkList,
	};
});
