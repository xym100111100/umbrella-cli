<template>
  <transition name="slide">
    <!-- 回到顶部的组件 -->
    <div
      class="top transition-view"
      @click="handelClick"
    >
      <van-icon name="top" />
      <!-- <div class="title">顶部</div> -->
    </div>
  </transition>
</template>
<script>
import { Icon } from 'vant';

export default {
    name: 'top',
    components: {
        [Icon.name]: Icon,
    },
    methods: {
        handelClick() {
            this.$emit('click');
        },
    },
};
</script>
<style lang="less" >
@width: 1.1rem;
@height: @width;

// 过滤动画
.transition-view {
    transition: all 0.5s cubic-bezier(0.49, 0.01, 0.33, 1);
}
.slide-enter-active,
.slide-leave-active {
    transform: translate(0, -150%);
}

.slide-enter,
.slide-leave-to {
    opacity: 0;
    transform: translate(0, 150%);
}

.top {
    opacity: 0.7;
    width: @width;
    height: @height;
    border-radius: 50%;
    // border-radius: 0.1rem;
    background-color: black;
    border: 2px solid #ddd;
    position: fixed;
    bottom: 10%;
    left: calc(~'50% - @{width}/2');
    z-index: 999;
    text-align: center;
    color: white;
    .van-icon-top {
        font-size: 0.6rem;
        position: relative;
        // // top: 0.05rem;
        top: -0.26rem;
        // left: 0.01rem;
    }
    // .title {
    //     font-family: monospace;
    //     font-size: 0.35rem;
    //     position: relative;
    //     // bottom: 0.15rem;
    //     left: 0.02rem;
    //     bottom: 0.75rem;
    // }
}
</style>

