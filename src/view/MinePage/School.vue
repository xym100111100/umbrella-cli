<template>
    <div>
        <van-nav-bar
            title="我的大学"
            right-text="按钮"
            left-arrow
            @click-left="$router.go(-1)"
            @click-right="onClickRight"
        />
    </div>
</template>

<script>
import { NavBar, Toast } from 'vant';
export default {
    components: {
        [NavBar.name]: NavBar,
        [Toast.name]: Toast,
    },
    data() {
        return {};
    },
    methods: {
        onClickLeft() {
            Toast('返回');
        },
        onClickRight() {
            Toast('按钮');
        },
    },

    beforeCreate() {
        console.log('-----1------beforeCreate1');
        console.log(document.getElementById('user-box'));
        console.log('-----1------beforeCreate1');
    },
    beforeMounted() {
        console.log('-----2------beforeCreate1');
        console.log(document.getElementById('user-box'));
        console.log('-----2------beforeCreate1');
    },
    beforeUpdate() {
        console.log('-----3------beforeUpdate1');
        console.log(document.getElementById('user-box'));
        console.log('-----3------beforeCreate1');
    },
    updated() {
        console.log('-----4------updated1');
        console.log(document.getElementById('user-box'));
        console.log('-----4------beforeCreate1');
    },
    beforeDestroy() {
        console.log('-----5------beforeDestroy1');
        console.log(document.getElementById('user-box'));
        console.log('-----5------beforeCreate1');
    },
};
</script>

<style lang="less" scoped>
.van-nav-bar {
    &__right {
        bottom: -0.1rem;
        .van-nav-bar__text {
            font-size: 0.4rem;
            color: #7bbfea;
        }
    }
}
</style>
