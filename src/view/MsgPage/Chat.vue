<template>
    <div class="msg">
        <header>
            <div class="msg-header">
                <van-nav-bar v-bind:title="name" v-on:click-left="handleBack" left-arrow>
                    <van-icon size="0.8rem" slot="right" />
                </van-nav-bar>
            </div>
        </header>

        <div class="msg-centent" id="msg-content">
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
                <span>最后</span>
            </div>
        </div>

        <div class="msg-footer">
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
import { NavBar, Button, Field, Icon, Search, Cell, CellGroup } from 'vant';
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
        [Icon.name]: Icon,
        [Button.name]: Button,
    },
    data() {
        return {
            id: this.$route.params.id,
            name: this.$route.params.name,
            websocket: null,
            inputValue: null,
        };
    },
    updated() {
        this.$nextTick(function() {});
        console.log('---11---');
    },
    created() {
        // this.initwebsoket();
        console.log('---22---');
    },
    destroyed() {
        this.websocket.close(); //离开路由之后断开websoket连接
    },
    methods: {

        handleScroll(e) {
            const scrollTop = e.target.scrollTop;
            // 与PullRefresh的下拉刷新不产生冲突
            this.isDisabledPullRefresh = scrollTop > 0;
            // 是否显示回到顶部
            this.isShowTop = true;
        },
        addImg() {
            console.log('0000');
            console.log((document.getElementById('msg-content').style.height = 250 + 'px'));
            document.getElementById('msg-content').scrollTop = document.getElementById('msg-content').offsetHeight;
        },
        inputFocus() {
            let centent = document.getElementById('msg-content');
            centent.style.height = 8.5 + 'rem';
            document.getElementById('msg-content').scrollTop =
                document.getElementById('msg-content').offsetHeight + 1000;
        },
        inputBlur() {
            let centent = document.getElementById('msg-content');
            centent.style.height = 16 + 'rem';
            document.getElementById('msg-content').offsetHeight;
        },
        handleBack(e) {
            this.$router.go(-1);
        },
        initwebsoket() {
            console.log('初始化');
            //初始化weosocket
            const wsuri = 'ws://192.168.43.162:8080/chat';
            this.websocket = new WebSocket(wsuri);
            this.websocket.onmessage = this.websoketonmessage;
            this.websocket.onopen = this.websoketonopen;
            this.websocket.onerror = this.websoketonerror;
            this.websocket.onclose = this.websoketclose;
        },
        websoketonopen() {
            console.log('打开连接');
        },
        websoketonerror() {
            console.log('重连');
            //连接建立失败重连
            //  this.initwebsoket();
        },
        websoketonmessage(e) {
            console.log('接收');
            //数据接收
            const data = JSON.parse(e.data);
            if (data.id != undefined) {
                let test = JSON.parse(data.id);
                console.log(test);
                let parent = document.getElementById('msg-content');
                // 创建文字内容节点
                let spanNode = document.createElement('span');
                let textNode = document.createTextNode(test.msg);
                spanNode.appendChild(textNode);
                // 创建头像
                let imgNode = document.createElement('img');
                imgNode.src =
                    'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoM1LKFPNSBQA4iaeuHQuibYIicA/132';
                // 创建内容节点
                let divNode = document.createElement('div');
                divNode.className = 'centent-node-you';
                // 将头像和文字节点添加进去
                divNode.appendChild(imgNode);
                divNode.appendChild(spanNode);
                // 将整个内容添加进去父亲节点
                parent.appendChild(divNode); //向p追加此文本节点

                // 将焦点依然放在输入框中
                document.getElementById('inputNode').focus();
            }
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
        this.id = this.$route.params.id;
        this.name = this.$route.params.name;
        document.getElementById('msg-content').scrollTop = document.getElementById('msg-content').offsetHeight;
    },
};
</script>
<style lang="less" >
body,
html {
    height: 100%;
}
.msg {
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
        height: 80%;
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