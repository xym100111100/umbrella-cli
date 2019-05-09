<template>
  <div class="return-goods-view">
    <div class="return-goods-navbar">
      <van-nav-bar title="商品售后" left-arrow @click-left="onClickLeft"/>
    </div>
    <div v-for="item in goods" :key="item.id">
      <van-cell-group>
        <van-cell size="large">订单号：{{item.id}}</van-cell>
      </van-cell-group>
      <div class="card-goods">
        <div class="return-goods-card">
          <van-card
            @touchend.native="gotouchend"
            :title="item.title"
            :desc="item.desc"
            :num="item.num"
            :price="0"
            :origin-price="formatPrice(item.price)"
            thumb-link="#/goods-detail"
            :thumb="item.thumb"
          />
          <div class="return-goods-stepper">
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
    <div class="return-goods-cell">
      <van-cell-group>
        <van-cell title="请选择退货类型" is-link :value="cellValue" @click="onClickPopup"/>
      </van-cell-group>
    </div>
    <div class="return-goods-field">
      <van-panel title="问题描述">
        <van-cell-group class="return-goods-cell-group">
          <van-field
            v-model="value"
            type="textarea"
            size="large"
            placeholder="亲，写点退货原因吧，您的信息对商家有很大帮助"
          />
        </van-cell-group>
        <div class="return-goods-uploader">
          <van-uploader :after-read="onRead">
            <van-icon color="#AAAAAA" name="photograph"/>
          </van-uploader>
        </div>
      </van-panel>
    </div>
    <van-popup v-model="popShow" position="bottom">
      <van-radio-group v-model="radio">
        <van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm"/>
      </van-radio-group>
    </van-popup>
    <div class="return-goods-button">
      <van-button type="danger" size="large">提交</van-button>
    </div>
  </div>
</template>

<script>
import {
    NavBar,
    Icon,
    Cell,
    Card,
    Button,
    CellGroup,
    Toast,
    Field,
    Uploader,
    Stepper,
    Panel,
    Picker,
    Popup,
} from 'vant';
import { list as goodsList } from '../../svc/ord/ReturnGoods';
export default {
    components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
        [Cell.name]: Cell,
        [Card.name]: Card,
        [CellGroup.name]: CellGroup,
        [Toast.name]: Toast,
        [Field.name]: Field,
        [Uploader.name]: Uploader,
        [Button.name]: Button,
        [Stepper.name]: Stepper,
        [Panel.name]: Panel,
        [Picker.name]: Picker,
        [Popup.name]: Popup,
    },
    data() {
        return {
            goods: this.Goods(),
            popShow: false,
            columns: ['仅退款', '退货并退款', '换货'],
            cellValue: '仅退款',
        };
    },

    methods: {
        onClickLeft() {
            this.$router.push('mine');
        },
        onClickPopup(state) {
            this.popShow = true;
        },
        onRead(file) {
            console.log(file);
        },
        onConfirm(value, index) {
            this.cellValue = value;
            this.popShow = false;
        },
        onCancel() {
            this.popShow = false;
        },
        formatPrice(price) {
            return (price / 100).toFixed(2);
        },
        //获取商品数据
        Goods() {
            goodsList({
                onSuccess: data => {
                    this.goods = data;
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
        // 如果长按的事件不足1秒则执行其他操作
        gotouchend() {
            // 清除定时器
            clearTimeout(this.Loop);
            if (this.Loop != 0) {
                Toast('其他操作');
            }
        },
    },
};
</script>

<style lang="less" scoped>
.return-goods-view {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    background-color: #fafafa;

    .return-goods-navbar {
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

    .card-goods {
        .van-card {
            background-color: white;
        }
        .return-goods-card {
            padding: 10px 0;
            margin: 0.5rem 0.3rem 0.3rem;
            background-color: white;
            border-radius: 0.3rem;

            &__item {
                position: relative;
                margin: 0 0.15rem;
                display: flex;
                justify-content: flex-end;
                height: 0.768rem;
                .van-card {
                    background-color: unset;
                    &__price {
                        color: #f44;
                    }
                }
            }
        }
        .return-goods-card {
            flex: 1;
            display: flex;
        }

        .return-goods-stepper {
            margin-left: 0.1rem;
            margin-top: 2rem;
            width: 3.2rem;
        }
    }
    .return-goods-cell {
        margin-top: 0.25rem;
    }

    .return-goods-field {
        margin-top: 0.5rem;
        .return-goods-cell-group {
            text-align: center;
            .van-field {
                height: 2.5rem;
                width: 95%;
                margin: 0 auto;
                border-radius: 0.3rem;
                border-style: solid;
                border-color: #aaaaaa;
                border-width: 0.05rem;
                padding: 0;
            }
        }
        .return-goods-uploader {
            padding-left: 0.25rem;
        }
    }

    .return-goods-button {
        position:fixed;
        bottom:0;
        width: 100%;
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
