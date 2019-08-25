<template>
    <div>
        <van-area
            @cancel="$router.go(-1)"
            @confirm="confirm"
            :area-list="areaList"
            :columns-num="2"
            title="我的大学"
        />
    </div>
</template>

<script>
import { NavBar, Dialog, Area } from 'vant';
export default {
    components: {
        [NavBar.name]: NavBar,
        [Area.name]: Area,
        [Dialog.name]: Dialog,
    },
    data() {
        return {
            areaList: {
                province_list: {
                    110000: '广西',
                    120000: '北京',
                },
                city_list: {
                    110100: '桂林理工大学',
                    110200: '广西大学',
                    110300: '桂林电子科技大学',
                    110400: '广西科技大学',
                    110500: '南宁学院',
                    110600: '广西电力职业技术学院',
                    110700: '广西大学',
                    120100: '清华大学',
                    120200: '北京大学',
                    120300: '中国人民大学',
                    120400: '北京师范学院',
                    120500: '北京航天工业大学',
                },
                county_list: {
                    110101: '东城区',
                    110102: '西城区',
                    110105: '朝阳区',
                    110106: '丰台区',
                    120101: '和平区',
                    120102: '河东区',
                    120103: '河西区',
                    120104: '南开区',
                    120105: '河北区',
                },
            },
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
