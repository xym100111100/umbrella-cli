<template>
    <div class="school-register">
        <div class="register-title">
            <van-nav-bar title="驾校报名" left-arrow @click-left="$router.go(-1)" />
        </div>
        <van-popup
            position="right"
            :style="{ height: '100%',width:'25%' }"
            get-container="body"
            v-model="show"
        >
            <div>
                <ol>
                    <li @click="choiceClass('五一训练场')">
                        <span>五一训练场</span>
                    </li>
                    <li @click="choiceClass('电脑/配件')">
                        <span>电脑/配件</span>
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
                        <span>大炮</span>
                    </li>
                    <li>
                        <span>步枪</span>
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
        </van-popup>
        <div class="register-content">
            <div class="content-step">
                <p>报名步骤</p>
                <van-steps :active="active">
                    <van-step>驾校报名</van-step>
                    <van-step>签订合约</van-step>
                    <van-step>领证完成</van-step>
                </van-steps>
            </div>
            <div class="content-platform-register">
                <p>驾校报名</p>
                <p>
                    <span>姓名</span>
                    <input placeholder="请输入您的姓名" />
                </p>

                <p>
                    <span>手机号码</span>
                    <input placeholder="请输入您的手机号码" />
                </p>
                <p>
                    <span @click="changeTrainName">选择训练场地</span>
                    <span class="register-train">{{trainName}}</span>
                </p>
                <div>
                    <button @click="platformRegister">提交</button>
                </div>
            </div>
            <div class="content-contract">
                <p>签订合约</p>
                <div class="contract-upload">
                    <div class="upload-text">上传合约照片</div>
                    <div class="upload-file">
                        <div class="file-img">
                            <div>
                                <img
                                    src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoM1LKFPNSBQA4iaeuHQuibYIicA/132"
                                />
                            </div>
                            <div class="delete">
                                <van-icon color="white" name="shanchu" />
                            </div>
                        </div>
                        <!-- <div class="file-icon">
                            <van-uploader :after-read="uploadIMG">
                                <van-icon name="tianjiajiahaowubiankuang" />
                            </van-uploader>
                        </div>-->
                    </div>
                </div>
                <div class="contract-btn">
                    <button @click="platformRegister">提交</button>
                </div>
            </div>
            <div class="content-finish">
                <p>领证完成</p>
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
                <div class="statement-info">合约由广西保护伞科技有限公司声明，本公司对此合约承担法律责任与郑重承诺会履行合约中的条款。</div>
                <div class="statement-autograph">广西保护伞科技有限公司</div>
            </div>
        </div>
    </div>
</template>

<script>
import { NavBar, Rate, Popup, Step, Steps, Uploader, Icon, Toast } from 'vant';

export default {
    components: {
        [NavBar.name]: NavBar,
        [Uploader.name]: Uploader,
        [Icon.name]: Icon,
        [Step.name]: Step,
        [Steps.name]: Steps,
        [Toast.name]: Toast,
        [Rate.name]: Rate,
        [Popup.name]: Popup,
    },
    data() {
        return {
            active: -1,
            scoreValue: 3,
            trainName: '未选择',
            show: false,
        };
    },
    methods: {
        choiceClass(name) {
            this.show = false;
            this.trainName = name;
        },
        changeTrainName() {
            this.show = true;
        },
        platformRegister() {
            Toast({ message: '报名成功，请等待客服联系', position: 'top' });
        },
        uploadIMG(e) {
            this.picavalue = e.file;
            console.log('-----' + this.picavalue.size * 1024);
        },
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
        .content-step {
            p {
                padding: 0;
                margin: 0;
                font-size: 0.4rem;
                padding-left: 0.3rem;
            }
        }
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
            p:nth-child(2),
            p:nth-child(3),
            p:nth-child(4) {
                color: #499df1;
                height: 1.5rem;
                line-height: 1.5rem;
                input {
                    height: 0.8rem;
                    width: 70%;
                    border: none;
                    padding-left: 0.2rem;
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
                    .file-img {
                        height: 2rem;
                        width: 2rem;
                        margin: 0.1rem 0.1rem 0.1rem 1rem;
                        img {
                            height: 2rem;
                            border-radius: 0.2rem;
                        }
                        .delete {
                            margin-top: -1.1rem;
                            margin-left: 1.1rem;
                            font-size: 0.7rem;
                            .van-icon {
                                background: rgba(180, 194, 202, 0.3);
                                padding-bottom: 0.2rem;
                            }
                        }
                    }
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