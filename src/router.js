import { Dialog } from 'vant';
import Vue from 'vue';
import Router from 'vue-router';
import * as wx from 'weixin-js-sdk';

Vue.use(Router);

const routes = [
    {
        path: '*',
        redirect: '/main',
    },
    {
        name: 'main',
        path: '/main',
        redirect: '/home',
        component: () => import('./page/Main'),
        children: [
            {
                name: 'home',
                path: '/home',
                component: () => import('./view/Home'),
            },
            {
                name: 'category',
                path: '/category',
                component: () => import('./view/Category'),
            },
            {
                name: 'cart',
                path: '/cart',
                component: () => import('./view/Cart'),
            },
            {
                name: 'mine',
                path: '/mine',
                component: () => import('./view/Mine'),
            },
        ],
    },
    {
        name: 'goods',
        path: '/goods',
        component: () => import('./page/Goods'),
    },
    {
        path: '/login/fail',
        component: () => import('./page/LoginFail'),
    },
];

// add route path
routes.forEach(route => {
    route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

// 监听浏览器回退事件
window.onpopstate = () => {
    // 如果当前路由是首页，弹出退出确认框
    if (window.currentRoute === 'home') {
        Dialog.confirm({
            title: '退出程序',
            message: '您确认要退出程序？',
        })
            .then(() => {
                wx.closeWindow();
            })
            .catch(() => {
                pushHistory();
            });
    }
};

pushHistory();

/**
 * 在首页后再添加一条首页的路由，这样就可以监听首页的回退事件，弹出退出确认框
 */
function pushHistory() {
    var state = {
        title: 'title',
        url: '#/',
    };
    window.history.pushState(state, 'title', '#/');
}

router.beforeEach((to, from, next) => {
    const title = to.meta && to.meta.title;
    if (title) {
        document.title = title;
    }
    next();
});

/**
 * 在每次跳转路由之后，记录当前的路由
 */
router.afterEach(to => {
    window.currentRoute = to.name;
});

export { router };
