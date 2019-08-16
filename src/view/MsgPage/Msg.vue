<template>
    <div class="msg">
        <header>
            <div class="msg-header">
                <van-nav-bar title="name"  >
                </van-nav-bar>
            </div>
        </header>
        <div class="msg-content">
            <ul>
                <li
                    v-for="(item,index) in chatDataList"
                    :class="{move:candelete.id==item.id}"
                    @touchstart="touchStart(item)"
                    @touchend="touchEnd(item)"
                    :key="item.id"
                >
                    <div class="content-item">
                        <div class="item-right" @click="contact(item.id,item.name)">
                            <div class="right-user-face">
                                <img
                                    src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoM1LKFPNSBQA4iaeuHQuibYIicA/132"
                                />
                            </div>
                        </div>
                        <div class="item-left">
                            <div class="left-content">
                                <div class="content-top">
                                    <p>{{item.name}}</p>
                                    <p>2019-03-16</p>
                                </div>
                                <div class="content-bottom">
                                    <p>{{item.text}}</p>
                                </div>
                            </div>
                            <div class="left-del" @click.prevent="deleteItem(index)">
                                <p>删除</p>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { Search, Icon, NavBar, Cell, CellGroup } from 'vant';
import Test from './Text.vue';
import WSocket from '../../socket.js';
import { getChatInfo } from '../../svc/Chat';
export default {
    components: {
        [Search.name]: Search,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
        Test,
    },

    data() {
        return {
            // 数据
            message: 'ss',
            messages: this.chatInfo(),
            dataInfo: [],
            clientNum: {}, // 记录开始滑动（x1）,结束滑动（x2）的鼠标指针的位置
            candelete: {}, // 滑动的item
        };
    },
    computed: {
        chatDataList() {
            return this.dataInfo.filter(function(data) {
                if (data.text.length > 20) {
                    data.text = data.text.slice(1, 20) + '...';
                    return data;
                } else {
                    return data;
                }
            });
        },
        user() {
            return this.$store.getters.user;
        },
    },
    mounted() {
        WSocket.init(
            { user: this.user },
            message => {
                console.log(message);
                this.setMsgCount(message);
            },
            error => {
                console.log(error);
            }
        );
    },

    beforeCreate() {
        console.log('beforeCreate');
    },
    beforeMounted() {
        console.log('beforeCreate');
    },
    beforeUpdate() {
        console.log('beforeUpdate');
    },
    updated() {
        console.log('updated');
    },
    beforeDestroy() {
        console.log('beforeDestroy');
    },
    methods: {
        chatInfo() {
            getChatInfo({
                onSuccess: data => {
                    console.log(data);
                    this.dataInfo = data.list;
                },
            });
        },

        setMsgCount(message) {
            // 判断消息列表中是否有该用户
            // let chatUser = this.chatDataList.filter(chatItem => {
            //     return chatItem.target._id == message.from;
            // });
            // // console.log(chatUser);
            // // 如果存在， count + 1 并将消息保存在列表中
            // if (chatUser.length > 0) {
            //     chatUser[0].count++;
            //     chatUser[0].message.push({
            //         msg: message.msg,
            //         source: 'other',
            //     });
            //     this.saveMsg(chatUser[0].target, chatUser[0].count, chatUser[0].message);
            // } else {
            //     // 如果不存在， 那么获取用户信息 并现实提醒
            //     this.getUserInfo(message);
            // }
        },
        getUserInfo(message) {
            // 根据id查询用户信息
            // this.$axios(`/api/users/${message.from}`).then(res => {
            //     // console.log(res.data);
            //     const msg = [];
            //     msg.push({
            //         msg: message.msg,
            //         source: 'other',
            //     });
            //     // 将消息保存在聊天列表中 count为1
            //     this.chatDataList.push({
            //         target: res.data,
            //         count: 1,
            //         message: msg,
            //     });
            //     this.saveMsg(res.data, 1, msg);
            // });
        },
        // 保存方法
        saveMsg(targetUser, count, msg) {
            // const messageObj = {
            //     target: {
            //         avatar: targetUser.avatar,
            //         name: targetUser.name,
            //         _id: targetUser._id,
            //     },
            //     count: count,
            //     message: msg,
            //     user_id: this.user.id,
            // };
            // this.$axios.post('/api/profile/addmsg', messageObj).then(res => {
            //     console.log('数据保存成功');
            // });
        },
        contact(id, name) {
            this.$router.push({ name: 'msg-chat', params: { id: id, name: name } });
        },
        /**
         * 删除item
         * index是下标
         */
        deleteItem(index) {
            this.dataInfo.splice(index, 1);
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
        z-index: 99;
        span {
            font-size: 0.5rem;
        }
    }
    &-content {
        position: absolute;
        width: 100%;
        top: 1.2rem;
        .content-item {
            display: flex;
            align-items: center;
            padding: 0 0 0.1rem 0.3rem;
            .item-right {
                .right-user-face {
                    line-height: 1.2rem;
                    height: 1.2rem;
                    img {
                        height: 1.2rem;
                        border: #fff 1px solid;
                        border-radius: 20%;
                        padding: 0;
                        margin: 0;
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
</style>