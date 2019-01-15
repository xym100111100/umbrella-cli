import 'amfe-flexible';
import Vue from 'vue';
import Navigation from 'vue-navigation';
import App from './App.vue';
import { router } from './router';
// 导入自定义字体图标
import './assets/iconfont/custom.less';

Vue.use(Navigation, { router });
new Vue({
    el: '#app',
    router,
    render: h => h(App),
});
