<template>
    <div id="home" class="home" @scroll="moving">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div class="home-content" @scroll="moving">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="handleLoad"
                    :immediate-check="false"
                >
                    <div class="content-list">
                        <div v-for="item in goods" :key="item.id">
                            <div @click="contact(item)" class="list-item">
                                <div class="item-top">
                                    <img
                                        :src="'http://192.168.8.108:20180/files'+item.fileList[0].imgPath"
                                    />
                                </div>
                                <div class="item-bottom">
                                    <div class="good-title">{{item.goodTitle|filtersTitle}}</div>

                                    <div v-if="item.goodType === 0" class="good-spec">
                                        <p>
                                            <span v-if="item.isNowSell">即时出售</span>
                                            <span v-if="!item.isNowSell">议时出售</span>
                                            <span>{{item.buyTime|filtersBuyTime}}</span>
                                        </p>
                                        <p>
                                            <span v-if="item.isDiscuss">可议价</span>
                                            <span v-if="!item.isDiscuss">不可议价</span>
                                            <span>原价: ￥{{item.oldPrice}}</span>
                                        </p>
                                    </div>
                                    <div v-if="item.goodType === 1" class="good-spec">
                                        <p>
                                            <span v-if="item.isNowSell">即时出租</span>
                                            <span v-if="!item.isNowSell">议时出租</span>
                                            <span v-if="item.isDiscuss">可议价</span>
                                            <span v-if="!item.isDiscuss">不可议价</span>
                                        </p>
                                    </div>
                                    <div class="good-price">
                                        <div
                                            v-if="item.goodType === 0"
                                            class="price"
                                        >￥{{item.newPrice}}</div>
                                        <div
                                            v-if="item.goodType === 1"
                                            class="price"
                                        >￥{{item.priceDay}}/天</div>
                                        <div class="icon" @click.stop="addToLove(item.id)">
                                            <van-icon name="xihuan1" color="#FF5706" size=".9rem" />
                                        </div>
                                    </div>
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
import { list as listOnlOnlinePromo } from '../../svc/suc/SucGoods';
import { login } from '../../svc/suc/User';
import { add as addLove, loveCount } from '../../svc/suc/SucLove';

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
            goods: [],
            loading: false,
            finished: false,
            scroll: 0,
            pageNum: 0,
        };
    },
    activated() {
        let openid = this.$route.query.openid;
        document.getElementById('home').scrollTop = this.scroll;
        if (openid && this.$store.getters.user.id === undefined) {
            this.userLogin();
        }
    },
    mounted() {
        let openid = this.$route.query.openid;
        if (!openid) {
            this.goods = [];
            this.pageNum = 0;
            this.handleLoad();
        }
    },
    filters: {
        filtersTitle(data) {
            if (data.length > 11) {
                return data.substr(1, 10) + '...';
            }
            return data;
        },
        filtersBuyTime(date) {
            let endTime = parseInt(new Date().getTime() / 1000) - new Date(date).getTime() / 1000;
            let timeDay = parseInt(endTime / 60 / 60 / 24); //相差天数
            // 先判断是否大于一年
            if (timeDay >= 360) {
                // 计算年
                let year = parseInt(timeDay / 360);

                if (timeDay % 360 < 30) {
                    return '已用' + year + '年';
                } else {
                    // 计算月
                    let month = parseInt((timeDay % 360) / 30);
                    return '已用' + year + '年' + month + '月';
                }
            } else {
                if (timeDay >= 30) {
                    //计算月
                    let month = parseInt(timeDay / 30);
                    if (timeDay % 30 === 0) {
                        return '已用' + month + '月';
                    } else {
                        let day = timeDay % 30;
                        return '已用' + month + '月' + day + '天';
                    }
                } else {
                    if (timeDay > 1) {
                        // 计算天
                        return '已用' + timeDay + '天';
                    } else {
                        return '已用1天';
                    }
                }
            }
        },
    },
    beforeRouteEnter(to, from, next) {
        next();
    },
    methods: {
        userLogin() {
            let openid = this.$route.query.openid;
            let headimgurl = this.$route.query.headimgurl;
            let nickname = this.$route.query.nickname;
            const data = {
                wxOpenid: openid,
                wxFacePath: headimgurl,
                wxName: nickname,
            };
            login({
                data,
                onSuccess: data => {
                    this.$store.dispatch('setUser', data.sucUserMo);
                    this.getLoveCount();
                    if (data.newUser) {
                        this.$router.push({ name: 'school' });
                    } else {
                        this.handleLoad();
                    }
                },
                onFail: (code, msg) => {
                    //console.log(code);
                    //  console.log('请求失败');
                    // done();
                },
            });
        },
        getLoveCount() {
            let params = { userId: this.$store.getters.user.id };
            loveCount({
                params,
                onSuccess: result => {
                    this.$store.getters.active.loveCount = result;
                },
                onFinish: () => {
                    // 结束加载状态
                    this.loading = false;
                },
            });
        },
        addToLove(id) {
            let data = {
                userId: this.$store.getters.user.id,
                goodsId: id,
            };
            addLove({
                data,
                onSuccess: result => {
                    Toast({ message: '收藏成功', position: 'top' });
                    if (result.result === 1 && result.msg !== '已有商品') {
                        this.$store.getters.active.loveCount = this.$store.getters.active.loveCount + 1;
                    }
                },
            });
        },
        moving(e) {
            this.scroll = e.target.scrollTop;
        },
        contact(item) {
            this.$router.push({ name: 'goods-detail', params: { payload: item } });
        },
        // 获取商品数据
        handleLoad() {
            const params = { pageNum: this.pageNum + 1, state: true, schoolName: this.$store.getters.user.schoolName };
            listOnlOnlinePromo({
                params,
                onSuccess: data => {
                    this.pageNum = data.pageNum;
                    this.goods.push(...data.list);
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

        onRefresh() {
            const params = { pageNum: 0 };
            this.goods = [];
            listOnlOnlinePromo({
                params,
                onSuccess: data => {
                    this.pageNum = data.pageNum;
                    this.goods.push(...data.list);
                    // 如果是最后一页
                    if (data.pages === data.pageNum || data.pages < data.pageNum) {
                        // 数据全部加载完成
                        this.finished = true;
                    } else {
                        this.finished = false;
                    }
                    this.$toast('刷新成功');
                    this.isLoading = false;
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
.home {
    background: rgba(60, 47, 15, 0.041);
    padding-left: 2vw;
    overflow: scroll;
    .home-content {
        height: 100%;
        .content-list {
            display: flex;
            flex-wrap: wrap;
            .list-item {
                width: 46vw;
                margin: 0.1rem;
                background: white;
                height: 8.2rem;
                border-radius: 0.3rem;
                .item-top {
                    img {
                        width: 100%;
                        height: 4.8rem;
                        border-top-right-radius: 0.3rem;
                        border-top-left-radius: 0.3rem;
                    }
                }
                .item-bottom {
                    width: 96%;
                    font-size: 0.4rem;
                    padding: 0 0.1rem;
                    .good-title {
                        height: 0.7rem;
                    }
                    .good-spec {
                        height: 1.2rem;
                        p {
                            padding: 0;
                            margin: 0;
                            margin-top: 0.15rem;
                            span {
                                padding: 0.07rem;
                                margin: 0.15rem 0.1rem;
                                background: rgba(123, 191, 234, 0.2);
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
                            padding-left: 0.2rem;
                        }
                        .icon:active {
                            background: rgba(123, 191, 234, 0.2);
                        }
                    }
                }
            }
        }
    }
}
</style>