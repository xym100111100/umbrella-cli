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
                                <van-checkbox
                                    class="card-goods__item"
                                    :key="item.id"
                                    :name="item.id"
                                ></van-checkbox>
                            </van-checkbox-group>
                        </div>
                        <div class="cart-card">
                            <van-card
                                :title="item.title"
                                :desc="item.desc"
                                :price="formatPrice(item.price)"
                                thumb-link="#/goods-detail"
                                :thumb="item.thumb"
                            />
                            <div @click="contact" class="cart-stepper">
                                <van-icon color="#7bbfea" name="liaotian" />
                            </div>
                        </div>
                    </div>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
import {
    NavBar,
    Icon,
    Checkbox,
    CheckboxGroup,
    Card,
    SubmitBar,
    Toast,
    SwipeCell,
    Dialog,
    Row,
    Col,
    Stepper,
    Button,
    List,
} from 'vant';

import { list as goodsList } from '../../svc/Cart';

export default {
    components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
        [Card.name]: Card,
        [Checkbox.name]: Checkbox,
        [SubmitBar.name]: SubmitBar,
        [CheckboxGroup.name]: CheckboxGroup,
        [SwipeCell.name]: SwipeCell,
        [Dialog.name]: Dialog,
        [Row.name]: Row,
        [Col.name]: Col,
        [Stepper.name]: Stepper,
        [Button.name]: Button,
        [List.name]: List,
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
            console.log(e);
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
#main-page {
    height: 93%;
}
.cart-view {
    display: flex;
    flex-direction: column;
    background-color: @cart-background-color;

    .cart-view__main {
        flex-grow: 1;
        .van-nav-bar {
            height: 1.15rem;
            font-family: monospace;
            // background: linear-gradient(to right, rgb(241, 101, 50), red);
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

        .cart-nav {
            height: 1.2rem;
            position: fixed;
            width: 100%;
            z-index: 99;
        }

        .cart-content {
            height: 100%;
            overflow: auto;
            position: absolute;
            top: 1.2rem;
            margin-bottom: 1.2rem;
            background: #f2f3f5;
        }

        .card-goods {
            padding: 0.26667rem 0;
            margin: 0.13rem;
            background-color: white;
            border-radius: 0.3rem;
            margin-left: 0.069rem;
            display: flex;
            flex: 1;
            align-items: center;

            &__item {
                position: relative;
                margin: 0 0.15rem;
                display: flex;
                justify-content: flex-end;
                height: 0.768rem;

                .van-checkbox__label {
                    padding: 0 10px 0 15px;
                    box-sizing: border-box;
                }

                .van-card {
                    background-color: unset;
                    &__price {
                        color: #7bbfea;
                    }
                }
            }
        }

        .cart-checkbox {
            display: flex;
            align-items: center;
            //   border: solid 1px rebeccapurple;
        }

        .cart-card {
            flex: 1;
            display: flex;
            // border: solid 1px yellow;
        }

        .cart-stepper {
            //  border: solid 1px red;
            width: 1.5rem;
            padding-top: 1.6rem;
            font-size: 0.8rem;
        }
    }

    .van-submit-bar {
        left: unset;
        bottom: unset;
        position: unset;
    }

    .cart-delete-bar {
        left: unset;
        bottom: unset;
        position: unset;
        margin-top: -1rem;

        .van-button--small {
            font-size: 0.42rem;
        }
    }
}

.van-card {
    background-color: white;
    width: 6.5rem;
}

.van-card__title {
    width: 5.32rem;
}

.van-card__desc {
    width: 5.32rem;
}

.van-card__bottom {
    width: 2.1667rem;
    margin-top: 0.5rem;
}

.van-card__header {
    margin-left: -0.16rem;
}
.van-card__price {
    color: #7bbfea;
}
</style>

<style>
.van-list > .van-list__finished-text {
    text-align: center;
    padding-right: 0rem;
}
</style>

