<template>
    <div>
        <van-nav-bar
            title="我的小店"
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
           this.$router.push({name:'school'})
        },
    },

};
</script>

<style lang="less" scoped>
.van-nav-bar {
    &__right {
        bottom: -0.1rem;
        .van-nav-bar__text {
            font-size: 0.4rem;
            color: #499df1;
        }
    }
}
</style>
