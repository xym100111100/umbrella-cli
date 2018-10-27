<template>
    <div class="goods-list-wrap">
        <!-- 商品列表 -->
        <van-list v-model="loading" :finished="finished" @load="handleLoad">
            <div v-for="item in list" :key="item.id">
                <goods-card :item="item" />
            </div>
        </van-list>
        <!-- 底线 -->
        <div class="underline" v-if="finished">~~~~~~~~~&nbsp;&nbsp;&nbsp;我是有底线的&nbsp;&nbsp;&nbsp;~~~~~~~~~</div>
    </div>
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
.goods-list-wrap {
    // 商品列表
    > .van-list {
        background-color: #eee;
        display: flex;
        flex-wrap: wrap;
        padding: 0 2px 2px;
        > * {
            box-sizing: border-box;
            width: 50%;
            // border-top: 0;
            // border-left: 2px solid #eee;
            // border-right: 2px solid #eee;
            // border-bottom: 2px solid #eee;
            padding: 0 2px 4px;
        }
        // 正在加载
        .van-list__loading {
            width: 100%;
        }
    }
    // 底线
    > .underline {
        // background-color: white;
        color: #666;
        font-size: 0.6em;
        text-align: center;
        padding: 10px;
    }
}
</style>
