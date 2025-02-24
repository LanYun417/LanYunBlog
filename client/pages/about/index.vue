<template>
	<div class="about-page">
		<ly-author-card />
		<!-- 关于 -->
		<ly-card>
			<div class="p-3">
				<h2
					class="flex items-center font-bold text-lg pl-3 text-sky-500 dark:text-slate-300">
					<el-icon class="mr-1"><InfoFilled /></el-icon>
					关于
				</h2>
			</div>
			<div class="about pb-2">
				<div v-scale class="text-slate-600 dark:text-slate-300 mb-5">
					<p
						class="text-center px-3 font-bold transition-colors duration-500 hover:text-sky-500">
						{{ authorInfo.biography }}
					</p>
					<p
						class="text-sm text-center font-bold mt-3 transition-colors duration-500 hover:text-sky-500">
						欢迎加入QQ交流群：316054036🎈
					</p>
				</div>
				<!-- 联系方式 -->
				<div
					class="concat flex flex-wrap items-center justify-center text-slate-500 dark:text-slate-300">
					<i
						@click="copyToClipboard(authorInfo.qq + '')"
						class="bi bi-tencent-qq transition-colors duration-500 hover:text-sky-500 text-lg mx-2 cursor-pointer"
						title="QQ"></i>
					<i
						@click="copyToClipboard(authorInfo.wechat + '')"
						class="bi bi-wechat mx-2 transition-colors duration-500 hover:text-sky-500 text-lg cursor-pointer"
						title="微信"></i>
					<nuxt-link :to="authorInfo.github" target="_blank">
						<i
							class="bi bi-github transition-colors duration-500 hover:text-sky-500 text-lg mx-2 cursor-pointer"
							title="GitHub"></i>
					</nuxt-link>
					<nuxt-link :to="authorInfo.weibo">
						<i
							class="bi bi-sina-weibo transition-colors duration-500 hover:text-sky-500 text-lg mx-2 cursor-pointer"
							title="微博"></i>
					</nuxt-link>
					<i
						@click="copyToClipboard(authorInfo.email + '')"
						class="bi bi-envelope-at-fill transition-colors duration-500 hover:text-sky-500 text-lg mx-2 cursor-pointer"
						title="邮箱"></i>
				</div>
			</div>
		</ly-card>
	</div>
</template>

<script name="AboutPage" lang="ts" setup>
import type { AuthorInfo, SiteInfo } from '~/types';

// 作者信息配置
const authorStore = useAuthorStore();
const authorInfo = computed<AuthorInfo>(() => authorStore.authorInfo);

const siteInfo = computed<SiteInfo>(() => {
	return useSiteStore().siteInfo;
});
useHead({
	title: `${siteInfo.value.title} - 关于`,
	meta: [
		{ name: 'keywords', content: siteInfo.value.keywords },
		{ name: 'description', content: authorInfo.value.biography },
	],
});
</script>

<style lang="scss" scoped>
.bi {
	transition: transform 0.3s;

	&:hover {
		transform: rotate(360deg);
	}
}
</style>
