<template>
    <div @scroll="moving" id="store" class="store">
        <header class="store-header">
            <div class="header-title">Welcome to anytime anywhere</div>
            <div class="header-detail">
                <div class="detail-search">
                    <van-search background="none" shape="round" placeholder="请输入搜索关键词" />
                </div>
                <div @click="addHunter" class="detail-button">
                    <div>搜索</div>
                </div>
            </div>
        </header>
        <div class="store-content">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="handleLoad"
                :immediate-check="false"
            >
                <template v-for="item in list">
                    <div @click="getHonter" class="content-item" :key="item">
                        <div class="item-img">
                            <img
                                src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLGN4iahcwOsVTgqB9PibmdCQY7gnicgQOV5HBCTWiaHv5jDRJwtudlAlghZskmh02Z5oH846zWTwuOWA/132"
                            />
                        </div>
                        <div class="item-detail">
                            <div class="detail-name">太平洋小姐姐(A01)</div>
                            <div class="detail-rate">
                                <van-icon color="#F90" name="favorite" />
                                <van-icon color="#F90" name="favorite" />
                                <van-icon color="#F90" name="favorite" />
                                <van-icon color="#F90" name="favorite" />
                                <van-icon color="#F90" name="favorite" />
                                <span class="rate-number">5.0分</span>
                            </div>
                            <div class="detail-class">
                                <span>螺蛳粉</span>
                                <span>螺蛳粉</span>
                                <span>螺蛳粉</span>
                                <span>螺蛳粉</span>
                            </div>
                        </div>
                    </div>
                </template>
            </van-list>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Search, List, Card, Rate, Cell, Icon, Toast } from 'vant';
import { login } from '../../svc/suc/User';
// Lazyload插件需要初始化

export default {
    components: {
        [Icon.name]: Icon,
        [Search.name]: Search,
        [List.name]: List,
        [Card.name]: Card,
        [Cell.name]: Cell,
        [Rate.name]: Rate,
    },
    data() {
        return {
            pageNum: 0, // 当前页码
            loading: false, // 是否正在加载商品列表
            finished: false, // 是否全部加载完成商品列表
            scroll: 0,
            list: [],
            value: 3,
        };
    },
    filters: {},
    activated() {
        let openid = this.$route.query.openid;
        document.getElementById('store').scrollTop = this.scroll;
        if (openid && this.$store.getters.user.id === undefined) {
            this.userLogin();
        }
        if (this.$route.params.load) {
            this.handleLoad();
        }
    },
    mounted() {
        let openid = this.$route.query.openid;
        if (!openid) {
            this.list = [];
            this.pageNum = 0;
            this.handleLoad();
        }
    },
    methods: {
        userLogin() {
            let openid = this.$route.query.openid;
            let headimgurl = this.$route.query.headimgurl;
            let nickname = this.$route.query.nickname;
            const data = {
                wxOpenid: openid,
                wxFacePath: headimgurl,
                wxName: nickname,
            };
            login({
                data,
                onSuccess: data => {
                    this.$store.dispatch('setUser', data.sucUserMo);
                    if (data.newUser) {
                        this.$router.push({ name: 'school' });
                    } else {
                        this.handleLoad();
                    }
                },
                onFail: (code, msg) => {
                    //  console.log('请求失败');
                    // done();
                },
            });
        },
        moving(e) {
            this.scroll = e.target.scrollTop;
        },
        getHonter() {
            this.$router.push({ name: 'get-hunter', params: { load: true } });
        },
        addHunter() {
            this.$router.push({ name: 'add-hunter', params: { load: true } });
        },
        handleLoad() {
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
                } else {
                    this.finished = false;
                }
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
.store {
    overflow: scroll;
    .store-header {
        background-image: linear-gradient(to right, rgba(170, 234, 240, 0.514), #7bbfea);
        height: 3rem;
        .header-title {
            font-size: 0.5rem;
            text-align: center;
            color: white;
            padding-top: 0.2rem;
        }
        .header-detail {
            display: flex;
            margin-top: 0.3rem;
            .detail-search {
                margin-left: 1rem;
                flex-grow: 2;
                font-size: 0.4rem;
            }
            .detail-button {
                width: 2.3rem;
                div {
                    width: 1rem;
                    text-align: center;
                    line-height: 1rem;
                    margin-top: 0.2rem;
                    font-size: 0.4rem;
                    color: white;
                }
            }
        }
    }
    .store-content {
        .content-item {
            display: flex;
            background: white;
            margin: 0.3rem 0 0 3%;
            width: 90%;
            padding: 0.2rem;
            .item-img {
                img {
                    height: 2.2rem;
                    width: 2.2rem;
                    border-radius: 0.1rem;
                }
            }
            .item-detail {
                padding-left: 0.2rem;
                font-size: 0.47rem;
                p {
                    padding: 0;
                    margin: 0;
                }

                .detail-rate {
                    padding-top: 0.1rem;
                    font-size: 0.38rem;
                    .rate-number {
                        color: #b6c4c7;
                        padding-left: 0.1rem;
                    }
                }
                .detail-class {
                    padding-top: 0.1rem;
                    color: #b6c4c7;
                    font-size: 0.35rem;
                    overflow: hidden;
                    height: 0.5rem;
                    span{
                        padding-left: 0.1rem;
                    }
                }
            }
        }
    }
}
</style>
