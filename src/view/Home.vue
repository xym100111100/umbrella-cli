<template>
    <div class="fragment">
        <div>
            <van-search placeholder="请输入搜索关键词" />
        </div>
        <div class="scroll">
            <div>
                <van-swipe :autoplay="3000">
                    <van-swipe-item v-for="(image, index) in images" :key="index">
                        <div class="swipe-image-wrap">
                            <img class="swipe-image" v-lazy="image" />
                    </div>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <van-row class="grid">
                <van-col span="6">
                    <van-icon name="fullback" color="#00ff00" size="48px" />
                    <div class="label">拼全返</div>
                </van-col>
                <van-col span="6">
                    <van-icon name="order" color="#6495ed" size="48px" />
                    <div class="label">订单</div>
                </van-col>
                <van-col span="6">
                    <van-icon name="favorite" color="#ffc0cb" size="48px" />
                    <div class="label">收藏</div>
                </van-col>
                <van-col span="6">
                    <van-icon name="wallet" color="red" size="48px" />
                    <div class="label">钱包</div>
                </van-col>
            </van-row>
            <div class="daily">
                <van-icon name="wavy" color="red" size="20px" />&nbsp;&nbsp;
                <van-icon name="daily" color="red" size="20px" />每日推荐&nbsp;&nbsp;
                <van-icon name="wavy" color="red" size="20px" />
            </div>
            <div class="daily-list">
                <goods-list />
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Search, Swipe, SwipeItem, Lazyload, Row, Col, Icon, List, Cell } from 'vant';
import GoodsList from '../comp/goods/GoodsList.vue';

// Lazyload插件需要初始化
Vue.use(Lazyload);

export default {
    components: {
        [Search.name]: Search,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Lazyload.name]: Lazyload,
        [Row.name]: Row,
        [Col.name]: Col,
        [Icon.name]: Icon,
        [List.name]: List,
        [Cell.name]: Cell,
        [GoodsList.name]: GoodsList,
    },
    data() {
        return {
            images: [
                'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg',
                'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
            ],
        };
    },
};
</script>

<style lang="less">
.fragment {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    .scroll {
        overflow: auto;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        // 轮播
        .swipe-image-wrap {
            height: 150px;
            .swipe-image {
                height: 100%;
                width: 100%;
            }
        }

        // 宫格
        .grid {
            text-align: center;
            padding: 0 0 5px;
            background-color: white;
            .label {
                font-size: 16px;
            }
        }

        // 每日推荐标题栏
        .daily {
            margin-top: 15px;
            text-align: center;
            background-color: white;
            font-size: 20px;
            padding-top: 8px;
        }

        // 每日推荐商品列表
        .daily-list {
            flex-grow: 1;
        }
    }
}
</style>
