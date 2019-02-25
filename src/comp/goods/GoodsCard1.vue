<template>
  <!-- 一行只显示单列的商品卡片组件 -->
  <div class="goods-card-1">
    <van-card
      :thumb="item.picPath"
      :title="item.onlineTitle"
      :desc="item.onlineDetail"
      num="2"
      :tag="subjectTypeName"
      :class="goodsSubjectTypeClass"
    >
      <div
        slot="title"
        class="goods-title"
      >
        {{item.onlineTitle}}
      </div>
      <div slot="tags">
        <van-tag
          v-if="item.subjectType===0||item.subjectType===1"
          :type="item.subjectType===0?'primary':item.subjectType===1?'danger':undefined"
        > {{subjectTypeName}}</van-tag>
      </div>
      <div slot="price">
        <span
          v-if="item.subjectType===0"
          class="price"
        >{{'¥ '+item.salePrice}}</span>
        <span
          v-if="item.subjectType===1"
          class="price"
        >{{'0'}}</span>
        <span
          v-if="item.subjectType===1"
          class="fullback-unit"
        >{{'元'}}</span>
      </div>
      <div slot="origin-price">
        <span
          v-if="item.subjectType===0"
          class="cashback"
        >返</span>
        <span
          v-if="item.subjectType===0"
          class="cashback-price"
        >{{item.cashbackAmount}}</span>
        <span
          v-if="item.subjectType===1"
          class="fullback-price"
        >{{'¥ '+item.salePrice}}</span>
      </div>
      <div slot="num">
        <van-icon
          name="goodscard-cart"
          color="#0f0"
          size=".9rem"
        />
      </div>
    </van-card>
  </div>
</template>
<script>
import Vue from 'vue';
import { Card, Tag, Icon } from 'vant';

// 注册组件
Vue.component('goods-card-1');

export default {
    name: 'goods-card-1',
    components: {
        [Card.name]: Card,
        [Tag.name]: Tag,
        [Icon.name]: Icon,
    },
    props: {
        item: Object, // 当前商品的信息
    },
    computed: {
        // 上线主题类型名称
        subjectTypeName: function() {
            switch (this.item.subjectType) {
                case 0:
                    return '返现金';
                case 1:
                    return '拼全返';
                default:
                    return undefined;
            }
        },
        // 商品的上线主题类型样式类
        goodsSubjectTypeClass: function() {
            switch (this.item.subjectType) {
                case 0:
                    return 'cashback-van-card';
                case 1:
                    return 'fullback-van-card';
                default:
                    return undefined;
            }
        },
    },
};
</script>
<style lang="less">
@card-height: 4.2rem;
@thumb-width: @card-height;

// 商品卡
.goods-card-1 {
    > .van-card {
        margin: 0.04rem;
        padding: 0.2rem;
        background-color: white;
        border-radius: 4px;
        .van-card__thumb {
            width: @thumb-width;
            height: @card-height;
            img {
                border-radius: 4px;
                width: 100%;
            }
        }
        .van-card__content {
            height: @card-height;
            position: relative;
            // 商品标题
            .goods-title {
                margin-right: -2px;
                font-size: 0.4rem;
                line-height: 0.65rem;
                max-height: 2rem;
                overflow: hidden;
                font-weight: bolder;

                // 超出3行显示省略号
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                font-family: monospace;

                // 标记
                .van-tag {
                    font-size: 0.3rem;
                    padding: 3px 8px 3px 5px;
                    // margin-right: 0.16rem;
                }
            }
            // 商品价格行
            .van-card__bottom {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                display: flex;
                align-items: flex-end;
                .van-card__price {
                    .price {
                        font-size: 0.5rem;
                    }
                    .fullback-unit {
                        font-size: 0.5rem;
                    }
                }
                .van-card__origin-price {
                    text-decoration: none;
                    .cashback {
                        font-size: 0.4rem;
                        color: #aaa;
                        padding-right: 0.03rem;
                    }
                    .cashback-price {
                        font-size: 0.4rem;
                        color: red;
                    }
                    .fullback-price {
                        color: #aaa;
                        font-size: 0.4rem;
                        text-decoration: line-through;
                    }
                }
                .van-card__num {
                    flex-grow: 1;
                    text-align: right;
                    .van-icon-goodscard-cart {
                        position: relative;
                        padding: 3px 0 0;
                        right: -0.04rem;
                        bottom: -0.16rem;
                    }
                }
            }
        }
    }
}

// 标签
.van-tag {
    font-family: monospace;
}
.cashback-van-card {
    .van-card__tag {
        color: rgb(25, 137, 250);
        background-color: white !important;
        border: 0.02667rem solid;
    }
}
.fullback-van-card {
    .van-card__tag {
        background-color: red !important;
    }
}
</style>
