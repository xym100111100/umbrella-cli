<template>
  <div class="order-view">
    <div class="order-navbar">
      <van-nav-bar title="我的订单" left-arrow>
        <van-icon name="search" size=".8rem" slot="right"/>
      </van-nav-bar>
    </div>
    <div class="order-tabs">
      <van-tabs
        v-model="active"
        swipeable="true"
        title-active-color="red"
        background="#fafafa00"
        title-inactive-color="#333"
      >
        <van-tab>
          <div slot="title">
            <span style="font-size: 0.47333rem;">全部</span>
          </div>
          <div style="overflow: auto; height: 13.39rem;">
            <order-card :orders="orders"/>
          </div>
        </van-tab>
        <van-tab>
          <div slot="title">
            <span style="font-size: 0.47333rem;">待付款</span>
          </div>
          <div style="overflow: auto; height: 13.39rem;">
            <order-card :orders="orders"/>
          </div>
        </van-tab>
        <van-tab>
          <div slot="title">
            <span style="font-size: 0.47333rem;">待收货</span>
          </div>
          <div style="overflow: auto; height: 13.39rem;">
            <order-card :orders="orders"/>
          </div>
        </van-tab>
        <van-tab>
          <div slot="title">
            <span style="font-size: 0.47333rem;">待返款</span>
          </div>
          <div style="overflow: auto; height: 13.39rem;">
            <order-card :orders="orders"/>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { NavBar, Icon, Tab, Tabs, Cell, Tag, Card, Button } from 'vant';
import OrderCard from '../comp/order/OrderCard.vue';

import { list } from '../svc/ord/Order';

export default {
    components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Cell.name]: Cell,
        [Tag.name]: Tag,
        [Card.name]: Card,
        [Button.name]: Button,
        [OrderCard.name]: OrderCard,
    },

    data() {
        return {
            active: 0,
            orders: this.orders(),
        };
    },

    methods: {
        formatPrice(price) {
            return (price / 100).toFixed(2);
        },

        orders() {
            list({
                onSuccess: data => {
                    this.orders = data;
                    // 数据全部加载完成
                    this.finished = true;
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
.order-view {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    background-color: #f2f3f5;

    .order-navbar {
        width: 10rem;
        .van-nav-bar {
            background-color: red;
            &__arrow {
                font-size: 0.7rem;
            }

            &__title {
                color: #fafafa;
                font-size: 0.5rem;
            }

            .van-icon {
                color: #fafafa;
            }
        }
    }
}
</style>


