<template>
    <div class="shop">
        <div class="shop-title">
            <van-nav-bar
                title="我的小店"
                left-arrow
                @click-left="$router.go(-1)"
                @click-right="onlineGood"
                right-text="发布商品"
            />
            <div class="content-title">
                <van-notice-bar
                    color="#1989fa"
                    background="#ecf9ff"
                    left-icon="info-o"
                    text="温馨提示:每个用户只能有六个已上线商品四个已下线商品，如需上线新的请将其中某个商品下线"
                />
            </div>
            <div class="title-nav">
                <template v-for="item in  choiceList ">
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
            >
                <div class="content-item">
                    <template v-for="item in onlineGoodList">
                        <div @click="onlineGood" class="item-info" :key="item.id">
                            <div class="info-face">
                                <img :src="item.picPath" />
                            </div>
                            <div class="info-bottom">
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
                                    <div class="icon" @click.stop="downLineGood(item.id)">
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
import { NavBar, List, Cell, NoticeBar, Dialog, Icon } from 'vant';
import { list as onlineGoods } from '../../svc/onl/OnlOnlinePromo';

export default {
    components: {
        [NavBar.name]: NavBar,
        [Dialog.name]: Dialog,
        [List.name]: List,
        [Cell.name]: Cell,
        [Icon.name]: Icon,
        [NoticeBar.name]: NoticeBar,
    },
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
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
            pageNum: 0,
        };
    },
    filters: {
        filtersTitle(data) {
            if (data.length > 11) {
                return data.substr(1, 10) + '...';
            }
            return data;
        },
    },
    computed: {},
    methods: {
        downLineGood(id) {
            console.log(id);
            Dialog.confirm({
                title: '提示',
                message: '确定下线该商品?',
                closeOnClickOverlay:true,
            }).then(() => {
                // on close
            });
        },
        // 获取驾校数据
        handleLoad() {
            const params = { pageNum: this.pageNum + 1 };
            onlineGoods({
                params,
                onSuccess: data => {
                    console.log(data);
                    this.pageNum = data.pageNum;
                    this.onlineGoodList.push(...data.list);
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
        onlineGood() {
            this.$router.push({ name: 'online-good' });
        },
        changeChoice(index) {
            this.choiceList.map(item => {
                if (item.index === index) {
                    item.active = true;
                } else {
                    item.active = false;
                }
            });
            this.finished = false;
            this.onlineGoodList = [];
            this.pageNum = 0;
            this.handleLoad();
        },
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
                height: 8.5rem;
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
                            height: 0.5rem;
                            width: 0.5rem;
                            line-height: 0.5rem;
                            text-align: center;
                            .van-icon {
                                background: rgba(55, 57, 58, 0.205);
                                padding: 0.1rem 0.13rem 0.15rem;
                                margin: 0.2rem 0 0 -1rem;
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
