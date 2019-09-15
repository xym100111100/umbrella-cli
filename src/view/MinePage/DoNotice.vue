<template>
    <div class="do-notice">
        <header class="header">
            <van-nav-bar
                title="发布公告"
                left-arrow
                @click-left="$router.go(-1)"
                @click-right="showPopup"
                right-text="我的公告"
            />
        </header>
        <div class="do-notice-content">
            <div>
                
            </div>
        </div>
    </div>
</template>

<script>
import { NavBar, Toast, Popup, Cell, Icon, Button, PullRefresh, List } from 'vant';
export default {
    components: {
        [NavBar.name]: NavBar,
        [Button.name]: Button,
        [Popup.name]: Popup,
        [Toast.name]: Toast,
        [PullRefresh.name]: PullRefresh,
        [List.name]: List,
        [Cell.name]: Cell,
        [Icon.name]: Icon,
    },
    data() {
        return {
            show: false,
        };
    },
    methods: {
        showPopup() {
            this.show = true;
        },
        choiceClass() {
            this.show = false;
        },
    },
};
</script>

<style lang="less" scoped>
html,
body {
    height: 100%;
    width: 100%;
}
.do-notice {
    height: 100vh;
    overflow: scroll;
    .do-notice-content {
        height: 100vh;
    }
}
</style>
