<template>
  <!-- 商品列表 -->
  <van-list
    v-model="loading"
    :class="{'column-1':columnCount==1,'column-2':columnCount==2}"
    :finished="finished"
    @load="handleLoad"
    finished-text="没有更多了"
  >
    <van-cell
      v-for="item in list"
      :key="item.id"
    >
      <goods-card
        :item="item"
        :columnCount="columnCount"
      />
    </van-cell>
  </van-list>
</template>
<script>
import Vue from 'vue';
import { List, Cell } from 'vant';
import GoodsCard from './GoodsCard.vue';

// 注册组件
Vue.component('goods-list');

export default {
    name: 'goods-list',
    components: {
        GoodsCard,
        [List.name]: List,
        [Cell.name]: Cell,
    },
    props: {
        load: Function, // 加载的方法
        loadParams: Object, // 加载时传入的参数
        columnCount: String, // 列数，目前只支持1和2
    },
    data() {
        return {
            list: [], // 商品的列表
            pageNum: 0, // 当前页码
            loading: false, // 是否正在加载商品列表
            finished: false, // 是否全部加载完成商品列表
        };
    },
    methods: {
        /**
         * 上翻列表加载新商品
         */
        handleLoad() {
            // 异步更新数据
            setTimeout(() => {
                const params = { ...this.loadParams, pageNum: this.pageNum + 1 };
                this.load({
                    params,
                    onSuccess: data => {
                        this.pageNum = data.pageNum;
                        this.list.push(...data.list);
                        // 如果是最后一页
                        if (data.pages == data.pageNum) {
                            // 数据全部加载完成
                            this.finished = true;
                        }
                    },
                    onFinish: () => {
                        // 结束加载状态
                        this.loading = false;
                    },
                });
            }, 500);
        },
    },
};
</script>
<style lang="less">
// 商品列表
.van-list {
    display: flex;
    flex-wrap: wrap;
    > * {
        // box-sizing: border-box;
        padding: 0 2px 4px;
        background-color: unset;
    }
    // 正在加载
    > .van-list__loading {
        width: 100%;
        text-align: right;
        padding-right: 1rem;
    }
    // 底线
    > .van-list__finished-text {
        width: 100%;
        text-align: right;
        padding-right: 1rem;
    }
    .van-cell:not(:last-child)::after {
        left: unset; // 去掉从第二行开始的一条线
    }
}

// 一列的样式
.column-1 {
    > * {
        width: 100%;
        // padding: 0 0.15rem 0.2rem;
        padding: 0.2rem 0.15rem 0;
    }
}
// 两列的样式
.column-2 {
    padding: 0 0.1rem;
    > * {
        width: 50%;
        // padding: 0 0.08rem 0.24rem;
        padding: 0.24rem 0.08rem 0;
    }
}
</style>
