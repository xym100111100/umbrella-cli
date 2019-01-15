<template>
  <navigation>
    <!-- <router-view /> -->
    <!-- <div> -->
    <!-- <keep-alive> -->
    <router-view />
    <!-- <router-view v-if="$route.meta.isKeepAlive" /> -->
    <!-- </keep-alive> -->
    <!-- <router-view v-if="!$route.meta.isKeepAlive" /> -->
    <!-- </div> -->
  </navigation>
</template>
<script>
import { Dialog } from 'vant';
import * as wx from 'weixin-js-sdk';
export default {
    // data() {
    // return {
    //     transitionName: 'slide-left',
    // };
    // },
    // 接着在父组件内
    // watch $route 决定使用哪种过渡
    // watch: {
    //     $route(to, from) {
    //         console.log('watchRoute', from, to);
    //         // this.transitionName = to.meta.index < from.meta.index ? 'slide-right' : 'slide-left';
    //     },
    // },
    created() {
        // bind event
        this.$navigation.on('forward', (to, from) => {
            console.log('forward:\r\n to', to, '\r\nfrom', from);
        });
        this.$navigation.on('back', (to, from) => {
            console.log('back:\r\n to', to, '\r\nfrom', from);
        });
        this.$navigation.on('replace', (to, from) => {
            console.log('replace:\r\n to', to, '\r\nfrom', from);
        });
        this.$navigation.on('refresh', (to, from) => {
            console.log('refresh:\r\n to', to, '\r\nfrom', from);
        });
        this.$navigation.on('reset:', (to, from) => {
            console.log('reset:\r\n to', to, '\r\nfrom', from);
        });
    },
};
</script>

<style lang="less">
* {
    margin: 0;
    padding: 0;
}

html,
body {
    height: 100%;
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
