<template>
    <div class="school-register">
        <div class="register-title">
            <van-nav-bar title="驾校报名" left-arrow @click-left="$router.go(-1)" />
        </div>
        <div class="register-content">
            <div class="content-step">
                <p>报名步骤</p>
                <van-steps :active="active">
                    <van-step>平台报名</van-step>
                    <van-step>签订合约</van-step>
                    <van-step>领证完成</van-step>
                </van-steps>
            </div>
            <div class="content-platform-register">
                <p>平台报名</p>
                <p>
                    <span>姓名</span>
                    <input placeholder="请输入您的姓名" />
                </p>
                <p>
                    <span>手机号码</span>
                    <input placeholder="请输入您的手机号码" />
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
            </div>
        </div>
    </div>
</template>

<script>
import { NavBar, Rate, Step, Steps, Uploader, Icon, Toast } from 'vant';

export default {
    components: {
        [NavBar.name]: NavBar,
        [Uploader.name]: Uploader,
        [Icon.name]: Icon,
        [Step.name]: Step,
        [Steps.name]: Steps,
        [Toast.name]: Toast,
        [Rate.name]: Rate,
    },
    data() {
        return {
            active: -1,
            scoreValue: 3,
        };
    },
    methods: {
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
            p:nth-child(3) {
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
                textarea{
                    width: 70vw;
                    border: none;
                }
            }
        }
    }
}
</style>