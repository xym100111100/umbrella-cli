<template>
    <div class="driver-school">
        <div class="school-title">
            <van-nav-bar
                :title="name+'简介'"
                right-text="报名"
                left-arrow
                @click-left="$router.go(-1)"
                @click-right="schoolRegister"
            />
        </div>
        <div id="school-content" class="school-content">
            <div class="content-school-info">
                <div class="info-head">
                    <div class="head-logo">
                        <img
                            src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoM1LKFPNSBQA4iaeuHQuibYIicA/132"
                        />
                    </div>
                    <div class="head-detail">{{idriverSchoolData.name}}</div>
                </div>
                <div class="head-content">
                    <p>
                        <span>
                            <van-icon color="#7bbfea" name="qianjin" />
                        </span>
                        <span>报名:</span>
                        <span>{{idriverSchoolData.ordinaryClass}}</span>
                    </p>
                    <p>
                        <span>
                            <van-icon color="#7bbfea" name="qianjin" />
                        </span>
                        <span>保险班:</span>
                        <span>{{idriverSchoolData.insureClass}}</span>
                    </p>
                    <p>
                        <span>
                            <van-icon color="#7bbfea" name="qianjin" />
                        </span>
                        <span>全包班:</span>
                        <span>{{idriverSchoolData.allClass}}</span>
                    </p>
                    <p>
                        <span>
                            <van-icon color="#7bbfea" name="qianjin" />
                        </span>
                        <span>训练场数量与面积:</span>
                        <span>{{idriverSchoolData.trainingCount}}个{{idriverSchoolData.trainingMeasure}}平方</span>
                    </p>
                    <p>
                        <span>
                            <van-icon color="#7bbfea" name="qianjin" />
                        </span>
                        <span>年培训学员:</span>
                        <span>{{idriverSchoolData.studentForYear}}</span>
                    </p>
                    <p>
                        <span>
                            <van-icon color="#7bbfea" name="qianjin" />
                        </span>
                        <span>训练是否接送:</span>
                        <span>{{idriverSchoolData.isDeliver}}</span>
                    </p>
                    <p>
                        <span>
                            <van-icon color="#7bbfea" name="qianjin" />
                        </span>
                        <span>通过率:</span>
                        <span>{{idriverSchoolData.passingRate}}%</span>
                    </p>
                </div>
            </div>
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
import { NavBar, List, Icon, Cell, Rate } from 'vant';
import { getComment } from '../../svc/suc/DriverSchool';
import { getById } from '../../svc/suc/DriverSchool';

export default {
    components: {
        [NavBar.name]: NavBar,
        [List.name]: List,
        [Cell.name]: Cell,
        [Rate.name]: Rate,
        [Icon.name]: Icon,
    },
    data() {
        return {
            name: '',
            commentList: [],
            loading: false,
            finished: false,
            idriverSchoolData: {},
        };
    },
    methods: {
        schoolRegister() {
            this.$router.push({ name: 'school-register' });
        },
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
        getDriverSchoolData() {
            const params = { id: this.$route.params.id };
            getById({
                params,
                onSuccess: data => {
                    console.log(data);
                    this.idriverSchoolData = data;
                },
            });
        },
    },
    activated() {
        if (this.$route.params.name != undefined) {
            this.name = this.$route.params.name;
            this.getDriverSchoolData();
        }
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
            background: #fafafa;
            border-radius: 0.2rem;
            overflow: hidden;
            margin-top: 0.2rem;
            .info-head {
                display: flex;
                background: rgba(123, 191, 234, 0.2);
                border-radius: 0.2rem;
                overflow: hidden;
                .head-logo {
                    background: red;
                    width: 3rem;
                    height: 3rem;
                    border-radius: 0.2rem;
                    overflow: hidden;
                    img {
                        height: 3rem;
                        width: 3rem;
                    }
                }
                .head-detail {
                    font-size: 0.4rem;
                    padding: 0.2rem 0 0 0.3rem;
                }
            }
            .head-content {
                p {
                    padding: 0;
                    margin: 0;
                    font-size: 0.4rem;
                    height: 0.8rem;
                    line-height: 0.8rem;
                    color: #7d7e80;
                    span:first-child {
                        font-size: 0.6rem;
                    }
                }
            }
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