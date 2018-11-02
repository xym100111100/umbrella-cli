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
                meta: {
                    level: '00',
                },
            },
            {
                name: 'category',
                path: '/category',
                component: () => import('./view/Category'),
                meta: {
                    level: '01',
                },
            },
            {
                name: 'cart',
                path: '/cart',
                component: () => import('./view/Cart'),
                meta: {
                    level: '02',
                },
            },
            {
                name: 'mine',
                path: '/mine',
                component: () => import('./view/Mine'),
                meta: {
                    level: '03',
                },
            },
        ],
    },
    {
        name: 'goods',
        path: '/goods',
        component: () => import('./page/Goods'),
        meta: {
            level: '05',
        },
    },
    {
        path: '/login/fail',
        component: () => import('./page/LoginFail'),
        level: '99',
    },
];

// add route path
routes.forEach(route => {
    route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

// 初始化时，在首页后再添加一条首页的路由
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
    window.isBack = false;
}

window.isBack = false;
// 监听浏览器回退事件
window.onpopstate = e => {
    console.log('onpopstate', e);

    window.isBack = true;
    // 如果当前路由是首页，弹出退出确认框
    console.log('targetRoute', e.target.location.hash);
    if (window.currentRoute === 'home') {
        Dialog.confirm({
            title: '退出程序',
            message: '您确认要退出程序？',
        })
            .then(() => {
                wx.closeWindow();
            })
            .catch(() => {
                // 在首页取消后再添加一条首页的路由
                pushHistory();
            });
    }
};

router.beforeEach((to, from, next) => {
    console.log('beforeEach', from, to);

    // 如果是首页回退事件，不要跳转到其它页
    if (window.isBack && from.name === 'home') {
        window.isBack = false;
        next(false);
        return;
    }
    window.isBack = false;

    const title = to.meta && to.meta.title;
    if (title) {
        document.title = title;
    }
    next();
});

/**
 * 在每次跳转路由之后，记录当前的路由
 */
router.afterEach((to, from) => {
    console.log('afterEach', from, to);

    window.currentRoute = to.name;
});

export { router };
