import 'nprogress/nprogress.css';
import nProgress from 'nprogress';

export default defineNuxtPlugin((nuxtApp) => {
	const request = $fetch.create({
		baseURL: useRuntimeConfig().public.baseUrl,
		credentials: 'include', // 跨域请求携带 cookie
		// 请求拦截器
		onRequest({ request, options, error }) {
			if (import.meta.client) {
				// 开始进度条
				nProgress.start();

				const token = localStorageGet('authorization');
				options.headers = {
					Authorization: token,
					...options.headers,
				};
			}
		},
		onRequestError() {
			if (import.meta.client) {
				// 结束进度条
				nProgress.done();
			}
		},
		onResponseError({ response, error }) {
			if (import.meta.client) {
				// 结束进度条
				nProgress.done();
			}

			ElMessage.error(response._data.message);
		},
		onResponse() {
			if (import.meta.client) {
				// 结束进度条
				nProgress.done();
			}
		},
	});

	// Expose to useNuxtApp().$request
	return {
		provide: {
			request,
		},
	};
});
