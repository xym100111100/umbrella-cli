<template>
    <div class="notice">
        <header class="header">
            <van-nav-bar
                title="需求公告"
                left-arrow
                @click-left="onClickLeft"
                @click-right="myNotice"
                right-text="我的公告"
            />
        </header>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div id="notice-content" class="notice-content" @scroll="moving">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="handleLoad"
                    :immediate-check="false"
                >
                    <div v-for="item in noticeData" :key="item.id">
                        <div class="content-item">
                            <div class="item-left">
                                <img :src="item.wxFacePath" />
                            </div>
                            <div class="item-right">
                                <div class="right-notice-info">
                                    <div class="info-user">
                                        <div class="user-name">{{item.userName|filtersUserName}}</div>
                                        <div class="user-scholl">
                                            <van-icon size="0.4rem" color="rgb(186, 191, 202)" name="dizhi" />
                                            <span>桂林理工大学</span> 
                                        </div>
                                    </div>
                                    <div class="notice-info">
                                        <div class="info-text">{{item.noticeContent}}</div>
                                    </div>
                                </div>
                                <div @click="contact(item)" class="right-notice-contact">
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
import { list as noticeList } from '../../svc/suc/SucNotice';

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
            isLoading: false,
            loading: false,
            finished: false,
            noticeData: [],
            scroll: 0,
            pageNum: 0,
            timeout: null,
        };
    },
    filters: {
        filtersUserName(data) {
            if (data.length > 8) {
                return data.substr(0, 8) + '...';
            }
            return data;
        },
    },
    activated() {
        document.getElementById('notice-content').scrollTop = this.scroll;
        if (this.$route.params.load) {
            this.pageNum = 0;
            this.noticeData = [];
            this.handleLoad();
        }
    },
    methods: {
        onClickLeft() {
            this.$router.push({ name: 'mine' });
        },
        contact(item) {
            if (item.userId === this.$store.getters.user.id) {
                this.$toast({ message: '不能向自己发起聊天', position: 'top' });
                return;
            }
            this.$router.push({
                name: 'msg-chat',
                params: { id: item.userId, name: item.userName, userWxfacePath: item.wxFacePath },
            });
        },
        moving(e) {
            this.scroll = e.target.scrollTop;
        },
        handleLoad() {
            const params = { pageNum: this.pageNum + 1, schoolName: this.$store.getters.user.schoolName, state: true };
            noticeList({
                params,
                onSuccess: data => {
                    this.pageNum = data.pageNum;
                    this.noticeData.push(...data.list);
                    // 如果是最后一页
                    if (data.pages === data.pageNum || data.pages < data.pageNum) {
                        // 数据全部加载完成
                        this.finished = true;
                    } else {
                        this.finished = false;
                    }
                },
                onFinish: () => {
                    // 结束加载状态
                    this.loading = false;
                },
            });
        },
        myNotice() {
            this.$router.push({ name: 'my-notice', params: { load: true } });
        },

        onRefresh() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.pageNum = 0;
                this.noticeData = [];
                this.handleLoad();
                this.$toast({ message: '刷新成功', position: 'top' });
                this.isLoading = false;
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
        height: 93vh;
        padding: 1.4rem 0.2rem 0 0.2rem;
        overflow: scroll;
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
                    .info-user {
                        font-size: 0.45rem;
                        display: flex;
                        .user-name {
                            flex-grow: 2;
                        }
                        .user-scholl {
                            color: #4a4a4c;
                            font-size: 0.35rem;
                        }
                    }
                    .notice-info {
                        .info-text {
                            color: #4a4a4c;
                            padding: 0;
                            margin: 0;
                            font-size: 0.4rem;
                            padding: 0.2rem 0.2rem;
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
