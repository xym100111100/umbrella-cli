<template>
    <div class="msg">
        <header>
            <div class="msg-header">
                <van-nav-bar title="消息"></van-nav-bar>
            </div>
        </header>
        <div id="msg-content" class="msg-content" @scroll="moving">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="handleLoad"
                :immediate-check="false"
            >
                <ul>
                    <li
                        v-for="(item,index) in msgList"
                        :class="{move:candelete.id==item.id}"
                        @touchstart="touchStart(item)"
                        @touchend="touchEnd(item)"
                        :key="item.id"
                        @click="contact(item)"
                    >
                        <div class="content-item">
                            <div class="item-right">
                                <div class="right-user-face">
                                    <div>
                                        <img :src="item.toUserWxfacePath" />
                                    </div>
                                    <div v-if="item.notReadCount > 0" class="right-user-msg">.</div>
                                </div>
                            </div>
                            <div class="item-left">
                                <div class="left-content">
                                    <div class="content-top">
                                        <p>{{item.toUserName}}</p>
                                        <p>{{item.fromTime|filtersTime}}</p>
                                    </div>
                                    <div class="content-bottom">
                                        <p>{{item.content}}</p>
                                    </div>
                                </div>
                                <div class="left-del" @click.stop="deleteItem(index)">
                                    <p>删除</p>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </van-list>
        </div>
    </div>
</template>

<script>
import { Search, Icon, NavBar, List, Cell, CellGroup } from 'vant';
import { getChatByUserId, cleanUnreadContent } from '../../svc/wst/Chat';
import WSocket from '../../socket.js';

export default {
    components: {
        [Search.name]: Search,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
        [List.name]: List,
    },

    data() {
        return {
            // 数据
            dataInfo: [],
            clientNum: {}, // 记录开始滑动（x1）,结束滑动（x2）的鼠标指针的位置
            candelete: {}, // 滑动的item
            loading: false,
            finished: true,
            scroll: 0,
            pageNum: 0,
        };
    },
    filters: {
        filtersTime(str) {
            return str.split(' ')[0];
        },
    },
    computed: {
        userInfo() {
            return this.$store.getters.user;
        },
        msgList() {
            return this.$store.getters.msgList.filter(function(data) {
                if (data.content.length > 20 && data.content.slice(data.content.length, 3) !== '...') {
                    data.content = data.content.slice(0, 20) + '...';
                    return data;
                } else {
                    return data;
                }
            });
        },
    },
    activated() {
        document.getElementById('msg-content').scrollTop = this.scroll;
        if (this.$store.scrollInterval) {
            clearInterval(this.$store.scrollInterval);
        }
    },
    mounted() {
        this.handleLoad();

        console.log('mounted');
        WSocket.init(
            { user: this.userInfo },
            message => {
                this.saveMsg(message);
            },
            error => {
                console.log(error);
            }
        );
    },
    methods: {
        moving(e) {
            this.scroll = e.target.scrollTop;
        },
        // 获取聊天数据
        handleLoad() {
            const params = { userId: this.$store.getters.user.id };
            getChatByUserId({
                params,
                onSuccess: data => {
                    this.$store.dispatch('setMsgList', data);
                },
                onFinish: () => {
                    // 结束加载状态
                    this.loading = false;
                },
            });
        },

        saveMsg(message) {
            // this.$store.getters.msgList.map(item => {
            //     if (
            //         (item.toUserId === message.toUserId && item.fromUserId === message.fromUserId) ||
            //         (item.toUserId === message.fromUserId && item.fromUserId === message.toUserId)
            //     ) {
            //         item.content = message.msg;

            //     }
            // });
            // this.$store.getters.active.msgCount = this.$store.getters.active.msgCount + 1;

            // 如果在聊天列表中了,就更新与那个用户的聊天记录
            this.$store.getters.msgList.map(item => {
                if (
                    (item.toUserId === message.toUserId && item.fromUserId === message.fromUserId) ||
                    (item.toUserId === message.fromUserId && item.fromUserId === message.toUserId)
                ) {
                    item.content = message.msg;
                    item.notReadCount = item.notReadCount + 1;
                }
            });
            // 如果是当前页面的聊天用户,就将该消息添加进去聊天消息中
            let chatList = this.$store.getters.chatList;
            for (let i = 0; i < chatList.length; i++) {
                if (
                    (chatList[i].toUserId === message.toUserId && chatList[i].fromUserId === message.fromUserId) ||
                    (chatList[i].toUserId === message.fromUserId && chatList[i].fromUserId === message.toUserId)
                ) {
                    let data = message;
                    data.content = message.msg;
                    data.id = new Date().getTime();
                    this.$store.getters.chatList.push(data);
                } else {
                    this.$store.getters.active.msgCount = this.$store.getters.active.msgCount + 1;
                }
                return;
            }
        },

        contact(item) {
            const id = this.$store.getters.user.id === item.fromUserId ? item.toUserId : item.fromUserId;
            this.$router.push({
                name: 'msg-chat',
                params: { id: id, name: item.toUserName, userWxfacePath: item.toUserWxfacePath },
            });

            // 将未读消息减去该条记录未读的数量,且将该条记录的未读数量设置为0
            if (item.notReadCount > 0) {
                this.$store.getters.msgList.map(data => {
                    if (item.id === data.id) {
                        this.$store.getters.active.msgCount = this.$store.getters.active.msgCount - data.notReadCount;
                        data.notReadCount = 0;
                    }
                });
                // 在数据库将当前用户对于该被点击的用户的未读消息全部设置为已读取

                const data = { toUserId: this.$store.getters.user.id, fromUserId: id };
                cleanUnreadContent({
                    data,
                    onSuccess: data => {
                        console.log(data);
                    },
                    onFinish: () => {
                        // 结束加载状态
                        this.loading = false;
                    },
                });
            }
        },
        /**
         * 删除item
         * index是下标
         */
        deleteItem(index) {
            this.$store.getters.msgList.splice(index, 1);
            // splice方法是删除数组某条数据，或者向某个位置添加数据
        },
        touchStart(item) {
            let touchs = event.changedTouches[0];
            // 记录开始滑动的鼠标位置
            this.clientNum.x1 = touchs.pageX;
            this.candelete = {};
        },
        touchEnd(item) {
            let touchs = event.changedTouches[0];
            // 记录结束滑动的鼠标位置
            this.clientNum.x2 = touchs.pageX;
            this.candelete = {};
            // 判断滑动距离大于50，判定为滑动成功，否则失败
            if (
                this.clientNum.x2 < this.clientNum.x1 &&
                Math.abs(this.clientNum.x1) - Math.abs(this.clientNum.x2) > 50
            ) {
                event.preventDefault();
                this.candelete = item;
            } else if (
                this.clientNum.x2 > this.clientNum.x1 &&
                Math.abs(this.clientNum.x2) - Math.abs(this.clientNum.x1) > 10
            ) {
                event.preventDefault();
                this.candelete = {};
            }
        },
    },
};
</script>
<style lang="less" scoped>
li {
    list-style: none;
    margin: 0;
    padding: 0;
}

img {
    vertical-align: top;
    border: none;
    margin: 0;
    padding: 0;
}

.msg {
    display: flex;
    flex-direction: column;
    &-header {
        background: #fafafa;
        border-bottom: 1px solid #ededed;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 99;
    }
    &-content {
        position: absolute;
        width: 100%;
        top: 1.2rem;
        height: 100%;
        overflow: scroll;
        .content-item {
            display: flex;
            align-items: center;
            padding: 0 0 0.1rem 0.3rem;
            .item-right {
                .right-user-face {
                    line-height: 1.2rem;
                    height: 1.2rem;
                    width: 1.2rem;
                    display: flex;
                    img {
                        height: 1.2rem;
                        border: #fff 1px solid;
                        border-radius: 20%;
                        padding: 0;
                        margin: 0;
                    }
                    .right-user-msg {
                        margin: -1.05rem 0 0 -0.3rem;
                        height: 0.2rem;
                        color: red;
                        font-size: 2rem;
                    }
                }
            }
            .item-left {
                border-bottom: 0.1px solid #e1e1e1;
                margin-left: 0.2rem;
                flex-grow: 2;
                .left-content {
                    .content-top {
                        display: flex;
                        padding-top: 0.3rem;
                        justify-content: space-between;
                        align-items: center;
                        p {
                            font-size: 0.4rem;
                            padding: 0;
                            margin: 0;
                        }
                        p:nth-child(2) {
                            padding: 0;
                            margin: 0;
                            color: #907777;
                            padding-right: 0.5rem;
                        }
                    }
                    .content-bottom {
                        p {
                            padding: 0;
                            margin: 0;
                            font-size: 0.35rem;
                            color: #907777;
                            padding: 0.1rem 0 0.2rem;
                            overflow: hidden;
                        }
                    }
                }
                .left-del {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.4rem;
                    position: absolute;
                    top: -0.1rem;
                    right: 0;
                    z-index: 3;
                    width: 1.5rem;
                    height: 100%;
                    line-height: 100%;
                    text-align: center;
                    color: #fff;
                    background-color: red;
                    transform: translateX(1.5rem); /*默认x轴位移60px，使其隐藏*/
                }
            }
        }
    }

    li {
        background: #fdfdfd;
        position: relative;
        transform: translateX(0);
        transition: all 0.3s; /*滑动效果更生动*/
        padding: 0;
        margin: 0;
    }
    ul {
        overflow-x: hidden; /*隐藏ul x轴的滚动条*/
        padding-bottom: 1.5rem;
        padding: 0;
        margin: 0;
    }
    li.move {
        transform: translateX(-1.5rem); /*滑动后x轴位移-1rem,使其可见*/
    }
}

.order-navbar {
    width: 100%;
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
.van-nav-bar__title {
    font-size: 0.5rem;
}
.van-nav-bar__right {
    .van-nav-bar__text {
        font-size: 0.4rem;
        color: #7bbfea;
    }
}
</style>