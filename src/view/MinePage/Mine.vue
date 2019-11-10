<template>
    <div id="user-box" class="user-box">
        <header>
            <div class="user-header">
                <div class="header-face">
                    <img :src="userInfo.wxFacePath" />
                </div>
                <div class="header-name">
                    <div>{{userInfo.wxName}}</div>
                    <div class="school">
                        <van-icon size="0.45rem" color="white" name="dizhi" />
                        <span>桂林理工大学</span>
                    </div>
                </div>
                <div @click="showPopup" class="header-setting">
                    <van-icon size="0.6rem" color="white" name="yiwen" />
                </div>
            </div>
        </header>
        <div class="user-content">
            <van-popup v-model="show" position="top" :style="{ height: '20%' }">
                <div class="content-popup">
                    <div class="popup-header">
                        <div class="header-icon">
                            <van-icon size="0.5rem" color="#a09dd4" name="zhuyi" />
                        </div>
                        <div class="heander-text">为保障信息安全，所有学生只能浏览选择的学校信息，如学校选择错误需要修改，请提交请求与修改原因。</div>
                    </div>
                </div>
            </van-popup>
            <DyCell color="#7bbfea" MyIcon="928shouxi" content="赏金猎人" :goPath="this.TempClose" />
            <DyCell
                color="#7bbfea"
                MyIcon="shouye2"
                content="我的闲置"
                :goPath="()=>this.$router.push({name:'shop', params: { load:true, }})"
            />
            <DyCell
                color="#7bbfea"
                MyIcon="fabuxuqiu"
                content="失物招领"
                :goPath="()=>this.$router.push({name:'notice', params: { load:true, }})"
            />
            <DyCell
                :isBootomLine="false"
                color="#7bbfea"
                MyIcon="jianzhi"
                content="需求公告"
                :goPath="()=>this.$router.push({name:'portTimeJop', params: { load:true, }})"
            />
        </div>
    </div>
</template>

<script>
import { Row, Col, Cell, Popup, Icon, Toast } from 'vant';
import DyCell from '../../comp/common/DyCell.vue';

export default {
    components: {
        [Row.name]: Row,
        [Col.name]: Col,
        [Cell.name]: Cell,
        [Toast.name]: Toast,
        DyCell,
        [Popup.name]: Popup,

        [Icon.name]: Icon,
    },
    data() {
        return {
            id: this.$route.params.id,
            show: false,
        };
    },
    filters: {
        filtersUID(data) {
            if (data.length > 7) {
                return data.substr(0, 7);
            }
            return data;
        },
    },
    computed: {
        userInfo() {
            return this.$store.getters.user;
        },
    },
    methods: {
        showPopup() {
            this.show = true;
        },
        TempClose() {
            this.$toast({ message: '服务暂时关闭咯~~~~~', position: 'top' });
        },
        willOpen() {
            this.$toast({ message: '暑假还没到呢~~~~~', position: 'top' });
        },
    },
};
</script>

<style lang="less" scoped>
body,
html {
    height: 100vh;
}
.user-box {
    background: #f2f2f2;
}
.user {
    &-header {
        height: 2.4rem;
        display: flex;
        align-items: center;
        background-image: linear-gradient(to right, rgba(170, 234, 240, 0.514), #7bbfea);

        padding: 0.2rem 0 0.6rem;
        .header-face {
            height: 1.5rem;
            width: 1.5rem;
            margin-left: 0.5rem;
        }

        .header-face img {
            height: 1.5rem;
            width: 1.5rem;
            border-radius: 0.2rem;
        }

        .header-name {
            height: 1.5rem;
            align-items: center;
            flex-direction: column;
            margin-left: 0.3rem;
            font-size: 0.6rem;
            color: white;
        }

        .header-name .school {
            padding: 0.2rem 0 0 0;
            font-size: 0.4rem;
            color: white;
        }
        .header-setting {
            width: 1rem;
            flex-grow: 1;
            margin-right: 1rem;
            height: 2rem;
            text-align: right;
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
