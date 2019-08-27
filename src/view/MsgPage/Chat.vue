<template>
    <div class="chat">
        <header>
            <div class="chat-header">
                <van-nav-bar v-bind:title="name" v-on:click-left="handleBack" left-arrow>
                    <van-icon size="0.8rem" slot="right" />
                </van-nav-bar>
            </div>
        </header>

        <div class="chat-centent" @scroll="moving" id="chat-content">
            <div class="centent-node-you">
                <img
                    src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoM1LKFPNSBQA4iaeuHQuibYIicA/132"
                />
                <span id="num">曾今有一份会</span>
            </div>
            <div class="centent-node-you">
                <img
                    src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoM1LKFPNSBQA4iaeuHQuibYIicA/132"
                />
                <span>在我的面前，我没有珍惜，如果上天再给我一次机会</span>
            </div>
            <div class="centent-node-you">
                <img
                    src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoM1LKFPNSBQA4iaeuHQuibYIicA/132"
                />
                <span>曾今有我的面前，我没有珍惜，如果上天再给我一次机会</span>
            </div>
            <div class="centent-node-you">
                <img
                    src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoM1LKFPNSBQA4iaeuHQuibYIicA/132"
                />
                <span>曾今有一份真挚的爱情放在我的面前，我没有珍惜，如果上天再给我一次机会</span>
            </div>
            <div class="centent-node-you">
                <img
                    src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoM1LKFPNSBQA4iaeuHQuibYIicA/132"
                />
                <span>曾今有一我没有次机会</span>
            </div>
            <div class="centent-node-you">
                <img
                    src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoM1LKFPNSBQA4iaeuHQuibYIicA/132"
                />
                <span>曾今有一份真挚的爱情会</span>
            </div>
            <div class="centent-node-you">
                <img
                    src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoM1LKFPNSBQA4iaeuHQuibYIicA/132"
                />
                <span>曾今有一份真挚的爱情放在再给我一次机会</span>
            </div>
            <div class="centent-node-you">
                <img
                    src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoM1LKFPNSBQA4iaeuHQuibYIicA/132"
                />
                <span>曾今有一份再会</span>
            </div>
            <div class="centent-node-you">
                <img
                    src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoM1LKFPNSBQA4iaeuHQuibYIicA/132"
                />
                <span>曾今有一份再会</span>
            </div>
            <div class="centent-node-you">
                <img
                    src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoM1LKFPNSBQA4iaeuHQuibYIicA/132"
                />
                <span>曾今有一份再会</span>
            </div>
            <div class="centent-node-you">
                <img
                    src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoM1LKFPNSBQA4iaeuHQuibYIicA/132"
                />
                <span>曾今有一份再会</span>
            </div>
            <div class="centent-node-you">
                <img
                    src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoM1LKFPNSBQA4iaeuHQuibYIicA/132"
                />
                <span>曾今有一份再会</span>
            </div>
            <div class="centent-node-you">
                <img
                    src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoM1LKFPNSBQA4iaeuHQuibYIicA/132"
                />
                <span>最后</span>
            </div>
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
import { NavBar, Button, Field, Icon, Search, List, Cell, CellGroup } from 'vant';
import { getAccountById, getPntAccount } from '../../svc/Mine';
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
    },
    data() {
        return {
            id: this.$route.params.id,
            name: this.$route.params.name,
            inputValue: null,
            list: [],
            loading: false,
            finished: false,
        };
    },
    updated() {
        console.log('updated');
    },
    created() {
        console.log('created');
    },
    destroyed() {
        console.log('destroyed');
    },
    methods: {
        moving(e) {
            console.log(e.target.scrollTop);
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
                }
            }, 500);
        },
        handleScroll(e) {
            const scrollTop = e.target.scrollTop;
            // 与PullRefresh的下拉刷新不产生冲突
            this.isDisabledPullRefresh = scrollTop > 0;
            // 是否显示回到顶部
            this.isShowTop = true;
        },
        addImg() {
            console.log('0000');
            console.log((document.getElementById('chat-content').style.height = 250 + 'px'));
            document.getElementById('chat-content').scrollTop = document.getElementById('chat-content').offsetHeight;
        },
        inputFocus() {
            let centent = document.getElementById('chat-content');
            centent.style.height = 8.5 + 'rem';
            document.getElementById('chat-content').scrollTop =
                document.getElementById('chat-content').offsetHeight + 1000;
        },
        inputBlur() {
            let centent = document.getElementById('chat-content');
            centent.style.height = 16 + 'rem';
            document.getElementById('chat-content').offsetHeight;
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
        span {
            font-size: 0.5rem;
        }
    }
    &-centent {
        //  display: flex;
        flex-direction: column;
        padding: 1.5rem 0 1.5rem;
        height: 100%;
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
                background: #cdd3c5;
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
                background: #84dd0f;
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