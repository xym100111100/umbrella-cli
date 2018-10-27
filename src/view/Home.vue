<template>
    <div class="view-home">
        <!-- <div class="view-home" v-if="!refreshing"> -->
        <div>
            <van-search placeholder="请输入搜索关键词" />
        </div>
        <van-pull-refresh v-model="refreshing" @refresh="handleRefresh">
            <!-- <div>
                <van-swipe :autoplay="10000">
                    <van-swipe-item v-for="(image, index) in images" :key="index">
                        <div class="swipe-image-wrap">
                            <img class="swipe-image" v-lazy="image" />
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div> -->
            <van-row class="grid">
                <van-col span="6">
                    <van-icon name="fullback" color="#00ff00" size="2em" />
                    <div class="label">拼全返</div>
                </van-col>
                <van-col span="6">
                    <van-icon name="order" color="#6495ed" size="2em" />
                    <div class="label">订单</div>
                </van-col>
                <van-col span="6">
                    <van-icon name="favoriteex" color="#ffc0cb" size="2em" />
                    <div class="label">收藏</div>
                </van-col>
                <van-col span="6">
                    <van-icon name="wallet" color="red" size="2em" />
                    <div class="label">钱包</div>
                </van-col>
            </van-row>
            <div class="full-back-rule">
                拼全返商品免单规则
            </div>
            <div class="promo">
                <van-icon name="wavy" color="red" size="20px" />&nbsp;&nbsp;
                <van-icon name="promo" color="red" size="20px" />每日推荐&nbsp;&nbsp;
                <van-icon name="wavy" color="red" size="20px" />
            </div>
            <div class="promo-list">
                <goods-list v-if="!refreshing" :load="listOnlOnlinePromo" :load-params="{ promotionType: 1 }" />
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
import Vue from 'vue';
import { PullRefresh, Search, Swipe, SwipeItem, Lazyload, Row, Col, Icon, List, Cell } from 'vant';
import GoodsList from '../comp/goods/GoodsList.vue';
import { list as listOnlOnlinePromo } from '../svc/onl/OnlOnlinePromo';

// Lazyload插件需要初始化
Vue.use(Lazyload);

export default {
    components: {
        [GoodsList.name]: GoodsList,
        [Search.name]: Search,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Lazyload.name]: Lazyload,
        [Row.name]: Row,
        [Col.name]: Col,
        [Icon.name]: Icon,
        [List.name]: List,
        [Cell.name]: Cell,
        [PullRefresh.name]: PullRefresh,
    },
    data() {
        return {
            refreshing: false, // 刷新状态，刷新状态为true时刷新推荐列表
            images: [
                // 'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg',
                // 'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
            ],
        };
    },
    methods: {
        /**
         * 加载推荐列表的方法
         */
        listOnlOnlinePromo,
        /**
         * 下拉刷新页面
         */
        handleRefresh() {
            setTimeout(() => {
                this.refreshing = false;
            }, 500);
        },
    },
};
</script>

<style lang="less">
.view-home {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    // 搜索
    .van-search {
        padding: 4px 8px;
        .van-cell {
            padding: 0 10px;
        }
    }
    > .van-pull-refresh {
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

        // n宫格
        .grid {
            border-bottom: 1px solid #eee;
            text-align: center;
            padding: 0 0 5px;
            background-color: white;
            .label {
                font-size: 14px;
            }
        }

        // 拼全返规则
        .full-back-rule {
            margin: 8px;
            border-radius: 10px;
            // ----- TODO 下面要替换成图片
            background-color: blue;
            color: yellow;
            padding: 10px;
        }

        // 每日推荐标题栏
        .promo {
            position: sticky;
            left: 0;
            top: 0;
            z-index: 999;
            border-bottom: 1px solid #eee;
            text-align: center;
            background-color: white;
            font-size: 20px;
            padding: 4px 0;
        }

        // 每日推荐商品列表
        .promo-list {
            flex-grow: 1;
        }
    }
}
</style>
