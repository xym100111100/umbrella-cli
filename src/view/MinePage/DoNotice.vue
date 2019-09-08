<template>
    <div class="do-notice">
        <header class="header">
            <van-nav-bar
                title="发布公告"
                left-arrow
                @click-left="$router.go(-1)"
                @click-right="showPopup"
            />
        </header>
        <div class="do-notice-content" >
            <p>asdfffffffdsd</p>
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
            count: 0,
            isLoading: false,
            show: false,
            list: [],
            loading: false,
            finished: false,
        };
    },
    methods: {
        choiceClass() {
            this.show = false;
        },
        onLoad() {
            // 异步更新数据
            setTimeout(() => {
                for (let i = 0; i < 13; i++) {
                    this.list.push(this.list.length + 1);
                }
                // 加载状态结束
                this.loading = false;

                // 数据全部加载完成
                if (this.list.length >= 50) {
                    this.finished = true;
                }
            }, 500);
        },
        onClickRight() {},
        showPopup() {
            this.show = true;
        },
        onRefresh() {
            setTimeout(() => {
                this.$toast('刷新成功');
                this.isLoading = false;
                this.count++;
            }, 500);
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
.do-notice{
    height: 100vh;
    overflow: scroll;
    .do-notice-content{
        height: 100%;
        background: red;
    }
}
</style>
