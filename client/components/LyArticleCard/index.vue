<template>
	<!-- 文章卡片 -->
	<div class="ly-article-card">
		<nuxt-link :to="url">
			<div
				class="w-full h-64 transition-all duration-500 dark:hover:shadow-sm rounded-md">
				<!-- 文章封面 -->
				<div class="cover w-full h-28">
					<img
						:src="cover"
						class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
						alt="article cover" />
				</div>
				<!-- 文章信息 -->
				<div class="article-info w-full h-14">
					<!-- 文章标题 -->
					<div class="article-title w-full pl-2 flex mt-2 items-center justify-between">
						<h2
							:title="title"
							class="w-10/12 text-slate-500 dark:text-slate-300 truncate text-lg font-bold tracking-wider">
							{{ title }}
						</h2>
						<div
							v-show="views !== 0"
							class="pr-3 flex items-center text-sm text-slate-500 dark:text-slate-300">
							<el-icon class="mr-2">
								<View />
							</el-icon>
							{{ views }}
						</div>
					</div>
					<!-- 文章分类 -->
					<div class="category ml-2 flex items-center my-1">
						<!-- 发布时间 -->
						<div
							title="发布时间"
							class="publish-time text-sm flex items-center justify-end text-slate-500 dark:text-slate-300 mr-1">
							<el-icon><Calendar /></el-icon>
							<span class="ml-1">{{ publishTime }}</span>
						</div>
						<!-- 文章分类 -->
						<div
							class="text-sm flex text-slate-500 dark:text-slate-300 items-center"
							title="文章分类">
							<el-icon class="mr-1"><List /></el-icon>
							<el-breadcrumb separator-icon="ArrowRight">
								<el-breadcrumb-item v-for="c in category">
									<span>
										{{ c }}
									</span>
								</el-breadcrumb-item>
							</el-breadcrumb>
						</div>
					</div>
					<!-- 文章摘要 -->
					<div class="abstract px-2">
						<p class="text-slate-600 dark:text-slate-400">
							{{ abstract }}
						</p>
					</div>
				</div>
			</div>
		</nuxt-link>
	</div>
</template>

<script lang="ts">
export default defineComponent({
	name: 'LyArticleCard',
	props: {
		// 文章 URL
		url: {
			type: String,
			required: true,
		},
		// 文章封面
		cover: {
			type: String,
			default: '/images/background-img.png',
		},
		// 文章标题
		title: {
			type: String,
			default: '文章标题',
		},
		views: {
			type: Number,
			default: 0,
		},
		// 发布时间
		publishTime: {
			type: String,
			default: '2024-01-01',
		},
		// 文章分类（[一级分类名称, 二级分类名称]）
		category: {
			type: Array as () => string[],
			default: () => ['技术分享', 'Vue'],
		},
		// 文章摘要
		abstract: {
			type: String,
			default: `
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus, reiciendis
      quos nostrum earum aliquam consequuntur nisi blanditiis ut doloremque
      voluptatem est id, perspiciatis autem doloribus debitis asperiores eveniet sed
      voluptates? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus,
      reiciendis quos nostrum earum aliquam consequuntur nisi blanditiis ut
      doloremque voluptatem est id, perspiciatis autem doloribus debitis asperiores
      eveniet sed voluptates?
      `,
		},
	},
});
</script>

<style lang="scss" scoped>
// 文章封面
.cover {
	overflow: hidden;
	border-top-left-radius: 0.375rem;
	border-top-right-radius: 0.375rem;
}

// 文章摘要
.abstract {
	line-clamp: 3;
	overflow: hidden;
	display: -webkit-box;
	box-orient: vertical;
	-webkit-line-clamp: 3; // 控制多行的行数
	-webkit-box-orient: vertical;
}
</style>
