import { createApp } from 'vue';
import App from './App.vue';
import router from '../router';
import Element from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/index.css'
import '../public/all.css'
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8080/"

const app = createApp(App);
app.use(Element).use(router);
app.mount('#app');
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}