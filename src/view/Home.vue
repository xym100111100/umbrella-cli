<template>
  <div class="home-view">
    <top
      v-if="isShowTop"
      @click="goTop"
    />
    <!-- <div>
      <van-search placeholder="请输入搜索关键词" />
    </div> -->
    <van-pull-refresh
      v-model="refreshing"
      :disabled="isDisabledPullRefresh"
      @refresh="handleRefresh"
    >
      <save-position
        ref="savePosition"
        @scroll="handelScroll"
      >
        <!-- <div>
        <van-swipe :autoplay="10000">
          <van-swipe-item
            v-for="(image, index) in images"
            :key="index"
          >
            <div class="swipe-image-wrap">
              <img
                class="swipe-image"
                v-lazy="image"
              />
            </div>
          </van-swipe-item>
        </van-swipe>
      </div> -->
        <!-- 拼全返免单流程图片 -->
        <img
          class="full-back-banner"
          :src="fullBackBannerImg"
        />
        <div class="grid">
          <van-row>
            <van-col span="6">
              <van-icon
                name="fullback"
                color="#00ff00"
              />
              <div class="label">拼全返</div>
            </van-col>
            <van-col span="6">
              <van-icon
                name="order"
                color="#6495ed"
              />
              <div class="label">订单</div>
            </van-col>
            <van-col span="6">
              <van-icon
                name="favoriteex"
                color="#ffc0cb"
              />
              <div class="label">收藏</div>
            </van-col>
            <van-col span="6">
              <van-icon
                name="wallet"
                color="red"
              />
              <div class="label">钱包</div>
            </van-col>
          </van-row>
        </div>
        <goods-list
          v-if="!refreshing"
          columnCount="1"
          :load="listOnlOnlinePromo"
          :load-params="{ promotionType: 1 }"
        />
      </save-position>
    </van-pull-refresh>
  </div>
</template>

<script>
import Vue from 'vue';
import { PullRefresh, Search, Swipe, SwipeItem, Lazyload, Row, Col, Icon, List, Cell } from 'vant';
import SavePosition from '../comp/common/SavePosition.vue';
import Top from '../comp/common/Top.vue';
import GoodsList from '../comp/goods/GoodsList.vue';
import { list as listOnlOnlinePromo } from '../svc/onl/OnlOnlinePromo';

// Lazyload插件需要初始化
Vue.use(Lazyload);

export default {
    components: {
        Top,
        SavePosition,
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
            isShowTop: false, // 是否显示回到顶部
            isDisabledPullRefresh: false, // 是否禁止下拉刷新(在滚动条位置>0时禁止，避免向上滚时与下拉刷新冲突)
            refreshing: false, // 刷新状态，刷新状态为true时刷新推荐列表
            images: [
                // 'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg',
                // 'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
            ],
            fullBackBannerImg: 'img/FullBackBanner.png',
        };
    },
    methods: {
        /**
         * 加载推荐列表的方法
         */
        listOnlOnlinePromo,
        /**
         * 回到顶部
         */
        goTop() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
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
        handelScroll(scrollTop) {
            // 与PullRefresh的下拉刷新不产生冲突
            this.isDisabledPullRefresh = scrollTop > 0;
            // 是否显示回到顶部
            this.isShowTop = scrollTop > 900;
        },
    },
};
</script>

<style lang="less">
.home-view {
    // // 搜索
    // .van-search {
    //     padding: 4px 8px;
    //     .van-cell {
    //         padding: 0 10px;
    //     }
    // }
    > .van-pull-refresh {
        height: 100%;
        > .van-pull-refresh__track {
            // overflow: auto;
            height: 100%;
            > .save-position {
                height: 100%;
                overflow: auto;
                // // 轮播
                // .swipe-image-wrap {
                //     height: 150px;
                //     .swipe-image {
                //         height: 100%;
                //         width: 100%;
                //     }
                // }

                // 拼全返免单流程图片
                > .full-back-banner {
                    width: 100%;
                    display: block; // 解决div里面img图片下方有空白的问题
                }

                // n宫格
                > .grid {
                    position: sticky;
                    left: 0;
                    top: -0.03rem; // 避免在chrome的iphone 6/7/8 plus中看到顶部还漏了一条缝
                    z-index: 999;
                    border-bottom: 1px solid #ddd;
                    text-align: center;
                    // margin-top: -0.3rem;
                    // margin-bottom: 0.24rem;
                    padding: 0 0 0.09rem;
                    background-color: white;
                    color: #666;
                    .van-icon {
                        font-size: 1.1rem;
                    }
                    .label {
                        font-size: 0.35rem;
                    }
                }
            }
        }
    }
}
</style>
