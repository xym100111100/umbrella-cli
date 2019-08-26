<template>
    <!-- 商品详情 -->
    <div class="goods-detial">
        <div class="back" @click="handleBack">
            <van-icon name="back" />
        </div>
        <div class="goods-detial-main">
            <van-swipe class="goods-detial-swipe" :autoplay="5000">
                <van-swipe-item v-for="thumb in goodsThumb" :key="thumb">
                    <img :src="thumb" />
                </van-swipe-item>
            </van-swipe>

            <van-cell-group>
                <van-cell>
                    <div class="goods-detial-info">
                        <div class="info-title">{{ goodsData.title }}</div>
                        <div class="info-list">
                            <div class="list-left">
                                <p>
                                    <span>即时出售</span>
                                    <span>已用5年</span>
                                </p>
                                <p>
                                    <span>不可议价</span>
                                    <span>原价: $165</span>
                                </p>
                            </div>
                            <div class="list-right" @click="contact(1,'小明同学')">
                                <van-icon color="rgb(186, 191, 202)" size=".7rem" name="liaotian" />
                            </div>
                        </div>
                    </div>
                </van-cell>
                <van-cell>
                    <template>
                        <div>{{goodsData.detail}}</div>
                    </template>
                </van-cell>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
import { Tag, Col, Icon, Cell, CellGroup, Swipe, Toast, SwipeItem } from 'vant';

import { goodsList } from '../../svc/onl/GoodsDetail';

export default {
    components: {
        [Tag.name]: Tag,
        [Col.name]: Col,
        [Icon.name]: Icon,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
    },
    data() {
        return {
            goodsData: {},
            // 轮播图
            goodsThumb: [],
        };
    },
    activated() {
        this.getGoods();
    },
    created() {},
    methods: {
        // 回退
        handleBack() {
            this.$router.go(-1);
        },
        contact(id, name) {
            this.$router.push({ name: 'msg-chat', params: { id: id, name: name } });
        },
        /**
         * 获取商品信息
         */
        getGoods() {
            goodsList({
                onSuccess: data => {
                    this.goodsData = data;
                    this.goodsThumb = data.thumb;
                    // 数据全部加载完成
                    this.finished = true;
                },
                onFinish: () => {
                    // 结束加载状态
                    this.loading = false;
                },
            });
        },
    },
};
</script>

<style lang="less">
.goods-detial {
    // padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    height: 100vh;

    // 回退
    .back {
        position: fixed;
        top: 0.3rem;
        left: 0.2rem;
        height: 1rem;
        width: 1rem;
        border-radius: 50%;
        z-index: 9;
        color: white;
        background-color: black;
        opacity: 0.4;
        display: flex;
        flex-direction: column;
        .van-icon {
            font-size: 0.8rem;
            top: 0.04rem;
        }
    }
    &-swipe {
        img {
            width: 100%;
        }
    }
    &-info {
        .info-list {
            display: flex;
            justify-content: space-between;
            .list-left {
                p {
                    padding: 0;
                    margin: 0;
                    margin-top: 0.1rem;
                    span {
                        padding: 0.07rem;
                        margin-right: 0.15rem;
                        background: rgba(123, 191, 234, 0.2);
                        color: #7bbfea;
                    }
                }
            }
            .list-right {
                padding-top: 0.5rem;
            }
        }
    }
}
</style>
