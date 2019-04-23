<template>
  <div class="withdraw-view">
    <div class="withdraw-navbar">
      <van-nav-bar title="提现" @click-left="handleBack" @click-right="withdrawRecord" left-arrow right-text="记录"></van-nav-bar>
    </div>
    <div>
      <van-cell>
        <div style="font-size: 0.38rem;" slot="title">
          当前可用金额：
          <span>
            <font style="font-size: 0.42rem;" color="red">1000</font>
          </span>元，本月已提现1次，总共可提现
          <span>
            <font style="font-size: 0.42rem;" color="red">1000</font>
          </span>元
        </div>
      </van-cell>
    </div>
    <div class="withdraw-field">
      <van-field v-model="list.withdrawAmount" required clearable label="金额" placeholder="请输入提现金额"/>
      <van-field
        v-model="list.accountName"
        required
        clearable
        label="账户姓名"
        placeholder="请输入提现账户姓名"
      />
      <van-field
        v-show="list.idCard === ''"
        v-model="list.idCard"
        required
        clearable
        label="身份证号"
        placeholder="请输入身份证号"
      />
      <van-field
        v-model="list.bankAccountNo"
        required
        clearable
        label="银行卡号"
        placeholder="请输入银行卡号"
      />
      <van-field
        v-model="list.openAccountBank"
        required
        clearable
        label="开户银行"
        placeholder="请输入开户银行名称"
      />
      <van-field
        v-model="list.contactTel"
        required
        clearable
        label="联系电话"
        placeholder="请输入银行卡预留电话"
      />
      <van-field
        v-show="list.seviceCharge !== 0"
        v-model="list.seviceCharge"
        clearable
        label="手续费"
        readonly="true"
      />
    </div>
    <div>
      <van-cell>
        <div style="font-size: 0.38rem;" slot="title">
          <span>
            银行卡
            <span>
              <font style="font-size: 0.42rem;" color="red">5</font>
            </span>个工作日内到账，当次提现
            最大金额
            <span>
              <font style="font-size: 0.42rem;" color="red">5000</font>
            </span>元
          </span>
        </div>
      </van-cell>
    </div>
    <div class="withdraw-submit">
      <van-button square="true" type="danger">提交</van-button>
    </div>
  </div>
</template>

<script>
import { NavBar, Button, Field, Cell } from 'vant';

export default {
    components: {
        [NavBar.name]: NavBar,
        [Button.name]: Button,
        [Field.name]: Field,
        [Cell.name]: Cell,
    },

    data() {
        return {
            list: {
                seviceCharge: 5,
                idCard: '',
            },
        };
    },

    methods: {
        // 回退
        handleBack() {
            this.$router.go(-1);
        },

        // 提现记录
        withdrawRecord() {
            this.$router.push('withdraw-record');
        }
    }
};
</script>

<style lang="less" scoped>
.withdraw-view {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    background-color: #fafafa;

    .withdraw-navbar {
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

    .withdraw-submit {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        margin-top: 2.1rem;

        .van-button--normal {
            width: 10rem;
            font-size: 0.5rem;
        }
    }
}
</style>

<style lang="less">
.van-field {
    &__label {
        font-size: 0.43rem;
    }

    .van-cell__value {
        font-size: 0.43rem;
    }
}
</style>


