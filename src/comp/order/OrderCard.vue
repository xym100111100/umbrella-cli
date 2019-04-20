<template>
  <div>
    <div v-for="order in orders" :key="order.id" :name="order.id" class="order-card">
      <div style="width: 8rem; margin-top: -.2rem;">
        <van-cell>
          <div style="display: flex; justify-content: space-between;" slot="title">
            <span>订单：{{ order.id }}</span>
            <van-tag style="left: .3rem;" plain type="success">待发货</van-tag>
          </div>
        </van-cell>
      </div>
      <div>
        <!-- 该div用于画出水印 -->
        <!-- <div style="display: flex; justify-content: space-between;" class="transp-block circle"/> -->
        <!-- 该div用于不画水印时顶替水印的高度 -->
        <div style="margin-top: 1.25rem;"/>
        <div style="margin-top: -1.2rem;">
          <div v-for="item in order.goods" :key="item.id" :name="item.id" class="order-goods">
            <div style="margin-left: -1rem;" class="dividing-line"/>
            <van-card
              :title="item.title"
              :desc="item.desc"
              :num="item.num"
              thumb-link="#/goods-detail"
              :thumb="item.thumb"
            >
              <div slot="price">
                <span>￥0</span>
              </div>
              <div slot="origin-price">
                <span>{{ formatPrice(item.price) }}</span>
              </div>
            </van-card>
            <van-cell>
              <div slot="title" style="display: flex; justify-content: space-between;">
                <div class="order-matched">
                  <div class="order-matched-user">
                    <div>
                      <img
                        src="https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg"
                      >
                      <img
                        src="https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg"
                      >
                    </div>
                    <div style="margin-top: .25rem;">
                      <span style="font-size: .6rem;">&nbsp;⇒邀请</span>
                    </div>
                  </div>
                </div>
              </div>
            </van-cell>
          </div>
        </div>
      </div>
      <div class="order-goods-stat">
        <div class="dividing-line"/>
        <van-cell style="margin-top: .1rem;">
          <div slot="title">
            <div>
              <span>
                实付:￥
                <span style="font-size: 0.4rem;">100000.00</span>
              </span>
            </div>
          </div>
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Icon, Tab, Tabs, Cell, Tag, Card, Button } from 'vant';

// 注册组件
Vue.component('order-card');

export default {
    name: 'order-card',
    components: {
        [Icon.name]: Icon,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Cell.name]: Cell,
        [Tag.name]: Tag,
        [Card.name]: Card,
        [Button.name]: Button,
    },
    props: {
        orders: Array, // 加载的方法
    },

    methods: {
        formatPrice(price) {
            return (price / 100).toFixed(2);
        },
        onClickLeft() {
            Toast('返回');
        },
        onClickRight() {
            Toast('按钮');
        },
    },
};
</script>


<style lang="less" scoped>
.order-card {
    display: flex;
    padding: 0.26667rem 0;
    margin-bottom: 0.3rem;
    background-color: white;
    flex-direction: column;
    position: relative;

    .order-goods {
        // margin-left: 0.2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .van-cell {
        width: 9.6rem;
        background-color: unset;
        &__right-icon {
            margin-left: -1.00001rem;
        }
    }

    .van-tag {
        font-size: 0.35rem;
    }

    .van-card {
        background-color: unset;

        &__title {
            height: 2rem;
        }

        &__bottom {
            width: 3rem;
            margin-left: 3rem;
            margin-top: -0.55rem;
        }

        &__desc {
            width: 3rem;
            margin-top: 0.85rem;
        }
    }

    .order-matched {
        top: 0.2rem;
        text-align: center;
        .order-matched-user {
            margin-left: 3.55rem;
            display: flex;
            img {
                margin: 0.1rem;
                width: 0.8rem;
                height: 0.8rem;
                border-radius: 50%;
                -moz-border-radius: 50%;
                -webkit-border-radius: 50%;
            }
        }

        .van-button {
            height: 0.8rem;
            width: 1.6rem;
            line-height: 0.86rem;
            top: -0.35rem;
            margin-left: 0.1rem;
        }
    }

    .order-goods-stat {
        margin-left: -0.2rem;
        height: 1.2rem;

        .van-cell {
            &__title {
                text-align: right;
            }
        }
    }

    .dividing-line {
        height: 1px;
        border-top: 1px solid #f2f3f5;
        text-align: center;
    }

    .transp-block {
        background: #fff no-repeat right bottom;
        overflow: hiden;
        margin-left: 6.5rem;
        text-align: center;
        width: 1rem;
    }

    .transp-block:before {
        content: '测试';
        font-size: 0.6rem;
        color: #ff6a77;
        margin-left: 0.7rem;
        margin-top: 0.48rem;
        -webkit-transform: rotate(-45deg);
    }

    .circle {
        width: 2rem;
        height: 2rem;
        text-align: center;
        background: #fafafa;
        -moz-border-radius: 50px;
        -webkit-border-radius: 50px;
        border-radius: 50px;
        margin-top: -0.8rem;
    }

    .van-cell:not(:last-child)::after {
        border-bottom: 0;
    }
}
</style>

