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
        <van-cell title="收货地址">
          <div slot="label">
            <div class="order-detail-consignee">
              <span style="color: #333;">测试</span>
              <span style="color: #333;">15787454542</span>
            </div>
            <div>
              <span style="color: #333;">广西壮族自治区 南宁市 西乡塘区 安吉华尔街工谷</span>
            </div>
          </div>
        </van-cell>
      </div>
      <div class="order-card">
        <div style="margin-top: -.2rem;">
          <van-cell>
            <div slot="title">
              <span>订单：{{ order.id }}</span>
            </div>
          </van-cell>
        </div>
        <div>
          <div>
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
      <div>
        <div>
          <van-cell>
            <div style="display: flex; justify-content: space-between;" slot="title">
              <span>订单编号</span>
              <span>{{ order.id }}</span>
            </div>
          </van-cell>
        </div>
        <div>
          <van-cell>
            <div style="display: flex; justify-content: space-between;" slot="title">
              <span>下单时间</span>
              <span>{{ order.orderTime }}</span>
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
            order: {
                id: '12345678-12345678-12345678',
                orderState: 1,
                orderTime: '2019-04-19 17:02:22',
                goods: [
                    {
                        id: '1',
                        title: '进口香蕉asdaadasadasdasdasdasdsadsadassdadadad',
                        desc: '约250g，2根',
                        price: 20000,
                        num: 1,
                        thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg',
                    },
                    {
                        id: '2',
                        title: '进口香蕉asdaadasadasdasdasdasdsadsadassdadadad',
                        desc: '约250g，2根',
                        price: 20000,
                        num: 1,
                        thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg',
                    },
                    {
                        id: '3',
                        title: '进口香蕉asdaadasadasdasdasdasdsadsadassdadadad',
                        desc: '约250g，2根',
                        price: 20000,
                        num: 1,
                        thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg',
                    },
                ],
            },
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
    }

    .order-card {
        display: flex;
        padding: 0.26667rem 0;
        margin-bottom: 0.3rem;
        background-color: white;
        flex-direction: column;
        position: relative;

        .order-goods {
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

        .van-cell:not(:last-child)::after {
            border-bottom: 0;
        }
    }
}
</style>

