<template>
  <!-- 购物车的视图组件 -->
  <div class="cart-view">
    <div class="cart-view__main">
      <div style="height: 6%">
        <van-nav-bar :border="false" title="购物车" right-text="管理"/>
      </div>
      <div style="height: 90%; overflow:auto;">
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
              :price="formatPrice(item.price)"
              thumb-link="#/goods-detail"
              :thumb="item.thumb"
            />
            <div class="cart-stepper">
              <van-stepper v-model="steppervalue" integer="true" :max="99"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="display: flex;
    flex-direction: column;">
      <van-submit-bar
        :price="totalPrice"
        :disabled="!checkedGoods.length"
        :button-text="submitBarText"
        @submit="onSubmit"
      >
        <van-checkbox v-model="checked" @change="selectAll">全选</van-checkbox>
      </van-submit-bar>
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
} from 'vant';

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
    },

    data() {
        return {
            // 选中的商品
            checkedGoods: [],
            // 是否全选
            checked: false,
            steppervalue: 1,
            goods: [
                {
                    id: '1',
                    title: '进口香蕉',
                    desc: '约250g，2根',
                    price: 200,
                    num: 1,
                    thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg',
                },
                {
                    id: '2',
                    title: '陕西蜜梨',
                    desc: '约600g',
                    price: 690,
                    num: 1,
                    thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg',
                },
                {
                    id: '3',
                    title: '美国伽力果',
                    desc: '约680g/3个',
                    price: 2680,
                    num: 1,
                    thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg',
                },
                {
                    id: '4',
                    title: '美国伽力果',
                    desc: '约680g/3个',
                    price: 2680,
                    num: 1,
                    thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg',
                },
                {
                    id: '5',
                    title: '美国伽力果',
                    desc: '约680g/3个',
                    price: 2680,
                    num: 1,
                    thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg',
                },
            ],
        };
    },

    computed: {
        submitBarText() {
            const count = this.checkedGoods.length;
            return '结算' + (count ? `(${count})` : '');
        },

        totalPrice() {
            return this.goods.reduce(
                (total, item) => total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.price : 0),
                0
            );
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
                1500
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
        height: 100%;
        .van-nav-bar {
            height: 1.15rem;
            font-family: monospace;
            background: linear-gradient(to right, OrangeRed, red);

            &__title {
                color: white;
                padding: 0 0.3rem;
                font-size: 0.5rem;
                max-width: unset;
            }

            &__right {
                bottom: -0.15rem;
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
                height: 28.8px;

                .van-checkbox__label {
                    width: 100%;
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
            margin-left: 2%;
            display: flex;
            align-items: center;
        }

        .cart-card {
            flex: 1;
            margin-left: -1%;
            display: flex;
        }

        .cart-stepper {
            margin-left: 11%;
            margin-top: 22%;
        }
    }
    .van-submit-bar {
        left: unset;
        bottom: unset;
        position: unset;
        margin-top: -8%;

        .van-checkbox {
            margin-left: 20px;
        }
    }
}

.van-card {
    background-color: white;
    height: 100%;
}

.van-card__header {
    margin-left: -2%;
}
</style>
