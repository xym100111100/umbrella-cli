<template>
    <div class="shop">
        <header>
            <div class="shop-header">
                <div class="header-face">
                    <img :src="userInfo.wxFacePath" />
                </div>
                <div class="header-name">
                    <div>{{userInfo.wxName}}</div>
                    <div class="school">
                        <van-icon size="0.45rem" color="white" name="dizhi" />
                        <span>桂林理工大学</span>
                    </div>
                </div>
                <div @click="showPopup" class="header-setting">
                    <van-icon size="0.6rem" color="white" name="yiwen" />
                </div>
            </div>
        </header>
        <div class="shop-content">
            <van-popup v-model="show" position="top" :style="{ height: '20%' }">
                <div class="content-popup">
                    <div class="popup-header">
                        <div class="header-icon">
                            <van-icon size="0.5rem" color="#a09dd4" name="zhuyi" />
                        </div>
                        <div class="heander-text">为保障信息安全，所有学生只能浏览选择的学校信息，如学校选择错误需要修改，请提交请求与修改原因。</div>
                    </div>
                </div>
            </van-popup>
            <div class="content-shop-data">
                <div>
                    <p>今日营业额(元)</p>
                    <p>100200</p>
                </div>
                <div>
                    <p>今日付款单数(元)</p>
                    <p>152432</p>
                </div>
                <div>
                    <p>可用余额(元)</p>
                    <p>120</p>
                </div>
            </div>
            <div class="content-list">
                <div class="list-item">
                    <div @click="goShopGood">
                        <p>
                            <van-icon size="1rem" color="#5f94fc" name="shangpin2" />
                        </p>
                        <p>商品管理</p>
                    </div>
                    <div>
                        <p>
                            <van-icon size="1rem" color="#47b508" name="zuowei1" />
                        </p>
                        <p>桌位管理</p>
                    </div>
                    <div>
                        <p>
                            <van-icon size="1rem" color="#5f94fc" name="shezhi" />
                        </p>
                        <p>设置</p>
                    </div>
                </div>
                <div class="list-item item-align-left">
                    <div>
                        <p>
                            <van-icon size="1rem" color="#f96a64" name="wallet1" />
                        </p>
                        <p>资产中心</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Row, Col, Cell, Popup, Icon, Toast } from 'vant';
import DyCell from '../../comp/common/DyCell.vue';

export default {
    components: {
        [Row.name]: Row,
        [Col.name]: Col,
        [Cell.name]: Cell,
        [Toast.name]: Toast,
        DyCell,
        [Popup.name]: Popup,

        [Icon.name]: Icon,
    },
    data() {
        return {
            id: this.$route.params.id,
            show: false,
        };
    },
    filters: {
        filtersUID(data) {
            if (data.length > 7) {
                return data.substr(0, 7);
            }
            return data;
        },
    },
    computed: {
        userInfo() {
            return this.$store.getters.user;
        },
    },
    methods: {
        showPopup() {
            this.show = true;
        },
        goShopGood() {
            this.$router.push({
                name: 'shop-good',
            });
        },
        TempClose() {
            this.$toast({ message: '服务暂时关闭咯~~~~~', position: 'top' });
        },
        willOpen() {
            this.$toast({ message: '暑假还没到呢~~~~~', position: 'top' });
        },
    },
};
</script>

<style lang="less" scoped>
body,
html {
    height: 100vh;
}
.shop {
    background: #f2f2f2;
}
.shop {
    &-header {
        height: 2.5rem;
        display: flex;
        align-items: center;
        background: #0d4055;
        padding: 0.2rem 0 0.6rem;
        .header-face {
            height: 1.5rem;
            width: 1.5rem;
            margin-left: 0.5rem;
        }

        .header-face img {
            height: 1.5rem;
            width: 1.5rem;
            border-radius: 0.2rem;
        }

        .header-name {
            height: 1.5rem;
            align-items: center;
            flex-direction: column;
            margin-left: 0.3rem;
            font-size: 0.6rem;
            color: white;
        }

        .header-name .school {
            padding: 0.2rem 0 0 0;
            font-size: 0.4rem;
            color: white;
        }
        .header-setting {
            width: 1rem;
            flex-grow: 1;
            margin-right: 1rem;
            height: 2rem;
            text-align: right;
        }
    }
    .shop-content {
        .content-shop-data {
            height: 2rem;
            background: #0d4055;
            display: flex;
            font-size: 0.37rem;
            justify-content: space-around;
            align-content: center;
            color: #89afbc;
            div {
                text-align: center;
                height: 2rem;
                p {
                    padding: 0;
                    margin: 0;
                    padding-top: 0.2rem;
                }
            }
        }
        .content-list {
            background: white;
            margin-top: 0.7rem;
            .list-item {
                display: flex;
                justify-content: space-around;
                div {
                    text-align: center;
                    padding: 0.6rem 0;
                    p {
                        padding: 0;
                        margin: 0;
                    }
                    p:nth-child(2) {
                        font-size: 0.4rem;
                    }
                }
            }
            .item-align-left {
                justify-content: left;
                margin-left: 10%;
            }
        }
    }
}

.content-popup {
    height: 100%;
    background: #0d4055;
    .popup-header {
        font-size: 0.4rem;
        color: white;
        display: flex;
        .header-icon {
            padding: 0.3rem 0 0 0.2rem;
        }
        .heander-text {
            padding: 0.2rem;
        }
    }
}
</style>
