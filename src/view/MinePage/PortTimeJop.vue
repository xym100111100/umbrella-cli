<template>
    <div class="portTimeJop">
        <van-nav-bar
            title="学生兼职"
            left-arrow
            @click-left="$router.go(-1)"
            @click-right="onClickRight"
            right-text="暑假兼职"
        />
        <header>
            <van-notice-bar
                color="#1989fa"
                background="#ecf9ff"
                left-icon="info-o"
                text="温馨提示:平台发布为真实有效,第三方发布兼职联系时请谨慎辨明真假。"
            />
        </header>
        <div class="portTimeJop-content">
            <div class="content-top">
                <p>平台发布</p>
                <p class="top-detile">招聘校内发传单,工作时间约一个小时¥50,公众号推广扫码关注¥0.5/人(qq:253274870)</p>
            </div>
            <div class="content-bottom">
                <p>第三方发布</p>
                <div>
                    <template v-for="item in portTimeJop">
                        <p :key="item.id" class="bottom-detile">{{item.detail}}</p>
                    </template>
                </div>
            </div>
        </div>
        <div></div>
    </div>
</template>

<script>
import { NavBar, NoticeBar, List, Toast } from 'vant';
import { list } from '../../svc/suc/SucPortTimeJop';

export default {
    components: {
        [NavBar.name]: NavBar,
        [Toast.name]: Toast,
        [List.name]: List,
        [NoticeBar.name]: NoticeBar,
    },
    data() {
        return {
            portTimeJop: [],
        };
    },
    methods: {
        onClickLeft() {
            Toast('返回');
        },
        onClickRight() {
            Toast('暂时关闭咯');
        },
        handleLoad() {
            let params = {};
            list({
                params,
                onSuccess: data => {
                    console.log(data);
                    this.portTimeJop = data;
                },
                onFinish: () => {},
            });
        },
    },
    activated() {
        this.portTimeJop = [];
        this.handleLoad();
    },
};
</script>

<style lang="less" scoped>
html,
body {
    height: 100%;
    width: 100%;
}
.portTimeJop {
    height: 100vh;
    overflow: scroll;
    &-content {
        font-size: 0.42rem;
        padding: 0.3rem;
        p {
            padding: 0;
            margin: 0;
        }
        .top-detile {
            font-size: 0.35rem;
        }
        .content-bottom {
            padding-top: 0.5rem;
        }
        .bottom-detile {
            padding-top: 0.5rem;
            font-size: 0.35rem;
        }
    }
}
.van-nav-bar {
    &__right {
        bottom: -0.1rem;
        .van-nav-bar__text {
            font-size: 0.4rem;
            color: #499df1;
        }
    }
}
</style>
