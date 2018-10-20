<template>
    <div class="goods-card" @click="handleGo">
        <div class="goods-img-wrap">
            <img class="goods-img" mode="widthFix" src="https://gd1.alicdn.com/imgextra/i1/1739642641/O1CN011VNcTBLzHuDkrkw_!!1739642641.jpg" />
        </div>
        <div class="goods-title">这是一段宽度限制 250px 的文字，后面的内容会省略<span class="goods-title-ellipsis">...</span></div>
        <div class="goods-bottom">
            <div class="fullback-tag">
                <van-tag type="success" mark>拼全返</van-tag>&nbsp;
            </div>
            <div class="goods-price">
                <div class="space"></div>
                <div class="goods-price">¥163.00</div>
                <span class="goods-fullback-price">0</span>
                <span class="goods-fullback-price-unit">元</span>
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
    methods: {
        handleGo: function() {
            this.$router.push('/goods');
        },
    },
};
</script>
<style lang="less">
// 商品卡
.goods-card {
    background-color: white;
    margin-bottom: 1px;
    // 拼全返的斜角标
    .goods-img-wrap {
        position: relative;
        overflow: hidden;
        &:before {
            content: '拼全返';
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
        // 商品图片
        .goods-img {
            width: 100%;
        }
    }
    // 商品标题
    .goods-title {
        position: relative;
        font-size: 0.65em;
        padding: 0 2px 0 6px;
        height: 2.6em;
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
        // 商品价格
        .goods-price {
            flex-grow: 1;
            display: flex;
            align-items: flex-end;
            .space {
                flex-grow: 1;
            }
            .goods-price {
                flex-grow: 0;
                color: #aaa;
                font-size: 0.6em;
                padding-right: 4px;
                text-decoration: line-through;
            }
            .goods-fullback-price {
                color: red;
                font-size: 1em;
                margin-bottom: -2px;
            }
            .goods-fullback-price-unit {
                color: red;
                font-size: 0.9em;
                padding-right: 3px;
                margin-bottom: -2px;
            }
        }
    }
}
</style>
