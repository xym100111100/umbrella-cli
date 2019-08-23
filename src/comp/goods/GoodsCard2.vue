<template>
    <!-- 一行显示两列的商品卡片组件 -->
    <div class="goods-card-2">
        <div :class="{'goods-img-wrap':true}">
            <!-- <img class="goods-img" mode="widthFix" :src="item.picPath" /> -->
            <img class="goods-img" :src="item.picPath" />
        </div>
        <div class="goods-title">
            <span>{{item.onlineTitle}}</span>
        </div>
        <div class="goods-describe">
            <span>即刻出售</span>
            <span>可议价</span>
        </div>
        <div class="goods-bottom">
            <!-- 返现商品价格 -->
            <div class="goods-price">
                <div class="goods-sale-price">¥{{item.salePrice}}&nbsp;</div>
                <div @click.stop="addToLove" class="goods-sale-love">
                    <van-icon name="xihuan1" color="#FF5706" size=".9rem" />
                </div>
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
    methods: {
        addToLove() {
            this.$store.getters.active.loveCount = this.$store.getters.active.loveCount + 1;
        },
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
    .goods-describe {
        margin: 0.15rem 0 0.15rem 0;
        padding: 0 0.2rem;
        overflow: hidden;
        height: 0.6rem;
        span {
            padding: 0.1rem 0.1rem 0 0.1rem;
            margin-right: 0.15rem;
            background: rgba(123, 191, 234, 0.2);
            color: #7bbfea;
        }
    }
    // 商品价格
    .goods-bottom {
        display: flex;
        padding: 0 2px 0.2rem 6px;

        // 普通商品价格
        .goods-price {
            flex-grow: 1;
            display: flex;
            align-items: flex-end;
            padding: 0px 4px 1px;
            justify-content: space-between;
            align-items: center;
            .goods-sale-price {
                flex-grow: 0;
                color: #7bbfea;
                font-size: 0.5rem;
                margin-bottom: -0.06rem;
            }
            .space {
                flex-grow: 1;
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
