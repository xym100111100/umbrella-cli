<template>
    <transition :name="transitionName">
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
    created() {
        const user = {
            name: '小明同学',
            id: 1,
        };
        this.$store.dispatch('setUser', user);
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

html,
body {
    // font-size: 24px;
    background-color: #fafafa;
    -webkit-font-smoothing: antialiased;
}
</style>
