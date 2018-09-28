<template>
    <div id="app">
        <router-view />
        <van-tabbar v-model="active">
            <van-tabbar-item icon="home">首页</van-tabbar-item>
            <van-tabbar-item icon="category" dot>分类</van-tabbar-item>
            <van-tabbar-item icon="cart" info="5">购物车</van-tabbar-item>
            <van-tabbar-item icon="mine" info="20">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
export default {
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
    },
    data() {
        return {
            active: 0,
        };
    },
};
</script>

<style>
body {
    font-size: 24px;
    background-color: #f8f8f8;
    -webkit-font-smoothing: antialiased;
}

.van-tabbar {
    height: 60px;
}

.van-icon {
    font-size: 32px;
}

.van-tabbar-item {
    color: #aaa;
}

.van-tabbar-item--active {
    color: #ca6924;
}
</style>
