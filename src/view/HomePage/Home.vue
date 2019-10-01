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
                            <div @click="contact" class="list-item">
                                <div class="item-top">
                                    <img :src="item.picPath" />
                                </div>
                                <div class="item-bottom">
                                    <div class="good-title">{{item.onlineTitle|filtersTitle}}</div>
                                    <div class="good-spec">
                                        <p>
                                            <span>即时出售</span>
                                            <span>已用5年</span>
                                        </p>
                                        <p>
                                            <span>不可议价</span>
                                            <span>原价: ${{item.salePrice}}</span>
                                        </p>
                                    </div>
                                    <div class="good-price">
                                        <div class="price">${{item.salePrice}}</div>
                                        <div class="icon" @click.stop="addToLove">
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
import { list as listOnlOnlinePromo } from '../../svc/onl/OnlOnlinePromo';
import { login } from '../../svc/suc/User';

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
        console.log('activated');
        let openid = this.$route.query.openid;
        console.log(openid);
        document.getElementById('home').scrollTop = this.scroll;
        if (openid) {
            this.userLogin();
        } else {
            this.handleLoad();
        }
    },
    created() {
        console.log('created');
    },
    mounted() {
        console.log('mounted');
        let openid = this.$route.query.openid;
        if (!openid) {
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
    },
    beforeRouteEnter(to, from, next) {
        console.log('路由进入');
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
                    console.log(data);
                    this.$store.dispatch('setUser', data.sucUserMo);
                    if (data.newUser) {
                        this.$router.push({ name: 'school' });
                    } else {

                        this.handleLoad();
                    }
                },
                onFail: (code, msg) => {
                    console.log(code);
                    console.log('请求失败');
                    // done();
                },
            });
        },
        addToLove() {
           
            this.$store.getters.active.loveCount = this.$store.getters.active.loveCount + 1;
        },
        moving(e) {
            this.scroll = e.target.scrollTop;
        },
        contact() {
            this.$router.push({ name: 'goods-detail' });
        },
        // 获取商品数据
        handleLoad() {
            const params = { pageNum: this.pageNum + 1 };
            listOnlOnlinePromo({
                params,
                onSuccess: data => {
                    this.pageNum = data.pageNum;
                    this.goods.push(...data.list);
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
        onClickRight() {},
        showPopup() {
            this.show = true;
        },
        onRefresh() {
            const params = { pageNum: 0 };
            listOnlOnlinePromo({
                params,
                onSuccess: data => {
                    this.pageNum = data.pageNum;
                    this.goods.push(...data.list);
                    // 如果是最后一页
                    if (data.pages === data.pageNum) {
                        // 数据全部加载完成
                        this.finished = true;
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
                            margin-top: 0.1rem;
                            span {
                                padding: 0.07rem;
                                margin-right: 0.15rem;
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
                        .icon {
                        }
                    }
                }
            }
        }
    }
}
</style>