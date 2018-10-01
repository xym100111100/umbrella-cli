<template>
    <div class="goods-card">
        <div>
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
};
</script>
<style lang="less">
// 商品卡
.goods-card {
    background-color: white;
    margin-bottom: 4px;
    // .goods-image {
        // position: relative;
        // top: 0;
        // left: 0;
        // 商品图片
        .goods-img {
            width: 100%;
            position: relative;
            :after {
                content: '<span>拼全返</span>';
                position: absolute;
                top: 0;
                left: 0;
                width: 150px;
                height: 50px;
                line-height: height;
                border-style: solid;
                border-width: 1px; /* [1] */
                transform: rotate(45deg);
            }
        }
    // }
    // 商品图片标签
    .goods-img-label {
        // border-radius: 50%;
        // transition: transform 0.8s ease-in-out;
        position: relative;
        top: 0;
        left: 0;
        :before {
            content: '拼全返';
            position: absolute;
            top: 0;
            left: 0;
            border-style: solid;
            // border-width: 34px; /* [1] */
            transform: rotate(45deg);
        }
        // span {
        //     color: #fff;
        //     display: inline-block;
        //     position: absolute;
        //     top: 18px;
        //     left: 0;
        //     z-index: 1;
        //     font-size: 12px;
        //     text-transform: uppercase;
        //     width: 50px;
        //     text-align: center;
        // }
    }
    // 商品标题
    .goods-title {
        font-size: 16px;
        padding: 5px 4px 2px 10px;
    }
    // 商品价格
    .goods-bottom {
        display: flex;
        padding: 0 5px 5px 10px;
        // 全返标记
        .fullback-tag {
            .van-tag {
                font-size: 14px;
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
                font-size: 26px;
                padding-right: 3px;
            }
            .goods-price {
                color: #aaa;
                font-size: 18px;
                text-decoration: line-through;
            }
        }
    }
}
</style>
