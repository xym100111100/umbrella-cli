<template>
    <div class="notice">
        <header class="header">
            <van-nav-bar
                title="需求公告"
                right-text="发布公告"
                left-arrow
                @click-left="$router.go(-1)"
                @click-right="doNotice"
            />
        </header>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div class="notice-content">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="handleLoad"
                >
                    <div v-for="item in noticeData" :key="item.id">
                        <div class="content-item" @click="handleLoad">
                            <div class="item-left">
                                <img :src="item.thumb" />
                            </div>
                            <div class="item-right">
                                <div class="right-notice-info">
                                    <div class="user-wxname">{{item.userName|filtersUserName}}</div>
                                    <div class="notice-info">
                                        <div class="info-text">{{item.text}}</div>
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
import { NavBar, Toast, Cell, Icon, Button, PullRefresh, List } from 'vant';
import { list as noticeList } from '../../svc/suc/Notice';

export default {
    components: {
        [NavBar.name]: NavBar,
        [Button.name]: Button,
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
            loading: false,
            finished: false,
            noticeData: [],
        };
    },
    filters: {
        filtersUserName(data) {
            if (data.length > 5) {
                return data.substr(1, 5) + '...';
            }
            return data;
        },
    },
    activated() {
        this.handleLoad();
    },
    methods: {
        handleLoad() {
            const params = { pageNum: this.pageNum + 1 };
            noticeList({
                params,
                onSuccess: data => {
                    console.log(data);
                    this.pageNum = data.pageNum;
                    this.noticeData.push(...data.list);
                    // 如果是最后一页
                    if (data.pages === data.pageNum) {
                        // 数据全部加载完成
                        this.finished = true;
                    }
                },
                onFinish: () => {
                    // 结束加载状态
                    this.loading = false;
                },
            });
        },
        doNotice() {
            this.$router.push({ name: 'do-notice' });
        },

        onRefresh() {
            const params = 0;
            this.noticeData = [];
            this.loading = true;
            noticeList({
                params,
                onSuccess: data => {
                    console.log(data);
                    this.pageNum = data.pageNum;
                    this.noticeData.push(...data.list);
                    // 如果是最后一页
                    if (data.pages === data.pageNum) {
                        // 数据全部加载完成
                        this.finished = true;
                    }
                    this.$toast('刷新成功');
                    this.isLoading = false;
                    this.count++;
                },
                onFinish: () => {
                    // 结束加载状态
                    this.loading = false;
                },
            });
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
                padding-bottom: 0.2rem;
                display: flex;
                width: 80vw;
                .right-notice-info {
                    flex-grow: 2;
                    .user-wxname {
                        font-size: 0.45rem;
                    }
                    .notice-info {
                        .info-text {
                            color: #4a4a4c;
                            padding: 0;
                            margin: 0;
                            font-size: 0.4rem;
                            padding: 0.2rem 0.2rem;
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
</style>
