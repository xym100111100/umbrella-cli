<template>
  <div class="withdraw-record-view">
    <div class="withdraw-record-navbar">
      <van-nav-bar title="提现记录" left-arrow/>
    </div>
    <div class="withdraw-record-list">
      <ul class="withdraw-record-list-title">
        <li style="margin-left: 1rem;">实际到账金额</li>
        <li style="margin-left: .1rem;">提现服务费</li>
        <li style="margin-right: .8rem;">申请时间</li>
      </ul>
      <div style="height: 13.7rem; overflow: auto; background-color: white;">
        <ul v-for="item in list" :key="item.id">
          <li
            style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 4rem; text-align: center; margin-left: .3rem;"
          >{{ item.tradeTitle }}</li>
          <li style="margin-left: -.45rem;">{{ item.tradeAmount }}</li>
          <li style="width: 3.5rem;">{{ item.tradeTime }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant';

export default {
    components: {
        [NavBar.name]: NavBar,
    },

    data() {
        return {
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
};
</script>

<style lang="less" scoped>
.withdraw-record-view {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    background-color: #fafafa;

    .withdraw-record-navbar {
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

    .withdraw-record-list {
        
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

