<template>
    <div class="goods-card" @click="handleGo">
        <div :class="{'goods-img-wrap':true,'affix-wrap':item.subjectType!==0}" :data-content="item.subjectType===1?'拼全返':''">
            <!-- <img class="goods-img" mode="widthFix" :src="item.picPath" /> -->
            <img class="goods-img" :src="item.picPath" />
        </div>
        <div class="goods-title">
            <van-tag v-if="item.cashbackAmount!==0&&item.subjectType!==1" type="primary" mark plain>返现</van-tag>
            <van-tag v-if="item.subjectType===1" type="success" mark>拼全返</van-tag>
            {{item.onlineTitle}}
            <span class="goods-title-ellipsis">...</span>
        </div>
        <div class="goods-bottom">
            <!-- 普通商品价格 -->
            <div class="goods-price" v-if="item.subjectType===0">
                <div class="goods-price-rmb">¥</div>
                <div class="goods-sale-price">{{item.salePrice}}&nbsp;</div>
                <div class="goods-cashback">返</div>
                <div class="goods-cashback-price">{{item.cashbackAmount}}</div>
                <div class="space"></div>
            </div>
            <!-- 拼全返商品价格 -->
            <div class="goods-price-fullback" v-if="item.subjectType===1">
                <div class="goods-fullback-price">0</div>
                <div class="goods-price-unit">元</div>
                <div class="goods-sale-price">¥{{item.salePrice}}</div>
                <div class="space"></div>
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
        item: Object,
    },
    methods: {
        handleGo: function() {
            this.$router.push('/goods');
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
        line-height: 1.7em;
        height: 1.7em;
        background: #fe3000;
        top: 6%;
        left: 37%;
        // z-index: 999;
        font-size: 0.6em;
        color: white;
        text-align: center;
        transform: rotate(45deg);
    }
}

// 商品卡
.goods-card {
    background-color: white;

    // 拼全返的斜角标
    .goods-img-wrap {
        position: relative;
        overflow: hidden;
        // 商品图片
        .goods-img {
            // width: 100%;
            width: 50vw;
            height: 50vw;
        }
    }
    // 商品标题
    .goods-title {
        position: relative;
        font-size: 0.6em;
        padding: 0 2px 0 6px;
        height: 2.8em;
        overflow: hidden;
        .goods-title-ellipsis {
            position: absolute;
            bottom: 0;
            right: 6px;
            padding: 2px 4px;
            background-color: white;
        }
    }
    // 商品价格
    .goods-bottom {
        display: flex;
        padding: 0 2px 6px 6px;
        // 全返标记
        .fullback-tag {
            .van-tag {
                font-size: 0.5em;
                padding-bottom: 4px;
            }
        }
        // 普通商品价格
        .goods-price {
            flex-grow: 1;
            display: flex;
            align-items: flex-end;
            padding: 8px 4px 1px;
            .goods-price-rmb {
                flex-grow: 0;
                color: red;
                font-size: 0.75em;
                padding-right: 2px;
                margin-bottom: -1px;
            }
            .goods-sale-price {
                flex-grow: 0;
                color: red;
                font-size: 0.75em;
                margin-bottom: -1px;
            }
            .goods-cashback {
                flex-grow: 0;
                color: red;
                color: #aaa;
                font-size: 0.6em;
                padding-right: 4px;
            }
            .goods-cashback-price {
                flex-grow: 0;
                color: #aaa;
                color: red;
                font-size: 0.6em;
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
            padding: 5px 4px 1px;
            .space {
                flex-grow: 1;
            }
            .goods-sale-price {
                flex-grow: 0;
                color: #aaa;
                font-size: 0.65em;
                padding-left: 4px;
                text-decoration: line-through;
            }
            .goods-fullback-price {
                flex-grow: 0;
                color: red;
                font-size: 0.9em;
                margin-bottom: -1px;
            }
            .goods-price-unit {
                flex-grow: 0;
                color: red;
                font-size: 0.75em;
                padding-right: 3px;
                margin-bottom: -1px;
            }
        }
    }
}
</style>
