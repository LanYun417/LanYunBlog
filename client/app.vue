<template>
	<div class="ly-blog relative z-50">
		<nuxt-route-announcer />
		<header>
			<div class="ly-header">
				<ly-top-nav :nav-list="navStore.navList" />
			</div>
		</header>
		<div class="container transition-all duration-500 mx-auto mt-5 p-2">
			<main>
				<nuxt-page />
				<ly-back-top />
			</main>
			<footer>
				<div class="py-2">
					<ly-card>
						<ly-copy-right />
					</ly-card>
				</div>
			</footer>
		</div>
	</div>
	<NuxtParticles id="tsparticles" url="/json/nuxt-particles.config.json" @load="onLoad" />
</template>

<script name="App" lang="ts" setup>
import 'element-plus/dist/index.css';
import type { SiteInfo } from './types';
import { useNavStore } from './stores/navStore';
import 'element-plus/theme-chalk/dark/css-vars.css';
import type { Container } from '@tsparticles/engine';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

// 站点信息配置
const siteStore = useSiteStore();
await siteStore.getSiteInfo();
const siteInfo = computed<SiteInfo>(() => siteStore.siteInfo);

// 作者信息配置
const authorStore = useAuthorStore();
await authorStore.getAuthorInfo();

// 获取文章分类列表
const categoryStore = useCategoryStore();
await categoryStore.getArticleCategoryList();

// 获取文章列表
const articleStore = useArticleStore();
await articleStore.getArticleList();

// 获取文章标签列表
const tagStore = useTagStore();
await tagStore.getArticleTagList();

useHead({
	title: siteInfo.value.title,
	meta: [
		{ name: 'keywords', content: siteInfo.value.keywords },
		{ name: 'description', content: siteInfo.value.description },
	],
	script: [{ innerHTML: siteInfo.value.globalScript }],
	style: [{ innerHTML: siteInfo.value.globalStyle }],
	htmlAttrs: { lang: 'zh-CN' },
});

useSeoMeta({
	title: siteInfo.value.title,
	ogTitle: siteInfo.value.title,
	description: siteInfo.value.description,
	ogDescription: siteInfo.value.description,
});

// 顶部导航列表 Store
const navStore = useNavStore();

// Nuxt Particles
const onLoad = (container: Container) => {
	container.play();
};
</script>

<style lang="scss">
// 全局样式

* {
	scroll-behavior: smooth;
}

html,
body {
	width: 100%;
	height: 100%;

	&::-webkit-scrollbar {
		width: 0.3125rem;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 0.625rem;
		background-color: #409eff;
	}

	&::-webkit-scrollbar-track {
		background-color: #999;
	}
}

// 白昼模式
html {
	background-color: #eee;
	transition: background-color 0.5s !important;
}

// 深色模式
html.dark {
	background-color: #0f172a;
}

// Vue Transition
.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
