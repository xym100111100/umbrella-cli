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
        redirect: '/hunter',
        component: () => import('./view/MainPage/Main'),
        children: [
            {
                name: 'hunter',
                path: '/hunter',
                component: () => import('./view/HunterPage/Hunter'),
                meta: {
                    index: 1,

                },
            },
            {
                name: 'home',
                path: '/home',
                component: () => import('./view/HomePage/Home'),
                meta: {
                    index: 1,

                },
            },
            {
                name: 'store',
                path: '/store',
                component: () => import('./view/StorePage/Store'),
                meta: {
                    index: 1,

                },
            },

            {
                name: 'find',
                path: '/find',
                component: () => import('./view/FindPage/Find'),
                meta: {
                    index: 1,


                },

            },
            {
                name: 'msg',
                path: '/msg',
                component: () => import('./view/MsgPage/Msg'),
                meta: {
                    index: 1,


                },
            },
            {
                name: 'cart',
                path: '/cart',
                component: () => import('./view/CartPage/Cart'),
                meta: {
                    index: 1,

                },
            },
            {
                name: 'mine',
                path: '/mine',
                component: () => import('./view/MinePage/Mine'),
                meta: {
                    index: 1,

                },
            },
        ],
    },

    {
        name: 'text',
        path: '/text',
        component: () => import('./view/MsgPage/Text'),
        meta: {
            index: 2,
        },
    },

    {
        name: 'msg-chat',
        path: '/msg-chat',
        component: () => import('./view/MsgPage/Chat'),
        meta: {
            index: 5,
        },
    },
    {
        name: 'add-hunter',
        path: '/add-hunter',
        component: () => import('./view/HunterPage/AddHunter'),
        meta: {
            index: 2,
        },
    },
    {
        name: 'get-hunter',
        path: '/get-hunter',
        component: () => import('./view/HunterPage/GetHunter'),
        meta: {
            index: 2,
        },
    },
    {
        name: 'login-fail',
        path: '/login-fail',
        component: () => import('./view/LoginPage/LoginFail'),
        meta: {
            index: 2,
        },
    },
    {
        name: 'school',
        path: '/mine/school',
        component: () => import('./view/MinePage/School'),
        meta: {
            index: 2,

        },
    },
    {
        name: 'notice',
        path: '/mine/notice',
        component: () => import('./view/MinePage/Notice'),
        meta: {
            index: 2,

        },
    },
    {
        name: 'do-notice',
        path: '/mine/do-notice',
        component: () => import('./view/MinePage/DoNotice'),
        meta: {
            index: 5,
        },
    },
    {
        name: 'my-notice',
        path: '/mine/my-notice',
        component: () => import('./view/MinePage/MyNotice'),
        meta: {
            index: 3,
        },
    },
    {
        name: 'driver-school',
        path: '/mine/driver-school',
        component: () => import('./view/MinePage/DriverSchool'),
        meta: {
            index: 5,
        },
    },
    {
        name: 'school-register',
        path: '/mine/school-register',
        component: () => import('./view/MinePage/SchoolRegister'),
        meta: {
            index: 10,
        },
    },
    {
        name: 'signup-detail',
        path: '/mine/signup-detail',
        component: () => import('./view/MinePage/SignupDetail'),
        meta: {
            index: 12,
        },
    },
    {
        name: 'shop',
        path: '/mine-shop',
        component: () => import('./view/MinePage/Shop'),
        meta: {
            index: 2,

        },
    },
    {
        name: 'online-good',
        path: '/mine-online-good',
        component: () => import('./view/MinePage/OnlineGood'),
        meta: {
            index: 3,

        },
    },
    {
        name: 'corridor',
        path: '/mine/corridor',
        component: () => import('./view/MinePage/Corridor'),
        meta: {
            index: 2,

        },
    },
    {
        name: 'portTimeJop',
        path: '/mine/portTimeJop',
        component: () => import('./view/MinePage/PortTimeJop'),
        meta: {
            index: 2,

        },
    },
    {
        name: 'union',
        path: '/mine/union',
        component: () => import('./view/MinePage/Union'),
        meta: {
            index: 2,

        },
    },
    {
        name: 'goods-detail',
        path: '/goods/detail',
        component: () => import('./view/GoodsPage/GoodsDetail'),
        meta: {
            index: 2,
        },
    },

];

const router = new Router({
    mode: 'history',
    routes,

});

// // 初始化时，在首页后再添加一条首页的路由
// pushHistory();

/**
 * 在首页后再添加一条首页的路由，这样就可以监听首页的回退事件，弹出退出确认框
 */
// function pushHistory() {
//     var state = {
//         title: 'title',
//         url: '#/',
//     };
//     window.history.pushState(state, 'title', '#/');
//     _isBackOrForward = false;
// }

// 记录是否是浏览器回退/前进事件
// let _isBackOrForward = false;
// 监听浏览器回退/前进事件
// window.onpopstate = e => {

//     _isBackOrForward = true;

//     const targetHash = e.target.location.hash;

// 如果当前路由是首页，弹出退出确认框(FIXME 目前分不出是forward还是back，在首页forward时也会弹出此退出框)
// if (window.currentRoute === 'home') {
//     Dialog.confirm({
//         title: '退出程序',
//         message: '您确认要退出程序？',
//     })
//         .then(() => {
//             wx.closeWindow();
//         })
//         .catch(() => {
//             // 在首页取消后再添加一条首页的路由
//             pushHistory();
//         });
// }
// };

// router.beforeEach((to, from, next) => {
//     console.log("ddddd")
// 如果是首页回退事件，不要跳转到其它页
// if (_isBackOrForward && from.name === 'home') {
//     console.log("======")
//     _isBackOrForward = false;
//     next(false);
//     return;
// }

//     const title = to.meta && to.meta.title;
//     if (title) {
//         document.title = title;
//     }
//     next();
// });

/**
 * 在每次跳转路由之后，记录当前的路由
 */
// router.afterEach((to, from) => {
//     _isBackOrForward = false;
//     window.currentRoute = to.name;
// });

export { router };
