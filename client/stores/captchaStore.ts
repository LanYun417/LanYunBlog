export const useCaptchaStore = defineStore('captcha', () => {
	const { $request } = useNuxtApp();

	const captcha = ref<string>('');

	// 获取验证码
	const t_getCaptcha = async () => {
		const result: any = await $request('/client/captcha/get', {
			responseType: 'text',
		});

		captcha.value = result;
	};
	const getCaptcha = useThrottle(t_getCaptcha, 1000);

	// 校验验证码
	const verifyCaptcha = async (captcha: string) => {
		const result: any = await $request('/client/captcha/verify', {
			query: { captcha },
			method: 'POST',
			withCredentials: true,
		});

		if (result.code === 200) {
			return {
				success: true,
				token: result.token,
			};
		}
		return {
			success: false,
			token: '',
		};
	};

	return { captcha, getCaptcha, verifyCaptcha };
});
