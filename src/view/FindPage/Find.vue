<template>
    <div class="find">
        <header class="find-header">
            <div>
                <van-search input-align="center" background="#fafafa" placeholder="搜索" />
            </div>
        </header>
        <div class="find-content">
            <div class="content-left">
                <ol>
                    <template v-for=" item in goodsClass">
                        <li
                            :class="{focus2:item.id === currentGoodsClass}"
                            @click="chooseClass(item.id)"
                            :key="item.id"
                            :id="item.id"
                        >
                            <span>{{item.name}}</span>
                        </li>
                    </template>
                </ol>
            </div>
            <div id="content-right" @scroll="moving" class="content-right">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="handleLoad"
                >
                    <div v-for="item in goods" :key="item.id" :title="item.desc">
                        <div @click="()=>goGoodsDetail(item.id)">
                            <van-card
                                :title="item.title|filtersTitle"
                                :thumb="item.thumb"
                                :price="item.price"
                            >
                                <div slot="tags" class="right-tags">
                                    <p>
                                        <span>即时出售</span>
                                        <span>已用5年</span>
                                    </p>
                                    <p>
                                        <span>不可议价</span>
                                        <span>原价:${{item.price}}</span>
                                    </p>
                                </div>
                                <div @click.stop="addToLove" class="right-footer" slot="footer">
                                    <van-icon name="xihuan1" color="#FF5706" size=".9rem" />
                                </div>
                            </van-card>
                        </div>
                    </div>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Search, List, Card, Icon, Toast } from 'vant';
import { getGoodsData } from '../../svc/onl/OnlOnlinePromo';
import { list as goodsList } from '../../svc/Cart';
// Lazyload插件需要初始化

export default {
    components: {
        [Icon.name]: Icon,
        [Search.name]: Search,
        [List.name]: List,
        [Card.name]: Card,
    },
    data() {
        return {
            goods: [],
            pageNum: 0, // 当前页码
            loading: false, // 是否正在加载商品列表
            finished: false, // 是否全部加载完成商品列表
            scroll: 0,
            currentGoodsClass: 1,
            goodsClass: [
                {
                    id: 1,
                    name: '手机',
                },
                {
                    id: 2,
                    name: '体育',
                },
                {
                    id: 3,
                    name: '运动',
                },
                {
                    id: 4,
                    name: '凳子',
                },
                {
                    id: 5,
                    name: '运动',
                },

                {
                    id: 13,
                    name: '运动',
                },
                {
                    id: 14,
                    name: '最后',
                },
            ],
        };
    },
    filters: {
        filtersTitle(data) {
            if (data.length > 11) {
                return data.substr(1, 10) + '...';
            }
            return data;
        },
    },
    activated() {
        document.getElementById('content-right').scrollTop = this.scroll;
    },
    methods: {
        goGoodsDetail(id) {
            this.$router.push({ name: 'goods-detail' });
        },
        moving(e) {
            this.scroll = e.target.scrollTop;
        },
        addToLove() {
            this.$store.getters.active.loveCount = this.$store.getters.active.loveCount + 1;
            //   this.$router.push({ name: 'corridor' });
            Toast({
                message: '自定义图标',
                icon: 'https://img.yzcdn.cn/vant/logo.png',
            });
        },
        // 获取商品数据
        handleLoad() {
            const params = { pageNum: this.pageNum + 1 };
            goodsList({
                params,
                onSuccess: data => {
                    this.pageNum = data.pageNum;
                    this.goods.push(...data.list);
                    // 如果是最后一页
                    if (data.pages === data.pageNum) {
                        // 数据全部加载完成
                        this.finished = true;
                    }
                },
                onFinish: () => {
                    // 结束加载状态
                    this.loading = false;
                },
            });
        },
        chooseClass(index) {
            this.currentGoodsClass = index;
            this.pageNum = 0;
            this.goods = [];
            this.handleLoad();
        },
    },
    beforeCreate() {},
    beforeMounted() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
};
</script>

<style lang="less" scoped>
html,
body {
    height: 100%;
    background: white;
    font-family: PingFang-SC-Regular, Helvetica Neue, Helvetica, microsoft yahei, sans-serif;
}
.find {
    height: 100%;
    background: white;
    &-header {
        position: fixed;
        width: 100%;
        height: 1.3rem;
        z-index: 99;
        background: rgba(123, 191, 234, 0.3);
    }
    &-content {
        height: 100%;
        display: flex;
        position: relative;
        .content-left {
            position: fixed;
            width: 20%;
            height: 100%;
            overflow: scroll;
            top: 1.3rem;
            padding: 0;
            margin: 0;
            background: rgba(60, 47, 15, 0.041);

            ol {
                padding: 0;
                margin: 0;
                padding-bottom: 3rem;
                li {
                    margin: 0;
                    padding: 0;
                    height: 1.4rem;
                    span {
                        padding: 0 0 0 0.5rem;
                        margin: 0 0 0 0.1rem;
                        font-size: 0.45rem;
                        width: 100%;
                        color: #907777;
                        border-left: solid 2px rgba(60, 47, 15, 0.041);
                    }
                }
                .focus2 {
                    background: #fafafa;
                    span {
                        border-left: solid 2px #7bbfea;
                        color: #7bbfea;
                    }
                }
            }
        }
        .content-right {
            position: fixed;
            margin-left: 2rem;
            overflow: scroll;
            height: 100%;
            top: 1.3rem;
            width: 80%;
            .right-tags {
                padding-top: 0.1rem;
                p {
                    padding: 0;
                    margin: 0;
                    span {
                        padding: 0 0.1rem;
                        margin-right: 0.15rem;
                        // background: rgba(123, 191, 234, 0.2);
                        background: rgba(60, 47, 15, 0.1);
                        color: #7bbfea;
                    }
                }
            }
            .right-footer {
                margin-top: -1rem;
            }
        }
    }
}
.van-search {
    height: 1.3rem;
    width: 98%;
    border-radius: 0.6rem;
    background: #7bbfea;
    margin-left: 1%;
}

.van-card {
    background-color: #fafafa;
    margin-bottom: 0.2rem;
}
.van-card__price {
    color: #7bbfea;
    padding: 0.2rem 0 0 0.2rem;
}

.find-content {
    height: 100%;
    overflow: scroll;
}
</style>
