export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive('scale', {
		beforeMount(el) {
			// 当目标元素出现时，执行平滑缩放动画
			el.style.transition = 'transform 0.5s';
			el.style.opacity = '0';
			el.style.transform = 'scale(0.3)';
			let ob: any = new IntersectionObserver((entries) => {
				entries.forEach((item) => {
					if (item.isIntersecting) {
						(item.target as HTMLElement).style.opacity = '1';
						(item.target as HTMLElement).style.transform = 'scale(1)';
						ob.unobserve(item.target);
						ob = undefined;
					}
				});
			});
			ob.observe(el);
		},
		beforeUnmount(el) {
			// 清除样式
			el.style.transition = '';
			el.style.opacity = '';
			el.style.transform = '';
		},
	});
});
