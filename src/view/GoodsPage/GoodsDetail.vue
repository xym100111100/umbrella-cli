<template>
    <!-- 商品详情 -->
    <div class="goods-detial">
        <div class="back" @click="handleBack">
            <van-icon name="back" />
        </div>
        <div class="goods-detial-main">
            <van-swipe class="goods-detial-swipe" :autoplay="5000">
                <van-swipe-item v-for="item in payload.fileList" :key="item.id">
                    <img :src="'/ise-svr/files'+item.imgPath" />
                </van-swipe-item>
            </van-swipe>

            <van-cell-group>
                <van-cell>
                    <div class="goods-detial-info">
                        <div class="info-title">{{ payload.goodTitle }}</div>
                        <div class="info-list">
                            <div v-if="payload.goodType === 0" class="list-left">
                                <p>
                                    <span v-if="payload.isNowSell">即时出售</span>
                                    <span v-if="!payload.isNowSell">议时出售</span>
                                    <span v-if="!payload.isDiscuss">可议价</span>
                                    <span v-if="payload.isDiscuss">不可议价</span>
                                </p>
                                <p>
                                    <span>{{payload.buyTime|filtersBuyTime}}</span>
                                    <span>原价:￥{{payload.oldPrice}}</span>
                                </p>
                            </div>
                            <div v-if="payload.goodType === 1" class="list-left">
                                <p>
                                    <span v-if="payload.isNowSell">即时出租</span>
                                    <span v-if="!payload.isNowSell">议时出租</span>
                                    <span v-if="!payload.isDiscuss">可议价</span>
                                    <span v-if="payload.isDiscuss">不可议价</span>
                                </p>
                            </div>
                            <div class="list-right" @click="contact(payload)">
                                <van-icon color="rgb(186, 191, 202)" size=".7rem" name="liaotian" />
                            </div>
                        </div>
                    </div>
                </van-cell>

                <van-cell>
                    <div class="info-price" v-if="payload.newPrice"><span>￥</span>{{payload.newPrice}}</div>
                    <div>{{payload.goodDetail}}</div>
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
                isNowSell: false,
                isDiscuss: false,
                goodType: 0,
            },
        };
    },
    activated() {
        if (this.$route.params.payload !== undefined) {
            this.payload = this.$route.params.payload;
        }
    },
    filters: {
        filtersBuyTime(date) {
            let endTime = parseInt(new Date().getTime() / 1000) - new Date(date).getTime() / 1000;
            let timeDay = parseInt(endTime / 60 / 60 / 24); //相差天数
            // 先判断是否大于一年
            if (timeDay >= 360) {
                // 计算年
                let year = parseInt(timeDay / 360);

                if (timeDay % 360 < 30) {
                    return '已用' + year + '年';
                } else {
                    // 计算月
                    let month = parseInt((timeDay % 360) / 30);
                    return '已用' + year + '年' + month + '月';
                }
            } else {
                if (timeDay >= 30) {
                    //计算月
                    let month = parseInt(timeDay / 30);
                    if (timeDay % 30 === 0) {
                        return '已用' + month + '月';
                    } else {
                        let day = timeDay % 30;
                        return '已用' + month + '月' + day + '天';
                    }
                } else {
                    if (timeDay > 1) {
                        // 计算天
                        return '已用' + timeDay + '天';
                    } else {
                        return '已用1天';
                    }
                }
            }
        },
    },
    created() {},
    methods: {
        // 回退
        handleBack() {
            this.$router.go(-1);
        },
        contact(item) {
            console.log(item);
            if (item.userId === this.$store.getters.user.id) {
                this.$toast({ message: '不能向自己发起聊天', position: 'top' });
                return;
            }
            this.$router.push({
                name: 'msg-chat',
                params: { id: item.userId, name: item.userName, userWxfacePath: item.wxFacePath },
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
                        color: rgb(141, 148, 153);
                        font-size: 0.35rem;
                    }
                }
            }
            .list-right {
                padding-top: 0.5rem;
            }
        }
    }
    .info-price {
        color: rgba(115, 169, 199, 0.8);
        span{
            font-size: 0.3rem;
        }
    }
}
</style>
