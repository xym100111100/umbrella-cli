<template>
    <!-- 商品详情 -->
    <div class="goods-detial">
        <div class="back" @click="handleBack">
            <van-icon name="back" />
        </div>
        <div class="goods-detial-main">
            <van-swipe class="goods-detial-swipe" :autoplay="5000">
                <van-swipe-item v-for="item in payload.fileList" :key="item.id">
                    <img :src="'http://192.168.8.108:20180/files'+item.imgPath" />
                </van-swipe-item>
            </van-swipe>

            <van-cell-group>
                <van-cell>
                    <div class="goods-detial-info">
                        <div class="info-title">{{ payload.goodTitle }}</div>
                        <div class="info-list">
                            <div v-if="payload.goodType === 0" class="list-left">
                                <p>
                                    <span v-if="payload.isNowSell" >即时出售</span>
                                    <span v-if="!payload.isNowSell" >议时出售</span>
                                    <span v-if="!payload.isDiscuss" >可议价</span>
                                    <span v-if="payload.isDiscuss" >不可议价</span>
                                </p>
                                <p>
                                    <span>已用5年</span>
                                    <span>原价:￥ 165</span>
                                </p>
                            </div>
                            <div v-if="payload.goodType === 1" class="list-left">
                                <p>
                                    <span v-if="payload.isNowSell">即时出租</span>
                                    <span v-if="!payload.isNowSell">议时出租</span>
                                    <span v-if="!payload.isDiscuss">可议价</span>
                                    <span v-if="payload.isDiscuss">不可议价</span>
                                </p>
                                <p>
                                    <span>原价:￥ 165</span>
                                </p>
                            </div>
                            <div class="list-right" @click="contact(payload.id,payload.userName)">
                                <van-icon color="rgb(186, 191, 202)" size=".7rem" name="liaotian" />
                            </div>
                        </div>
                    </div>
                </van-cell>
                <van-cell>
                    <template>
                        <div>{{payload.goodDetail}}</div>
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
            payload: {
                goodTitle: '',
                // 轮播图
                goodDetail: '',
                fileList: [],
                isNowSell:false,
                isDiscuss:false,
                goodType:0,
            },
        };
    },
    activated() {
        if (this.$route.params.payload !== undefined) {
            console.log(this.$route.params.payload);
            this.payload = this.$route.params.payload;
        } 
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
