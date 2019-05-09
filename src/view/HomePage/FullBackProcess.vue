<template>
  <div>
    <div class="box">
      <div style="margin-top: 52px;">
        <van-nav-bar title="拼全返规则" :left-arrow="true" :fixed="true" @click-left="handleBack"/>
      </div>
      <div class="little">
        <h3 class="pf">1.如何获得全返资格？</h3>
        <img :src="fullBackRule1Img">
      </div>
      <div class="little">
        <h3 class="pf">2.如何邀请购买？</h3>
        <img :src="fullBackRule2Img">
      </div>
      <div class="little">
        <h3 class="pf">3.全返金额何时到账?</h3>
        <img :src="fullBackRule3Img">
      </div>
      <div class="little">
        <h3 class="tip">温馨提示</h3>
        <img :src="fullBackRule4Img">
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
    methods: {
        /**
         * 回退到上一页
         */
        handleBack() {
            this.$router.go(-1);
        },
    },
    data() {
        return {
            fullBackRule1Img: 'img/FullBackRule1.png',
            fullBackRule2Img: 'img/FullBackRule2.png',
            fullBackRule3Img: 'img/FullBackRule3.png',
            fullBackRule4Img: 'img/FullBackRule4.png',
        };
    },
};
</script>

<style lang="less">
#ad_3v {
    display: none !important;
}

.mui-toast-container {
    top: 100px !important;
    bottom: auto !important;
}

/* 规则页面样式 */
.box,
.little {
    width: 100%;
}

.little .pf {
    padding-left: 38px;
}

.little h3 {
    font-weight: normal;
    background: #d84a61;
    height: 50px;
    margin: 0px;
    padding: 0px;
    font-family: '黑体';
    line-height: 50px;
    color: #fff;
}

.little img {
    width: 100%;
    height: 100%;
}
</style>
