<template>
	<div class="ly-author-card">
		<div
			class="author-info-container w-full h-80 flex flex-col items-center justify-center transition-all">
			<!-- 作者头像 -->
			<img
				class="avatar w-24 h-24 rounded-full border-4 shadow-lg border-white dark:shadow-slate-600"
				:src="authorInfo.avatar"
				alt="avatar" />
			<!-- 作者名称 -->
			<p class="name mt-2 tracking-wide font-bold text-sky-500 text-lg">
				{{ authorInfo.name }}
			</p>
			<!-- 个性签名 -->
			<div class="personal-signature text-center">
				<p
					class="text-sm text-slate-500 dark:text-slate-300 duration-500 transition-colors hover:text-sky-500">
					{{ authorInfo.ps }}
				</p>
			</div>
			<!-- 社交方式 -->
			<div class="contact w-full flex justify-center mt-3">
				<nuxt-link :to="authorInfo.github" target="_blank">
					<button
						class="githubBtn px-10 py-1 text-sm duration-500 bg-sky-500 text-white hover:bg-sky-400">
						<i class="bi bi-github mr-1"></i>
						Follow Me
					</button>
				</nuxt-link>
			</div>
			<!-- 站点信息 -->
			<div class="site-info mt-3">
				<!-- 文章相关 -->
				<div class="about-article flex">
					<!-- 文章数量 -->
					<div class="article-count mx-3 cursor-pointer">
						<nuxt-link to="/">
							<div class="text-lg text-slate-500 dark:text-slate-300 font-bold">文章</div>
							<div class="text-center text-sky-400 dark:text-sky-500">
								{{ articleCount }}
							</div>
						</nuxt-link>
					</div>
					<!-- 文章分类数量 -->
					<div class="category-count mx-3 cursor-pointer">
						<nuxt-link to="/category">
							<div class="text-lg text-slate-500 dark:text-slate-300 font-bold">分类</div>
							<div class="text-center text-sky-400 dark:text-sky-500">
								{{ categoryCount }}
							</div>
						</nuxt-link>
					</div>
					<!-- 文章标签数量 -->
					<div class="tag-count mx-3 cursor-pointer">
						<nuxt-link to="/tags">
							<div class="text-lg text-slate-500 dark:text-slate-300 font-bold">标签</div>
							<div class="text-center text-sky-400 dark:text-sky-500">{{ tagCount }}</div>
						</nuxt-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import type { AuthorInfo } from '~/types';

export default defineComponent({
	name: 'LyAuthorCard',
	setup() {
		const authorStore = useAuthorStore();
		const authorInfo = computed<AuthorInfo>(() => authorStore.authorInfo);

		// 文章数量
		const articleCount = computed<number>(() => {
			return useArticleStore().articleCount;
		});

		// 分类数量
		const categoryCount = computed<number>(() => {
			return useCategoryStore().categoryCount;
		});

		// 标签数量
		const tagCount = computed<number>(() => {
			return useTagStore().tagCount;
		});

		return {
			tagCount,
			authorInfo,
			articleCount,
			categoryCount,
		};
	},
});
</script>

<style lang="scss" scoped>
.avatar {
	transition: transform 0.3s;

	&:hover {
		transform: scale(1.1);
	}
}

@media screen and (max-width: 768px) {
	.author-info-container {
		height: 16.25rem;
		margin-bottom: 0.625rem;
	}
}
</style>
