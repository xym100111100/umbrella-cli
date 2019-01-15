// 主框架页面
<template>
  <div id="app">
    <!-- <div class="main-content"> -->
    <transition
      :name="transitionName"
      @after-leave="afterLeave"
    >
      <router-view />
    </transition>
    <!-- </div> -->
    <van-tabbar v-model="active">
      <van-tabbar-item
        icon="tabbar-home"
        to="home"
      >首页</van-tabbar-item>
      <van-tabbar-item
        icon="tabbar-find"
        to="category"
      >查找</van-tabbar-item>
      <van-tabbar-item
        icon="tabbar-msg"
        to="cart"
      >消息</van-tabbar-item>
      <van-tabbar-item
        icon="tabbar-cart"
        to="cart"
      >购物车</van-tabbar-item>
      <van-tabbar-item
        icon="tabbar-mine"
        to="mine"
      >我的</van-tabbar-item>
    </van-tabbar>
    <!-- </div> -->
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
    methods: {
        afterLeave() {
            this.$root.$emit('triggerScroll');
        },
        //     /**
        //      * 滚动时保存滚动条位置
        //      */
        //     scroll() {
        //         console.log(this.$refs.content.scrollTop);
        //         this.scrollTop = this.$refs.content.scrollTop;
        //     },
    },
    // /**
    //  * 回退时回归保存的滚动条位置
    //  */
    // activated() {
    //     this.$refs.content.scrollTop = this.scrollTop;
    // },
    // 接着在父组件内
    // watch $route 决定使用哪种过渡
    watch: {
        // $route(to, from) {
        //     console.log('watchRoute', from, to);
        //     const fromIndex = routeIndex[from.name];
        //     const toIndex = routeIndex[to.name];
        //     this.transitionName = toIndex < fromIndex ? 'slide-right' : 'slide-left';
        //     this.active = toIndex;
        // },
    },
};
</script>

<style lang="less">
// 底部标签栏高度
@bottom-height: 1.5rem;

#app {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    // height: 100%;
    background-color: #eee;
    // display: flex;
    // flex-direction: column;
    // 页面主内容
    > .main-content {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        bottom: @bottom-height;
        // flex-grow: 1;
        // display: flex;
        // position: absolute;
        // left: 0;
        // top: 0;
        // right: 0;
        // bottom: 0;
        // > * {
        //     position: absolute;
        //     left: 0;
        //     top: 0;
        //     right: 0;
        //     bottom: 1.5rem;
        // }
    }
    // 页面底部标签栏
    > .van-tabbar {
        // position: unset;
        // width: unset;
        // bottom: unset;
        // left: unset;
        height: @bottom-height;
        // flex-grow: 0;
        border-top: 1px solid #ddd;
        background-color: white;
        .van-tabbar-item {
            color: #666;
            margin-top: -6px;
            // 图标下部的字体大小
            font-size: 0.35rem;
            font-weight: bolder;
            .van-icon {
                // 图标的大小
                font-size: 0.9rem;
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
