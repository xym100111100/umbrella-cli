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
// 过滤动画
.slide-enter-active,
.slide-leave-active {
    transform: translate(-100%, 0);
}

.slide-enter,
.slide-leave-to {
    opacity: 0;
    transform: translate(100%, 0);
}

.top {
    opacity: 0.7;
    height: 1.1rem;
    width: 1.1rem;
    border-radius: 50%;
    // border-radius: 0.1rem;
    background-color: black;
    border: 2px solid #ddd;
    position: fixed;
    bottom: 13%;
    right: 4%;
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

