<template>
  <div class="confirm-order-view">
    <div class="confirm-order-navbar">
      <van-nav-bar title="确认订单" left-arrow @click-left="onClickLeft" @click-right="onClickRight"/>
    </div>
    <div class="confirm-order__main">
      <div class="confirm-order-address">
        <div class="adderss-cell">
          <van-cell title="张三 13000000000" label="浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室" is-link>
            <van-icon slot="icon" name="location-o" size="0.7rem" color="red"/>
          </van-cell>
        </div>
      </div>
      <div class="confirm-order-pay">
        <van-cell title="支付方式">
          <div slot="label" class="confirm-order-pay-manner">
            <van-radio-group v-model="radio">
              <van-cell-group>
                <van-cell clickable @click="radio = '1'">
                  <div
                    style="display: flex; justify-content: space-between; align-items: center;  width: 6rem;"
                    slot="title"
                  >
                    <img :src="VpayImg" name="vpayImg">
                    <div
                      style="margin-right: 1.4rem; display: flex; flex-direction: column; justify-content: space-between;"
                    >
                      <span style="font-size: .5rem; font-weight: bold;">V支付</span>
                      <span style="font-size: .3rem; font-weight: 100;">微薄利旗下安全快捷支付</span>
                    </div>
                  </div>
                  <div style="display: flex; justify-content: flex-end; align-items: center;">
                    <div style="margin-right: .2rem;">
                      <span style="color: red">5554002&nbsp;</span>元
                    </div>
                    <div>
                      <van-radio name="1"/>
                    </div>
                  </div>
                </van-cell>
                <van-cell clickable @click="radio = '2'">
                  <div
                    style="display: flex; justify-content: space-between; align-items: center; width: 6rem;"
                    slot="title"
                  >
                    <img :src="WechatPayImg" name="wechatPayImg">
                    <div
                      style="margin-right: 2rem; display: flex; flex-direction: column; justify-content: space-between;"
                    >
                      <span style="margin-right: .68rem; font-size: .5rem; font-weight: bold;">微信支付</span>
                      <span style="font-size: .3rem; font-weight: 100;">微信快捷支付</span>
                    </div>
                  </div>
                  <div>
                    <van-radio name="2"/>
                  </div>
                </van-cell>
              </van-cell-group>
            </van-radio-group>
          </div>
        </van-cell>
      </div>
      <div class="confirm-order-goods" v-for="item in goods" :key="item.id">
        <van-card
          :title="item.title"
          :desc="item.desc"
          :num="item.num"
          :price="0"
          :origin-price="formatPrice(item.price)"
          thumb-link="#/goods-detail"
          :thumb="item.thumb"
        />
        <van-field v-model="username" clearable label="留言" placeholder="建议留言前先与商家沟通确认"/>
      </div>
    </div>
    <div>
      <van-submit-bar :price="3050" button-text="提交订单"/>
    </div>
  </div>
</template>

<script>
import { NavBar, Icon, CellGroup, Cell, SubmitBar, RadioGroup, Radio, Card, Field } from 'vant';

export default {
    components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
        [CellGroup.name]: CellGroup,
        [Cell.name]: Cell,
        [SubmitBar.name]: SubmitBar,
        [RadioGroup.name]: RadioGroup,
        [Radio.name]: Radio,
        [Card.name]: Card,
        [Field.name]: Field,
    },

    data() {
        return {
            radio: '1',
            VpayImg: 'img/Vpay.png',
            WechatPayImg: 'img/WechatPay.png',
            goods: [
                {
                    desc: '地果统用边接题边话系七织连毛路',
                    id: 5225068224388524,
                    num: 99,
                    price: 960.24,
                    thumb: 'https://picsum.photos/200/200/?image=543',
                    title: '如适而识组时应听王设调除由工 商品',
                },
                {
                    desc: '地果统用边接题边话系七织连毛路',
                    id: 5225068224388525,
                    num: 99,
                    price: 960.24,
                    thumb: 'https://picsum.photos/200/200/?image=543',
                    title: '如适而识组时应听王设调除由工 商品',
                },
                {
                    desc: '地果统用边接题边话系七织连毛路',
                    id: 5225068224388526,
                    num: 99,
                    price: 960.24,
                    thumb: 'https://picsum.photos/200/200/?image=543',
                    title: '如适而识组时应听王设调除由工 商品',
                },
            ],
            username: '',
        };
    },

    methods: {
        onClickLeft() {
            Toast('返回');
        },
        onClickRight() {
            Toast('按钮');
        },

        formatPrice(price) {
            return (price / 100).toFixed(2);
        },
    },
};
</script>

<style lang="less" scoped>
.confirm-order-view {
    display: flex;
    flex-direction: column;
    background-color: #f2f3f5;

    .confirm-order__main {
        height: 13.21rem;
        overflow: auto;
    }

    .confirm-order-navbar {
        .van-nav-bar {
            background-color: red;

            &__title {
                color: #fafafa;
                font-size: 0.5rem;
            }

            &__arrow {
                font-size: 0.7rem;
            }

            &__left {
                left: 0.1rem;
            }
        }

        .van-icon {
            color: #fafafa;
        }
    }

    .confirm-order-address {
        display: flex;
        padding: 0.26667rem 0;
        margin: 0.3rem;
        background-color: white;
        border-radius: 0.3rem;
        margin-bottom: 0;

        .adderss-cell {
            width: 9.4rem;
        }

        .van-cell {
            &__right-icon {
                margin-top: 0.6rem;
            }

            &__title {
                margin-left: 0.2rem;
            }
        }

        .cell-left-icon {
            color: red;
        }

        .van-icon {
            margin-top: 0.5rem;
        }
    }

    .confirm-order-pay {
        padding: 0.26667rem 0;
        margin: 0.3rem;
        background-color: white;
        border-radius: 0.3rem;
        margin-bottom: 0;

        &-manner {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            img {
                width: 1.1rem;
                height: 1.1rem;
            }

            .van-cell {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.1rem;

                &__value {
                    margin-left: -1.5rem;
                }
            }
        }
    }

    .confirm-order-goods {
        display: flex;
        padding: 0.26667rem 0;
        margin: 0.3rem;
        background-color: white;
        border-radius: 0.3rem;
        flex-direction: column;
        justify-content: space-between;

        .van-card {
            background-color: white;

            &__content {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 6.3rem;
            }
        }
    }
}
</style>

<style lang="less">
.van-field__label {
    max-width: 1rem;
}
</style>
