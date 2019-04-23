<template>
  <!-- 购物车的视图组件 -->
  <div class="cart-view">
    <div class="cart-view__main">
      <div style="height: 1.2rem;">
        <van-nav-bar :border="false" title="购物车" right-text="管理" @click-right="onManage"/>
      </div>
      <div style="height: 11.78rem; overflow:auto;">
        <div
          class="card-goods"
          style="display: flex; flex: 1; align-items: center;"
          v-for="item in goods"
          :key="item.id"
          :name="item.id"
        >
          <div class="cart-checkbox">
            <van-checkbox-group v-model="checkedGoods">
              <van-checkbox class="card-goods__item" :key="item.id" :name="item.id"></van-checkbox>
            </van-checkbox-group>
          </div>
          <div class="cart-card">
            <van-card
              @touchstart.native="deleteGoods(item.id)"
              @touchend.native="gotouchend"
              :title="item.title"
              :desc="item.desc"
              :num="item.num"
              :price="0"
              :origin-price="formatPrice(item.price)"
              thumb-link="#/goods-detail"
              :thumb="item.thumb"
            />
            <div class="cart-stepper">
              <van-stepper
                :key="item.id"
                :name="item.id"
                v-model="item.num"
                :integer="true"
                :max="99"
                @plus="stepperPlus(item)"
                @minus="stepperMinus(item)"
                @blur="stepperBlur(item)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="isShowSubmit" style="display: flex; flex-direction: column;">
      <van-submit-bar
        :price="totalPrice"
        :disabled="!checkedGoods.length"
        :button-text="submitBarText"
        @submit="onSubmit"
      >
        <van-checkbox v-model="checked" @change="selectAll">全选</van-checkbox>
      </van-submit-bar>
    </div>
    <div v-show="isShowManage" class="cart-delete-bar">
      <div class="van-submit-bar__bar">
        <van-checkbox v-model="checked" @change="selectAll">全选</van-checkbox>
        <div style="margin-left: 6rem;">
          <van-button plain hairline :round="true" size="small" type="danger" text="删除"/>
        </div>
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
} from 'vant';

import { list as goodsList } from '../svc/Cart';

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
    },

    data() {
        return {
            // 选中的商品
            checkedGoods: [],
            // 是否全选
            checked: false,
            steppervalue: 1,
            // 是否显示管理页面
            isShowManage: false,
            // 是否显示提交页面
            isShowSubmit: true,
            goods: this.goods(),
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

    methods: {
        formatPrice(price) {
            return (price / 100).toFixed(2);
        },

        onSubmit() {
            Toast('点击结算');
        },

        // 全选
        selectAll(event) {
            if (event === true) {
                const goods = this.goods;
                let checkedGoods = new Array();
                for (let i = 0; i < goods.length; i++) {
                    const element = goods[i];
                    checkedGoods.push(element.id);
                }
                this.checkedGoods = checkedGoods;
            } else {
                this.checkedGoods = [];
            }
        },

        // 删除购物车商品
        deleteGoods(e) {
            clearTimeout(this.Loop); //再次清空定时器，防止重复注册定时器
            this.Loop = setTimeout(
                function() {
                    this.$dialog
                        .confirm({
                            message: '确认要删除该商品吗？',
                            cancelButtonText: '我再想想',
                            closeOnClickOverlay: true,
                        })
                        // 点击确定执行事件
                        .then(() => {
                            console.log('确定');
                        })
                        // 点击取消执行事件
                        .catch(() => {
                            Dialog.close;
                        });
                }.bind(this),
                2000
            );
        },

        // 如果长按的事件不足1秒则执行其他操作
        gotouchend() {
            // 清除定时器
            clearTimeout(this.Loop);
            if (this.Loop != 0) {
                console.log(111);
            }
        },

        // 点击管理事件
        onManage() {
            // 是否显示管理页面
            this.isShowManage = !this.isShowManage;
            // 是否显示提交页面
            this.isShowSubmit = !this.isShowSubmit;
        },

        // 获取商品数据
        goods() {
            goodsList({
                onSuccess: data => {
                    this.goods = data.list;
                    // 数据全部加载完成
                    this.finished = true;
                },
                onFinish: () => {
                    // 结束加载状态
                    this.loading = false;
                },
            });
        },

        // 步进器点击增加按钮时触发
        stepperPlus(goods) {
            console.log(goods);
        },

        // 步进器点击减少按钮时触发
        stepperMinus(goods) {
            console.log(goods);
        },

        // 步进器输入框失焦时触发
        stepperBlur(goods) {
            console.log(goods);
        },
    },
};
</script>

<style lang="less" scoped>
@cart-background-color: #fafafa;
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
            background: linear-gradient(to right, rgb(241, 101, 50), red);

            &__title {
                color: white;
                padding: 0 0.3rem;
                font-size: 0.5rem;
                max-width: unset;
            }

            &__right {
                bottom: -0.01rem;
                .van-nav-bar__text {
                    font-size: 0.4rem;
                    color: white;
                }
            }
        }

        .card-goods {
            padding: 10px 0;
            margin: 0.3rem;
            background-color: white;
            border-radius: 0.3rem;

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
                        color: #f44;
                    }
                }
            }
        }

        .cart-checkbox {
            margin-left: 0.19rem;
            display: flex;
            align-items: center;
        }

        .cart-card {
            flex: 1;
            margin-left: -0.1rem;
            display: flex;
        }

        .cart-stepper {
            margin-left: -0.76rem;
            margin-top: 2rem;
            width: 3.2rem;
        }
    }

    .van-submit-bar {
        left: unset;
        bottom: unset;
        position: unset;
        margin-top: -1rem;

        .van-checkbox {
            margin-left: 0.53333rem;
        }
    }

    .cart-delete-bar {
        left: unset;
        bottom: unset;
        position: unset;
        margin-top: -1rem;
        z-index: 99;

        .van-checkbox {
            margin-left: 0.53333rem;
        }

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
}

.van-card__header {
    margin-left: -0.16rem;
}
</style>
