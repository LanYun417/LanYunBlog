<template>
	<!-- 顶部导航 -->
	<nav>
		<div
			:style="{ top: showNav ? '0' : '-4rem' }"
			class="ly-top-nav w-full h-16 transition-all duration-500 fixed overflow-hidden z-20 bg-white dark:bg-[#1e293b] shadow-lg dark:shadow-cyan-500/50">
			<!-- PC端导航 -->
			<div
				class="pc-nav w-full h-full flex justify-between items-center"
				v-show="!showMobileNav">
				<!-- Logo区域 -->
				<div class="px-2">
					<ly-logo />
				</div>
				<!-- 导航列表 -->
				<div class="pc-nav-list">
					<ul class="h-full flex items-center">
						<li class="nav-item mx-3" v-for="item in navList">
							<nuxt-link
								class="text-sm flex items-center font-bold text-slate-500 dark:text-slate-300 duration-500 hover:text-sky-500"
								:to="item.path">
								<el-icon class="mr-[2px]" :size="16">
									<component :is="item.icon"></component>
								</el-icon>
								{{ item.name }}
							</nuxt-link>
						</li>
					</ul>
				</div>
				<!-- 深色模式切换 -->
				<div class="dark-mode px-2">
					<el-switch
						v-model="darkStore.isDark"
						:active-value="false"
						:inactive-value="true"
						active-action-icon="Sunny"
						inactive-action-icon="Moon" />
				</div>
			</div>

			<!-- 手机端导航 -->
			<div
				class="mobile-nav w-full h-full flex justify-between items-center"
				v-show="showMobileNav">
				<!-- Logo区域 -->
				<div class="px-2">
					<ly-logo />
				</div>
				<div class="flex items-center h-full px-2">
					<!-- 深色模式切换 -->
					<div class="dark-mode mr-5">
						<el-switch
							size="small"
							v-model="darkStore.isDark"
							:active-value="false"
							:inactive-value="true"
							active-action-icon="Sunny"
							inactive-action-icon="Moon" />
					</div>
					<!-- 导航开关 -->
					<div
						class="nav-button h-full flex items-center justify-center px-2 text-slate-600 dark:text-slate-300">
						<el-icon class="cursor-pointer" :size="20" @click="showMobileNavList = true">
							<Fold />
						</el-icon>
					</div>
					<!-- 导航列表 -->
					<transition>
						<div
							class="mobile-nav-container w-full h-full fixed left-0 top-0 z-50"
							v-show="showMobileNavList">
							<div
								class="nav-mask w-full h-full absolute left-0 right-0 z-10"
								@click="showMobileNavList = false"></div>
							<div
								class="mobile-nav-list h-full duration-500 bg-white dark:bg-[#1e293b] absolute z-30 right-0 shadow-lg"
								:style="{ width: `${showMobileNavList ? '13.75rem' : '0'}` }">
								<div
									class="w-full h-16 flex items-center justify-between text-slate-600 dark:text-slate-300 px-4">
									<div class="ml-1">
										<ly-logo />
									</div>
									<el-icon
										class="cursor-pointer"
										:size="20"
										@click="showMobileNavList = false">
										<Expand />
									</el-icon>
								</div>
								<ul class="w-full" style="height: calc(100% - 4rem)">
									<el-scrollbar class="w-full h-full">
										<li
											class="nav-item w-fit max-w-[85%] flex n mx-auto my-5"
											v-for="item in navList">
											<nuxt-link
												:to="item.path"
												:title="item.name"
												@click="showMobileNavList = false"
												class="text-sm flex items-center font-bold text-slate-500 dark:text-slate-300 duration-500 hover:text-sky-500">
												<el-icon class="mr-[2px]" :size="16">
													<component :is="item.icon"></component>
												</el-icon>
												{{ item.name }}
											</nuxt-link>
										</li>
									</el-scrollbar>
								</ul>
							</div>
						</div>
					</transition>
				</div>
			</div>
		</div>
		<div class="w-full h-16"></div>
	</nav>
</template>

<script lang="ts">
export type NavList = Array<{
	path: string; // 导航路径
	name: string; // 导航名称
	icon: string; // 导航图标 Element Plus Icons https://element-plus.org/zh-CN/component/icon.html
}>;

export default defineComponent({
	name: 'LyTopNav',
	props: {
		navList: {
			type: Array as () => NavList,
			default: () => [],
		},
	},
	setup() {
		const darkStore = useDarkStore();

		// 响应式导航
		const screenWidth = ref<number>(0);
		// 是否显示移动端导航
		const showMobileNav = computed<boolean>(() => {
			return screenWidth.value <= 768;
		});
		// 是否显示移动端导航列表
		const showMobileNavList = ref<boolean>(false);
		watch(showMobileNavList, (val: boolean) => {
			if (val) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = 'auto';
			}
		});

		// 是否显示导航栏
		const showNav = ref(true);
		const scrollTop = ref<number>(0);
		watch(scrollTop, (newVal: number, oldVal: number) => {
			if (newVal > oldVal) {
				showNav.value = false;
			} else {
				showNav.value = true;
			}
		});

		onMounted(() => {
			screenWidth.value = window.innerWidth;
			window.addEventListener('resize', () => {
				screenWidth.value = window.innerWidth;
			});

			window.addEventListener('scroll', () => {
				scrollTop.value = document.documentElement.scrollTop;
			});
		});

		onBeforeUnmount(() => {
			window.removeEventListener('resize', () => {});
			window.removeEventListener('scroll', () => {});
		});

		return {
			showNav,
			darkStore,
			showMobileNav,
			showMobileNavList,
		};
	},
});
</script>

<style lang="scss" scoped>
.nav-item {
	position: relative;

	&::after {
		left: 0;
		width: 0;
		bottom: 0;
		content: '';
		height: 0.125rem;
		position: absolute;
		background-color: #409eff;
		transition: width 0.3s ease-in-out;
	}

	&:hover {
		&::after {
			width: 100%;
		}
	}
}

.mobile-nav-container {
	backdrop-filter: blur(0.625rem);
	-webkit-backdrop-filter: blur(0.625rem);
	background-color: rgba(0, 0, 0, 0.3);
}
</style>
