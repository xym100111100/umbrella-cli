import './common/rem';
import Vue from 'vue';
import App from './App.vue';
import { router } from './router';

// 导入自定义字体图标
import './assets/iconfont/custom.less';
import './assets/css/custom.less';

new Vue({
    router,
    el: '#app',
    render: h => h(App),
});
