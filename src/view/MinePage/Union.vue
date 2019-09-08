<template>
    <div class="union">
        <div class="union-title">
            <van-nav-bar title="校企联盟" left-arrow @click-left="$router.go(-1)" />
        </div>
        <div id="union-content" class="union-content" @scroll="moving">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="handleLoad"
            >
                <template v-for="item in unionData">
                    <div
                        class="content-school"
                        @click="driverSchool(item.driverSchoolName)"
                        :key="item.id"
                    >
                        <van-card :thumb="item.thumb">
                            <div class="school-card" slot="tags">
                                <p>{{item.driverSchoolName}}</p>
                                <p>综合评分</p>
                                <van-rate
                                    readonly
                                    v-model="item.scoreValue"
                                    void-icon="star"
                                    :count="7"
                                />
                            </div>
                        </van-card>
                    </div>
                </template>
            </van-list>
        </div>
    </div>
</template>

<script>
import { NavBar, Rate, List, Cell, Card } from 'vant';
import { list as driverSchoolList } from '../../svc/DriverSchool';

export default {
    components: {
        [NavBar.name]: NavBar,
        [List.name]: List,
        [Rate.name]: Rate,
        [Cell.name]: Cell,
        [Card.name]: Card,
    },
    data() {
        return {
            unionData: [],
            loading: false,
            finished: false,
            scroll: 0,
            pageNum: 0, // 当前页码
        };
    },
    methods: {
        // 获取驾校数据
        handleLoad() {
            const params = { pageNum: this.pageNum + 1 };
            driverSchoolList({
                params,
                onSuccess: data => {
                    this.pageNum = data.pageNum;
                    this.unionData.push(...data.list);
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
        moving(e) {
            this.scroll = e.target.scrollTop;
        },
        driverSchool(driverSchoolName) {
            this.$router.push({ name: 'driver-school', params: { name: driverSchoolName } });
        },
        onLoad() {
            // 异步更新数据
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    this.unionData.push(this.unionData.length + 1);
                }
                // 加载状态结束
                this.loading = false;

                // 数据全部加载完成
                if (this.unionData.length >= 40) {
                    this.finished = true;
                }
            }, 500);
        },
    },
    activated() {
        document.getElementById('union-content').scrollTop = this.scroll;
    },
};
</script>
<style lang="less" scoped>
body,
html {
    height: 100%;
    background: rgba(60, 47, 15, 0.0001);
}
.union {
    height: 100vh;
    overflow: scroll;
    .union-content {
        height: 99%;
        overflow: scroll;
        .content-school {
            margin: 0.5rem 0.3rem 0.1rem;
            border-radius: 0.2rem;
            overflow: hidden;
            .school-card {
                height: 100%;
                padding-left: 0.2rem;
                .van-card__title {
                    font-size: 0.5rem;
                }
                p {
                    padding: 0;
                    margin: 0;
                    padding-left: 0.15rem;
                    font-size: 0.4rem;
                }
                p:nth-child(2) {
                    color: #7d7e80;
                    padding-bottom: 0.2rem;
                }
            }
        }
    }
}
</style>