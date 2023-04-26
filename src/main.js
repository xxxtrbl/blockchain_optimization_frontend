import { createApp } from 'vue';
import App from './App.vue';
import router from '../router';
import Element from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as echarts from 'echarts';
import 'element-plus/theme-chalk/index.css';
import '../public/all.css';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:9090/"

const app = createApp(App);
app.config.globalProperties.$echarts = echarts;
app.use(Element).use(router);
app.mount('#app');
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}