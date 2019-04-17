<template>
  <div class="confirm-order-view">
    <div class="confirm-order-navbar">
      <van-nav-bar
        left-text="确认订单"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <div class="confirm-order-address">
      <div class="adderss-cell">
        <van-cell title="张三 13000000000" label="浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室" is-link>
          <van-icon slot="icon" name="location-o" size="0.7rem" color="red"/>
        </van-cell>
      </div>
    </div>
    <div>
      <van-submit-bar :price="3050" button-text="提交订单"/>
    </div>
  </div>
</template>

<script>
import { NavBar, Icon, Cell, SubmitBar } from 'vant';

export default {
    components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
        [Cell.name]: Cell,
        [SubmitBar.name]: SubmitBar,
    },

    data() {
        return {};
    },

    methods: {
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
.confirm-order-view {
    display: flex;
    flex-direction: column;
    background-color: #fafafa;

    .confirm-order-navbar {
        .van-nav-bar {
            background-color: red;

            &__text {
                color: #fafafa;
                font-size: 0.6rem;
                margin-left: -0.7rem;
            }

            &__arrow {
                font-size: 0.8rem;
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
}
</style>
