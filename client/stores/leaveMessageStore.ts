export const useLeaveMessageStore = defineStore('leaveMessage', () => {
	const { $request } = useNuxtApp();

	// 发布留言
	const publishLeaveMessage = async (
		data: {
			email: string;
			message: string;
		},
		captchaToken: string
	): Promise<void> => {
		const result: any = await $request('/client/leaveMessage/create', {
			body: {
				message: { ...data, verifyCode: undefined },
				captchaToken,
			},
			method: 'POST',
		});

		if (result.code === 201) {
			ElMessage.success(result.message);
		}
	};

	return {
		publishLeaveMessage,
	};
});
