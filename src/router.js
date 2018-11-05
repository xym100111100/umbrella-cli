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
                    index: 0,
                },
            },
            {
                name: 'category',
                path: '/category',
                component: () => import('./view/Category'),
                meta: {
                    index: 1,
                },
            },
            {
                name: 'cart',
                path: '/cart',
                component: () => import('./view/Cart'),
                meta: {
                    index: 20,
                },
            },
            {
                name: 'mine',
                path: '/mine',
                component: () => import('./view/Mine'),
                meta: {
                    index: 3,
                },
            },
        ],
    },
    {
        name: 'goods',
        path: '/goods',
        component: () => import('./page/Goods'),
        meta: {
            index: 4,
        },
    },
    {
        path: '/login/fail',
        component: () => import('./page/LoginFail'),
        meta: {
            index: 99,
        },
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
    _isBackOrForward = false;
}

// 记录是否是浏览器回退/前进事件
let _isBackOrForward = false;
// 监听浏览器回退/前进事件
window.onpopstate = e => {
    console.log('onpopstate', e);

    _isBackOrForward = true;

    const targetHash = e.target.location.hash;
    console.log(window.currentRoute, targetHash);

    // 如果当前路由是首页，弹出退出确认框(FIXME 目前分不出是forward还是back，在首页forward时也会弹出此退出框)
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
    if (_isBackOrForward && from.name === 'home') {
        _isBackOrForward = false;
        next(false);
        return;
    }

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
    _isBackOrForward = false;
    window.currentRoute = to.name;
});

export { router };
