<template>
    <div class="my-point-view">
        <div class="my-point-navbar">
            <van-nav-bar title="我的积分" v-on:click-left="onClickLeft"  left-arrow right-text="转出收益"></van-nav-bar>
        </div>
        <div class="my-point-tabs">
            <van-tabs v-model="active" swipe-threshold="5" title-active-color="red" swipeable="true">
                <van-tab>
                    <template slot="title">
                        <div class="my-point-tabs-title">
                            <span>累计收益</span>
                            <span class="my-point-tabs-title__balance">1.111</span>
                        </div>
                    </template>
                    <ul class="balance-title">
                        <li style="margin-left: 1rem;">交易标题</li>
                        <li style="margin-left: .1rem;">交易总额</li>
                        <li style="margin-right: .8rem;">交易时间</li>
                    </ul>
                    <div style="height: 12.5rem; overflow: auto; background-color: white;">
                        <ul v-for="item in list" :key="item.id">
                            <li style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 4rem; text-align: center; margin-left: .3rem;">{{ item.tradeTitle }}</li>
                            <li style="margin-left: -.45rem;">{{ item.tradeAmount }}</li>
                            <li style="width: 3.5rem;">{{ item.tradeTime }}</li>
                        </ul>
                    </div>
                </van-tab>
                <van-tab>
                    <template slot="title">
                        <div class="my-point-tabs-title">
                            <span>待入积分</span>
                            <span class="my-point-tabs-title__balance">1.111</span>
                        </div>
                    </template>
                    <ul class="balance-title">
                        <li style="margin-left: 1rem;">交易标题</li>
                        <li style="margin-left: .1rem;">交易总额</li>
                        <li style="margin-right: .8rem;">交易时间</li>
                    </ul>
                    <div style="height: 12.5rem; overflow: auto;">
                        <ul v-for="item in list" :key="item.id">
                            <li style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 4rem; text-align: center; margin-left: .3rem;">{{ item.tradeTitle }}</li>
                            <li style="margin-left: -.45rem;">{{ item.tradeAmount }}</li>
                            <li style="width: 3.5rem;">{{ item.tradeTime }}</li>
                        </ul>
                    </div>
                </van-tab>
                <van-tab>
                    <template slot="title">
                        <div class="my-point-tabs-title">
                            <span>积分</span>
                            <span class="my-point-tabs-title__balance">1.111</span>
                        </div>
                    </template>
                    <ul class="balance-title">
                        <li style="margin-left: 1rem;">交易标题</li>
                        <li style="margin-left: .1rem;">交易总额</li>
                        <li style="margin-right: .8rem;">交易时间</li>
                    </ul>
                    <div style="height: 12.5rem; overflow: auto;">
                        <ul v-for="item in list" :key="item.id">
                            <li style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 4rem; text-align: center; margin-left: .3rem;">{{ item.tradeTitle }}</li>
                            <li style="margin-left: -.45rem;">{{ item.tradeAmount }}</li>
                            <li style="width: 3.5rem;">{{ item.tradeTime }}</li>
                        </ul>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import { NavBar, Tab, Tabs } from 'vant';

export default {
    components: {
        [NavBar.name]: NavBar,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
    },

    data() {
        return {
            active: 0,
            list: [
                {
                    id: '12345786454111',
                    tradeTitle: '阿三萨达奥所大大大所所多大爱仕达所大',
                    tradeAmount: '15.44',
                    tradeTime: '2019-04-22 11:23:28',
                },
                {
                    id: '1234567891012345',
                    tradeTitle: '都是法师法师打发第三方士大夫士大夫士大夫的沙发是的范德萨发',
                    tradeAmount: '19.44',
                    tradeTime: '2019-04-22 11:23:28',
                },
                {
                    id: '9876543211231111',
                    tradeTitle: '阿萨德撒大大多撒二翁绕弯儿翁绕弯儿无若',
                    tradeAmount: '20.44',
                    tradeTime: '2019-04-22 11:23:28',
                },
                {
                    id: '9876543211231111',
                    tradeTitle: '阿萨德撒大大多撒二翁绕弯儿翁绕弯儿无若',
                    tradeAmount: '20.44',
                    tradeTime: '2019-04-22 11:23:28',
                },
                {
                    id: '9876543211231111',
                    tradeTitle: '阿萨德撒大大多撒二翁绕弯儿翁绕弯儿无若',
                    tradeAmount: '20.44',
                    tradeTime: '2019-04-22 11:23:28',
                },
                {
                    id: '9876543211231111',
                    tradeTitle: '阿萨德撒大大多撒二翁绕弯儿翁绕弯儿无若',
                    tradeAmount: '20.44',
                    tradeTime: '2019-04-22 11:23:28',
                },
                {
                    id: '9876543211231111',
                    tradeTitle: '阿萨德撒大大多撒二翁绕弯儿翁绕弯儿无若',
                    tradeAmount: '20.44',
                    tradeTime: '2019-04-22 11:23:28',
                },
                {
                    id: '9876543211231111',
                    tradeTitle: '阿萨德撒大大多撒二翁绕弯儿翁绕弯儿无若',
                    tradeAmount: '20.44',
                    tradeTime: '2019-04-22 11:23:28',
                },
                {
                    id: '9876543211231111',
                    tradeTitle: '阿萨德撒大大多撒二翁绕弯儿翁绕弯儿无若',
                    tradeAmount: '20.44',
                    tradeTime: '2019-04-22 11:23:28',
                },
                {
                    id: '9876543211231111',
                    tradeTitle: '阿萨德撒大大多撒二翁绕弯儿翁绕弯儿无若',
                    tradeAmount: '20.44',
                    tradeTime: '2019-04-22 11:23:28',
                },
                {
                    id: '9876543211231111',
                    tradeTitle: '阿萨德撒大大多撒二翁绕弯儿翁绕弯儿无若',
                    tradeAmount: '20.44',
                    tradeTime: '2019-04-22 11:23:28',
                },
                {
                    id: '9876543211231111',
                    tradeTitle: '阿萨德撒大大多撒二翁绕弯儿翁绕弯儿无若',
                    tradeAmount: '20.44',
                    tradeTime: '2019-04-22 11:23:28',
                },
                {
                    id: '9876543211231111',
                    tradeTitle: '阿萨德撒大大多撒二翁绕弯儿翁绕弯儿无若',
                    tradeAmount: '20.44',
                    tradeTime: '2019-04-22 11:23:28',
                },
                {
                    id: '9876543211231111',
                    tradeTitle: '阿萨德撒大大多撒二翁绕弯儿翁绕弯儿无若',
                    tradeAmount: '20.44',
                    tradeTime: '2019-04-22 11:23:28',
                },
                {
                    id: '9876543211231111',
                    tradeTitle: '阿萨德撒大大多撒二翁绕弯儿翁绕弯儿无若',
                    tradeAmount: '20.44',
                    tradeTime: '2019-04-22 11:23:28',
                },
                {
                    id: '9876543211231111',
                    tradeTitle: '阿萨德撒大大多撒二翁绕弯儿翁绕弯儿无若',
                    tradeAmount: '20.44',
                    tradeTime: '2019-04-22 11:23:28',
                },
                {
                    id: '9876543211231111',
                    tradeTitle: '阿萨德撒大大多撒二翁绕弯儿翁绕弯儿无若',
                    tradeAmount: '20.44',
                    tradeTime: '2019-04-22 11:23:28',
                },
                {
                    id: '9876543211231111',
                    tradeTitle: '阿萨德撒大大多撒二翁绕弯儿翁绕弯儿无若',
                    tradeAmount: '20.44',
                    tradeTime: '2019-04-22 11:23:28',
                },
                {
                    id: '9876543211231111',
                    tradeTitle: '阿萨德撒大大多撒二翁绕弯儿翁绕弯儿无若',
                    tradeAmount: '20.44',
                    tradeTime: '2019-04-22 11:23:28',
                },
            ],
        };
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
    },
};
</script>

<style lang="less" scoped>
.my-point-view {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    background-color: #fafafa;

    .my-point-navbar {
        width: 10rem;
        .van-nav-bar {
            background-color: red;
            &__arrow {
                font-size: 0.7rem;
            }

            &__title {
                color: #fafafa;
                font-size: 0.5rem;
            }

            .van-icon {
                color: #fafafa;
            }

            &__text {
                color: #fafafa;
                font-size: 0.4rem;
            }
        }
    }

    .my-point-tabs {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        align-content: space-between;

        &-title {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            &__balance {
                margin-top: -0.4rem;
            }
        }

        ul {
            list-style: none;
            padding: 0;
            margin: 0;
            width: 10rem;
            height: 0.8rem;
            line-height: 0.83rem;
            border: 1px solid rgba(51, 51, 51, 0.07);
            border-top: 0;
            font-size: 0.33rem;

            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-content: space-between;
            text-align: center;
        }

        ul li {
            display: block;
            width: 2rem;
            text-align: center;
        }
    }
}
</style>

<style lang="less">
.van-tabs {
    &__content {
        margin-top: 0.8rem;
    }
}

.van-tabs--line .van-tabs__wrap {
    height: 1.9rem;
}
</style>

