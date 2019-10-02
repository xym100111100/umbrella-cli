<template>
    <div class="school-register">
        <div class="register-title">
            <van-nav-bar
                title="驾校报名"
                right-text="报名步骤"
                @click-right="registerDetail"
                left-arrow
                @click-left="$router.go(-1)"
            />
        </div>
        <van-popup
            position="right"
            :style="{ height: '100%',width:'25%' }"
            get-container="body"
            v-model="show"
        >
            <div>
                <ol>
                    <template v-for="item in tainingList">
                        <li :key="item.id" @click="choiceAddr(item.id,item.trainingAddr)">
                            <span>{{item.trainingAddr}}</span>
                        </li>
                    </template>
                </ol>
            </div>
        </van-popup>
        <div class="register-content">
            <div class="content-platform-register">
                <p>立刻报名享受优质服务！</p>
                <p>
                    <span>姓名</span>
                    <input  v-model="payload.userName" placeholder="请输入您的姓名" />
                </p>

                <p>
                    <span>手机号码</span>
                    <input v-model="payload.mobilePhone" placeholder="请输入您的手机号码" />
                </p>
                <p>
                    <span>推荐人</span>
                    <input v-model="payload.recommender" placeholder="请输入推荐人，没有可不填" />
                </p>
                <p>
                    <span @click="changeTrainName">选择训练场地</span>
                    <span class="register-train">{{trainAddr.name}}</span>
                </p>
                <div>
                    <button @click="platformRegister">报名</button>
                </div>
            </div>
            <div class="content-contract">
                <p>上传合约，享受更多保障！</p>
                <div class="contract-upload">
                    <div class="upload-text">上传合约照片</div>
                    <div class="upload-file">
                        <div class="file-icon">
                            <van-uploader :after-read="uploadIMG">
                                <van-icon name="tianjiajiahaowubiankuang" />
                            </van-uploader>
                        </div>
                    </div>
                </div>
                <div class="contract-btn">
                    <button @click="platformRegister">上传</button>
                </div>
            </div>
            <div class="content-finish">
                <p>给驾校一个好评吧！</p>
                <div class="finish-score">
                    <div>评分</div>
                    <div>
                        <van-rate v-model="scoreValue" />
                    </div>
                </div>
                <div class="finish-evaluate">
                    <div>评论</div>
                    <div>
                        <textarea></textarea>
                    </div>
                </div>
                <div class="finish-btn">
                    <button @click="platformRegister">提交</button>
                </div>
            </div>
            <div class="content-statement">
                <p>声明</p>
                <div class="statement-info">合约由广西安布雷拉科技有限公司声明，本公司对此合约承担法律责任与郑重承诺会履行合约中的条款。</div>
                <div class="statement-autograph">广西安布雷拉科技有限公司</div>
            </div>
        </div>
    </div>
</template>

<script>
import { NavBar, Rate, Popup, Step, Uploader, Icon, Toast } from 'vant';
import { getTainingAddr as list } from '../../svc/suc/DriverSchool';
import { addUserDriver } from '../../svc/suc/UserDriver';
import { getOne } from '../../svc/suc/UserDriver';

export default {
    components: {
        [NavBar.name]: NavBar,
        [Uploader.name]: Uploader,
        [Icon.name]: Icon,
        [Step.name]: Step,
        [Toast.name]: Toast,
        [Rate.name]: Rate,
        [Popup.name]: Popup,
    },
    data() {
        return {
            scoreValue: 3,
            trainAddr: {
                id: null,
                name: '未选择',
            },
            show: false,
            tainingList: [],
            payload: {
                userName: null,
                mobilePhone: null,
                recommender: null,
            },
        };
    },
    methods: {
        registerDetail() {},
        choiceAddr(id, name) {
            this.show = false;
            this.trainAddr = {
                id,
                name,
            };
        },
        getTainingAddr() {
            const params = { deriverId: this.$route.params.id };
            list({
                params,
                onSuccess: data => {
                    this.tainingList = data;
                },
            });
        },
        getUserDriverByUserId() {
            const params = { userId: this.$store.getters.user.id, driverId: this.$route.params.id };
            getOne({
                params,
                onSuccess: data => {
                    if (data.id !== undefined && data.id !== null) {
                    }
                },
            });
        },
        changeTrainName() {
            this.show = true;
        },
        platformRegister() {
            console.log(this.payload);
            if (this.payload.userName === undefined || this.payload.userName === null) {
                Toast({ message: '请填写姓名后再提交', position: 'top' });
                return;
            }
            if (this.payload.mobilePhone === undefined || this.payload.mobilePhone === null) {
                Toast({ message: '请填写手机号码后再提交', position: 'top' });
                return;
            }
            if (this.trainAddr.id === null || this.trainAddr.id === undefined) {
                Toast({ message: '请选择训练场后再提交', position: 'top' });
                return;
            }

            let data = this.payload;
            data.tainingId = this.trainAddr.id;
            data.userId = this.$store.getters.user.id;
            data.driverId = this.$route.params.id;
            addUserDriver({
                data,
                onSuccess: data => {
                    console.log(data);
                    Toast({ message: '报名成功，请等待客服联系', position: 'top' });
                },
                onFail: (code, msg) => {
                    Toast({ message: '报名失败，网络跑到外星了，请重新填写', position: 'top' });
                },
                
            });
        },
        uploadIMG(e) {
            this.picavalue = e.file;
            console.log('-----' + this.picavalue.size * 1024);
        },
    },
    activated() {
        if (this.$route.params.id !== undefined) {
            this.trainAddr = {
                id: null,
                name: '未选择',
            };
            this.getTainingAddr();
            this.getUserDriverByUserId();
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
.school-register {
    height: 100vh;
    overflow: scroll;
    .register-content {
        padding: 0 0.2rem;
        height: 93%;
        overflow: scroll;

        .content-platform-register {
            background: rgba(123, 191, 234, 0.2);
            width: 97%;
            padding: 0.3rem 0 0 0.3rem;
            border-radius: 0.2rem;
            p {
                padding: 0;
                margin: 0;
                font-size: 0.36rem;
            }
            p:first-child {
                font-size: 0.4rem;
            }
            p:nth-child(2) {
                span {
                    padding-right: 0.9rem;
                }
            }
            p:nth-child(3) {
                span {
                    padding-right: 0.2rem;
                }
            }
            p:nth-child(4) {
                span {
                    padding-right: 0.6rem;
                }
            }
            p:nth-child(2),
            p:nth-child(3),
            p:nth-child(4),
            p:nth-child(5) {
                color: #499df1;
                height: 1.5rem;
                line-height: 1.5rem;
                input {
                    height: 0.8rem;
                    width: 70%;
                    border: none;
                    padding-left: 0.2rem;
                    color: #4a4a4c;
                }
            }
            .register-train {
                color: black;
                padding-left: 0.2rem;
            }
            div {
                height: 2rem;
                text-align: center;
                width: 100%;
                line-height: 2rem;
                button {
                    width: 50%;
                    height: 1rem;
                    font-size: 0.45rem;
                    line-height: 1rem;
                    border-radius: 0.2rem;
                    border: none;
                    background: greenyellow;
                    color: white;
                }
                button:active {
                    background: rgba(123, 191, 234, 0.2);
                }
            }
        }
        .content-contract {
            margin-top: 0.3rem;
            background: rgba(123, 191, 234, 0.2);
            border-radius: 0.2rem;
            padding-top: 0.3rem;
            p {
                padding: 0;
                margin: 0;
                font-size: 0.4rem;
                padding-left: 0.3rem;
            }
            .contract-upload {
                display: flex;
                margin-top: 0.3rem;
                .upload-text {
                    font-size: 0.4rem;
                    color: #499df1;
                    padding-left: 0.3rem;
                }
                .upload-file {
                    display: flex;
                    margin-left: 1rem;

                    .file-icon {
                        background: rgba(180, 194, 202, 0.3);
                        height: 2rem;
                        width: 2rem;
                        margin: 0.1rem;
                        line-height: 2rem;
                        text-align: center;
                        border-radius: 0.2rem;
                    }
                    .file-icon:active {
                        background: rgba(123, 191, 234, 0.2);
                    }
                }
            }
            .contract-btn {
                height: 2rem;
                text-align: center;
                width: 100%;
                line-height: 2rem;
                button {
                    width: 50%;
                    height: 1rem;
                    font-size: 0.45rem;
                    line-height: 1rem;
                    border-radius: 0.2rem;
                    border: none;
                    background: greenyellow;
                    color: white;
                }
                button:active {
                    background: rgba(123, 191, 234, 0.2);
                }
            }
        }
        .content-finish {
            width: 97%;
            margin-top: 0.3rem;
            background: rgba(123, 191, 234, 0.2);
            border-radius: 0.2rem;
            padding-top: 0.3rem;
            font-size: 0.4rem;
            padding-left: 0.3rem;
            p {
                padding: 0;
                margin: 0;
            }
            .finish-score,
            .finish-evaluate {
                display: flex;
                margin-top: 0.3rem;
                color: #499df1;
                div:first-child {
                    padding-right: 0.5rem;
                }
            }
            .finish-evaluate {
                width: 100%;
                textarea {
                    width: 70vw;
                    border: none;
                    height: 2rem;
                }
            }
            .finish-btn {
                height: 1.8rem;
                text-align: center;
                width: 100%;
                line-height: 1.8rem;
                button {
                    width: 50%;
                    height: 1rem;
                    font-size: 0.45rem;
                    line-height: 1rem;
                    border-radius: 0.2rem;
                    border: none;
                    background: greenyellow;
                    color: white;
                    margin-left: -0.5rem;
                }
                button:active {
                    background: rgba(123, 191, 234, 0.2);
                }
            }
        }
        .content-statement {
            background: #fff7cc;
            width: 97%;
            margin: 0.3rem 0 0.5rem 0;
            border-radius: 0.2rem;
            padding-top: 0.3rem;
            font-size: 0.4rem;
            padding-left: 0.3rem;
            p {
                color: #499df1;
                padding: 0;
                margin: 0;
                font-size: 0.4rem;
                padding-left: 0.3rem;
            }
            .statement-info {
                padding: 0.5rem;
            }
            .statement-autograph {
                width: 90%;
                text-align: right;
                padding-bottom: 0.5rem;
            }
        }
    }
}
.van-popup--right {
    div:last-child {
        position: fixed;
        height: 100%;
        width: 100%;
        overflow: scroll;
        color: #4a4a4c;
        font-size: 0.42rem;

        ol {
            padding-bottom: 1rem;
            li {
                margin: 0;
                padding: 0;
                height: 1.4rem;
                line-height: 1.4rem;
                text-align: center;
                span {
                    padding: 0.1rem 0.2rem;
                    border-bottom: solid 0.03rem #ededed;
                    color: #499df1;
                }
            }
            li:active {
                background: rgba(123, 191, 234, 0.2);
            }
        }
    }
}
</style>