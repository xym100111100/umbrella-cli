<template>
    <div class="do-notice">
        <header class="header">
            <van-nav-bar
                title="发布公告"
                left-arrow
                @click-left="$router.go(-1)"
                @click-right="onClickRight"
                right-text="我的公告"
            />
        </header>
        <div>
            <van-notice-bar
                color="#1989fa"
                background="#ecf9ff"
                left-icon="info-o"
                text="温馨提示:每个公告上线的时间是两星期，超过后将自动下线，手动下线并重新上线将重新计算时间。"
            />
        </div>
        <div class="do-notice-content">
            <div class="content-textarea">
                <textarea maxlength="100" placeholder="请输入公告内容"></textarea>
            </div>
            <div class="content-btn">
                <button @click="doSubmit">提交</button>
            </div>
        </div>
    </div>
</template>

<script>
import { NavBar, NoticeBar, Button, PullRefresh } from 'vant';
export default {
    components: {
        [NavBar.name]: NavBar,
        [Button.name]: Button,
        [PullRefresh.name]: PullRefresh,
        [NoticeBar.name]: NoticeBar,
    },
    data() {
        return {};
    },
    methods: {
        doSubmit() {
            console.log(this.data);
        },
        onClickRight() {},
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
        margin-left: 0.2rem;
        width: 96vw;
        background: rgba(123, 191, 234, 0.2);
        .content-textarea {
            overflow: hidden;
            text-align: center;
            margin-top: 0.3rem;
            padding-top: 0.3rem;
            textarea {
                width: 80%;
                font-size: 0.4rem;
                border: none;
                border-radius: 0.2rem;
                height: 3rem;
            }
        }
        .content-btn {
            height: 2rem;
            text-align: center;
            line-height: 2rem;
            button {
                width: 80%;
                height: 1rem;
                font-size: 0.45rem;
                line-height: 1rem;
                border-radius: 0.2rem;
                border: none;
                background: greenyellow;
            }
            button:active {
                background: rgba(123, 191, 234, 0.2);
            }
        }
    }
}
</style>
