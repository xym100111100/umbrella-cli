<template>
    <div class="shop-setting">
        <header class="shop-setting-header">
            <div @click="$router.go(-1)">
                <van-icon name="back-search" size=".6rem" />
            </div>
            <div class="header-text">
                <span style="padding-right:0.3rem;">设置</span>
            </div>
        </header>
        <div class="shop-setting-content">
            <div class="content-shop-info">
                <div class="info-face show-border-bottom">
                    <div>店铺头像</div>
                    <div class="face-img">
                        <img
                            src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoMjjGbIZlstK74IZk2tfkCGw/132"
                        />
                        <span>
                            <van-icon name="qianjin" size=".6rem" />
                        </span>
                    </div>
                </div>
                <div class="info-name" @click="modifyShopName">
                    <div>店铺名称</div>
                    <div>
                        <span>安布雷拉</span>
                        <span>
                            <van-icon name="qianjin" size=".6rem" />
                        </span>
                    </div>
                </div>
            </div>
            <div class="content-shop-remark">
                <div @click="modifyShopArea" class="remark-item show-border-bottom">
                    <div>店铺地址</div>
                    <div>
                        <span>广西南宁市区江南区</span>
                        <span>
                            <van-icon name="qianjin" size=".6rem" />
                        </span>
                    </div>
                </div>
                <div class="remark-item show-border-bottom">
                    <div>营业时间</div>
                    <div>
                        <span>九点,十点</span>
                        <span>
                            <van-icon name="qianjin" size=".6rem" />
                        </span>
                    </div>
                </div>
                <div class="remark-item">
                    <div>客服电话</div>
                    <div>
                        <span>18278904219</span>
                        <span>
                            <van-icon name="qianjin" size=".6rem" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <van-popup v-model="show" position="bottom" :style="{ height: heights }">
            <div class="popupBtton">
                <div>取消</div>
                <div>确认</div>
            </div>
            <div style="font-size:0.5rem;text-align:center;">营业开始时间</div>
            <div class="popup-modify-time">
                <van-datetime-picker
                    @change="showPopup2"
                    :show-toolbar="false"
                    v-model="currentTime2"
                    type="time"
                    :visible-item-count="showNumber"
                />
            </div>
            <div style="font-size:0.5rem;text-align:center;margin-top:0.8rem; ">营业结束时间</div>
            <div class="popup-modify-time">
                <van-datetime-picker
                    @change="showPopup"
                    :show-toolbar="false"
                    v-model="currentTime"
                    type="time"
                    :visible-item-count="showNumber"
                />
            </div>
        </van-popup>
        <van-popup v-model="showArea" position="bottom" :style="{ height: heights }">
            <van-area :area-list="schollData" :columns-num="2" />
        </van-popup>
    </div>
</template>

<script>
import Vue from 'vue';
import { Search, List, Area, Card, DatetimePicker, Icon, Popup, Toast } from 'vant';
// import { list as goodsList } from '../../svc/Cart';
import { list as goodsClassList } from '../../svc/suc/SucGoodsClass';
import { list as goodsList } from '../../svc/suc/SucGoods';
import { add as addLove } from '../../svc/suc/SucLove';
import schoolData from '../../util/SchoolData';

// Lazyload插件需要初始化

export default {
    components: {
        [Icon.name]: Icon,
        [Search.name]: Search,
        [List.name]: List,
        [Card.name]: Card,
        [Popup.name]: Popup,
        [Area.name]: Area,
        [DatetimePicker.name]: DatetimePicker,
    },
    data() {
        return {
            goodsData: [],
            InputGoodTitle: null,
            show: false,
            showArea: false,
            currentTime: '12:00',
            currentTime2: '12:00',
            heights: '60%',
            showNumber: 2,
            schollData: schoolData(),
        };
    },
    activated() {},
    methods: {
        modifyShopName() {
            this.show = true;
        },
        modifyShopArea() {
            this.showArea = true;
        },
        showPopup(e) {
            console.log(this.currentTime);
        },
        showPopup2(e) {
            console.log(this.currentTime);
        },
        // 获取商品数据
        handleLoad() {
            const params = {
                pageNum: this.pageNum + 1,
                state: true,
                schoolName: this.$store.getters.user.schoolName,
                classId: this.currentGoodsClass,
                goodTitle: this.InputGoodTitle,
            };
            goodsList({
                params,
                onSuccess: data => {
                    this.pageNum = data.pageNum;
                    this.goodsData.push(...data.list);
                    // 如果是最后一页
                    if (data.pages === data.pageNum) {
                        // 数据全部加载完成
                        this.finished = true;
                    }
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

<style lang="less" scoped>
html,
body {
    height: 100%;
}
.shop-setting {
    height: 100vh;
    background: #f2f2f2;
    .shop-setting-header {
        height: 1.5rem;
        background: white;
        display: flex;
        align-items: center;
        font-size: 0.5rem;
        padding-left: 0.3rem;
        .header-text {
            padding-left: 0.5rem;
        }
    }
    .shop-setting-content {
        color: #312c2c;
        font-size: 0.45rem;
        .content-shop-info {
            padding: 0.1rem 0rem 0.1rem 0.3rem;
            margin-top: 0.5rem;
            background: white;
            .info-face {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .face-img {
                    display: flex;
                    align-items: center;
                    span {
                        padding: 0 0.2rem;
                        color: #928585;
                    }
                    img {
                        height: 1.8rem;
                        width: 1.8rem;
                    }
                }
            }
            .info-name {
                margin: 0.3rem 0;
                display: flex;
                justify-content: space-between;
                div:nth-child(2) {
                    color: #928585;
                }
                span {
                    padding: 0 0.2rem;
                }
            }
        }
        .content-shop-remark {
            background: white;
            margin-top: 0.5rem;
            padding: 0.1rem 0rem 0.1rem 0.3rem;
            .remark-item {
                margin: 0.3rem 0;
                display: flex;
                justify-content: space-between;
                div:nth-child(2) {
                    color: #928585;
                }
                span {
                    padding: 0 0.2rem;
                }
            }
        }
        .show-border-bottom {
            border-bottom: solid 0.03rem #f2f2f2;
            padding-bottom: 0.2rem;
        }
    }
}
.van-popup {
    .popupBtton {
        display: flex;
        justify-content: space-between;
        border-bottom: #f2f2f2 solid 1px;
        padding-bottom: 0.3rem;
        div {
            width: 1.5rem;
            text-align: center;
            font-size: 0.4rem;
            padding-top: 0.2rem;
            color: #1989fa;
        }
    }
}
</style>
