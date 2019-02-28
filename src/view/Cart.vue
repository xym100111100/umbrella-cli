<template>
  <!-- 购物车的视图组件 -->
  <div class="cart-view">
    <div class="cart-view__main">
      <van-nav-bar
        :border="false"
        title="购物车"
        right-text="管理"
      />
      <van-checkbox-group
        class="card-goods"
        v-model="checkedGoods"
      >
        <van-checkbox
          class="card-goods__item"
          v-for="item in goods"
          :key="item.id"
          :name="item.id"
        >
          <van-card
            :title="item.title"
            :desc="item.desc"
            :num="item.num"
            :price="formatPrice(item.price)"
            :thumb="item.thumb"
          />
        </van-checkbox>
      </van-checkbox-group>
    </div>
    <van-submit-bar
      :price="totalPrice"
      :disabled="!checkedGoods.length"
      :button-text="submitBarText"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { NavBar, Icon, Checkbox, CheckboxGroup, Card, SubmitBar, Toast } from 'vant';

export default {
    components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
        [Card.name]: Card,
        [Checkbox.name]: Checkbox,
        [SubmitBar.name]: SubmitBar,
        [CheckboxGroup.name]: CheckboxGroup,
    },

    data() {
        return {
            checkedGoods: ['1', '2', '3'],
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
    },
};
</script>

<style lang="less" scoped>
@cart-background-color: #fafafa;
.cart-view {
    display: flex;
    flex-direction: column;
    background-color: @cart-background-color;
    // height: 100%-@tabbar-height;
    // width: 100%;

    .cart-view__main {
        flex-grow: 1;

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

                .van-checkbox__label {
                    width: 100%;
                    padding: 0 10px 0 15px;
                    box-sizing: border-box;
                }

                .van-checkbox__icon {
                    top: 50%;
                    left: 10px;
                    z-index: 1;
                    position: absolute;
                    margin-top: -10px;
                }

                .van-card {
                    background-color: unset;
                    &__price {
                        color: #f44;
                    }
                }
            }
        }
    }
    .van-submit-bar {
        left: unset;
        bottom: unset;
        position: unset;

        .van-checkbox {
            margin-left: 20px;
        }
    }
}
</style>
