<template>
    <div class="notice">
        <header class="header">
            <van-nav-bar
                title="需求公告"
                right-text="发布/筛选"
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
            <div @click="doNotice">发布公告</div>
            <div>
                <ol>
                    <li @click="choiceClass">
                        <span>第一</span>
                    </li>
                    <li @click="choiceClass">
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
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div class="notice-content">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                >
                    <div v-for="item in list" :key="item">
                        <div class="content-item">
                            <div class="item-left">
                                <img
                                    src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoM1LKFPNSBQA4iaeuHQuibYIicA/132"
                                />
                            </div>
                            <div class="item-right">
                                <div class="right-notice-info">
                                    <div class="user-wxname">保护伞</div>
                                    <div class="notice-info">
                                        <span>华为耳机</span>
                                        <span>即刻出售</span>
                                        <div class="info-price">
                                            <span>￥11</span>
                                            <span>～</span>
                                            <span>￥121</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="right-notice-contact">
                                    <van-icon color="rgb(186, 191, 202)" name="liaotian" />
                                </div>
                            </div>
                        </div>
                    </div>
                </van-list>
            </div>
        </van-pull-refresh>
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
        doNotice() {
            this.$router.push({ name: 'do-notice' });
        },
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

.notice {
    .header {
        position: fixed;
        width: 100%;
        height: 1.3rem;
        z-index: 99;
    }
    &-content {
        height: 100%;
        padding: 1.4rem 0.2rem 0 0.2rem;
        .content-item {
            display: flex;
            padding-top: 0.15rem;
            .item-left {
                margin-right: 0.2rem;
                img {
                    height: 1.1rem;
                    width: 1.1rem;
                    padding: 0;
                    margin: 0;
                    border-radius: 0.2rem;
                }
            }
            .item-right {
                border-bottom: solid 0.03rem #ededed;
                display: flex;
                width: 80vw;
                .right-notice-info {
                    flex-grow: 2;
                    .user-wxname {
                        font-size: 0.45rem;
                        color: #4a4a4c;
                    }
                    .notice-info {
                        margin-top: -0.2rem;
                        padding-bottom: 0.1rem;
                        span {
                            padding: 0.1rem 0.1rem 0 0.1rem;
                            margin-right: 0.15rem;
                            color: #615c5c;
                            font-size: 0.4rem;
                        }
                        .info-price {
                            font-size: 0.4rem;
                            padding-left: 0.2rem;
                            span {
                                background: unset;
                                padding: unset;
                                color: #7bbfea;
                            }
                        }
                    }
                }
                .right-notice-contact {
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;
                    padding: 0 0.1rem 0.1rem 0;
                    font-size: 0.8rem;
                }
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
.van-popup--right {
    div:first-child {
        width: 100%;
        text-align: center;
        font-size: 0.45rem;
        padding: 0.2rem 0;
        border-bottom: solid 0.03rem #ededed;
        color: #499df1;
    }
    div:last-child {
        position: fixed;
        height: 100%;
        width: 100%;
        overflow: scroll;
        color: #4a4a4c;
        font-size: 0.42rem;

        ol {
            padding-bottom: 1.5rem;
            li {
                margin: 0;
                padding: 0;
                height: 1.4rem;
                line-height: 1.4rem;
                text-align: center;
                span {
                    padding: 0.1rem 0.2rem;
                    border-bottom: solid 0.03rem #ededed;
                }
            }
            li:active {
                background: rgba(123, 191, 234, 0.2);
            }
        }
    }
}
</style>
