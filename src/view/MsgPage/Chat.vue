<template>
    <div class="chat">
        <div class="chat-header">
            <van-nav-bar
                v-bind:title="toUserInfo.name+String(myHeight)+':'+divHeight"
                v-on:click-left="handleBack"
                left-arrow
            >
                <van-icon size="0.8rem" slot="right" />
            </van-nav-bar>
        </div>

        <div class="chat-centent" ref="companyStyle" id="chat-centent">
            <van-pull-refresh loosing-text=" " v-model="isLoading" @refresh="onRefresh">
                <template v-for="item in chatList">
                    <div
                        v-if="item.fromUserId == toUserInfo.id"
                        :key="item.id"
                        class="centent-node-you"
                    >
                        <img :src="toUserInfo.face" />
                        <span id="num">{{item.content}}</span>
                    </div>
                    <div
                        v-if="item.fromUserId != toUserInfo.id"
                        :key="item.id"
                        class="centent-node-me"
                    >
                        <span id="num">{{item.content}}</span>
                        <img :src="userInfo.wxFacePath" />
                    </div>
                </template>
            </van-pull-refresh>
        </div>
        <div class="chat-footer">
            <div class="footer-add-img"></div>
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
import { list as listChat } from '../../svc/wst/Chat';
import WSocket from '../../socket.js';
import { clearTimeout } from 'timers';
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
            toUserInfo: {
                id: null,
                name: null,
                face: null,
            },

            inputValue: null,
            chatInfo: [],
            isLoading: false,
            pageNum: 0,
            mySetInterval: null,
            myHeight: 0,
            MySetTimeOut: null,
            divHeight: 0,
            isDown: true, // 滚动条是否在最下面
            finished: false,
        };
    },
    computed: {
        userInfo() {
            return this.$store.getters.user;
        },
        chatList() {
            return this.$store.getters.chatList;
        },
    },
    watch: {
        myHeight: newClienHeight => {
            document.getElementById('chat-centent').scrollTop = document.getElementById('chat-centent').scrollHeight;
        },
        divHeight: function(newV, oldV) {
            //这里不使用箭头函数是为了能获取到this
            if (this.isDown) {
                document.getElementById('chat-centent').scrollTop = document.getElementById(
                    'chat-centent'
                ).scrollHeight;
            }
        },
    },
    methods: {
        onRefresh() {
            if (this.finished) {
                setTimeout(() => {
                    this.isLoading = false;
                }, 500);
            } else {
                // 设置滚动条不要滚到最下面
                this.isDown = false;
                setTimeout(() => {
                    const params = {
                        pageNum: this.pageNum + 1,
                        fromUserId: this.$store.getters.user.id,
                        toUserId: this.toUserInfo.id,
                    };

                    listChat({
                        params,
                        onSuccess: data => {
                            if (data.pages === data.pageNum || data.pages < data.pageNum) {
                                // 数据全部加载完成
                                this.finished = true;
                            } else {
                                this.finished = false;
                            }
                            this.pageNum = data.pageNum;
                            let arr = data.list.sort((a, b) => {
                                return a.id - b.id;
                            });
                            this.$store.getters.chatList.unshift(...arr);
                            this.isLoading = false;
                        },
                        onFinish: () => {},
                    });
                }, 500);
            }
        },
        computeHeight() {
            this.$store.scrollInterval = setInterval(() => {
                this.myHeight = document.getElementById('chat-centent').clientHeight;
                this.divHeight = document.getElementsByClassName('van-pull-refresh__track')[0].offsetHeight;
            }, 100);
        },
        handleLoad() {
            if (this.finished) {
                return;
            }
            const params = {
                pageNum: this.pageNum + 1,
                fromUserId: this.$store.getters.user.id,
                toUserId: this.toUserInfo.id,
            };

            listChat({
                params,
                onSuccess: data => {
                    this.pageNum = data.pageNum;
                    if (data.pages === data.pageNum || data.pages < data.pageNum) {
                        // 数据全部加载完成
                        this.finished = true;
                    } else {
                        this.finished = false;
                    }
                    let arr = data.list.sort((a, b) => {
                        return a.id - b.id;
                    });
                    this.$store.getters.chatList.push(...arr);
                    this.MySetTimeOut = setTimeout(() => {
                        this.isLoading = false;
                        document.getElementById('chat-centent').scrollTop = document.getElementById(
                            'chat-centent'
                        ).scrollHeight;
                    }, 500);
                },
                onFinish: () => {},
            });
        },

        inputFocus() {
            // 设置滚动条在最下面
            this.isDown = true;
        },
        inputBlur() {},
        handleBack(e) {
            clearInterval(this.$store.scrollInterval);
            this.$router.go(-1);
        },
        websoketsend() {
            //连接建立之后执行send方法发送数据
            if (this.inputValue == null) return;
            let actions = {
                fromUserId: this.$store.getters.user.id,
                toUserId: this.$route.params.id,
                msg: this.inputValue,
            };
            WSocket.send(actions);
            // 将消息添加到本地列表
            let localData = {
                fromUserId: this.$store.getters.user.id,
                toUserId: this.$route.params.id,
                content: this.inputValue,
                id: new Date().getTime(),
            };
            this.$store.getters.chatList.push(localData);
            //清除input
            this.inputValue = null;
            // 让input获得焦点
            document.getElementById('inputNode').focus();
            //修改消息列表
            this.$store.getters.msgList.map(item => {
                if (
                    (item.toUserId === actions.toUserId && item.fromUserId === actions.fromUserId) ||
                    (item.toUserId === actions.fromUserId && item.fromUserId === actions.toUserId)
                ) {
                    item.content = actions.msg;
                }
            });
        },
        websoketclose(e) {
            console.log('关闭');
            //关闭
            console.log('断开连接', e);
        },
    },
    activated() {
        this.computeHeight();
        this.$store.dispatch('setChatList', []);
        this.pageNum = 0;
        this.isLoading = false;
        this.finished = false;
        this.toUserInfo = {
            id: this.$route.params.id,
            name: this.$route.params.name,
            face: this.$route.params.userWxfacePath,
        };
        this.handleLoad();
    },
};
</script>
<style lang="less" >
body,
html {
    height: 100%;
}
.chat {
    height: 100vh;

    display: flex;
    flex-direction: column;
    &-header {
        height: 1.2rem;
        background: #fafafa;
        width: 100%;
        span {
            font-size: 0.5rem;
        }
    }
    &-centent {
        height: 5rem;
        overflow-y: scroll;
        background: white;
        flex-grow: 2;
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
                width: 1.2rem;
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
        height: 1.4rem;
        background: #e4e1e1;
        width: 100%;
        display: flex;
        //background: #fafafa;
        align-items: center;
        .footer-add-img {
            width: 0.6rem;
            height: 0.6rem;
            font-size: 0.4rem;
            margin: 0 0.3rem 0 0.3rem;
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
                background: #aacee4;
                font-size: 0.4rem;
                border-radius: 0.2rem;
                border: none;
                margin: 0 0.2rem 0.4rem 0.3rem;
            }
        }
    }
}
</style>