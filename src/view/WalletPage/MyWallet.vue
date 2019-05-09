<template>
  <div class="my-wallet-view">
    <div class="my-wallet-navbar">
      <van-nav-bar
        title="我的钱包"
        @click-left="onClickLeft"
        left-arrow
        right-text="提现"
        @click-right="onWithdraw"
      ></van-nav-bar>
    </div>
    <div class="my-wallet-tabs">
      <van-tabs v-model="active" swipe-threshold="5" title-active-color="red" swipeable="true">
        <van-tab>
          <template slot="title">
            <div class="my-wallet-tabs-title">
              <span>余额</span>
              <span class="my-wallet-tabs-title__balance">1.111</span>
            </div>
          </template>
          <ul class="balance-title">
            <li style="margin-left: 1rem;">交易标题</li>
            <li style="margin-left: .1rem;">交易总额</li>
            <li style="margin-right: .8rem;">交易时间</li>
          </ul>
          <div style="height: 12.5rem; overflow: auto; background-color: white;">
            <ul v-for="item in list" :key="item.id">
              <li
                style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 4rem; text-align: center; margin-left: .3rem;"
              >{{ item.tradeTitle }}</li>
              <li style="margin-left: -.45rem;">{{ item.tradeAmount }}</li>
              <li style="width: 3.5rem;">{{ item.tradeTime }}</li>
            </ul>
          </div>
        </van-tab>
        <van-tab>
          <template slot="title">
            <div class="my-wallet-tabs-title">
              <span>返现金</span>
              <span class="my-wallet-tabs-title__balance">1.111</span>
            </div>
          </template>
          <ul class="balance-title">
            <li style="margin-left: 1rem;">商品名称</li>
            <li style="margin-left: .1rem;">规格名称</li>
            <li style="margin-right: .8rem;">返现总额</li>
          </ul>
          <div style="height: 12.5rem; overflow: auto;">
            <ul v-for="item in list" :key="item.id">
              <li
                style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 4rem; text-align: center; margin-left: .3rem;"
              >{{ item.tradeTitle }}</li>
              <li style="margin-left: -.45rem;">{{ item.tradeAmount }}</li>
              <li style="width: 3.5rem;">{{ item.tradeTime }}</li>
            </ul>
          </div>
        </van-tab>
        <van-tab>
          <template slot="title">
            <div class="my-wallet-tabs-title">
              <span>待全返</span>
              <span class="my-wallet-tabs-title__balance">1.111</span>
            </div>
          </template>
          <ul class="balance-title">
            <li style="margin-left: 1rem;">交易标题</li>
            <li style="margin-left: .1rem;">交易总额</li>
            <li style="margin-right: .8rem;">交易时间</li>
          </ul>
          <div style="height: 12.5rem; overflow: auto;">
            <ul v-for="item in list" :key="item.id">
              <li
                style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 4rem; text-align: center; margin-left: .3rem;"
              >{{ item.tradeTitle }}</li>
              <li style="margin-left: -.45rem;">{{ item.tradeAmount }}</li>
              <li style="width: 3.5rem;">{{ item.tradeTime }}</li>
            </ul>
          </div>
        </van-tab>
        <van-tab>
          <template slot="title">
            <div class="my-wallet-tabs-title">
              <span>待返现</span>
              <span class="my-wallet-tabs-title__balance">1.111</span>
            </div>
          </template>
          <ul class="balance-title">
            <li style="margin-left: 1rem;">商品名称</li>
            <li style="margin-left: .1rem;">规格名称</li>
            <li style="margin-right: .8rem;">返现总额</li>
          </ul>
          <div style="height: 12.5rem; overflow: auto;">
            <ul v-for="item in list" :key="item.id">
              <li
                style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 4rem; text-align: center; margin-left: .3rem;"
              >{{ item.tradeTitle }}</li>
              <li style="margin-left: -.45rem;">{{ item.tradeAmount }}</li>
              <li style="width: 3.5rem;">{{ item.tradeTime }}</li>
            </ul>
          </div>
        </van-tab>
        <van-tab>
          <template slot="title">
            <div class="my-wallet-tabs-title">
              <span>提现中</span>
              <span class="my-wallet-tabs-title__balance">1.111</span>
            </div>
          </template>
          <ul class="balance-title">
            <li style="margin-left: 1rem;">实际到账金额</li>
            <li style="margin-left: .1rem;">提现服务费</li>
            <li style="margin-right: .8rem;">申请时间</li>
          </ul>
          <div style="height: 12.5rem; overflow: auto;">
            <ul v-for="item in list" :key="item.id">
              <li
                style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 4rem; text-align: center; margin-left: .3rem;"
              >{{ item.tradeTitle }}</li>
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

        onWithdraw() {
            this.$router.push('withdraw');
        },
    },
};
</script>

<style lang="less" scoped>
.my-wallet-view {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    background-color: #fafafa;

    .my-wallet-navbar {
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

    .my-wallet-tabs {
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

