<template>
    <div class="chat">
        <header>
            <div class="chat-header">
                <van-nav-bar v-bind:title="name" v-on:click-left="handleBack" left-arrow>
                    <van-icon size="0.8rem" slot="right" />
                </van-nav-bar>
            </div>
        </header>
        <div class="chat-centent" style="backround:red" id="chat-content">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <template v-for="item in chatInfo">
                    <div v-if="item.id%2==0" :key="item.id" class="centent-node-you">
                        <img :src="item.thumb" />
                        <span id="num">{{item.text}}</span>
                    </div>
                    <div v-if="item.id%2!=0" :key="item.id" class="centent-node-me">
                        <span id="num">{{item.text}}</span>
                        <img :src="item.thumb" />
                    </div>
                </template>
            </van-pull-refresh>
        </div>
        <div class="chat-footer">
            <div id="addImg" v-on:click="addImg" class="footer-add-img">+</div>
            <div class="footer-input">
                <van-cell-group>
                    <van-field
                        id="inputNode"
                        v-model="inputValue"
                        clearable
                        @click-right-icon="$toast('question')"
                        v-on:focus="inputFocus"
                        v-on:blur="inputBlur"
                    />
                </van-cell-group>
            </div>
            <div v-on:click="websoketsend" class="footer-send">
                <button>发送</button>
            </div>
        </div>
    </div>
</template>

<script>
import { NavBar, PullRefresh, Button, Field, Icon, Search, List, Cell, CellGroup } from 'vant';
import { getChatInfo } from '../../svc/Chat';
import WSocket from '../../socket.js';
export default {
    components: {
        [Search.name]: Search,
        [Field.name]: Field,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [NavBar.name]: NavBar,
        [List.name]: List,
        [Icon.name]: Icon,
        [Button.name]: Button,
        [PullRefresh.name]: PullRefresh,
    },
    data() {
        return {
            id: this.$route.params.id,
            name: this.$route.params.name,
            inputValue: null,
            chatInfo: [],
            isLoading: false,
            meClientHeight: 0, //这个值是用来计算当软键盘升起来应该控制内容的高度是多少
        };
    },
    updated() {},
    created() {
        console.log('created');
        this.meClientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    },
    destroyed() {
        console.log('destroyed');
    },
    methods: {
        onRefresh() {
            const params = { pageNum: this.pageNum + 1 };
            getChatInfo({
                params,
                onSuccess: data => {
                    this.pageNum = data.pageNum;
                    this.chatInfo.unshift(...data.list);
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 500);
                },
                onFinish: () => {},
            });
        },

        addImg() {},
        inputFocus() {
            // 这里这延迟必须有，否则页面将显示为0，因为可是区域还没有被
            // 软键盘挡住.
            setTimeout(() => {
                let centent = document.getElementById('chat-content');
                let height = this.meClientHeight - document.body.clientHeight;
                centent.style.height = height + 'px';
                document.getElementById('chat-content').scrollTop =
                    document.getElementById('chat-content').offsetHeight + 1000;
            }, 500);
        },
        inputBlur() {
            let centent = document.getElementById('chat-content');
            centent.style.height = this.meClientHeight + 'px';
        },
        handleBack(e) {
            this.$router.go(-1);
        },
        websoketsend() {
            console.log('发送');
            //连接建立之后执行send方法发送数据
            // if (this.inputValue !== null) {
            let actions = { username: '徐亚明', msg: this.inputValue };
            //     this.websocket.send(JSON.stringify(actions));
            //     this.inputValue = null;
            // }

            WSocket.send(actions);
        },
        websoketclose(e) {
            console.log('关闭');
            //关闭
            console.log('断开连接', e);
        },
    },

    activated() {
        console.log('activated');
        this.chatInfo = [];
        this.onRefresh();
        this.id = this.$route.params.id;
        this.name = this.$route.params.name;
        document.getElementById('chat-content').scrollTop = document.getElementById('chat-content').offsetHeight;
    },
};
</script>
<style lang="less" >
body,
html {
    height: 100%;
}
.chat {
    display: flex;
    flex-direction: column;
    height: 100%;
    &-header {
        background: #fafafa;
        border-bottom: 1px solid #ededed;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 99;
        span {
            font-size: 0.5rem;
        }
    }
    &-centent {
        //  display: flex;
        flex-direction: column;
        padding: 1.5rem 0 1.5rem;
        height: 90vh;
        overflow: scroll;
        div {
            margin: 0.2rem 0 0.2rem 0;
        }
        .centent-node-you {
            display: flex;
            align-items: flex-start;
            margin-right: 1.63rem;
            margin-left: 0.2rem;
            img {
                height: 1.2rem;
                border-radius: 0.3rem;
            }
            span {
                font-size: 0.4rem;
                margin-left: 0.2rem;
                padding: 0.2rem 0.06rem;
                background: rgba(60, 47, 15, 0.1);
                border-radius: 0.2rem;
                text-align: justify;
            }
        }
        .centent-node-me {
            display: flex;
            align-items: flex-start;
            justify-content: flex-end;
            margin-left: 1.63rem;
            margin-right: 0.2rem;

            img {
                height: 1.2rem;
                border-radius: 0.3rem;
            }
            span {
                font-size: 0.4rem;
                background: rgba(123, 191, 234, 0.2);
                border-radius: 0.2rem;
                margin-right: 0.2rem;
                padding: 0.2rem 0.06rem;
                text-align: justify;
            }
        }
    }
    &-footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        display: flex;
        background: #fafafa;
        align-items: center;
        .footer-add-img {
            width: 0.6rem;
            height: 0.6rem;
            font-size: 0.4rem;
            margin: 0 0.3rem 0 0.3rem;
            border: solid 1px #947777;
            border-radius: 100%;
            justify-content: center;
            align-items: center;
            display: flex;
        }
        .footer-input {
            flex-grow: 2;
        }
        .footer-send {
            width: 1.7rem;
            button {
                font-size: 0.4rem;
                border-radius: 0.2rem;
                border: none;
                margin: 0 0.2rem 0.4rem 0.3rem;
            }
        }
    }
}
.order-navbar {
    width: 10rem;
    .van-nav-bar {
        background-color: red;
        &__arrow {
            font-size: 0.7rem;
        }

        &__title {
            color: #fafafa;
            font-size: 0.5rem;
        }

        .van-icon {
            color: #fafafa;
        }
    }
}
</style>