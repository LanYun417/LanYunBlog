<template>
	<!-- Logo -->
	<div v-once class="ly-logo">
		<nuxt-link class="flex items-center" to="/">
			<img class="w-4 h-4" :src="siteInfo.logo" alt="logo" />
			<h1 class="ml-1 text-sm font-bold text-sky-500 tracking-widest">
				{{ siteInfo.title }}
			</h1>
		</nuxt-link>
	</div>
</template>

<script lang="ts">
import type { SiteInfo } from '~/types';

export default defineComponent({
	name: 'LyLogo',
	setup() {
		const siteInfo = computed<SiteInfo>(() => {
			return useSiteStore().siteInfo;
		});

		return {
			siteInfo,
		};
	},
});
</script>
