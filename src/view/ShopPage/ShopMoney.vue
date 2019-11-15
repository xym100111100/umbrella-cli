<template>
    <div class="shop-money">
        <header class="shop-money-header">
            <div @click="$router.go(-1)">
                <van-icon name="back-search" size=".6rem" />
                <span>资产管理</span>
            </div>
            <div class="header-text">
                <p>可用余额(元)</p>
                <p>￥120</p>
            </div>
        </header>
        <div class="shop-money-content">
            <div class="content-top">
                <div>提现</div>
                <div>充值</div>
            </div>
            <div class="content-center">
                <div class="center-item show-border-bottom">
                    <div>待结算余额</div>
                    <div>
                        <span>￥20</span>
                        <span>
                            <van-icon name="qianjin" size=".6rem" />
                        </span>
                    </div>
                </div>
                <div class="center-item show-border-bottom">
                    <div>不可用余额</div>
                    <div>
                        <span>￥22</span>
                        <span>
                            <van-icon name="qianjin" size=".6rem" />
                        </span>
                    </div>
                </div>
                <div class="center-item">
                    <div>收支明细</div>
                    <div>
                        <span>
                            <van-icon name="qianjin" size=".6rem" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Search, List, Card, Icon, Popup, Toast } from 'vant';
// import { list as goodsList } from '../../svc/Cart';
import { list as goodsClassList } from '../../svc/suc/SucGoodsClass';
import { list as goodsList } from '../../svc/suc/SucGoods';
import { add as addLove } from '../../svc/suc/SucLove';

// Lazyload插件需要初始化

export default {
    components: {
        [Icon.name]: Icon,
        [Search.name]: Search,
        [List.name]: List,
        [Card.name]: Card,
        [Popup.name]: Popup,
    },
    data() {
        return {
            goodsData: [],
            InputGoodTitle: null,
        };
    },
    activated() {},
    methods: {
        showPopup() {
            this.show = true;
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
.shop-money {
    height: 100vh;
    background: #f2f2f2;
    .shop-money-header {
        color: white;
        height: 4rem;
        background: rgb(204, 38, 38);
        div:first-child {
            padding: 0.2rem 0 0 0.3rem;
            font-size: 0.57rem;
            span {
                padding: 0 0.4rem;
            }
        }
        .header-text {
            text-align: center;
            padding-top: 0.4rem;
            p {
                padding: 0;
                margin: 0;
            }
            p:nth-child(1) {
                font-size: 0.4rem;
            }
            p:nth-child(2) {
                font-size: 1rem;
            }
        }
    }
    .shop-money-content {
        .content-top {
            display: flex;
            justify-content: space-around;
            background: white;
            height: 1.2rem;
            align-items: center;
            color: rgb(95, 148, 252);
            font-size: 0.5rem;
            div {
                width: 49%;
                text-align: center;
            }
            div:first-child {
                border-right: solid 0.02rem #f2f2f2;
            }
        }
    }
    .content-center {
        color: #312c2c;
        font-size: 0.45rem;
        background: white;
        padding: 0.1rem 0 0.1rem 0.3rem;
        margin-top: 0.3rem;
        .center-item {
            margin: 0.3rem 0;
            display: flex;
            justify-content: space-between;
            div:nth-child(2) {
                color: #928585;
                padding-top: 0.2rem;
                span {
                    padding: 0 0.2rem;
                }
            }
        }
    }
    .show-border-bottom {
        border-bottom: solid 0.03rem #f2f2f2;
        padding-bottom: 0.25rem;
    }
}
</style>
