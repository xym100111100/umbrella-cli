<template>
    <div class="shop-good">
        <header class="shop-good-header">
            <div class="header-title">
                <div @click="$router.go(-1)">
                    <van-icon name="back-search" color="rgba(167, 158, 158, 0.99)" size=".7rem" />
                </div>
                <div @click="showPopup">
                    <span style="padding-right:0.3rem;">操作</span>
                    <van-icon name="down" color="rgba(167, 158, 158, 0.99)" size=".3rem" />
                </div>
            </div>
            <van-popup v-model="show" position="top" :style="{ height: '30%' }">
                <div class="popup-content">
                    <div class="content-item">
                        <div>
                            <p>
                                <van-icon
                                    name="shangpin"
                                    color="rgb(95, 148, 252)"
                                    size=".7rem"
                                />
                            </p>
                            <p>全部商品</p>
                        </div>
                        <div>
                            <p>
                                <van-icon
                                    name="huaban"
                                    color="rgb(160, 157, 212)"
                                    size=".7rem"
                                />
                            </p>
                            <p>已下架</p>
                        </div>
                        <div>
                            <p>
                                <van-icon
                                    name="jiantou2"
                                    color="rgb(71, 181, 8)"
                                    size=".7rem"
                                />
                            </p>
                            <p>已卖完</p>
                        </div>
                    </div>
                    <div class="content-item">
                        <div>
                            <p>
                                <van-icon
                                    name="tianjiajiahaowubiankuang"
                                    color="rgb(71, 181, 8)"
                                    size=".7rem"
                                />
                            </p>
                            <p>新建商品</p>
                        </div>
                        <div>
                            <p>
                                <van-icon
                                    name="category1"
                                    color="rgb(249, 106, 100)"
                                    size=".7rem"
                                />
                            </p>
                            <p>分组管理</p>
                        </div>
                        <div>
                            <p>
                                <van-icon
                                    name="lianheyingyong"
                                    color="rgb(160, 157, 212)"
                                    size=".7rem"
                                />
                            </p>
                            <p>批量管理</p>
                        </div>
                    </div>
                </div>
            </van-popup>
            <div>
                <van-search
                    @input="searchInput"
                    input-align="center"
                    background="#fafafa"
                    placeholder="搜索"
                    v-model="InputGoodTitle"
                />
            </div>
        </header>
        <div class="shop-good-content">
            <div class="content-left">
                <ol>
                    <template v-for=" item in goodsClassData">
                        <li
                            :class="{focus2:item.id === currentGoodsClass}"
                            @click="chooseClass(item.id)"
                            :key="item.id"
                            :id="item.id"
                        >
                            <span>{{item.className}}</span>
                        </li>
                    </template>
                </ol>
            </div>
            <div id="content-right" @scroll="moving" class="content-right">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="handleLoad"
                    :immediate-check="false"
                >
                    <div v-for="item in goodsData" :key="item.id" :title="item.title">
                        <div @click="()=>goGoodsDetail(item)">
                            <van-card
                                :title="item.goodTitle|filtersTitle"
                                thumb="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoMjjGbIZlstK74IZk2tfkCGw/132"
                            >
                                <div v-if="item.goodType === 0" slot="tags" class="right-tags">
                                    <p>
                                        <span v-if="item.isNowSell">即时出售</span>
                                        <span v-if="!item.isNowSell">议时出售</span>
                                        <span>{{item.buyTime|filtersBuyTime}}</span>
                                    </p>
                                    <p>
                                        <span v-if="item.isDiscuss">可议价</span>
                                        <span v-if="!item.isDiscuss">不可议价</span>
                                        <span>原价:￥{{item.oldPrice}}</span>
                                    </p>
                                </div>
                                <div v-if="item.goodType === 1" slot="tags" class="right-tags">
                                    <p>
                                        <span v-if="item.isNowSell">即时出租</span>
                                        <span v-if="!item.isNowSell">议时出租</span>
                                        <span v-if="item.isDiscuss">可议价</span>
                                        <span v-if="!item.isDiscuss">不可议价</span>
                                    </p>
                                </div>
                                <div
                                    @click.stop="addToLove(item.id)"
                                    class="right-footer"
                                    slot="footer"
                                >
                                    <div></div>
                                    <div class="footer-price">
                                        <span>￥</span>
                                        <span>55</span>
                                    </div>
                                    <div>
                                        <span class="footer-icon">
                                            <van-icon
                                                name="xihuan"
                                                color="rgba(167, 158, 158, 0.99)"
                                                size=".7rem"
                                            />
                                        </span>
                                    </div>
                                </div>
                            </van-card>
                        </div>
                    </div>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Search, List, Card, Icon, Popup, Toast } from 'vant';
// import { list as goodsList } from '../../svc/Cart';
import { list as goodsClassList } from '../../svc/suc/SucGoodsClass';
import { list as goodsList } from '../../svc/suc/SucGoods';
import { add as addLove } from '../../svc/suc/SucLove';

// Lazyload插件需要初始化

export default {
    components: {
        [Icon.name]: Icon,
        [Search.name]: Search,
        [List.name]: List,
        [Card.name]: Card,
        [Popup.name]: Popup,
    },
    data() {
        return {
            goodsData: [],
            pageNum: 0, // 当前页码
            loading: false, // 是否正在加载商品列表
            finished: false, // 是否全部加载完成商品列表
            scroll: 0,
            currentGoodsClass: 1,
            goodsClassData: [],
            timeout: null,
            InputGoodTitle: null,
            show: false,
        };
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
    activated() {
        document.getElementById('content-right').scrollTop = this.scroll;
    },
    methods: {
        showPopup() {
            this.show = true;
        },
        searchInput(str) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                console.log('ss:' + str);
                this.InputGoodTitle = str;
                this.pageNum = 0;
                this.goodsData = [];
                this.handleLoad();
            }, 500);
        },
        goGoodsDetail(item) {
            this.$router.push({ name: 'goods-detail', params: { payload: item } });
        },
        moving(e) {
            this.scroll = e.target.scrollTop;
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
        // 获取商品数据
        handleLoad() {
            const params = {
                pageNum: this.pageNum + 1,
                state: true,
                schoolName: this.$store.getters.user.schoolName,
                classId: this.currentGoodsClass,
                goodTitle: this.InputGoodTitle,
            };
            goodsList({
                params,
                onSuccess: data => {
                    this.pageNum = data.pageNum;
                    this.goodsData.push(...data.list);
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
        chooseClass(index) {
            this.currentGoodsClass = index;
            this.pageNum = 0;
            this.goodsData = [];
            this.handleLoad();
        },
        getGoodsClassList() {
            this.goodsData = [];
            this.pageNum = 0;
            goodsClassList({
                onSuccess: data => {
                    this.goodsClassData = data;
                    this.currentGoodsClass = data[0].id;
                    this.handleLoad();
                },
            });
        },
    },
    beforeCreate() {},
    beforeMounted() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    mounted() {
        this.getGoodsClassList();
    },
};
</script>

<style lang="less" scoped>
html,
body {
    height: 100%;
    background: white;
    font-family: PingFang-SC-Regular, Helvetica Neue, Helvetica, microsoft yahei, sans-serif;
}
.shop-good {
    height: 100%;
    background: white;
    &-header {
        position: fixed;
        width: 100%;
        height: 3rem;
        z-index: 99;
        background: white;
        .header-title {
            display: flex;
            font-size: 0.5rem;
            height: 1.1rem;
            margin-top: 0.2rem;
            justify-content: space-between;
            padding: 0 0.3rem;
        }
    }
    &-content {
        height: 100%;
        display: flex;
        position: relative;
        .content-left {
            position: fixed;
            width: 20%;
            height: 100%;
            overflow: scroll;
            top: 3rem;
            padding: 0;
            margin: 0;
            background: rgba(60, 47, 15, 0.041);
            ol {
                padding: 0;
                margin: 0;
                padding-bottom: 3rem;
                li {
                    margin: 0;
                    padding: 0;
                    height: 1.5rem;
                    span {
                        padding: 0 0 0 0.5rem;
                        margin: 0 0 0 0.1rem;
                        font-size: 0.45rem;
                        width: 100%;
                        color: #907777;
                        border-left: solid 2px rgba(60, 47, 15, 0.041);
                    }
                }
                .focus2 {
                    background: white;
                    span {
                        border-left: solid 2px #47b508;
                        color: #47b508;
                    }
                }
            }
        }
        .content-right {
            position: fixed;
            margin-left: 2rem;
            overflow: scroll;
            height: 100vh;
            top: 3rem;
            width: 80%;
            .right-tags {
                padding-top: 0.1rem;
                p {
                    padding: 0;
                    margin: 0;
                    padding-top: 0.1rem;
                    span {
                        padding: 0 0.2rem;
                        margin-right: 0.15rem;
                        color: rgb(141, 148, 153);
                    }
                }
            }
            .right-footer {
                margin-top: -0.7rem;
                display: flex;
                justify-content: space-between;
                .footer-price {
                    height: 0.75rem;
                    line-height: 0.75rem;
                    span {
                        font-size: 0.4rem;
                        color: rgba(115, 169, 199, 0.8);
                    }
                    span:first-child {
                        font-size: 0.25rem;
                    }
                }
                .footer-icon {
                    i:active {
                        background: rgba(123, 191, 234, 0.2);
                    }
                }
            }
        }
    }
}
.van-search {
    height: 1.3rem;
    width: 98%;
    border-radius: 0.6rem;
    background: #7bbfea;
    margin-left: 1%;
}

.van-card {
    background: white;
    padding-bottom: 0.2rem;
    .van-card__thumb {
        img {
            width: 100%;
        }
    }
    .van-card__title {
        color: rgb(70, 72, 73);
        padding-top: 0.2rem;
        font-size: 0.38rem;
    }
}
.van-card__price {
    color: #7bbfea;
    padding: 0.2rem 0 0 0.2rem;
}

.shop-good-content {
    height: 100%;
    overflow: scroll;
}

.popup-content {
    height: 100%;
    .content-item {
        display: flex;
        justify-content: space-around;
        text-align: center;
        div {
            background: rgba(60, 47, 15, 0.041);
            margin: 0.3rem;
            width: 2rem;
            p {
                padding: 0;
                margin: 0;
                font-size: 0.35rem;
                padding: 0.15rem 0;
            }
        }
    }
}
</style>
