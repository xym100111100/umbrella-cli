<template>
  <!-- 商品详情 -->
  <div class="page-goods-page">
    <div
      class="back"
      @click="handleBack"
    >
      <van-icon name="back" />
    </div>

    <div class="page-goods-page-main">
      <van-swipe
        class="page-goods-page-swipe"
        :autoplay="5000"
      >
        <van-swipe-item
          v-for="thumb in goods.thumb"
          :key="thumb"
        >
          <img :src="thumb">
        </van-swipe-item>
      </van-swipe>

      <van-cell-group>
        <van-cell>
          <div class="page-goods-page-title">{{ goods.title }}</div>
          <div class="page-goods-page-price">{{ formatPrice(goods.price) }}</div>
        </van-cell>
        <van-cell
          is-link
          @click="addShoppingCart"
        >
          <template slot="title">
            <div>
              <span style="color: #7d7e80;">规格</span>
              <span v-if="selectedSkuName !== undefined">&nbsp;&nbsp;&nbsp;&nbsp;已选:"{{ selectedSkuName }}"</span>
            </div>
            <div class="goods-page-sku-img">
              <table>
                <tr>
                  <td>
                    <img src="https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg">
                  </td>
                  <td>
                    <img src="https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg">
                  </td>
                  <td>
                    <img src="https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg">
                  </td>
                </tr>
              </table>
            </div>
          </template>
        </van-cell>
        <van-cell
          title="查看商品详情"
          is-link
        />
      </van-cell-group>
    </div>

    <van-goods-action>
      <van-goods-action-mini-btn
        icon="shareex"
        @click="sorry"
      >分享</van-goods-action-mini-btn>
      <van-goods-action-mini-btn
        icon="cart"
        @click="onClickCart"
      >购物车</van-goods-action-mini-btn>
      <van-goods-action-big-btn @click="addShoppingCart">加入购物车</van-goods-action-big-btn>
      <van-goods-action-big-btn
        primary
        @click="sorry"
      >立即购买</van-goods-action-big-btn>
    </van-goods-action>

    <van-sku
      v-model="isSkuShow"
      :sku="sku"
      :goods="goods"
      :goods-id="123"
      :hide-stock="sku.hide_stock"
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
            goods: {
                title: '美国伽力果（约680g/3个）',
                price: 2680,
                express: '免运费',
                remain: 19,
                // 默认商品 sku 缩略图
                picture: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
                thumb: [
                    'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
                    'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg',
                ],
            },
            sku: {
                // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                tree: [
                    {
                        k: '颜色', // skuKeyName：规格类目名称
                        v: [
                            {
                                id: '30349', // skuValueId：规格值 id
                                name: '红色', // skuValueName：规格值名称
                                imgUrl: 'https://img.yzcdn.cn/1.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
                            },
                            {
                                id: '1215',
                                name: '蓝色',
                                imgUrl: 'https://img.yzcdn.cn/2.jpg',
                            },
                        ],
                        k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                    },
                ],
                // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                list: [
                    {
                        id: 2259, // skuId，下单时后端需要
                        price: 100, // 价格（单位分）
                        s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
                        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                        stock_num: 110, // 当前 sku 组合对应的库存
                    },
                ],
                price: '1.00', // 默认价格（单位元）
                stock_num: 227, // 商品总库存
                // collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
                none_sku: false, // 是否无规格商品
                hide_stock: false, // 是否隐藏剩余库存
            },
            initialSku: {
                // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                // 值：skuValueId（规格值 id）
                s1: '30349',
                s2: '1193',
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
</style>
