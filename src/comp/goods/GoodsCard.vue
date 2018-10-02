<template>
    <div class="goods-card" @click="handleGo">
        <div class="goods-img-wrap">
            <img class="goods-img" mode="widthFix" src="https://gd1.alicdn.com/imgextra/i1/1739642641/O1CN011VNcTBLzHuDkrkw_!!1739642641.jpg"/>
            <!-- <div class="goods-img-label"><span>拼全返</span></div> -->
        </div>
        <div class="van-ellipsis goods-title">这是一段宽度限制 250px 的文字，后面的内容会省略</div>
        <div class="goods-bottom">
            <div class="fullback-tag">
                <van-tag type="success" mark>拼全返</van-tag>&nbsp;
            </div>
            <div class="goods-price">
                <span class="goods-fullback-price">0元</span>
                <span class="goods-price">¥163.00</span>
            </div>
            <div>
                <van-icon name="buy-detail" color="#aaa" />
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
            top: 4%;
            left: 41%;
            // z-index: 999;
            font-size: 0.6em;
            color: #fff;
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
        font-size: 0.7em;
        padding: 5px 4px 2px 10px;
    }
    // 商品价格
    .goods-bottom {
        display: flex;
        padding: 0 5px 5px 10px;
        // 全返标记
        .fullback-tag {
            .van-tag {
                font-size: 0.6em;
                padding-bottom: 4px;
            }
        }
        // 商品价格
        .goods-price {
            flex-grow: 1;
            display: flex;
            align-items: flex-end;
            padding-bottom: 3px;
            .goods-fullback-price {
                color: red;
                font-size: 1em;
                padding-right: 3px;
            }
            .goods-price {
                color: #aaa;
                font-size: 0.8em;
                text-decoration: line-through;
            }
        }
    }
}
</style>
