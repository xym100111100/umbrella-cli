<template>
  <!-- 一行显示两列的商品卡片组件 -->
  <div class="goods-card-2">
    <div
      :class="{'goods-img-wrap':true,'affix-wrap':item.subjectType!==0}"
      :data-content="item.subjectType===1?'拼全返':''"
    >
      <!-- <img class="goods-img" mode="widthFix" :src="item.picPath" /> -->
      <img
        class="goods-img"
        :src="item.picPath"
      />
    </div>
    <div class="goods-title">
      <!-- <van-tag
        v-if="item.cashbackAmount!==0&&item.subjectType!==1"
        type="primary"
        round
        
      >返现</van-tag>
      <van-tag
        v-if="item.subjectType===1"
        color="red"
        round
      >拼全返</van-tag> -->
       <span>{{item.onlineTitle}}</span> 
     <!-- {{item.onlineTitle}}-->
    </div>
    <div style="margin-top:0.3rem;"  >
        <span v-if="item.cashbackAmount!==0&&item.subjectType!==1"  style="padding:0 0.2rem;margin:0.24rem;background: rgba(255,87,6, 0.08); color:#FF5706;" >返现</span>
          <span  v-if="item.subjectType===1"  style="padding:0 0.2rem;margin:0.24rem;background: rgba(255,0,0, 0.7); color:white;" >拼全返</span>

    </div>
    <div class="goods-bottom" >
      <!-- 返现商品价格 -->
      <div
        class="goods-price"
        v-if="item.subjectType===0"
      >
        <div class="goods-price-rmb">¥</div>
        <div class="goods-sale-price">{{item.salePrice}}&nbsp;</div>
        <div class="goods-cashback">返</div>
        <div class="goods-cashback-price">{{item.cashbackAmount}}</div>
        <div class="space"></div>
        <van-icon
          name="goodscard-cart"
          color="red"
          size=".9rem"
        />
      </div>
      <!-- 拼全返商品价格 -->
      <div
        class="goods-price-fullback"
        v-if="item.subjectType===1"
      >
        <div class="goods-fullback-price">0</div>
        <div class="goods-price-unit">元</div>
        <div class="goods-sale-price">¥{{item.salePrice}}</div>
        <div class="space"></div>
        <van-icon
          name="goodscard-cart"
          color="red"
          size=".9rem"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { Tag, Icon } from 'vant';

// 注册组件
Vue.component('goods-card');

export default {
    name: 'goods-card',
    components: {
        [Tag.name]: Tag,
        [Icon.name]: Icon,
    },
    props: {
        item: Object, // 当前商品的信息
    },
};
</script>
<style lang="less">
// 角标的容器
.affix-wrap {
    &:before {
        content: attr(data-content);
        position: absolute;
        width: 100%;
        line-height: 0.7rem;
        height: 0.7rem;
        background: #fe3000;
        top: 6%;
        left: 37%;
        // z-index: 999;
        font-size: 0.45rem;
        color: white;
        text-align: center;
        transform: rotate(45deg);
    }
}

// 商品卡
.goods-card-2 {
    background-color: white;
    border-radius: 8px;

    // 拼全返的斜角标
    .goods-img-wrap {
        position: relative;
        overflow: hidden;
        // 商品图片
        .goods-img {
            // width: 100%;
            // height: 100%;
            width: 100%;
            height: 50vw; // 固定调度，以免图片参差不齐或显示不出来的时候也能对齐
            border-radius: 8px 8px 0 0;
        }
    }
    // 商品标题
    .goods-title {
        position: relative;
        font-size: 0.4rem;
        line-height: 0.65rem;
        padding: 1px 4px 0 9px;
        height: 1.2rem;
        overflow: hidden;
        font-weight: bolder;
        // 超出2行显示省略号
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        // 标记
        .van-tag {
            font-size: 0.3rem;
             padding: 5px 8px 5px 8px;
        }
    }
    // 商品价格
    .goods-bottom {
  
        display: flex;
        padding: 0 2px 0.3rem 6px;
        // 普通商品价格
        .goods-price {
            flex-grow: 1;
            display: flex;
            align-items: flex-end;
            padding: 0px 4px 1px;
            .goods-price-rmb {
                flex-grow: 0;
                color: red;
                font-size: 0.5rem;
                padding-right: 2px;
                margin-bottom: -0.06rem;
            }
            .goods-sale-price {
                flex-grow: 0;
                color: red;
                font-size: 0.5rem;
                margin-bottom: -0.06rem;
            }
            .goods-cashback {
                flex-grow: 0;
                color: #aaa;
                font-size: 0.35rem;
                padding-right: 4px;
                margin-bottom: -0.06rem;
            }
            .goods-cashback-price {
                flex-grow: 0;
                color: #aaa;
                color: red;
                font-size: 0.35rem;
                margin-bottom: -0.1rem;
            }
            .space {
                flex-grow: 1;
            }
        }
        // 拼全返商品价格
        .goods-price-fullback {
            flex-grow: 1;
            display: flex;
            align-items: flex-end;
            padding: 0px 4px 1px;
            .space {
                flex-grow: 1;
            }
            .goods-sale-price {
                flex-grow: 0;
                color: #aaa;
                font-size: 0.4rem;
                padding-left: 4px;
                margin-bottom: -0.1rem;
                text-decoration: line-through;
            }
            .goods-fullback-price {
                flex-grow: 0;
                color: red;
                font-size: 0.64rem;
                margin-bottom: -2px;
            }
            .goods-price-unit {
                flex-grow: 0;
                color: red;
                font-size: 0.5rem;
                padding-right: 3px;
                margin-bottom: -1px;
            }
        }
        .van-icon-goodscard-cart {
            padding: 3px 0 0;
            margin-right: -0.04rem;
            margin-bottom: -0.06rem;
           

        }
    }
}
</style>
