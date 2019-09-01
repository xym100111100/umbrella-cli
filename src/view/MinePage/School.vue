<template>
    <div>
        <van-area
            @cancel="$router.go(-1)"
            @confirm="confirm"
            :area-list="schollData"
            :columns-num="2"
            title="我的大学"
        />
    </div>
</template>

<script>
import { NavBar, Dialog, Area } from 'vant';
import  schoolData   from '../../util/SchoolData';

export default {
    components: {
        [NavBar.name]: NavBar,
        [Area.name]: Area,
        [Dialog.name]: Dialog,
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
