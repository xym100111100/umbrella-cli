<template>
    <van-list v-model="loading" :finished="finished" @load="handleLoad">
        <div v-for="item in list" :key="item">
            <goods-card />
        </div>
    </van-list>
</template>
<script>
import Vue from 'vue';
import { List } from 'vant';
import GoodsCard from './GoodsCard.vue';

// 注册组件
Vue.component('goods-list');

export default {
    name: 'goods-list',
    components: {
        [GoodsCard.name]: GoodsCard,
        [List.name]: List,
    },
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
        };
    },
    methods: {
        handleLoad() {
            // 异步更新数据
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    this.list.push(this.list.length + 1);
                }
                // 加载状态结束
                this.loading = false;

                // 数据全部加载完成
                if (this.list.length >= 400) {
                    this.finished = true;
                }
            }, 500);
        },
    },
};
</script>
<style lang="less">
// 画廊整体
.van-list {
    // 定义列数
    column-count: 2;
    // 列间距
    column-gap: 1px;
    background-color: #ccc;
}
</style>
