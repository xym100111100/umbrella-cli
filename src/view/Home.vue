<template>
  <div class="home-view">
    <!-- <div>
      <van-search placeholder="请输入搜索关键词" />
    </div> -->
    <van-pull-refresh
      v-model="refreshing"
      @refresh="handleRefresh"
    >
      <save-position>
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
        <van-row class="grid">
          <van-col span="6">
            <van-icon
              name="fullback"
              color="#00ff00"
              size="1.2rem"
            />
            <div class="label">拼全返</div>
          </van-col>
          <van-col span="6">
            <van-icon
              name="order"
              color="#6495ed"
              size="1.2rem"
            />
            <div class="label">订单</div>
          </van-col>
          <van-col span="6">
            <van-icon
              name="favoriteex"
              color="#ffc0cb"
              size="1.2rem"
            />
            <div class="label">收藏</div>
          </van-col>
          <van-col span="6">
            <van-icon
              name="wallet"
              color="red"
              size="1.2rem"
            />
            <div class="label">钱包</div>
          </van-col>
        </van-row>
        <!-- 拼全返免单流程图片 -->
        <img
          class="full-back-banner"
          :src="fullBackBannerImg"
        />
        <goods-list
          v-if="!refreshing"
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
import GoodsList from '../comp/goods/GoodsList.vue';
import { list as listOnlOnlinePromo } from '../svc/onl/OnlOnlinePromo';

// Lazyload插件需要初始化
Vue.use(Lazyload);

export default {
    components: {
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
         * 下拉刷新页面
         */
        handleRefresh() {
            setTimeout(() => {
                this.refreshing = false;
            }, 500);
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
                // position: absolute;
                // top: 0;
                // bottom: 0;
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

                // n宫格
                > .grid {
                    position: sticky;
                    left: 0;
                    top: 0;
                    z-index: 999;
                    border-bottom: 1px solid #ddd;
                    text-align: center;
                    padding: 0 0 5px;
                    background-color: white;
                    .label {
                        font-size: 0.4rem;
                    }
                }

                // 拼全返免单流程图片
                > .full-back-banner {
                    width: 100%;
                }
            }
        }
    }
}
</style>
