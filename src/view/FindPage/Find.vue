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
                    <li>
                        <span>鞋子</span>
                    </li>
                    <li>
                        <span>电脑</span>
                    </li>
                    <li>
                        <span>体育</span>
                    </li>
                    <li>
                        <span>文具</span>
                    </li>
                    <li>
                        <span>衣服</span>
                    </li>
                    <li>
                        <span>凳子</span>
                    </li>
                    <li>
                        <span>左边</span>
                    </li>
                    <li>
                        <span>桌球</span>
                    </li>
                    <li>
                        <span>耳机</span>
                    </li>
                    <li>
                        <span>手机</span>
                    </li>
                    <li>
                        <span>母婴</span>
                    </li>
                    <li>
                        <span>玩具</span>
                    </li>
                    <li>
                        <span>书本</span>
                    </li>
                    <li>
                        <span>篮球</span>
                    </li>
                    <li>
                        <span>火箭</span>
                    </li>
                    <li>
                        <span>航母</span>
                    </li>
                    <li>
                        <span>飞机</span>
                    </li>
                    <li>
                        <span>坦克</span>
                    </li>
                    <li>
                        <span>大炮</span>
                    </li>
                    <li>
                        <span>步枪</span>
                    </li>
                    <li>
                        <span>手枪</span>
                    </li>
                    <li>
                        <span>最后</span>
                    </li>
                </ol>
            </div>
            <div class="content-right">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="handleLoad"
                >
                    <div v-for="item in goods" :key="item.id" :title="item.desc">
                        <div>
                            <van-card
                                :title="item.title"
                                thumb-link="#/goods-detail"
                                :thumb="item.thumb"
                                :price="item.price"
                            >
                                <div slot="tags" class="right-tags">
                                    <span>即刻出售</span>
                                    <span>不可议价</span>
                                </div>
                                <div @click="addToLove" class="right-footer" slot="footer">
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
        };
    },
    methods: {
        addToLove() {
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
            //去掉所有li的背景颜色和其子节点去掉span的左边框样式。
            let contentItemlChildren = document.getElementById('link-item').children;
            for (let i = 0; i < contentItemlChildren.length; i++) {
                contentItemlChildren[i].style.background = 'none';
                contentItemlChildren[i].children[0].style.border = 'none';
                contentItemlChildren[i].children[0].style.color = '#666';
            }
            //将选中的li的设置背景颜色和其子节点span的左边框设置样式。
            let chooseContentItemlChildren = document.getElementById('link-item').children[index];
            chooseContentItemlChildren.style.background = 'white';
            chooseContentItemlChildren.children[0].style.borderLeft = 'solid 2px #7bbfea';
            chooseContentItemlChildren.children[0].style.color = '#7bbfea';
        },
    },
    beforeCreate() {
        console.log('-----1------beforeCreate1');
        console.log('-----1------beforeCreate1');
    },
    beforeMounted() {
        console.log('-----2------beforeCreate1');
        console.log('-----2------beforeCreate1');
    },
    beforeUpdate() {
        console.log('-----3------beforeUpdate1');

        console.log('-----3------beforeCreate1');
    },
    updated() {
        console.log('-----4------updated1');
        console.log('-----4------beforeCreate1');
    },
    beforeDestroy() {
        console.log('-----5------beforeDestroy1');
        console.log('-----5------beforeCreate1');
    },
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
            ol {
                padding: 0;
                margin: 0;
                padding-bottom: 3rem;
                background: rgba(60, 47, 15, 0.041);
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
                    }
                }
                li:nth-child(1) {
                    background: white;
                    span:nth-child(1) {
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
                padding: 0.3rem 0 0.1rem 0;
                span {
                    padding: 0 0.1rem;
                    margin-right: 0.15rem;
                    background: rgba(123, 191, 234, 0.2);
                    color: #7bbfea;
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
    background-color: white;
}
.van-card__price {
    color: #7bbfea;
}

.find-content {
    height: 100%;
    overflow: scroll;
}
</style>
