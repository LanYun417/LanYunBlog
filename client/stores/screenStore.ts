export const useScreenStore = defineStore('screen', () => {
	const screenWidth = ref<number>(0);

	onBeforeMount(() => {
		screenWidth.value = window.innerWidth;
	});

	onMounted(() => {
		window.addEventListener('resize', () => {
			screenWidth.value = window.innerWidth;
		});
	});

	onBeforeUnmount(() => {
		window.removeEventListener('resize', () => {});
	});

	return {
		screenWidth,
	};
});
