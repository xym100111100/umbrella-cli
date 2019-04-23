<template>
    <transition :name="transitionName">
        <!-- <transition name="fade" mode="out-in"> -->
        <!-- @after-leave="afterLeave" -->
        <keep-alive>
            <router-view class="transition-view" />
        </keep-alive>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            transitionName: 'slide-left',
        };
    },
    // 接着在父组件内
    // watch $route 决定使用哪种过渡
    watch: {
        $route(to, from) {
            //   console.log('watchRoute', from, to);
            if (to.meta.index < from.meta.index) this.transitionName = 'slide-right';
            else if (to.meta.index > from.meta.index) this.transitionName = 'slide-left';
            else this.transitionName = undefined;
            //   console.log('transitionName:', this.transitionName);
        },
    },
};
</script>

<style lang="less" scoped>
* {
    margin: 0;
    padding: 0;
    font-family: PingFang-SC-Regular, Helvetica Neue, Helvetica, microsoft yahei, sans-serif;
}

// 不显示滚动条
::-webkit-scrollbar {
    display: none;
}

body {
    // font-size: 24px;
    background-color: #f8f8f8;
    -webkit-font-smoothing: antialiased;
}
</style>
