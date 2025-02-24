import ElementPlus from 'element-plus';
import { defineNuxtPlugin } from '#app';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

export default defineNuxtPlugin((nuxtApp) => {
	// Element Plus Icons
	for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
		nuxtApp.vueApp.component(key, component);
	}

	// Element Plus i18n
	nuxtApp.vueApp.use(ElementPlus, {
		locale: zhCn,
	});
});
