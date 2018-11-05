// 主框架页面
<template>
    <div id="app">
        <div class="main-content">
            <transition :name="transitionName">
                <router-view />
            </transition>
        </div>
        <div>
            <van-tabbar v-model="active">
                <van-tabbar-item icon="homeex" to="home">首页</van-tabbar-item>
                <van-tabbar-item icon="category" to="category">分类</van-tabbar-item>
                <van-tabbar-item icon="cartex" to="cart">购物车</van-tabbar-item>
                <van-tabbar-item icon="mine" to="mine">我的</van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';

// 路由索引，据此来判断进入/离开动画是往左还是往右
const routeIndex = {
    home: 0,
    category: 1,
    cart: 2,
    mine: 3,
};

export default {
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
    },
    data() {
        return {
            active: 0,
            transitionName: 'slide-left',
        };
    },
    // 接着在父组件内
    // watch $route 决定使用哪种过渡
    watch: {
        $route(to, from) {
            console.log('watchRoute', from, to);
            const fromIndex = routeIndex[from.name];
            const toIndex = routeIndex[to.name];
            this.transitionName = toIndex < fromIndex ? 'slide-right' : 'slide-left';
            this.active = toIndex;
        },
    },
};
</script>

<style lang="less">
#app {
    position: relative;
    height: 100%;
    background-color: #eee;
    // 页面主内容
    .main-content {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        > * {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 50px;
        }
    }
    // 页面底部标签栏
    .van-tabbar {
        height: 50px;
        border-top: 1px solid #eee;
        .van-tabbar-item {
            color: #aaa;
            margin-top: -5px;
            .van-icon {
                font-size: 32px;
            }
        }
        .van-tabbar-item--active {
            color: #ca6924;
        }
        .van-submit-bar {
            border-top: 1px red solid;
            border-bottom: 1px #aaa solid;
        }
    }
}
</style>
