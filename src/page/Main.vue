<template>
    <div id="app">
        <div class="main-content">
            <router-view />
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

<style lang="less">
#app {
    background-color: #eee;
    .main-content {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
    .van-tabbar--fixed {
        left: unset;
        bottom: unset;
        position: unset;
    }

    // 底部标签栏
    .van-tabbar {
        height: 50px;
        border-top: 1px solid #eee;
        .van-tabbar-item {
            margin-top: -5px;
            .van-icon {
                font-size: 32px;
            }
        }
    }

    .van-submit-bar {
        border-top: 1px red solid;
        border-bottom: 1px #aaa solid;
    }

    .van-tabbar-item {
        color: #aaa;
    }

    .van-tabbar-item--active {
        color: #ca6924;
    }
}
</style>
