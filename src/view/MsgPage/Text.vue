<template>
  <div id="text"  class="text">
    <p style="background:yellow;" >2222222</p>
    <p>2222222</p>
    <p style="background:yellow;"  >2222222</p>
    <p>2222222</p>
    <p style="background:yellow;"  >2222222</p>
    <p>2222222</p>
    <p>2222222</p>
    <p>2222222</p>
    <p>2222222</p>
    <p style="background:yellow;" >2222222</p>
    <p>2222222</p>
    <p>2222222</p>
    <p>2222222</p>
    <p>2222222</p>
    <p>2222222</p>
    <p>2222222</p>
    <p>2222222</p>
    <p>2222222</p>
    <p>2222222</p>
    <p>2222222</p>
    <p>2222222</p>
    <p>2222222</p>
    <p>2222222</p>
    <p>2222222</p>
    <p>2222222</p>
    <p>2222222</p>
    <p>2222222</p>
    <p>2222222</p>
    <p>2222222</p>
    <p style="background:yellow;" >2222222</p>
    <p>2222222</p>
    <p>2222222</p>
    <p style="background:yellow;" >2222222</p>
    <p>2222222</p>
    <p style="background:yellow;" >2222222</p>
  </div>
</template>

<script>
import Vue from 'vue';
import { PullRefresh, Search, Swipe, SwipeItem, Lazyload, Row, Col, Icon, List, Cell, Toast } from 'vant';
import { isSupportSticky } from '../../util/SysUtils.js';
import SavePosition from '../../comp/common/SavePosition.vue';
import Sticky from '../../comp/common/Sticky.vue';
import Top1 from '../../comp/common/Top.vue';
import GoodsList from '../../comp/goods/GoodsList.vue';
import { list as listOnlOnlinePromo } from '../../svc/onl/OnlOnlinePromo';

// Lazyload插件需要初始化
Vue.use(Lazyload);

export default {
    components: {
        Top1,
        SavePosition,
        Sticky,
        [GoodsList.name]: GoodsList,
        [PullRefresh.name]: PullRefresh,
        [Search.name]: Search,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Lazyload.name]: Lazyload,
        [Row.name]: Row,
        [Col.name]: Col,
        [Icon.name]: Icon,
        [List.name]: List,
        [Cell.name]: Cell,
    },
    data() {
        return {
            // isFixSticky: false, // 部分安卓手机使用sticky样式会坐标会偏上
            // stickyStyle: undefined, // 部分安卓手机使用sticky样式会坐标会偏上，修正样式
            isShowTop: true, // 是否显示回到顶部
            isDisabledPullRefresh: false, // 是否禁止下拉刷新(在滚动条位置>0时禁止，避免向上滚时与下拉刷新冲突)
            refreshing: false, // 刷新状态，刷新状态为true时刷新推荐列表
            scrollTop: 0,
            images: [
                // 'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg',
                // 'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
            ],
            fullBackBannerImg: 'img/FullBackBanner.png',
        };
    },
    mounted() {
        // if (isSupportSticky(this.$refs.grid)) {
        //     Toast('支持Sticky');
        // } else {
        //     Toast('不支持Sticky');
        // }
    },
    methods: {
        textMath() {
            console.log(this);
            console.log(this.scrollTop);
            this.$refs.savePosition.goTop();
        },
        /**
         * 加载推荐列表的方法
         */
        listOnlOnlinePromo,
        /**
         * 回到顶部
         */
        goTop() {
            this.$refs.savePosition.goTop();
        },
        /**
         * 处理页面的下拉事件(下拉刷新页面)
         */
        handleRefresh() {
            setTimeout(() => {
                this.refreshing = false;
            }, 500);
        },
        /**
         * 处理页面的滚动事件
         */
        handleScroll(e) {
            const scrollTop = e.target.scrollTop;
            // 与PullRefresh的下拉刷新不产生冲突
            this.isDisabledPullRefresh = scrollTop > 0;
            // 是否显示回到顶部
            this.isShowTop = true;
        },
        /**
         * 拼全返流程
         */
        fullBackProcess() {
            this.$router.push('./full-back-process');
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
    },
      activated() {
        console.log('---333--');
        let box = document.getElementById('text');
        box.scrollTop = box.scrollHeight
        console.log(box.scrollTop)
    },
};
</script>

<style lang="less">
html,
body {
    height: 100%;
}
.text {
    background: red;
    height: 50%;
    overflow: scroll;
}
</style>
