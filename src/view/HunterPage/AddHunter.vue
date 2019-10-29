<template>
    <div class="add-hunter">
        <van-pull-refresh loading-text=" " v-model="isLoading" @refresh="onRefresh">
            <header class="add-hunter-header">
                <div class="header-title">
                    <p>权利越大,责任越大</p>
                    <p class="title-english">With great power comes great responsibility</p>
                    <div class="title-detail" >
                        <p>严禁虚假发布</p>
                        <p class="title-english" >False release is strictly prohibited</p>
                    </div>
                </div>
                <div class="header-detail"></div>
            </header>
            <div class="add-hunter-content"></div>
        </van-pull-refresh>
    </div>
</template>

<script>
import Vue from 'vue';
import { Search, List, PullRefresh, Card, Cell, Icon, Toast } from 'vant';

// Lazyload插件需要初始化

export default {
    components: {
        [Icon.name]: Icon,
        [Search.name]: Search,
        [List.name]: List,
        [Card.name]: Card,
        [Cell.name]: Cell,
        [PullRefresh.name]: PullRefresh,
    },
    data() {
        return {
            pageNum: 0, // 当前页码
            loading: false, // 是否正在加载商品列表
            finished: false, // 是否全部加载完成商品列表
            scroll: 0,
            list: [],
            count: 0,
            isLoading: false,
        };
    },
    filters: {},
    activated() {},
    methods: {
        onLoad() {
            // 异步更新数据
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    this.list.push(this.list.length + 1);
                }
                // 加载状态结束
                this.loading = false;

                // 数据全部加载完成
                if (this.list.length >= 40) {
                    this.finished = true;
                    console.log('sss');
                } else {
                    console.log('222');
                    this.finished = false;
                }
            }, 500);
        },
        onRefresh() {
            setTimeout(() => {
                this.isLoading = false;
                this.count++;
                this.list = [];
                this.onLoad();
            }, 500);
        },
    },
};
</script>

<style lang="less" scoped>
html,
body {
    height: 100%;
    background: white;
}
.add-hunter {
    overflow: scroll;
    .add-hunter-header {
        background-image: linear-gradient(to right, rgba(170, 234, 240, 0.514), #7bbfea);
        height: 3rem;
        .header-title {
            font-size: 0.45rem;
            color: white;
            padding: 0.1rem 0 0 0.2rem;
            p {
                padding: 0;
                margin: 0;
            }
            .title-english {
                font-size: 0.35rem;
                padding: 0.2rem 0 0 0.4rem;
            }
            .title-detail{
                padding: 0.2rem 0 0 2rem;
            }
        }
        .header-detail {
        }
    }
    .add-hunter-content {
    }
}
</style>
