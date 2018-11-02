<template>
    <transition :name="transitionName">
        <router-view />
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
            console.log('watchRoute', from, to);
            this.transitionName = to.meta.level < from.meta.level ? 'slide-right' : 'slide-left';
        },
    },
};
</script>


<style lang="less">
html,
body,
body > * {
    height: 100%;
}

// 不显示滚动条
::-webkit-scrollbar {
    display: none;
}

body {
    font-size: 24px;
    background-color: #f8f8f8;
    -webkit-font-smoothing: antialiased;
}
</style>
