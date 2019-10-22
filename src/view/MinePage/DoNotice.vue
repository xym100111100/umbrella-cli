<template>
    <div class="do-notice">
        <header class="header">
            <van-nav-bar
                title="发布公告"
                left-arrow
                @click-left="$router.go(-1)"
                @click-right="onClickRight"
            />
        </header>
        <!-- <div>
            <van-notice-bar
                left-icon="info-o"
                text="温馨提示:每个公告上线的时间是两星期，超过后将自动下线，可手动更新自动下线时间，更新后公告将显示在需求公告前面。注:每个人上线下线一个只能有四个公告。"
            />
        </div>-->
        <div class="do-notice-content">
            <div class="content-textarea">
                <textarea v-model="payload.noticeContent" maxlength="100" placeholder="请输入公告内容"></textarea>
            </div>
            <div class="content-btn">
                <button @click="doSubmit">提交</button>
            </div>
        </div>
    </div>
</template>

<script>
import { NavBar, NoticeBar, Toast, Button, PullRefresh } from 'vant';
import { formatTime } from '../../util/SysUtils.js';
import { add } from '../../svc/suc/SucNotice';

export default {
    components: {
        [NavBar.name]: NavBar,
        [Button.name]: Button,
        [PullRefresh.name]: PullRefresh,
        [NoticeBar.name]: NoticeBar,
        [Toast.name]: Toast,
    },
    data() {
        return {
            payload: {
                noticeContent: null,
                userId: this.$store.getters.user.id,
                schoolName: this.$store.getters.user.schoolName,
            },
        };
    },
    methods: {
        doSubmit() {
            if (this.payload.noticeContent === null || this.payload.noticeContent.trim() === '') {
                Toast({ message: '公告不能为空', position: 'top' });
                return;
            }
            console.log(this.payload);
            let data = this.payload;
            let sjc = new Date().getTime() + 1209600000;
            let aotuDownTime = formatTime(sjc, 'Y-M-D h:m:s');
            data.autoDownTime = aotuDownTime;
            add({
                data,
                onSuccess: result => {
                    if (result.result === 1) {
                        this.$router.push({ name: 'my-notice', params: { load: true } });
                    } else {
                        Toast({ message: '发布公告失败', position: 'top' });
                    }
                },
            });
        },
        onClickRight() {},
    },
    activated() {
        this.payload = {
            noticeContent: null,
            userId: this.$store.getters.user.id,
            schoolName: this.$store.getters.user.schoolName,
        };
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
