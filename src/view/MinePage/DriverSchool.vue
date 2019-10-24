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
                        <img :src="driverSchoolData.driverImg" />
                    </div>
                    <div
                        class="head-detail"
                    >成立于{{driverSchoolData.foundTime}},{{driverSchoolData.driverRemark}}</div>
                </div>
                <div class="head-content">
                    <p>
                        <span>
                            <van-icon color="#7bbfea" name="qianjin" />
                        </span>
                        <span>报名:</span>
                        <span>{{driverSchoolData.signupPrice - 700}} - {{driverSchoolData.signupPrice}}</span>
                    </p>
                    <p>
                        <span>
                            <van-icon color="#7bbfea" name="qianjin" />
                        </span>
                        <span>全包:</span>
                        <span>{{driverSchoolData.allPrice - 700}}- {{driverSchoolData.allPrice}}</span>
                    </p>
                    <!-- <p>
                        <span>
                            <van-icon color="#7bbfea" name="qianjin" />
                        </span>
                        <span>通过率:</span>
                        <span>{{driverSchoolData.passingRate}}%</span>
                    </p>-->
                    <!-- <p>
                        <span>
                            <van-icon color="#7bbfea" name="qianjin" />
                        </span>
                        <span>训练场数量:</span>
                        <span>{{driverSchoolData.trainingCount}}个</span>
                    </p>-->
                    <!-- <p>
                        <span>
                            <van-icon color="#7bbfea" name="qianjin" />
                        </span>
                        <span>训练场面积:</span>
                        <span>{{driverSchoolData.tainingArea}}平方</span>
                    </p>-->
                    <p>
                        <span>
                            <van-icon color="#7bbfea" name="qianjin" />
                        </span>
                        <span>年培训学员:</span>
                        <span>{{driverSchoolData.yearStudent}}</span>
                    </p>
                    <p>
                        <span>
                            <van-icon color="#7bbfea" name="qianjin" />
                        </span>
                        <span>训练是否接送:</span>
                        <span>{{driverSchoolData.deliverDetail}}</span>
                    </p>
                    <p>
                        <span>
                            <van-icon color="#7bbfea" name="qianjin" />
                        </span>
                        <span>驾校详情:</span>
                    </p>
                    <div class="content-detail">{{driverSchoolData.schoolDetail}}</div>
                    <p>
                        <span>
                            <van-icon color="#7bbfea" name="qianjin" />
                        </span>
                        <span>训练场地址:</span>
                    </p>
                    <div class="content-bottom">
                        <ol>
                            <template v-for="item in tainingAddrList">
                                <li :key="item.id">{{item.trainingAddr}}</li>
                            </template>
                        </ol>
                    </div>
                </div>
            </div>
            <div class="content-school-comment">学员评价</div>
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="handleLoad"
                :immediate-check="false"
            >
                <template v-for="item in commentList">
                    <div class="school-comment" :key="item.id">
                        <div class="comment-img">
                            <img :src="item.userFace" />
                        </div>
                        <div class="comment-info">
                            <div>{{item.userName}}</div>
                            <div class="info-rate">
                                <van-rate readonly v-model="item.rate" void-icon="star" :count="7" />
                            </div>
                            <span>{{item.comment}}</span>
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
import { getOneById } from '../../svc/suc/DriverSchool';

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
            driverSchoolData: {},
            pageNum: 0,
            tainingAddrList: [],
        };
    },
    methods: {
        schoolRegister() {
            this.$router.push({ name: 'school-register', params: { id: this.driverSchoolData.id } });
        },
        // 获取驾校数据
        handleLoad() {
            const params = { pageNum: this.pageNum + 1, driverId: this.$route.params.id };
            getComment({
                params,
                onSuccess: data => {
                    this.pageNum = data.pageNum;
                    this.commentList.push(...data.list);
                    // 如果是最后一页
                    if (data.pages === data.pageNum || data.pages < data.pageNum) {
                        // 数据全部加载完成
                        this.finished = true;
                    } else {
                        this.finished = false;
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
            getOneById({
                params,
                onSuccess: data => {
                    this.driverSchoolData = data.sucDriverSchoolMo;
                    this.tainingAddrList = data.sucTainingAddrList;
                },
            });
        },
    },
    activated() {
        if (this.$route.params.name != undefined) {
            this.name = this.$route.params.name;
            this.getDriverSchoolData();
            this.pageNum = 0;
            this.commentList = [];
            this.tainingAddrList = [];
            this.handleLoad();
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
                .content-detail {
                    padding-left: 1rem;
                    font-size: 0.4rem;
                    color: #7d7e80;
                }
                .content-bottom {
                    padding-left: 1rem;
                    ol,
                    li {
                        padding: 0;
                        margin: 0;
                        list-style: none;
                        font-size: 0.4rem;
                        color: #7d7e80;
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