<template>
    <!-- 购物车的视图组件 -->
    <div class="cart-view">
        <div class="cart-view__main">
            <div class="cart-nav">
                <van-nav-bar
                    :border="false"
                    title="喜欢"
                    :right-text="checkedGoods.length > 0? '删除':'管理'"
                    @click-right="manageBtn"
                />
            </div>
            <div id="cart-content" class="cart-content" @scroll="moving">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="handleLoad"
                >
                    <div class="card-goods" v-for="item in goods" :key="item.id" :name="item.id">
                        <div class="cart-checkbox">
                            <van-checkbox-group @change="toggle" v-model="checkedGoods">
                                <van-checkbox :key="item.id" :name="item.id"></van-checkbox>
                            </van-checkbox-group>
                        </div>
                        <div class="cart-card">
                            <van-card
                                :title="item.title|filtersTitle"
                                :price="formatPrice(item.price)"
                                thumb-link="#/goods-detail"
                                :thumb="item.thumb"
                            >
                                <div slot="tags" class="card-tags">
                                    <p>
                                        <span>即时出售</span>
                                        <span>已用5年</span>
                                    </p>
                                    <p>
                                        <span>不可议价</span>
                                        <span>原价:${{item.price}}</span>
                                    </p>
                                </div>

                                <div @click="contact" slot="footer" class="cart-footer">
                                    <van-icon color="rgb(186, 191, 202)" name="liaotian" />
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
import { NavBar, Icon, Checkbox, Card, SubmitBar, Row, Col, Stepper, List, checkboxGroup } from 'vant';

import { list as goodsList } from '../../svc/Cart';

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
            manage: '管理',
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
    },
    computed: {
        submitBarText() {
            const count = this.checkedGoods.length;
            return '结算' + (count ? `(${count})` : '');
        },

        totalPrice() {
            if (this.goods !== undefined) {
                return this.goods.reduce(
                    (total, item) => total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.price * item.num : 0),
                    0
                );
            } else {
                return 0;
            }
        },
    },
    activated() {
        document.getElementById('cart-content').scrollTop = this.scroll;
    },
    methods: {
        moving(e) {
            this.scroll = e.target.scrollTop;
        },
        formatPrice(price) {
            return (price / 100).toFixed(2);
        },
        contact() {
            this.$router.push({ name: 'corridor' });
        },
        toggle(e) {
            this.checkedGoods = e;
            if (e.length > 0) {
                this.manage = '删除';
            } else {
                this.manage = '管理';
            }
        },
        // 全选
        manageBtn() {
            if (!this.checked) {
                const goods = this.goods;
                let checkedGoods = new Array();
                for (let i = 0; i < goods.length; i++) {
                    const element = goods[i];
                    checkedGoods.push(element.id);
                }
                this.checkedGoods = checkedGoods;
                this.checked = true;
                this.manage = '删除';
            } else {
                this.checkedGoods = [];
                this.checked = false;
                this.manage = '管理';
            }
        },

        // 获取商品数据
        handleLoad() {
            const params = { pageNum: this.pageNum + 1 };
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
            background: white;
            &__title {
                padding: 0 0.3rem;
                font-size: 0.5rem;
                max-width: unset;
            }

            &__right {
                bottom: -0.1rem;
                .van-nav-bar__text {
                    font-size: 0.4rem;
                    color: #7bbfea;
                }
            }
        }

        .cart-content {
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
                width: 86vw;
                padding-top: 0.5rem;
                margin-left: 0.2rem;
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
                        background: rgba(123, 191, 234, 0.2);
                        color: #7bbfea;
                    }
                }
            }
            .cart-footer {
                font-size: 0.7rem;
                margin-top: -0.5rem;
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


