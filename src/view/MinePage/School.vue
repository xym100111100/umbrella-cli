<template>
    <div>
        <van-area
            @confirm="confirm"
            :area-list="schollData"
            :columns-num="2"
            title="我的大学"
            cancel-button-text=" "
        />
    </div>
</template>

<script>
import { NavBar, Toast, Dialog, Area } from 'vant';
import schoolData from '../../util/SchoolData';

export default {
    components: {
        [NavBar.name]: NavBar,
        [Area.name]: Area,
        [Dialog.name]: Dialog,
        [Toast.name]: Toast,
    },
    data() {
        return {
            schollData: schoolData(),
        };
    },
    beforeRouteEnter(to, from, next) {
        Toast('您还未选择您的大学');
        next();
    },
    methods: {
        confirm(data) {
            console.log(data);
            Dialog.confirm({
                title: '温馨提示',
                message: '大学只能选择一次，是否确认?',
            })
                .then(() => {
                    this.$router.push({ name: 'home' });
                })
                .catch(() => {
                    Toast('您还未选择您的大学');
                });
        },
    },
};
</script>


