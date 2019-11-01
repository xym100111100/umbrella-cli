<template>
    <div class="get-hunter">
        <header class="get-hunter-header">
            <div class="header-title">
                <div class="title-left">
                    <p>权利越大,责任越大</p>
                    <p class="title-english">With great power comes great responsibility</p>
                    <div class="title-detail">
                        <p>禁止虚假领取</p>
                        <p class="title-english">Prohibition of false collection</p>
                    </div>
                </div>
                <div class="title-right">
                    <div @click="$router.go(-1)">
                        <van-icon size="0.5rem" name="back-search" />
                    </div>
                </div>
            </div>
        </header>
        <div class="get-hunter-content">
            <div class="content-top">
                <div class="top-title">
                    <div class="title-icon">
                        <span>
                            <van-icon size="0.6rem" color="#7bbfea" name="biaoqian2" />
                        </span>
                    </div>
                    <div class="title-name">取餐</div>
                </div>
            </div>
            <div class="content-bottom">
                <div class="bottom-detail">在第一节课下课后,估计是九点钟,去饭堂打包一个饭上去一栋A303宿舍,交给一个叫大专的同学。</div>
                <div class="button-contact">
                    <div class="contact-header">
                        <div>
                            <van-icon size="0.5rem" color="#a09dd4" name="zhuyi" />
                        </div>
                        <div class="header-text">雇主信息</div>
                    </div>
                    <div class="contact-top" >
                        <div>姓名<span class="top-name" >波多野结衣</span></div>
                    </div>
                    <div class="contact-content">
                        <div @click="showPopup" class="content-text">
                            手机
                            <span class="text-number">132*******</span>
                            <van-icon size="0.6rem" color="#7bbfea" name="yiwen" />
                        </div>
                        <van-popup v-model="show" position="top" :style="{ height: '20%' }">
                            <div class="content-popup">
                                <div class="popup-header">
                                    <div class="header-icon">
                                        <van-icon size="0.5rem" color="#a09dd4" name="zhuyi" />
                                    </div>
                                    <div
                                        class="heander-text"
                                    >雇主设置了同意才能看到电话号码,请领取任务后等待雇主同意后显示,或发消息给雇主获取。</div>
                                </div>
                            </div>
                        </van-popup>
                        <div class="content-contact">
                            <van-icon size="0.6rem" color="#a09dd4" name="liaotian" />
                        </div>
                    </div>
                    <div class="contact-bottom">
                        <div class="bottom-money">
                            佣金
                            <span class="money-number" >￥{{ money }}</span>
                        </div>
                    </div>
                </div>
                <div class="button-submit" @click="onGethunter">{{buttonText}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Switch, Icon, Popup, Slider, Toast } from 'vant';

// Lazyload插件需要初始化

export default {
    components: {
        [Icon.name]: Icon,
        [Switch.name]: Switch,
        [Popup.name]: Popup,
        [Slider.name]: Slider,
        [Toast.name]: Toast,
    },
    data() {
        return {
            checked: true,
            show: false,
            money: 2,
            textareaValue: null,
            inputValue: null,
            buttonText: '领取',
        };
    },
    filters: {},
    activated() {},
    methods: {
        onGethunter() {
            if (this.buttonText === '领取') {
                this.buttonText = '正在等待雇主同意';
            }
        },
        onChangeMoney(value) {
            if (this.money < 3 && value === -1) {
                Toast({ message: '佣金不能少于2', position: 'top' });
                return;
            }
            if (this.money > 99 && value === 1) {
                Toast({ message: '佣金不能大于100', position: 'top' });
                return;
            }
            this.money += value;
        },
        showPopup() {
            this.show = true;
        },
    },
};
</script>

<style lang="less" scoped>
html,
body {
    height: 100%;
}
.get-hunter {
    overflow: scroll;
    background: #ebe6e6;
    height: 100vh;
    .get-hunter-header {
        background-image: linear-gradient(to right, rgba(170, 234, 240, 0.514), #7bbfea);
        height: 3rem;
        .header-title {
            display: flex;
            .title-left {
                flex-grow: 2;
                font-size: 0.45rem;
                color: white;
                padding: 0.1rem 0 0 0.2rem;
                p {
                    padding: 0;
                    margin: 0;
                }
                .title-english {
                    font-size: 0.35rem;
                    padding: 0.2rem 0 0 0.4rem;
                }
                .title-detail {
                    padding: 0.2rem 0 0 2rem;
                }
            }
            .title-right {
                width: 2rem;
                display: flex;
                align-items: center;
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
    .get-hunter-content {
        margin: 0.3rem 0 0 3%;
        background: white;
        width: 94%;
        border-radius: 0.2rem;
        overflow: hidden;
        .content-top {
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
                    font-size: 0.45rem;
                }
            }
        }
        .content-bottom {
            font-size: 0.37rem;
            color: #b6c4c7;
            overflow: hidden;
            padding-top: 0.3rem;
            .bottom-detail {
                width: 70%;
                margin-left: 13%;
                max-height: 4rem;
                overflow: scroll;
                padding-bottom: 0.3rem;
            }
            .button-contact {
                margin-left: 2%;
                padding-top: 0.2rem;
                border-top: #cad8db solid 0.01rem;
                width: 96%;
                height: 2rem;
                .contact-header {
                    height: 1rem;
                    display: flex;

                    .header-text {
                        padding: 0.07rem 0 0 0.2rem;
                        color: #768588;
                    }
                }
                .contact-top{
                    padding-left: 0.2rem;
                    .top-name{
                        padding-left: 0.3rem;
                    }
                }
                .contact-content {
                    display: flex;
                    .content-text {
                        flex-grow: 2;
                        padding-left: 0.2rem;
                        .text-number {
                            padding-left: 0.2rem;
                        }
                    }
                    .content-contact {
                        padding: 0.1rem 0.4rem 0 0;
                        text-align: right;
                        width: 3rem;
                    }
                }
                .contact-bottom {
                    width: 96%;
                    margin: 0.3rem 0 0 2%;
                   
                    height: 1rem;
                    align-items: center;
                    .bottom-money{
                        .money-number{
                            padding-left: 0.2rem;
                        }
                    }
                }
            }
            .button-submit {
                background-image: linear-gradient(to right, rgba(170, 234, 240, 0.514), #7bbfea);
                height: 1rem;
                margin: 3rem 0 1rem 2%;
                width: 96%;
                text-align: center;
                line-height: 1rem;
                border-radius: 0.1rem;
                color: white;
                font-size: 0.5rem;
            }
            .button-submit:active {
                background: #7bbfea;
            }
        }
    }
}
.content-popup {
    height: 100%;
    background-image: linear-gradient(to right, rgba(170, 234, 240, 0.514), #7bbfea);
    .popup-header {
        font-size: 0.4rem;
        color: white;
        display: flex;
        .header-icon {
            padding: 0.3rem 0 0 0.2rem;
        }
        .heander-text {
            padding: 0.2rem;
        }
    }
}
</style>
