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
        <van-popup
            position="right"
            :style="{ height: '100%',width:'25%' }"
            get-container="body"
            v-model="show"
        >
            <div>
                <ol>
                    <li @click="choiceClass">
                        <span>第一</span>
                    </li>
                    <li>
                        <span>电脑</span>
                    </li>
                    <li>
                        <span>体育</span>
                    </li>
                    <li>
                        <span>文具</span>
                    </li>
                    <li>
                        <span>衣服</span>
                    </li>
                    <li>
                        <span>凳子</span>
                    </li>
                    <li>
                        <span>左边</span>
                    </li>
                    <li>
                        <span>桌球</span>
                    </li>
                    <li>
                        <span>耳机</span>
                    </li>
                    <li>
                        <span>手机</span>
                    </li>
                    <li>
                        <span>母婴</span>
                    </li>
                    <li>
                        <span>玩具</span>
                    </li>
                    <li>
                        <span>书本</span>
                    </li>
                    <li>
                        <span>篮球</span>
                    </li>
                    <li>
                        <span>火箭</span>
                    </li>
                    <li>
                        <span>航母</span>
                    </li>
                    <li>
                        <span>飞机</span>
                    </li>
                    <li>
                        <span>坦克</span>
                    </li>
                    <li>
                        <span>大炮</span>
                    </li>
                    <li>
                        <span>步枪</span>
                    </li>
                    <li>
                        <span>大炮</span>
                    </li>
                    <li>
                        <span>步枪</span>
                    </li>
                    <li>
                        <span>大炮</span>
                    </li>
                    <li>
                        <span>步枪</span>
                    </li>
                    <li>
                        <span>手枪</span>
                    </li>
                    <li>
                        <span>最后</span>
                    </li>
                </ol>
            </div>
        </van-popup>
        <div class="do-notice-content">
            <div></div>
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
