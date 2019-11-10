<template>
    <div @scroll="moving" id="hunter" class="hunter">
        <van-pull-refresh loading-text=" " v-model="isLoading" @refresh="onRefresh">
            <header class="hunter-header">
                <div class="header-title">Welcome to anytime anywhere</div>
                <div class="header-detail">
                    <div class="detail-remarks">
                        <p class="remarks-hunter">
                            <van-icon size="0.5rem" name="928shouxi" />
                            <span>赏金猎人</span>
                            <span>活动中 2</span>
                            <span>等待中 0</span>
                        </p>
                    </div>
                    <div @click="addHunter" class="detail-add">
                        <div>+</div>
                    </div>
                </div>
            </header>
            <div class="hunter-content">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="handleLoad"
                    :immediate-check="false"
                >
                    <template v-for="item in list">
                        <div @click="getHonter" class="content-item" :key="item">
                            <div class="item-top">
                                <div class="top-title">
                                    <div class="title-icon">
                                        <span v-if="item===1">
                                            <van-icon
                                                size="0.6rem"
                                                color="#7bbfea"
                                                name="biaoqian2"
                                            />
                                        </span>
                                        <span v-if=" item ===2  ">
                                            <van-icon
                                                size="0.6rem"
                                                color="#a09dd4"
                                                name="biaoqian2"
                                            />
                                        </span>
                                        <span v-if=" item ===3  ">
                                            <van-icon
                                                size="0.6rem"
                                                color="#a09dd4"
                                                name="biaoqian2"
                                            />
                                        </span>
                                        <span v-if="item !==1 && item !==2 &&  item !==3   ">
                                            <van-icon
                                                size="0.6rem"
                                                color="#7bbfea"
                                                name="biaoqian2"
                                            />
                                        </span>
                                    </div>
                                    <div class="title-name">
                                        <span>送餐</span>
                                        <span></span>
                                    </div>
                                </div>
                                <div class="top-time">
                                    <div class="time-number">12:15:33</div>
                                </div>
                            </div>
                            <div class="item-bottom">
                                <div class="bottom-detail">去时代广场拿一份饭到男生宿舍1#A303宿舍,放点辣椒不要,要一份辣子鸡.....</div>
                                <div class="bottom-money">
                                    <div>
                                        <van-icon size="0.5rem" name="jinbi1" />
                                        <span class="money-number">5</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </van-list>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
import Vue from 'vue';
import { Search, List, PullRefresh, Card, Cell, Icon, Toast } from 'vant';
import { login } from '../../svc/suc/User';
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
            isLoading: false,
        };
    },
    filters: {},
    activated() {
        let openid = this.$route.query.openid;
        document.getElementById('hunter').scrollTop = this.scroll;
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
        onRefresh() {
            setTimeout(() => {
                this.isLoading = false;
                this.list = [];
                this.handleLoad();
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
.hunter {
    overflow: scroll;
     background: #f2f2f2;
    .hunter-header {
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
            .detail-remarks {
                padding-left: 0.2rem;
                flex-grow: 2;
                color: #f07874;
                .remarks-english {
                    font-size: 0.3rem;
                    margin-left: 0.3rem;
                    color: #f07874;
                }
                p {
                    padding: 0;
                    margin: 0;
                    font-size: 0.4rem;
                }
                .remarks-hunter {
                    color: white;
                    padding: 0.3rem 0 0 1rem;
                    span {
                        padding-right: 0.2rem;
                    }
                    span:nth-child(3) {
                        color: #dae5e7;
                    }
                }
            }
            .detail-add {
                width: 2rem;
                div {
                    width: 1rem;
                    height: 1rem;
                    background: white;
                    border-radius: 1rem;
                    text-align: center;
                    line-height: 1rem;
                    margin: 0.2rem 0 0 0.2rem;
                    font-size: 0.6rem;
                    color: #b6c4c7;
                    box-shadow: -2px 0 3px -1px rgb(77, 82, 77), 0 -2px 3px -1px rgb(77, 82, 77),
                        0 2px 3px -1px rgb(176, 189, 176);
                }
            }
        }
    }
    .hunter-content {
        background: #f2f2f2;
        .content-item {
            height: 3rem;
            margin: 0.3rem 0 0 3%;
            background: white;
            width: 94%;
            border-radius: 0.2rem;
            overflow: hidden;
            .item-top {
                display: flex;
                border-bottom: #cad8db solid 0.01rem;
                width: 96%;
                margin-left: 2%;
                height: 1.2rem;
                .top-title {
                    font-size: 0.5rem;
                    flex-grow: 2;
                    height: 1.2rem;
                    display: flex;
                    .title-icon {
                        margin-top: -0.1rem;
                    }
                    .title-name {
                        margin: 0.2rem 0 0 0.5rem;
                    }
                }
                .top-time {
                    font-size: 0.35rem;
                    width: 20%;
                    color: #b6c4c7;
                    height: 1.2rem;
                    line-height: 1.2rem;
                    display: flex;
                }
            }
            .item-bottom {
                font-size: 0.37rem;
                color: #b6c4c7;
                overflow: hidden;
                padding-top: 0.3rem;
                display: flex;
                .bottom-detail {
                    width: 70%;
                    margin-left: 13%;
                }
                .bottom-money {
                    width: 17%;
                    display: flex;
                    align-items: flex-end;
                    color: rgba(255, 204, 0, 0.938);
                    .money-number {
                        font-size: 0.4rem;
                    }
                }
            }
        }
    }
}
</style>
