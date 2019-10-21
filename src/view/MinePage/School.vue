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
import { modify } from '../../svc/suc/User';

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
        modifySchoolName(name) {
            const data = {
                id: this.$store.getters.user.id,
                schoolName: name,
            };
            modify({
                data,
                onSuccess: result => {
                    console.log(result);
                },
                onFail: (code, msg) => {
                    //console.log(code);
                    //  console.log('请求失败');
                    // done();
                },
            });
        },
        confirm(data) {
            Dialog.confirm({
                title: '温馨提示',  
                message: '大学只能选择一次，是否确认?',
            })
                .then(() => {
                    this.$store.getters.user.schoolName = data[1].name;
                    this.modifySchoolName(data[1].name);
                    this.$router.push({ name: 'home', params: { load: true } });
                })
                .catch(() => {
                    Toast('您还未选择您的大学');
                });
        },
    },
};
</script>


