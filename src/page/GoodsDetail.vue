<template>
  <!-- 商品详情 -->
  <div class="page-goods-page">
    <div class="back" @click="handleBack">
      <van-icon name="back"/>
    </div>

    <div class="page-goods-page-main">
      <van-swipe class="page-goods-page-swipe" :autoplay="5000">
        <van-swipe-item v-for="thumb in goodsThumb" :key="thumb">
          <img :src="thumb">
        </van-swipe-item>
      </van-swipe>

      <van-cell-group>
        <van-cell>
          <div class="page-goods-page-title">{{ goods.title }}</div>
          <div class="page-goods-page-price">{{ formatPrice(goods.price) }}</div>
        </van-cell>
        <van-cell is-link @click="addShoppingCart">
          <template slot="title">
            <div>
              <span style="color: #7d7e80;">规格</span>
              <span
                v-if="selectedSkuName !== undefined"
              >&nbsp;&nbsp;&nbsp;&nbsp;已选:"{{ selectedSkuName }}"</span>
            </div>
            <div class="goods-page-sku-img">
              <table>
                <tr>
                  <td v-for="img in skuImg" :key="img">
                    <img :src="img">
                  </td>
                </tr>
              </table>
            </div>
          </template>
        </van-cell>
        <van-cell title="查看商品详情">
          <template slot="label">
            <div class="detailDiv">
              <img
                :src="fullBackBannerImg"
                class="full-back-banner"
                name="aaa"
                @click="fullBackProcess"
              >
              <div v-html="goodsDetail"></div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <van-goods-action>
      <van-goods-action-mini-btn icon="shareex" @click="sorry">分享</van-goods-action-mini-btn>
      <van-goods-action-mini-btn icon="cart" @click="onClickCart">购物车</van-goods-action-mini-btn>
      <van-goods-action-big-btn @click="addShoppingCart">加入购物车</van-goods-action-big-btn>
      <van-goods-action-big-btn primary @click="sorry">立即购买</van-goods-action-big-btn>
    </van-goods-action>

    <van-sku
      v-model="isSkuShow"
      :sku="sku"
      :goods="goods"
      :goods-id="123"
      :quota="0"
      :quota-used="10"
      :close-on-click-overlay="true"
      :show-soldout-sku="false"
      @sku-selected="skuSelected"
      @buy-clicked="buyNow"
      @add-cart="confirmAddShoppingCart"
    >
      <template slot="sku-actions">
        <div class="van-sku-actions">
          <van-button
            bottom-action
            @click="confirmAddShoppingCart"
            class="van-button van-button--default van-button--normal van-button--bottom-action"
          >加入购物车</van-button>
          <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
          <van-button
            bottom-action
            @click="buyNow"
            class="van-button van-button--primary van-button--normal van-button--bottom-action"
            type="primary"
          >立即购买</van-button>
        </div>
      </template>
    </van-sku>
  </div>
</template>

<script>
import {
    Tag,
    Col,
    Icon,
    Cell,
    CellGroup,
    Swipe,
    Toast,
    SwipeItem,
    GoodsAction,
    GoodsActionBigBtn,
    GoodsActionMiniBtn,
    Sku,
    Button,
} from 'vant';

import { goodsList, skuList } from '../svc/onl/GoodsDetail';

export default {
    components: {
        [Tag.name]: Tag,
        [Col.name]: Col,
        [Icon.name]: Icon,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [GoodsAction.name]: GoodsAction,
        [GoodsActionBigBtn.name]: GoodsActionBigBtn,
        [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
        [Sku.name]: Sku,
        [Button.name]: Button,
    },
    data() {
        return {
            // 是否显示sku弹窗
            isSkuShow: false,
            // 选中sku信息
            selectedSkuName: undefined,
            goods: this.goods(),
            sku: this.sku(),
            skuImg: [],
            // 轮播图
            goodsThumb: [],
            goodsDetail: '',
            initialSku: {
                // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                // 值：skuValueId（规格值 id）
                s1: '30349',
                s2: '1215',
            },
            customStepperConfig: {
                // 自定义限购文案
                quotaText: '每次限购xxx件',
                // 自定义步进器超过限制时的回调
                handleOverLimit: data => {
                    const { action, limitType, quota, quotaUsed } = data;

                    if (action === 'minus') {
                        Toast('至少选择一件商品');
                    } else if (action === 'plus') {
                        // const { LIMIT_TYPE } = Sku.skuConstants;
                        if (limitType === LIMIT_TYPE.QUOTA_LIMIT) {
                            let msg = `单次限购${quota}件`;
                            if (quotaUsed > 0) msg += `，你已购买${quotaUsed}`;
                            Toast(msg);
                        } else {
                            Toast('库存不够了');
                        }
                    }
                },
            },
            fullBackBannerImg: 'img/ExemptionProcess.png',
        };
    },
    methods: {
        // 回退
        handleBack() {
            this.$router.go(-1);
        },

        /**
         * 价格保留两位小数
         */
        formatPrice() {
            return '¥' + (this.goods.price / 100).toFixed(2);
        },

        /**
         * 点击购物车
         */
        onClickCart() {
            this.$router.push('cart');
        },

        /**
         * 加入购物车
         */
        addShoppingCart() {
            this.isSkuShow = true;
        },

        /**
         * 立即购买
         */
        buyNow() {
            console.log('立即购买');
        },

        /**
         * 确认加入购物车
         */
        confirmAddShoppingCart() {
            console.log('确认加入购物车');
        },

        /**
         * sku选中事件
         */
        skuSelected(selectedSku) {
            this.selectedSkuName = selectedSku.skuValue.name;
        },

        sorry() {
            Toast('暂无后续逻辑~');
        },

        /**
         * 跳转至规则说明页面
         */
        fullBackProcess() {
            this.$router.push('./full-back-process');
        },

        /**
         * 获取商品信息
         */
        goods() {
            goodsList({
                onSuccess: data => {
                    this.goods = data;
                    this.goodsThumb = data.thumb;
                    this.goodsDetail = data.detail;
                    // 数据全部加载完成
                    this.finished = true;
                },
                onFinish: () => {
                    // 结束加载状态
                    this.loading = false;
                },
            });
        },

        /**
         * 获取商品sku信息
         */
        sku() {
            skuList({
                onSuccess: data => {
                    this.sku = data;
                    let skuImg = new Array();
                    if (data.tree !== undefined) {
                        for (let i = 0; i < data.tree.length; i++) {
                            for (let j = 0; j < data.tree[i].v.length; j++) {
                                skuImg.push(data.tree[i].v[j].imgUrl);
                            }
                        }
                    }
                    this.skuImg = skuImg;
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

<style lang="less">
.page-goods-page {
    // padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    height: 100vh;

    // 回退
    .back {
        position: fixed;
        top: 0.3rem;
        left: 0.2rem;
        height: 1rem;
        width: 1rem;
        border-radius: 50%;
        z-index: 9;
        color: white;
        background-color: black;
        opacity: 0.4;
        display: flex;
        flex-direction: column;
        .van-icon {
            // position: relative;
            // padding: 2px;
            font-size: 0.8rem;
            // top: -0.1rem;
            top: 0.04rem;
        }
    }

    &-main {
        overflow: auto;
        flex-grow: 1;
    }

    &-swipe {
        img {
            width: 100%;
        }
    }

    &-title {
        font-size: 1.2em;
    }

    &-price {
        color: #f44;
    }

    &-express {
        color: #999;
        font-size: 12px;
        padding: 5px 15px;
    }

    &-cell-group {
        margin: 15px 0;

        .van-cell__value {
            color: #999;
        }
    }

    &-tag {
        margin-left: 5px;
    }

    .van-goods-action {
        position: unset;
    }
}

.goods-page-sku-img {
    margin-left: 40px;
    margin-top: 0px;
    height: 30px;
    width: 30px;
}

.goods-page-sku-img img {
    width: 30px;
    height: 30px;
}

.detailDiv img {
    width: 109%;
    margin-left: -16px;
}
</style>
