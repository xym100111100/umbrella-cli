import Vue from 'vue';
import Router from 'vue-router';

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
];

// add route path
routes.forEach(route => {
    route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
    const title = to.meta && to.meta.title;
    if (title) {
        document.title = title;
    }
    next();
});

export { router };
