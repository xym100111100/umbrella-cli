<template>
    <div class="driver-school">
        <div class="school-title">
            <van-nav-bar
                :title="name+'简介'"
                right-text="报名"
                left-arrow
                @click-left="$router.go(-1)"
            />
        </div>
        <div id="school-content" class="school-content">
            <div class="content-school-info">驾校介绍</div>
            <div class="content-school-comment">学员评价</div>
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="handleLoad"
            >
                <template v-for="item in commentList">
                    <div @click="handleLoad" class="school-comment" :key="item.id">
                        <div class="comment-img">
                            <img :src="item.thumb" />
                        </div>
                        <div class="comment-info">
                            <div class="info-rate">
                                <van-rate
                                    readonly
                                    v-model="item.scoreValue"
                                    void-icon="star"
                                    :count="7"
                                />
                            </div>
                            <span>{{item.text}}</span>
                        </div>
                    </div>
                </template>
            </van-list>
        </div>
    </div>
</template>
<script>
import { NavBar, List, Cell, Rate } from 'vant';
import { getComment } from '../../svc/DriverSchool';

export default {
    components: {
        [NavBar.name]: NavBar,
        [List.name]: List,
        [Cell.name]: Cell,
        [Rate.name]: Rate,
    },
    data() {
        return {
            name: this.$route.params.name,
            commentList: [],
            loading: false,
            finished: false,
        };
    },
    methods: {
        // 获取驾校数据
        handleLoad() {
            const params = { pageNum: this.pageNum + 1 };
            getComment({
                params,
                onSuccess: data => {
                    this.pageNum = data.pageNum;
                    this.commentList.push(...data.list);
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
                }
            }, 500);
        },
    },
    activated() {
        this.name = this.$route.params.name;
    },
};
</script>
<style lang="less" scoped>
body,
html {
    height: 100%;
    background: rgba(60, 47, 15, 0.0001);
}
.driver-school {
    height: 100vh;
    overflow: scroll;
    .school-content {
        height: 93%;
        overflow: scroll;
        padding: 0 0.3rem;
        .content-school-info {
            height: 10rem;
            background: red;
        }
        .content-school-comment {
            height: 1rem;
            line-height: 1rem;
            font-size: 0.4rem;
        }
        .school-comment {
            display: flex;
            padding-bottom: 0.2rem;
            .comment-img {
                img {
                    height: 1.3rem;
                    width: 1.3rem;
                    padding: 0;
                    margin: 0;
                    border-radius: 0.2rem;
                }
                margin-right: 0.3rem;
            }
            .comment-info {
                font-size: 0.35rem;
                .info-rate {
                }
            }
        }
    }
}

.van-nav-bar {
    &__right {
        bottom: -0.1rem;
        .van-nav-bar__text {
            font-size: 0.4rem;
            color: #499df1;
        }
    }
}
</style>