<template>
    <div class="driver-school">
        <van-nav-bar title="驾校简介" right-text="报名" left-arrow @click-left="$router.go(-1)" />
        <p>sss</p>
    </div>
</template>

<script>
import { NavBar } from 'vant';
import schoolData from '../../util/SchoolData';

export default {
    components: {
        [NavBar.name]: NavBar,
    },
    data() {
        return {
            schollData: schoolData(),
        };
    },
    methods: {
        confirm(data) {
            console.log(data);
            Dialog.confirm({
                title: '温馨提示',
                message: '大学只能选择一次，是否确认?',
            })
                .then(() => {
                    // on confirm
                })
                .catch(() => {
                    // on cancel
                });
        },
    },
};
</script>
<style lang="less" scoped>
body,
html {
    height: 100%;
    background: rgba(60, 47, 15, 0.0001);
}
.driver-school {
    height: 100vh;
    overflow: scroll;
}

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