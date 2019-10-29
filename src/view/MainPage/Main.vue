<template>
  <!-- 主框架页面 -->
  <div id="main-page"  >
    <router-view class="main-content" />
    <van-tabbar v-model="active">
      <van-tabbar-item icon="shengchanrenwudanguanli" to="hunter"  >
        任务
      </van-tabbar-item>
      <van-tabbar-item icon="tabbar-find" to="find">
        查找
      </van-tabbar-item>
       <van-tabbar-item icon="tabbar-msg" v-if="msgCount<=0"   to="msg">
        消息
      </van-tabbar-item> 
       <van-tabbar-item icon="tabbar-msg" v-if="msgCount>0" v-bind:info="msgCount"  to="msg">
        消息
      </van-tabbar-item> 
      <van-tabbar-item icon="xihuan" v-if="loveCount>0" v-bind:info="loveCount"  to="cart">
        收藏
      </van-tabbar-item>
      <van-tabbar-item  v-if="loveCount===0" icon="xihuan"  to="cart">
        收藏
      </van-tabbar-item>
      <van-tabbar-item icon="tabbar-mine" to="mine">
        我
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
// 路由索引，据此根据跳转的路由设置激活的tabbar图标
const routeIndex = {
    hunter: 0,
    find: 1,
    msg: 2,
    cart: 3,
    mine: 4,
};

export default {
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
    },
    data() {
        return {
            active: 0,
        };
    },
    computed:{
      msgCount(){
        return this.$store.getters.active.msgCount
      },
      loveCount(){
        return this.$store.getters.active.loveCount;
      }
    },
    beforeRouteUpdate(to, from, next) {
        //  console.log('beforeRouteUpdate\r\nfrom', from, '\r\nto', to);
        // console.log(to);
        // console.log(from);
        // console.log(next);

        // 设置激活图标为目标路由的图标，否则浏览器回退时由于缓存的作用，不会切换激活图标
        const toIndex = routeIndex[to.name];
        this.active = toIndex;
        next();
    },
};
</script>

<style lang="less">
@import '../../assets/css/custom.less';

#main-page {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    // height: 100%;
    background-color: #ebe6e6;

    // display: flex;
    // flex-direction: column;
    // 页面主内容
    > .main-content {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        bottom: @bottom-height;
    }
    // 页面底部标签栏
    > .van-tabbar {
        height: @bottom-height;
        border-top: 1px solid #ddd;
        background-color: white;
        z-index: 9999 !important;
        .van-tabbar-item {
            color: #a8a5a5;
            // 图标下部的字体大小
            font-size: 0.35rem;
            .van-icon {
                // 图标的大小
                font-size: 0.78rem;
            }
        }
        .van-tabbar-item--active {
            color: #7bbfea;
        }
        .van-submit-bar {
            border-top: 1px red solid;
            border-bottom: 1px #aaa solid;
        }
    }
}
</style>
