<template>
	<div class="friendly-link-card">
		<!-- 友链站点图标 -->
		<nuxt-link
			target="_blank"
			class="w-full h-16 bg-white dark:bg-slate-700 duration-500 rounded-md flex transition-all items-center justify-center shadow-md hover:shadow-2xl"
			:to="url">
			<div class="icon w-9 h-9 rounded-full overflow-hidden shadow-md">
				<img crossorigin="anonymous" class="w-full h-full" :src="icon" alt="icon" />
			</div>
			<!-- 友链站点信息 -->
			<div class="site-info flex items-center flex-col ml-2">
				<!-- 友链站点名称 -->
				<div class="name w-full text-left truncate">
					<span class="text-sm font-bold text-sky-500 dark:text-sky-300" :title="name">
						{{ name }}
					</span>
				</div>
				<!-- 友链站点描述 -->
				<div class="description w-full text-left truncate">
					<span class="text-xs text-slate-500 dark:text-slate-300" :title="description">
						{{ description }}
					</span>
				</div>
			</div>
		</nuxt-link>
	</div>
</template>

<script lang="ts">
export default defineComponent({
	name: 'LyFriendlyLinkCard',
	props: {
		// 友链地址
		url: {
			type: String,
			default: '/',
		},
		// 友链图标
		icon: {
			type: String,
			default: '/images/logo.png',
		},
		// 友链名称
		name: {
			type: String,
			default: '友链名称',
		},
		// 友链描述
		description: {
			type: String,
			default: '友链描述',
		},
	},
});
</script>

<style lang="scss" scoped>
.friendly-link-card {
	transition: transform 0.3s;

	&:hover {
		transform: translateY(-0.3125rem);
	}
}

.site-info {
	width: calc(100% - 4rem);
}
</style>
