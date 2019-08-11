import 'amfe-flexible';
import Vue from 'vue';
// vue-navigation主要实现浏览器回退返回之前缓存页面时回滚之前位置
// import Navigation from 'vue-navigation';
import App from './App.vue';
import { router } from './router';
import store from './store';
// 导入自定义字体图标
import './assets/iconfont/custom.less';
// 导入切换路由时的过渡动画
import './assets/css/transition.less';

// Vue.use(Navigation, { router });
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});
