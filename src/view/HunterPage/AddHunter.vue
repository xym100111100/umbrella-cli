<template>
    <div class="add-hunter">
        <header class="add-hunter-header">
            <div class="header-title">
                <div class="title-left">
                    <p>权利越大,责任越大</p>
                    <p class="title-english">With great power comes great responsibility</p>
                    <div class="title-detail">
                        <p>严禁虚假发布</p>
                        <p class="title-english">False release is strictly prohibited</p>
                    </div>
                </div>
                <div class="title-right">
                    <div @click="$router.go(-1)">
                        <van-icon size="0.5rem" name="back-search" />
                    </div>
                </div>
            </div>
        </header>
        <div class="add-hunter-content">
            <div class="content-top">
                <div class="top-title">
                    <div class="title-icon">
                        <span>
                            <van-icon size="0.6rem" color="#7bbfea" name="biaoqian2" />
                        </span>
                    </div>
                    <div class="title-name">
                        <input @input="oninput" :value="inputValue" placeholder="请输入任务标题" />
                    </div>
                </div>
            </div>
            <div class="content-bottom">
                <div class="bottom-detail">
                    <textarea
                        @input="ontextarea"
                        :value="textareaValue"
                        placeholder="请输入任务详情"
                        cols="30"
                        rows="10"
                    ></textarea>
                </div>
                <div class="button-setting">
                    <div class="setting-header">
                        <div>
                            <van-icon size="0.5rem" color="#a09dd4" name="zhuyi" />
                        </div>
                        <div class="header-text">设置</div>
                    </div>
                    <div class="setting-content">
                        <div @click="showPopup" class="content-text">
                            是否显示手机号码
                            <van-icon size="0.6rem" color="#7bbfea" name="yiwen" />
                        </div>
                        <van-popup v-model="show" position="top" :style="{ height: '30%' }">
                            <div class="content-popup">
                                <div class="popup-header">
                                    <div class="header-icon">
                                        <van-icon size="0.5rem" color="#a09dd4" name="zhuyi" />
                                    </div>
                                    <div
                                        class="heander-text"
                                    >为防止信息泄露造成损失,请在以下或可能造成损失情况下将手机号码设置为在同意猎人接受任务后再显示手机号码。</div>
                                </div>
                                <div class="popup-content">猎人领取快递</div>
                            </div>
                        </van-popup>
                        <div class="content-switch">
                            <van-switch
                                size="0.5rem"
                                active-color="#a09dd4"
                                inactive-color="#fff"
                                v-model="checked"
                            />
                        </div>
                    </div>
                    <div class="setting-bottom">
                        <div class="bottom-money">佣金</div>
                        <div class="bottom-stepper">
                            <div @click="onChangeMoney(-1)" class="stepper-reduce">
                                <van-icon size="0.4rem" color="white" name="jianhao" />
                            </div>
                            <div class="stepper-number">￥{{money}}</div>
                            <div @click="onChangeMoney(1)" class="stepper-add">
                                <van-icon
                                    size="0.4rem"
                                    color="white"
                                    name="tianjiajiahaowubiankuang"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="button-submit">发布</div>
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
            pageNum: 0, // 当前页码
            loading: false, // 是否正在加载商品列表
            finished: false, // 是否全部加载完成商品列表
            scroll: 0,
            list: [],
            count: 0,
            isLoading: false,
            checked: true,
            show: false,
            money: 2,
            textareaValue: null,
            inputValue: null,
        };
    },
    filters: {},
    activated() {},
    methods: {
   
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
                    console.log('sss');
                } else {
                    console.log('222');
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
}
.add-hunter {
    overflow: scroll;
    background: #ebe6e6;
    height: 100vh;
    .add-hunter-header {
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
    .add-hunter-content {
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
                    input {
                        border: none;
                        color: #b6c4c7;
                        font-size: 0.4rem;
                    }
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
                textarea {
                    border: none;
                }
            }
            .button-setting {
                margin-left: 2%;
                padding-top: 0.2rem;
                border-top: #cad8db solid 0.01rem;
                width: 96%;
                height: 2rem;
                .setting-header {
                    height: 1rem;
                    display: flex;

                    .header-text {
                        padding: 0.07rem 0 0 0.2rem;
                        color: #768588;
                    }
                }
                .setting-content {
                    display: flex;
                    .content-text {
                        flex-grow: 2;
                        padding-left: 0.2rem;
                    }
                    .content-switch {
                        padding: 0.2rem 0.4rem 0 0;
                        text-align: right;
                        width: 3rem;
                    }
                }
                .setting-bottom {
                    width: 96%;
                    margin: 0.3rem 0 0 2%;
                    display: flex;
                    height: 1rem;
                    align-items: center;
                    .bottom-money {
                        flex-grow: 2;
                    }
                    .bottom-stepper {
                        width: 39%;
                        display: flex;
                        align-items: center;
                        .stepper-number {
                            width: 1.2rem;
                            text-align: center;
                        }
                        .stepper-reduce,
                        .stepper-add {
                            width: 1rem;
                            text-align: center;
                            padding-top: -0.5rem;
                        }
                        .stepper-reduce {
                            background-image: linear-gradient(
                                to right,
                                rgba(170, 234, 240, 0.514),
                                rgba(94, 235, 248, 0.514)
                            );
                            border-top-left-radius: 0.3rem;
                            border-bottom-left-radius: 0.3rem;
                        }
                        .stepper-add {
                            background-image: linear-gradient(to right, rgba(94, 235, 248, 0.514), #8cc0e0);
                            border-top-right-radius: 0.3rem;
                            border-bottom-right-radius: 0.3rem;
                        }
                        .stepper-add:active {
                            background: #7bbfea;
                        }
                        .stepper-reduce:active {
                            background: #7bbfea;
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
    .popup-content {
        background: white;
        height: 1rem;
        width: 84%;
        margin-left: 9%;
        line-height: 1rem;
        padding-left: 0.2rem;
        border-radius: 0.2rem;
        color: #768588;
    }
}
</style>
