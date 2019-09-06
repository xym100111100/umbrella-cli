<template>
    <div>
        <van-notice-bar text="通知内asdfffadadsfsdafsdafsdafsdafafdasfdasfds容" left-icon="volume-o" >

        </van-notice-bar>
    </div>
</template>

<script>
import { NoticeBar } from 'vant';
import schoolData from '../../util/SchoolData';

export default {
    components: {
        [NoticeBar.name]: NoticeBar,
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
