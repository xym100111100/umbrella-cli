<template>
    <div class="shop">
        <div class="shop-title">
            <van-nav-bar
                title="我的小店"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onlineGood"
                right-text="发布商品"
            />
            <div class="content-title">
                <van-notice-bar
                    color="#1989fa"
                    background="#ecf9ff"
                    left-icon="info-o"
                    text="温馨提示:每个商品上线的时间是两星期，超过后将自动下线，可手动更新上线时间。且每人只能有上线与下线加起来四个商品。"
                />
            </div>
            <div class="title-nav">
                <template v-for="item in  payload.choiceList ">
                    <div
                        :class="{choice:item.active === true}"
                        @click="changeChoice(item.index)"
                        :key="item.index"
                    >{{item.name}}</div>
                </template>
            </div>
        </div>
        <div class="shop-content">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="handleLoad"
                :immediate-check="false"
            >
                <div class="content-item">
                    <template v-for="item in payload.onlineGoodList">
                        <div @click="onlineGood(item.id)" class="item-info" :key="item.id">
                            <div class="info-face">
                                <img
                                    :src="'http://192.168.8.108:20180/files'+item.fileList[0].imgPath"
                                />
                            </div>
                            <div class="info-bottom">
                                <div class="good-title">{{item.goodTitle|filtersTitle}}</div>
                                <div class="good-down-line-time">
                                    <p>
                                        <span>下线时间: 
                                            <span v-if="item.state" > {{item.aotuDownTime|filtersTime}}</span>
                                             <span v-if="!item.state" >已下线</span>
                                        </span>
                                    </p>
                                </div>
                                <div class="good-price">
                                    <div class="price">
                                        <span v-if="item.goodType === 0" >￥{{item.newPrice}}</span>
                                         <span v-if="item.goodType === 1" >￥{{item.priceDay}}/天</span>
                                    </div>
                                    <div
                                        v-if="item.state"
                                        class="icon"
                                        @click.stop="updateAutoDownTime(item.id)"
                                    >
                                        <van-icon name="shuaxin" />
                                    </div>
                                    <div
                                        v-if="!item.state"
                                        class="icon"
                                        @click.stop="changeState(item.id,true)"
                                    >
                                        <van-icon name="shangxian" />
                                    </div>
                                    <div
                                        v-if="!item.state"
                                        class="icon"
                                        @click.stop="deleteGood(item.id)"
                                    >
                                        <van-icon name="shanchu" />
                                    </div>
                                    <div
                                        v-if="item.state"
                                        class="icon"
                                        @click.stop="changeState(item.id,false)"
                                    >
                                        <van-icon name="huaban" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </van-list>
        </div>
    </div>
</template>

<script>
import { NavBar, List, Cell, NoticeBar, Toast, Dialog, Icon } from 'vant';
import { modify as modifyGoods, list as listGoods, deleteGoods, goodsCountByUserId } from '../../svc/suc/SucGoods';

import { formatTime } from '../../util/SysUtils.js';

export default {
    components: {
        [NavBar.name]: NavBar,
        [Toast.name]: Toast,
        [Dialog.name]: Dialog,
        [List.name]: List,
        [Cell.name]: Cell,
        [Icon.name]: Icon,
        [NoticeBar.name]: NoticeBar,
    },
    data() {
        return {
            loading: false,
            finished: false,
            payload: {
                onlineGoodList: [],
                choiceList: [
                    {
                        index: 1,
                        name: '已上线',
                        active: true,
                    },
                    {
                        index: 2,
                        name: '已下线',
                        active: false,
                    },
                ],
            },
            goodsCount: 0,
            pageNum: 0,
        };
    },
    filters: {
        filtersTitle(data) {
            if (data && data.length > 11) {
                return data.substr(1, 10) + '...';
            }
            return data;
        },
        filtersTime(str){
            
            return str.split(" ")[0];
        }
    },
    computed: {},
    methods: {
        onClickLeft() {
            this.$router.push({ name: 'mine' });
        },
        updateAutoDownTime(id) {
            let sjc = new Date().getTime() + 1209600000;
            let aotuDownTime = formatTime(sjc, 'Y-M-D h:m:s');
            let data = { id: id, aotuDownTime: aotuDownTime };
            modifyGoods({
                data,
                onSuccess: result => {
                    // 不再查询，从data中更新就行，否则页面不好看
                    let good = this.payload.onlineGoodList.find(item => item.id === id);
                    good.aotuDownTime = aotuDownTime;
                    Toast({
                        message: '更新自动下线时间成功',
                        position: 'top',
                    });
                },
            });
        },
        deleteGood(id) {
            Dialog.confirm({
                title: '提示',
                message: '确定删除该商品?',
                closeOnClickOverlay: true,
            })
                .then(() => {
                    let params = { id: id };
                    deleteGoods({
                        params,
                        onSuccess: result => {
                            Toast({
                                message: '删除成功',
                                position: 'top',
                            });
                            // 将商品数量减一，以免删除后还是不能上线
                            this.goodsCount = this.goodsCount - 1;
                            this.payload.onlineGoodList.map((item, index) => {
                                if (item.id === id) {
                                    this.payload.onlineGoodList.splice(index, 1);
                                }
                            });
                        },
                    });
                })
                .catch(() => {
                    //  console.log('取消');
                });
        },
        changeState(id, state) {
            let msg = state === true ? '上线' : '下线';
            Dialog.confirm({
                title: '提示',
                message: '确定' + msg + '该商品?',
                closeOnClickOverlay: true,
            })
                .then(() => {
                    let data = { id: id, state: state };
                    modifyGoods({
                        data,
                        onSuccess: result => {
                            Toast({
                                message: msg + '成功',
                                position: 'top',
                            });
                            this.payload.onlineGoodList.map((item, index) => {
                                if (item.id === id) {
                                    this.payload.onlineGoodList.splice(index, 1);
                                }
                            });
                        },
                    });
                })
                .catch(() => {
                    // console.log('取消');
                });
        },
        // 获取店铺数据
        handleLoad() {
            const params = {
                pageNum: this.pageNum + 1,
                userId: this.$store.getters.user.id,
                state: this.payload.choiceList[0].active === true ? true : false,
            };
            listGoods({
                params,
                onSuccess: data => {
                    this.pageNum = data.pageNum;
                    this.payload.onlineGoodList.push(...data.list);
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
        onlineGood(id) {
            if (this.goodsCount >= 4) {
                Toast({
                    message: '商品已超过四个，不能再继续上线。',
                    position: 'top',
                });
                return;
            }
            let payload = this.payload.onlineGoodList.find(item => item.id === id);
            this.$router.push({ name: 'online-good', params: { payload: payload } });
        },
        changeChoice(index) {
            this.payload.choiceList.map(item => {
                if (item.index === index) {
                    item.active = true;
                } else {
                    item.active = false;
                }
            });
            this.payload.onlineGoodList = [];
            this.pageNum = 0;
            this.handleLoad();
        },
        getGoodsCount() {
            const params = {
                userId: this.$store.getters.user.id,
            };
            goodsCountByUserId({
                params,
                onSuccess: data => {
                    this.goodsCount = data.length;
                },
            });
        },
    },
    activated() {
        this.getGoodsCount();
        if (this.$route.params.load) {
            this.pageNum = 0;
            this.payload = {
                onlineGoodList: [],
                choiceList: [
                    {
                        index: 1,
                        name: '已上线',
                        active: true,
                    },
                    {
                        index: 2,
                        name: '已下线',
                        active: false,
                    },
                ],
            };
            this.handleLoad();
        }
    },
};
</script>

<style lang="less" scoped>
html,
body {
    height: 100%;
}

.shop {
    height: 100vh;

    .shop-title {
        .title-nav {
            font-size: 0.4rem;
            display: flex;
            height: 1rem;
            line-height: 1rem;
            justify-content: space-around;
            padding: 0 0.3rem;
            margin-top: 0.3rem;
            div {
                background: rgba(60, 47, 15, 0.1);
                width: 50%;
                text-align: center;
            }
            .choice {
                background: rgba(123, 191, 234, 0.4);
            }
        }
    }
    .shop-content {
        height: 81%;
        overflow: scroll;
        .content-item {
            display: flex;
            flex-wrap: wrap;
            padding: 0 0.2rem;
            background: rgba(60, 47, 15, 0.041);
            .item-info {
                background: white;
                width: 46vw;
                height: 8rem;
                margin: 0.2rem 0.1rem;
                border-radius: 0.3rem;
                overflow: hidden;
                .info-face {
                    background: white;
                    img {
                        padding: 0;
                        margin: 0;
                        width: 46vw;
                        height: 5rem;
                    }
                }
                .info-bottom {
                    width: 96%;
                    font-size: 0.4rem;
                    padding: 0 0.1rem;
                    .good-title {
                        height: 0.7rem;
                    }
                    .good-down-line-time {
                        height: 0.5rem;
                        p {
                            padding: 0;
                            margin: 0;
                            margin-top: 0.1rem;
                            span {
                                padding: 0.07rem;
                                margin-right: 0.15rem;
                                color: #7bbfea;
                            }
                        }
                    }
                    .good-price {
                        display: flex;
                        justify-content: space-between;
                        padding-top: 0.15rem;

                        .price {
                            margin-top: 0.3rem;
                            color: #7bbfea;
                            padding-left: 0.1rem;
                        }
                        .icon {
                            height: 0.5rem;
                            width: 0.5rem;
                            line-height: 0.5rem;
                            text-align: center;
                            .van-icon {
                                background: rgba(60, 47, 15, 0.1);
                                padding: 0.1rem 0.13rem 0.15rem;
                                margin: 0.2rem 0 0 -0.5rem;
                                color: #499df1;
                                font-size: 0.5rem;
                            }
                        }
                    }
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
