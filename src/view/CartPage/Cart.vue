<template>
    <!-- 购物车的视图组件 -->
    <div class="cart-view">
        <div class="cart-view__main">
            <div class="cart-nav">
                <van-nav-bar :border="false" title="喜欢" right-text="删除" @click-right="deleteLove" />
            </div>
            <div id="cart-content" class="cart-content" @scroll="moving">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="handleLoad"
                    :immediate-check="false"
                >
                    <div class="card-goods" v-for="item in goods" :key="item.id" :name="item.id">
                        <div class="cart-checkbox">
                            <van-checkbox-group @change="toggle" v-model="checkedGoods">
                                <van-checkbox :key="item.id" :name="item.id"></van-checkbox>
                            </van-checkbox-group>
                        </div>
                        <div class="cart-card" @click="()=>goGoodsDetail(item)">
                            <van-card
                                :title="item.goodTitle|filtersTitle"
                                :thumb="'/ise-svr/files'+item.fileList[0].imgPath"
                            >
                                <div v-if="item.goodType === 0" slot="tags" class="card-tags">
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
                                <div v-if="item.goodType === 1" slot="tags" class="card-tags">
                                    <p class="tags-paading">
                                        <span v-if="item.isNowSell">即时出租</span>
                                        <span v-if="!item.isNowSell">议时出租</span>
                                        <span v-if="item.isDiscuss">可议价</span>
                                        <span v-if="!item.isDiscuss">不可议价</span>
                                    </p>
                                </div>

                                <div
                                    @click.stop="()=>contact(item)"
                                    slot="footer"
                                    class="cart-footer"
                                >
                                    <div></div>
                                    <div class="footer-price">
                                        <span class="price-symbol">￥</span>
                                        <span>{{item.goodType === 0? item.newPrice:item.priceDay}}</span>
                                        <span v-if="item.goodType === 1" class="price-symbol">/天</span>
                                    </div>
                                    <div>
                                        <van-icon
                                            size=".7rem"
                                            color="rgb(186, 191, 202)"
                                            name="liaotian"
                                        />
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
import { NavBar, Icon, Dialog, Checkbox, Toast, Card, SubmitBar, Row, Col, Stepper, List, checkboxGroup } from 'vant';

import { list as goodsList, deleteByids } from '../../svc/suc/SucLove';

export default {
    components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
        [Card.name]: Card,
        [Checkbox.name]: Checkbox,
        [SubmitBar.name]: SubmitBar,
        [Row.name]: Row,
        [Col.name]: Col,
        [Stepper.name]: Stepper,
        [List.name]: List,
        [checkboxGroup.name]: checkboxGroup,
        [Toast.name]: Toast,
        [Dialog.name]: Dialog,
    },

    data() {
        return {
            // 选中的商品
            checkedGoods: [],
            // 是否全选
            checked: false,
            goods: [],
            pageNum: 0, // 当前页码
            loading: false, // 是否正在加载商品列表
            finished: false, // 是否全部加载完成商品列表
            scroll: 0,
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

    mounted() {
        this.handleLoad();
    },
    activated() {
        document.getElementById('cart-content').scrollTop = this.scroll;
    },
    methods: {
        moving(e) {
            this.scroll = e.target.scrollTop;
        },
        goGoodsDetail(item) {
            this.$router.push({ name: 'goods-detail', params: { payload: item } });
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
        toggle(e) {
            this.checkedGoods = e;
        },
        deleteLove() {
            if (this.checkedGoods.length < 1) {
                Toast({ message: '没有商品被选择', position: 'top' });
                return;
            }

            Dialog.confirm({
                title: '温馨提示',
                message: '确定删除选中商品?',
            })
                .then(() => {
                    let data = this.checkedGoods;
                    deleteByids({
                        data,
                        onSuccess: result => {
                            if (result.result === 1) {
                                Toast({ message: '删除成功', position: 'top' });
                                this.checkedGoods.map((id, index) => {
                                    this.goods.forEach((item, i, arr) => {
                                        if (item.id === id) arr.splice(i, 1);
                                    });
                                });
                                this.$store.getters.active.loveCount =
                                    this.$store.getters.active.loveCount - this.checkedGoods.length;
                            }
                        },
                    });
                })
                .catch(() => {});
        },

        // 获取商品数据
        handleLoad() {
            const params = { pageNum: this.pageNum + 1, userId: this.$store.getters.user.id };
            goodsList({
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
    },
};
</script>
<style lang="less" scoped>
html,
body {
    height: 100%;
}

@cart-background-color: #f2f3f5;

.cart-view {
    display: flex;
    flex-direction: column;
    background-color: @cart-background-color;

    .cart-view__main {
        flex-grow: 1;
        .van-nav-bar {
            height: 1.15rem;
            font-family: monospace;
            background-image: linear-gradient(to right, rgba(170, 234, 240, 0.514), #7bbfea);
            &__title {
                padding: 0 0.3rem;
                font-size: 0.45rem;
                max-width: unset;
                color: white;
            }

            &__right {
                bottom: -0.1rem;
                .van-nav-bar__text {
                    font-size: 0.4rem;
                    color: red;
                }
            }
        }

        .cart-content {
            width: 100%;
            height: 100%;
            overflow: auto;
            position: absolute;
            top: 1.2rem;
            margin-bottom: 1.2rem;
            background: #f2f3f5;
            left: 0.08rem;
        }

        .card-goods {
            padding: 0.26667rem 0;
            margin: 0.13rem;
            background-color: white;
            border-radius: 0.3rem;
            margin-left: 0.069rem;
            display: flex;
            width: 97vw;
            align-items: center;
            .cart-checkbox {
                padding-left: 0.2rem;
            }
        }

        .cart-card {
            .van-card {
                width: 85vw;
                padding-top: 0.3rem;
                margin-left: 0.3rem;
                .van-card__thumb {
                    img {
                        width: 100%;
                    }
                }
                .van-card__title {
                    color: rgb(86, 88, 90);
                }
            }
            .card-tags {
                p {
                    padding: 0;
                    margin: 0;
                    padding-top: 0.1rem;
                    padding-bottom: 0.1rem;
                    span {
                        padding: 0 0.1rem;
                        margin-right: 0.15rem;
                        color: rgb(141, 148, 153);
                    }
                }
                .tags-paading {
                    padding: 0.5rem 0;
                }
            }
            .cart-footer {
                margin-top: -0.6rem;
                display: flex;
                justify-content: space-between;
                .footer-price {
                    height: 0.75rem;
                    line-height: 0.75rem;
                    width: 2rem;
                    text-align: left;
                    margin-left: 0.6rem;
                    span {
                        font-size: 0.42rem;
                        color: rgba(115, 169, 199, 0.8);
                    }
                    .price-symbol {
                        font-size: 0.32rem;
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

.van-card__price {
    color: #7bbfea;
    padding-bottom: -1rem;
    padding-left: 0.1rem;
}
</style>


