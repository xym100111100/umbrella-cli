<template>
    <div id="user-box" class="user-box">
        <header>
            <div class="user-header">
                <div class="header-face">
                    <img
                        src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoM1LKFPNSBQA4iaeuHQuibYIicA/132"
                    />
                </div>
                <div class="header-name">
                    <span>Umbrella</span>

                    <span class="Uid">UID:12345678</span>
                </div>
            </div>
        </header>
        <div class="user-content">
            <DyCell MyIcon="shouye" content="我的大学" :goPath="()=>this.$router.push({name:'school'})" />
            <DyCell MyIcon="shouye2" content="我的店铺" :goPath="()=>this.$router.push({name:'shop'})" />
            <DyCell MyIcon="fabuxuqiu" content="需求公告" :goPath="()=>this.$router.push({name:'notice'})" />
            <DyCell MyIcon="location-o" :isBootomLine="false" content="米格走廊" :goPath="()=>this.$router.push({name:'corridor'})" />
        </div>
    </div>
</template>

<script>
import { Row, Col, Icon, Cell } from 'vant';
import DyCell from '../../comp/common/DyCell.vue';

export default {
    components: {
        [Row.name]: Row,
        [Col.name]: Col,
        [Icon.name]: Icon,
        [Cell.name]: Cell,
        DyCell,
    },
    data() {
        return {
            id: this.$route.params.id,
        };
    },
    methods: {
    },

};
</script>

<style lang="less" scoped>
body,
html {
    height: 100%;
    background: rgba(60, 47, 15, 0.0001);
}
.user {
    &-box {
        height: 100%;
        background: rgba(60, 47, 15, 0.0001);
    }
    &-header {
        height: 3rem;
        display: flex;
        align-items: center;
        // background: linear-gradient(to right, rgb(241, 101, 50), red);
        background: #fff;
        margin-bottom: 0.2rem;
        padding: 0.4rem 0 0.6rem;

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
            display: flex;
            align-items: center;
            flex-direction: column;
            margin-left: 0.3rem;
            font-size: 0.6rem;
        }

        .header-name .Uid {
            margin-top: 0.4rem;
            font-size: 0.4rem;
            margin-left: 0.2rem;
            color: #615c5c;
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
