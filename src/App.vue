<template>
    <router-view />
</template>

<style lang="less">
html,
body,
#app {
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

#app {
    display: flex;
    flex-direction: column;
}

.van-dialog__header {
    font-size: 1em;
}
.van-dialog__message {
    font-size: 1em !important;
}
</style>
