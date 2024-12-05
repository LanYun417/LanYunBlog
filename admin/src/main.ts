import App from './App.vue';
import router from './router';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './assets/style/global.scss';
import './assets/style/tailwind.css';
import 'element-plus/dist/index.css';
import ElementPlus from 'element-plus';
import * as MyComponents from './components/index';
import 'element-plus/theme-chalk/dark/css-vars.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App);

// Element Plus Icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 注册全局组件
for (const [key, component] of Object.entries(MyComponents)) {
  app.component(key, component);
}

app.use(ElementPlus, {
  locale: zhCn
});

app.use(router);
app.use(createPinia());

app.mount('#app');
