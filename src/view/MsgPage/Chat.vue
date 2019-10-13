<template>
    <div class="chat">
        <div class="chat-header">
            <van-nav-bar
                v-bind:title="toUserInfo.name+String(myHeight)"
                v-on:click-left="handleBack"
                left-arrow
            >
                <van-icon size="0.8rem" slot="right" />
            </van-nav-bar>
        </div>

        <div class="chat-centent" id="chat-centent">
            <van-pull-refresh v-model="isLoading" @refresh="handleLoad">
                <template v-for="item in chatInfo">
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
                <!--    <div class="centent-node-you">
                    <img
                        src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoMjjGbIZlstK74IZk2tfkCGw/132"
                    />
                    <span id="num">就这点傻逼问题1</span>
                </div>
                <div class="centent-node-you">
                    <img
                        src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoMjjGbIZlstK74IZk2tfkCGw/132"
                    />
                    <span id="num">就这点傻逼问题2</span>
                </div>
                <div class="centent-node-you">
                    <img
                        src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoMjjGbIZlstK74IZk2tfkCGw/132"
                    />
                    <span id="num">就这点傻逼问题3</span>
                </div>
                <div class="centent-node-you">
                    <img
                        src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoMjjGbIZlstK74IZk2tfkCGw/132"
                    />
                    <span id="num">就这点傻逼问题4</span>
                </div>
                <div class="centent-node-you">
                    <img
                        src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoMjjGbIZlstK74IZk2tfkCGw/132"
                    />
                    <span id="num">就这点傻逼问题5</span>
                </div>
                <div class="centent-node-you">
                    <img
                        src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoMjjGbIZlstK74IZk2tfkCGw/132"
                    />
                    <span id="num">就这点傻逼问题6</span>
                </div>
                <div class="centent-node-you">
                    <img
                        src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoMjjGbIZlstK74IZk2tfkCGw/132"
                    />
                    <span id="num">就这点傻逼问题7</span>
                </div>
                <div class="centent-node-you">
                    <img
                        src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoMjjGbIZlstK74IZk2tfkCGw/132"
                    />
                    <span id="num">就这点傻逼问题8</span>
                </div>
                <div class="centent-node-you">
                    <img
                        src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoMjjGbIZlstK74IZk2tfkCGw/132"
                    />
                    <span id="num">就这点傻逼问题9</span>
                </div>
                <div class="centent-node-you">
                    <img
                        src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoMjjGbIZlstK74IZk2tfkCGw/132"
                    />
                    <span id="num">就这点傻逼问题10</span>
                </div>
                <div class="centent-node-you">
                    <img
                        src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoMjjGbIZlstK74IZk2tfkCGw/132"
                    />
                    <span id="num">就这点傻逼问题11</span>
                </div>
                <div class="centent-node-you">
                    <img
                        src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoMjjGbIZlstK74IZk2tfkCGw/132"
                    />
                    <span id="num">就这点傻逼问题12</span>
                </div>
                <div class="centent-node-you">
                    <img
                        src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoMjjGbIZlstK74IZk2tfkCGw/132"
                    />
                    <span id="num">就这点傻逼问题13</span>
                </div>
                <div class="centent-node-you">
                    <img
                        src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoMjjGbIZlstK74IZk2tfkCGw/132"
                    />
                    <span id="num">就这点傻逼问题14</span>
                </div>
                <div class="centent-node-you">
                    <img
                        src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoMjjGbIZlstK74IZk2tfkCGw/132"
                    />
                    <span id="num">就这点傻逼111问题</span>
                </div>-->
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
        };
    },
    computed: {
        userInfo() {
            return this.$store.getters.user;
        },
    },
    watch: {
        myHeight: newClienHeight => {
            document.getElementById('chat-centent').scrollTop = document.getElementById('chat-centent').scrollHeight;
        },
    },

    methods: {
        computeHeight() {
           this.$store.scrollInterval = setInterval(() => {
                this.myHeight = document.getElementById('chat-centent').clientHeight;
            }, 100);
        },
        handleLoad() {
            const params = {
                pageNum: this.pageNum + 1,
                fromUserId: this.$store.getters.user.id,
                toUserId: this.toUserInfo.id,
            };
            if (this.MySetTimeOut) {
                clearTimeout();
            }
            listChat({
                params,
                onSuccess: data => {
                    this.pageNum = data.pageNum;
                    let arr = data.list.sort((a, b) => {
                        return a.id - b.id;
                    });
                    this.chatInfo.push(...arr);
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

        inputFocus() {},
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
            //修改消息列表
            this.$store.getters.chatList.map(item => {
                if (item.toUserId === actions.toUserId || item.toUserId === actions.fromUserId) {
                    item.content = actions.msg;
                    return;
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
        this.chatInfo = [];
        this.pageNum = 0;
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