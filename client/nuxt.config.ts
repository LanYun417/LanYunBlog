import VueSetupExtend from 'vite-plugin-vue-setup-extend';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	runtimeConfig: {
		public: {
			baseUrl: 'http://localhost:7077',
		},
	},
	modules: [
		'@nuxtjs/tailwindcss',
		'@element-plus/nuxt',
		'nuxt-lodash',
		'nuxt-particles',
		[
			'@pinia/nuxt',
			{
				autoImports: [
					// 自动引入 `defineStore()`
					'defineStore',
					// 自动引入 `defineStore()` 并重命名为 `definePiniaStore()`
					['defineStore', 'definePiniaStore'],
				],
			},
		],
	],
	vite: {
		plugins: [VueSetupExtend()],
	},
	devServer: {
		port: 3000,
	},
});
