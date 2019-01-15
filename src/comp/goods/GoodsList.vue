<template>
  <!-- 商品列表 -->
  <van-list
    v-model="loading"
    :finished="finished"
    @load="handleLoad"
    finished-text="没有更多了"
  >
    <van-cell
      v-for="item in list"
      :key="item.id"
    >
      <goods-card :item="item" />
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
        [GoodsCard.name]: GoodsCard,
        [List.name]: List,
        [Cell.name]: Cell,
    },
    props: {
        load: Function, // 加载的方法
        loadParams: Object, // 加载时传入的参数
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
    background-color: #eee;
    display: flex;
    flex-wrap: wrap;
    padding: 2px;
    > * {
        box-sizing: border-box;
        width: 50%;
        padding: 0 2px 4px;
        background-color: #eee;
    }
    // 正在加载
    > .van-list__loading {
        width: 100%;
    }
    // 底线
    > .van-list__finished-text {
        width: 100%;
    }
}
</style>
