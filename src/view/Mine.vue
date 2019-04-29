<template>
    <div class="user-box">
        <header>
            <div class="user-header">
                <div class="header-face">
                    <img src="https://wwc.alicdn.com/avatar/getAvatar.do?userId=2688626963&width=160&height=160&type=sns">
                </div>
                <div class="header-name">

                    <span>Umbrella</span>

                    <span class="Uid">UID:12345678</span>

                </div>
                <div class="header-setting">
                    <van-icon color="white" name="shezhi" />
                </div>
            </div>
        </header>
        <div class="user-content">

            <!-- 我的订单 -->
            <div class=" content-order"  v-on:click="getOrderList" >
                <div class="order-top">
                    <span class="top-right">
                        我的订单
                    </span>
                    <span class="top-left">
                        查看所有订单
                        <van-icon color="#555555" name="qianjin" />
                    </span>
                </div>
                <div class="hr"></div>
                <div class="order-buttom">
                    <van-row class="user-links">
                        <van-col span="4">
                            <van-icon color="#f40" name="tubiaozhizuo-" />
                            <br/>
                            <span>待付款</span>
                        </van-col>
                        <van-col style="margin-left:0.3rem;" span="4">
                            <van-icon color="#f40" name="kuaidiche" />
                            <br/>
                            <span>待发货</span>
                        </van-col>
                        <van-col style="margin-left:0.3rem;" span="4">
                            <van-icon color="#f40" name="qianshou" />
                            <br/>
                            <span> 待签收</span>
                        </van-col>

                        <van-col style="margin-left:0.3rem;" span="4">
                            <van-icon color="#f40" name="jiesuan" />
                            <br/>
                            <span> 待结算</span>
                        </van-col>

                        <van-col style="margin-left:0.2rem;" span="5">
                            <van-icon color="#f40" name="dianhua" />
                            <br/>
                            <span>退款/售后</span>
                        </van-col>
                    </van-row>
                </div>
            </div>

            <!-- 我的钱包 -->
            <div class="content-money">
                <div class="money-left" v-if='afcAccount!==undefined && afcAccount.length>0'>
                    <div>
                        <span class="value">{{afcAccount[0].balance}}</span>
                        <span class="key">余额</span>
                    </div>
                    <div>
                        <span class="value" v-if='afcAccount[0]'>{{afcAccount[0].cashback}}</span>
                        <span class="key">返现金</span>
                    </div>
                    <div>
                        <span class="value" v-if='afcAccount[0]'>{{afcAccount[0].commissionTotal}}</span>
                        <span class="key">已全返</span>
                    </div>

                    <div>
                        <span class="value" v-if='afcAccount[0]'>{{afcAccount[0].commissioning}}</span>
                        <span class="key"> 待全返</span>
                    </div>
                </div>
                <div class="money-right" v-on:click="getMyWallet">
                    <div>
                        <van-icon color="#f40" name="purse" />
                        <span>钱包</span>
                    </div>
                </div>
            </div>
            <div class="content-line">
                <div class="line-left">
                    <div class="left-concent">
                    </div>
                </div>
                <div class="line-right">
                </div>
            </div>
            <!-- 我的积分 -->
            <div class="content-point">
                <div class="point-left" v-if='pntAccount!==undefined && pntAccount.length>0'>
                    <div>
                        <span class="value">{{pntAccount[0].point}}</span>
                        <span class="key"> 积分</span>
                    </div>
                    <div>
                        <span class="value">{{pntAccount[0].yesterdayIncome}}</span>
                        <span class="key">昨日收益</span>
                    </div>
                    <div>
                        <span class="value">{{pntAccount[0].cumulativeIncome}}</span>
                        <span class="key">累计收益</span>
                    </div>
                    <div>
                        <span class="value">{{pntAccount[0].waitingPoint}}</span>
                        <span class="key">待入积分</span>
                    </div>

                </div>
                <div class="point-right" v-on:click="getMyPoint" >
                    <div>
                        <van-icon color="#f40" name="jifen" />
                        <span>积分</span>
                    </div>
                </div>
            </div>
            <!-- 我的設置 -->
            <div class="content-setting">
                <div v-on:click="setAddress" >
                    <van-icon color="#7d7e80" name="dizhi" />
                    <span>收货地址</span>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { Row, Col, Icon } from 'vant';
import { getAccountById, getPntAccount } from '../svc/Mine';

export default {
    components: {
        [Row.name]: Row,
        [Col.name]: Col,
        [Icon.name]: Icon,
    },
    data() {
        return {
            afcAccount: this.getAccount(),
            pntAccount: [],
        };
    },
    methods: {
        getAccount() {
            getAccountById({
                onSuccess: data => {
                    this.afcAccount = data;
                },
            });
            getPntAccount({
                onSuccess: data2 => {
                    this.pntAccount = data2;
                },
            });
            
        },
        getOrderList() {
            this.$router.push('/order');
        },
        getMyWallet() {
            this.$router.push('/my-wallet');
        },
        getMyPoint() {
            this.$router.push('/my-point');
        },
        setAddress() {
            this.$router.push('/address');
        },
    },
};
</script>

<style lang="less" scoped>
.user {
    &-box {
        height: 18rem;
        background: #fafafa;
    }
    &-header {
        height: 4rem;
        display: flex;
        align-items: center;
        background: linear-gradient(to right, rgb(241, 101, 50), red);

        .header-face {
            height: 2rem;
            width: 2rem;
            margin-left: 0.3rem;
        }

        .header-face img {
            height: 2rem;
            width: 2rem;
            border: #fff 1px solid;
            border-radius: 100%;
        }

        .header-name {
            height: 2rem;
            display: flex;
            align-items: center;
            flex-direction: column;
            margin-left: 0.3rem;
            color: white;
            font-size: 0.65rem;
        }

        .header-name .Uid {
            margin-top: 0.4rem;
            font-size: 0.4rem;
        }
        .header-setting {
            display: flex;
            flex-grow: 1;
            justify-content: flex-end;
            margin-right: 1rem;
            height: 2rem;
        }
    }
    &-content {
        .content-order {
            height: 3.4rem;
            background: #fff;
            padding-top: 0.2rem;
            .order-top {
                margin: 0 auto;
                width: inherit;
                padding: 0.2rem;
                display: flex;
                justify-content: space-between;
                font-size: 0.4rem;
                align-items: center;
                .top-right {
                    font-size: 0.5rem;
                }
                .top-left {
                    color: #7d7e80;
                    font-size: 0.35rem;
                }
            }
            .hr {
                height: 0.1rem;
                border-top: solid 0.01rem #ddd9d9;
            }
            .order-buttom {
                .user-links {
                    font-size: 0.5rem;
                    text-align: center;
                    background-color: #fff;
                    .van-icon {
                        font-size: 1rem;
                    }
                }
            }
            .order-buttom span {
                color: #7d7e80;
                font-size: 0.42rem;
            }
            .order-buttom p {
                color: #7d7e80;
                font-size: 0.42rem;
                font-weight: bold;
            }
        }
        .content-line,
        .content-money,
        .content-point {
            background: white;
            font-size: 0.42rem;
            display: flex;
            align-items: center;
            justify-content: space-around;
            color: #7d7e80;
            .line-left,
            .money-left,
            .point-left {
                flex-grow: 20;
                display: flex;
                div {
                    flex-grow: 20;
                    display: flex;
                    justify-items: space-around;
                    flex-direction: column;
                    align-items: center;
                    .value {
                        padding: 0.18rem 0 0.2rem 0;
                    }
                    .key {
                        margin-bottom: -0.1rem;
                    }
                }
            }
            .money-right,
            .line-right,
            .point-right {
                flex-grow: 0;
                width: 2rem;
                display: flex;
                align-items: center;
                div {
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    border-left: dashed 1px #e7e4e4;
                    margin: 0.2rem 0;
                    .van-icon {
                        font-size: 0.85rem;
                    }
                    span {
                        padding-top: 0.2rem;
                    }
                }
            }

            .line-left .left-concent {
                border-top: dashed 1px #e7e4e4;
                margin: 0 0.6rem;
            }
        }

        .content-money {
            margin-top: 0.35rem;
        }

        .content-setting {
            background: white;
            font-size: 0.42rem;
            display: flex;
            color: #7d7e80;
            margin-top: 0.35rem;
            div {
                margin: 0 0.3rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                .van-icon {
                    font-size: 0.85rem;
                }
                span {
                    margin-top: 0.2rem;
                }
            }
        }
    }
}
</style>
