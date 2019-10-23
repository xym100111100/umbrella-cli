<template>
    <div class="corridor">
        <van-nav-bar
            title="米格走廊"
            left-arrow
            @click-left="$router.go(-1)"
            @click-right="onClickRight"
            right-text="关注公众号"
        />
        <div class="corridor-content">
            <header>
                <span>米格走廊</span>是广西安布雷拉科技有限公司开发一款专门属于大学生使用的公众号，宗旨是为大学生提供更多的资源，更优质的服务，更全面的保障。
            </header>

            <div class="content-function">
                <!-- <p class="fonction-title">目前提供的主要服务有</p> -->

                <p class="fonction-title">出售闲置:</p>
                <p class="function-detail">
                    在毕业季来临之时，难免有很多带不走的物品，却又不舍得丢弃。在选择一些学科后
                    有些临时使用的工具。在冲动买下的商品后发觉并不是那么地适合自己。那赶紧让其上线吧！！
                    为学弟学妹提供物美价廉的宝贝是学长学姐的义务哦。
                </p>
                <p class="fonction-title">驾校报名:</p>
                <p class="function-detail">
                    为解决现有驾校行业给人混乱的现象，收费不明确，多次收费，教练质量良莠不齐
                    等问题。本平台经过考核，与一些优秀的驾校达成共识，在本平台上明码标价，一次收费，
                    明示服务条款并严格执行。另本平台郑重承诺：假如在本平台报名并签订协议的学生受到驾校不公平待遇或驾校与其先前
                    所说不一致，本平台将收到投诉电话的第一时间派出维权团队到场进行维权，查明属实后将无条件
                    退还所有费用，让学生不再是一个人学车，而是一个人和一个团队！协议详细请移步驾校
                    <router-link :to="{name:'signup-detail'}">报名详细</router-link>
                </p>
                <p class="fonction-title">需求公告：</p>
                <p class="function-detail">
                    是否还在为临时的健身器材所纠结要不要买？是否还在因为不小心丢掉了专业书网上又没不到？
                    发出公告吧，你要想的学长学姐都有！
                </p>
                <p class="fonction-title">毕业服/毕业照</p>
                <p class="function-detail">
                    美好的大学生活即将过去，除了回忆还是回忆吗？或许我们应该用相机记录更多美好的瞬间。
                    我们提供学士服/唐装/旗袍/各种款式的毕业服还有专业的摄影师。
                </p>
                <!-- <p class="fonction-title">即将上线服务：</p> -->
                <p>暑假兼职</p>
                <p class="function-detail">
                    每当暑假都会想该如何度过漫长假期？最正确的姿势当然是外出兼职工作！！不仅有收入还能拥有充实的假期，本平台届时将与一些厂家合作，以学校为单位为厂家输送热血青年，同时提供专人跟踪
                    保障学生假期工作(届时名额有限，关注公众号以便收到服务开通消息抢先报名!)。
                </p>
                <p class="function-detail">未完待续....点击右上角关注吧！！你关注的不只是一个公众号，是一个提供资源/服务/保障的平台。</p>
                <!-- <p class="fonction-bottom umbrella">安布雷拉</p>
                <p class="fonction-bottom">您生活的管家</p>-->
            </div>
        </div>
        <div></div>
    </div>
</template>

<script>
import { NavBar, Toast } from 'vant';
import axios from 'axios';
export default {
    components: {
        [NavBar.name]: NavBar,
        [Toast.name]: Toast,
    },
    data() {
        return {};
    },
    methods: {
        onClickLeft() {
            Toast('返回');
        },
        onClickRight() {
            axios
                .get(
                    'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU3OTMwNDE4OQ==&scene=110#wechat_redirect'
                )
                .then(function(res) {});
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
.corridor {
    height: 100vh;
    overflow: scroll;
    &-content {
        background: rgba(123, 191, 234, 0.2);
        padding: 0.5rem;
        font-size: 0.4rem;
        p {
            padding: 0;
            margin: 0;
        }
        header span {
            font-size: 0.5rem;
        }
        .content-function {
            padding-top: 0.2rem;
            .fonction-title {
                font-size: 0.45rem;
            }
            .function-detail {
                padding: 0 0 0.2rem 0.2rem;
            }
            .umbrella {
                padding-right: 0.73rem;
            }
            .fonction-bottom {
                text-align: right;
                color: #499df1;
            }
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
