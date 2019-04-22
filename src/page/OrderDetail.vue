<template>
  <div class="order-detail-view">
    <div class="order-detail-navbar">
      <van-nav-bar title="订单详情" left-arrow/>
    </div>
    <div style="height: 14.5rem; overflow:auto;">
      <div class="order-step">
        <van-steps :active="stepActive">
          <van-step>买家下单</van-step>
          <van-step>商家接单</van-step>
          <van-step>买家提货</van-step>
          <van-step>交易完成</van-step>
          <div slot="icon">
            <van-icon name="close"/>
          </div>
        </van-steps>
      </div>
      <div class="order-detail-address">
        <van-cell title="收货地址" icon="location-o">
          <div slot="label">
            <div class="order-detail-consignee">
              <span style="color: #333;">{{ order[0].receiverName }}</span>
              <span style="color: #333;">{{ order[0].receiverMobile }}</span>
            </div>
            <div>
              <span
                style="color: #333;"
              >{{ order[0].receiverProvince }} {{ order[0].receiverCity }} {{ order[0].receiverExpArea }} {{ order[0].receiverAddress }}</span>
            </div>
          </div>
        </van-cell>
      </div>
      <div class="order-card">
        <order-card :orders="order"/>
      </div>
      <div>
        <div>
          <van-cell>
            <div style="display: flex; justify-content: space-between;" slot="title">
              <span>订单编号</span>
              <span>{{ order[0].orderCode }}</span>
            </div>
          </van-cell>
        </div>
        <div>
          <van-cell>
            <div style="display: flex; justify-content: space-between;" slot="title">
              <span>下单时间</span>
              <span>{{ order[0].orderTime }}</span>
            </div>
          </van-cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Step, Steps, Icon, Cell, Card, Tag } from 'vant';
import OrderCard from '../comp/order/OrderCard.vue';

import { list } from '../svc/ord/OrderDetail';

export default {
    components: {
        [NavBar.name]: NavBar,
        [Step.name]: Step,
        [Steps.name]: Steps,
        [Icon.name]: Icon,
        [Cell.name]: Cell,
        [OrderCard.name]: OrderCard,
        [Card.name]: Card,
        [Tag.name]: Tag,
    },

    data() {
        return {
            stepActive: 0,
            order: this.order(),
        };
    },

    methods: {
        formatPrice(price) {
            return (price / 100).toFixed(2);
        },

        order() {
            list({
                onSuccess: data => {
                    this.order = data;
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
.order-detail-view {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    background-color: #fafafa;

    .order-detail-navbar {
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

    .order-step {
        .van-steps--horizontal {
            background-color: #fafafa;
            .van-step--process i {
                font-size: 0.5rem;
            }
        }
    }

    .order-detail-address {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: white;
        margin-bottom: 0.3rem;

        .order-detail-consignee {
            display: flex;
            justify-content: space-between;
        }

        .van-cell__left-icon {
            font-size: 0.7rem;
            margin-top: 0.5rem;
            color: red;
        }
    }
}
</style>

