<template>
	<!-- 卡片 -->
	<div
		class="ly-card w-full m-auto h-full relative bg-white dark:bg-slate-700 rounded-md duration-500 shadow-md hover:shadow-2xl transition-all"
		@mousemove="handleShadowMove"
		@mouseleave="shadowVisible = false">
		<div
			class="card-shadow w-full h-full rounded-md absolute top-0 overflow-hidden left-0 z-0">
			<transition>
				<!-- 随鼠标移动阴影 -->
				<div
					class="shadow w-40 h-40 bg-sky-500 absolute rounded-full z-0"
					v-show="shadowVisible"
					ref="shadow"></div>
			</transition>
		</div>
		<div class="card-content w-full h-full relative rounded-md z-10">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
export default defineComponent({
	name: 'LyCard',
	setup() {
		const shadow = ref<HTMLElement>();
		const shadowVisible = ref<boolean>(false);

		// 阴影移动
		const handleShadowMove = (e: MouseEvent) => {
			if (!shadowVisible.value) {
				shadowVisible.value = true;
			}

			const cardRect = (e.currentTarget as HTMLElement).getBoundingClientRect();

			const x = e.clientX - cardRect.left;
			const y = e.clientY - cardRect.top;

			if (shadow.value) {
				shadow.value.style.top = `${y}px`;
				shadow.value.style.left = `${x}px`;
			}
		};

		return {
			shadow,
			shadowVisible,
			handleShadowMove,
		};
	},
});
</script>

<style lang="scss" scoped>
.shadow {
	filter: blur(4.375rem);
	transform: translate(-50%, -50%);
}
</style>
