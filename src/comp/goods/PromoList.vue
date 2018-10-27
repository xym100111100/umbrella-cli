<template>
    <div class="promo-list-wrap">
        <!-- 商品列表 -->
        <van-list v-model="promoLoading" :finished="promoFinished" @load="handleLoad">
            <div v-for="item in promoList" :key="item.id">
                <goods-card />
            </div>
        </van-list>
        <!-- 底线 -->
        <div class="underline" v-if="promoFinished">~~~~~~~~~&nbsp;&nbsp;&nbsp;我是有底线的&nbsp;&nbsp;&nbsp;~~~~~~~~~</div>
    </div>
</template>
<script>
import Vue from 'vue';
import { List } from 'vant';
import GoodsCard from './GoodsCard.vue';
import { list as listOnlOnlinePromo } from '../../svc/onl/OnlOnlinePromo';

// 注册组件
Vue.component('promo-list');

export default {
    name: 'promo-list',
    components: {
        [GoodsCard.name]: GoodsCard,
        [List.name]: List,
    },
    data() {
        return {
            pageNum: 0, // 当前页码
            // refreshing: false,
            promoList: [], // 推荐的列表
            promoLoading: false, // 是否正在加载推荐列表
            promoFinished: false, // 是否全部加载推荐列表
        };
    },
    methods: {
        handleLoad() {
            // 异步更新数据
            setTimeout(() => {
                listOnlOnlinePromo({
                    params: { promotionType: 1, pageNum: this.pageNum + 1 },
                    onSuccess: data => {
                        this.pageNum = data.pageNum;
                        this.promoList.push(...data.list);
                        console.log(this.promoList);
                        // 如果是最后一页
                        if (data.pages == data.pageNum) {
                            // 数据全部加载完成
                            this.promoFinished = true;
                        }
                    },
                    onFinish: () => {
                        // 结束加载状态
                        this.promoLoading = false;
                    },
                });
            }, 500);
        },
    },
};
</script>
<style lang="less">
.promo-list-wrap {
    // 推荐列表
    > .van-list {
        background-color: #eee;
        display: flex;
        flex-wrap: wrap;
        > * {
            box-sizing: border-box;
            width: 50%;
            border-top: 0;
            border-left: 1px solid #eee;
            border-right: 1px solid #eee;
            border-bottom: 1px solid #eee;
        }
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
