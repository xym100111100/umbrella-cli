<template>
    <div class="my-notice">
        <header class="header">
            <van-nav-bar
                title="我的公告"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
                right-text="发布公告"
            />
        </header>
        <div>
            <van-notice-bar
                color="#1989fa"
                background="#ecf9ff"
                left-icon="info-o"
                text="温馨提示:每个公告上线的时间是两星期，超过后将自动下线，可手动更新自动下线时间，更新后公告将显示在需求公告前面。注:每个人上线下线一个只能有四个公告。"
            />
        </div>
        <div class="my-notice-content">
            <van-tabs
                :swipeable="true"
                color="greenyellow"
                :animated="true"
                v-model="payload.active"
                @click="onChangeTab"
            >
                <van-tab title="已发布">
                    <template v-for="item in payload.myNoticeData">
                        <div :key="item.id" class="content-tab">
                            <p>{{item.noticeContent}}</p>
                            <p class="content-icon">
                                <span>自动下线时间:{{item.autoDownTime|filtersTime}}</span>
                                <span @click="updateAutoDownTime(item.id)">
                                    <van-icon size="0.5rem" name="shuaxin" />
                                </span>
                                <span @click="changeState(item.id,false)">
                                    <van-icon size="0.5rem" name="huaban" />
                                </span>
                            </p>
                        </div>
                    </template>
                </van-tab>
                <van-tab title="已撤销">
                    <template v-for="item in payload.myNoticeData">
                        <div :key="item.id" class="content-tab">
                            <p>{{item.noticeContent}}</p>
                            <p class="content-icon">
                                <span @click="changeState(item.id,true)">
                                    <van-icon size="0.5rem" name="shangxian" />
                                </span>
                                <span @click="deleteNotice(item.id)">
                                    <van-icon size="0.5rem" name="shanchu" />
                                </span>
                            </p>
                        </div>
                    </template>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import { NavBar, NoticeBar, Dialog, Toast, Tab, Tabs, Icon } from 'vant';
import { formatTime } from '../../util/SysUtils.js';
import { add, listByUserInfo, modify, delNotice } from '../../svc/suc/SucNotice';

export default {
    components: {
        [NavBar.name]: NavBar,
        [NoticeBar.name]: NoticeBar,
        [Toast.name]: Toast,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Icon.name]: Icon,
        [Dialog.name]: Dialog,
    },
    data() {
        return {
            payload: {
                active: 0,
                myNoticeData: [],
            },
        };
    },
    filters: {
        filtersTime(str) {
            return str.split(' ')[0];
        },
    },
    methods: {
        deleteNotice(id) {
            let params = {
                id: id,
            };
            Dialog.confirm({
                title: '提示',
                message: '确定刪除该公告?',
                closeOnClickOverlay: true,
            })
                .then(() => {
                    delNotice({
                        params,
                        onSuccess: data => {
                            if (data.result === 1) {
                                Toast({
                                    message: data.msg,
                                    position: 'top',
                                });
                                this.payload.myNoticeData.map((item, index) => {
                                    if (item.id === id) {
                                        this.payload.myNoticeData.splice(index, 1);
                                    }
                                });
                            }
                        },
                    });
                })
                .catch(() => {
                    //  console.log('取消');
                });
        },
        updateAutoDownTime(id) {
            let sjc = new Date().getTime() + 1209600000;
            let autoDownTime = formatTime(sjc, 'Y-M-D h:m:s');
            let data = { id: id, autoDownTime: autoDownTime };
            modify({
                data,
                onSuccess: result => {
                    if (result.result === 1) {
                        // 不再查询，从data中更新就行，否则页面不好看
                        let notice = this.payload.myNoticeData.find(item => item.id === id);
                        notice.autoDownTime = autoDownTime;
                        Toast({
                            message: '更新自动下线时间成功',
                            position: 'top',
                        });
                    } else {
                        Toast({
                            message: '更新自动下线时间失败',
                            position: 'top',
                        });
                    }
                },
            });
        },
        changeState(id, state) {
            let data = {
                state: state,
                id: id,
            };
            let mag = state ? '发布' : '撤销';
            Dialog.confirm({
                title: '提示',
                message: '确定' + mag + '该公告?',
                closeOnClickOverlay: true,
            })
                .then(() => {
                    modify({
                        data,
                        onSuccess: data => {
                            if (data.result === 1) {
                                Toast({
                                    message: mag + '成功',
                                    position: 'top',
                                });
                                this.payload.myNoticeData.map((item, index) => {
                                    if (item.id === id) {
                                        this.payload.myNoticeData.splice(index, 1);
                                    }
                                });
                            }
                        },
                    });
                })
                .catch(() => {
                    //  console.log('取消');
                });
        },
        onChangeTab() {
            this.myNoticeData = [];
            this.getNotice();
        },
        onClickLeft() {
            this.$router.push({ name: 'notice' });
        },
        onClickRight() {
            this.$router.push({ name: 'do-notice' });
        },
        getNotice() {
            let params = {
                state: this.payload.active === 0 ? true : false,
                userId: this.$store.getters.user.id,
            };
            listByUserInfo({
                params,
                onSuccess: data => {
                    this.payload.myNoticeData = data;
                },
            });
        },
    },
    activated() {
        if (this.$route.params.load) {
            this.getNotice();
        }
    },
};
</script>

<style lang="less" scoped>
html,
body {
    height: 100%;
    width: 100%;
}
.my-notice {
    height: 100vh;
    overflow: scroll;
    .my-notice-content {
        margin-left: 0.2rem;
        width: 96vw;
        background: rgba(123, 191, 234, 0.1);
        .content-tab {
            border-bottom: solid 0.03rem #a6a6aa;
            padding: 0.2rem 0 0.1rem;
            overflow: hidden;
            margin-bottom: 0.2rem;
            p {
                color: #4a4a4c;
                padding: 0.1rem;
                margin: 0;
                font-size: 0.37rem;
            }
            .content-icon {
                text-align: right;
                span {
                    background: rgba(60, 47, 15, 0.1);
                    padding: 0.19rem 0.1rem 0.1rem;
                    margin-right: 0.4rem;
                    border-radius: 0.1rem;
                    .van-icon {
                        color: #499df1;
                    }
                }
            }
        }
    }
}
</style>
