<template>
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
        <van-tag
          v-if="item.subjectType===0||item.subjectType===1"
          :type="item.subjectType===0?'primary':item.subjectType===1?'success':undefined"
          mark
          :plain="item.subjectType===0"
        > {{subjectTypeName}}</van-tag>
        {{item.onlineTitle}}
      </div>
      <div slot="price">
        <span>{{item.subjectType===0?'¥ '+item.salePrice:item.subjectType===1?'0元':undefined}}</span>
        <span v-if="item.subjectType===0">返</span>
        <span>{{'¥ '+(item.subjectType===0?item.cashbackAmount:item.subjectType===1?item.salePrice:undefined)}}</span>
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
                    return '返现';
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
            .goods-title {
                margin-right: -2px;
                font-size: 0.4rem;
                line-height: 0.65rem;
                height: 2rem;
                overflow: hidden;
                font-weight: bolder;

                // 超出3行显示省略号
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;

                // 标记
                .van-tag {
                    font-size: 0.3rem;
                    padding: 3px 8px 3px 5px;
                }
            }
        }
    }
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
