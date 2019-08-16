<template>
   
        <van-swipe-cell :on-close="onClose">
            <template slot="left">
                <van-button square type="primary" text="选择" />
            </template>

            <van-cell :border="true" title="单元格" value="内容" />

            <template slot="right">
                <van-button square type="danger" text="删除" />
            </template>
        </van-swipe-cell>
   
</template>

<script>
import { SwipeCell, Cell } from 'vant';

export default {
    components: {
        [SwipeCell.name]: SwipeCell,
        [Cell.name]: Cell,
    },
    data() {
        return {};
    },
    mounted() {},
    methods: {
        onClose(clickPosition, instance) {
            switch (clickPosition) {
                case 'left':
                case 'cell':
                case 'outside':
                    instance.close();
                    break;
                case 'right':
                    Dialog.confirm({
                        message: '确定删除吗？',
                    }).then(() => {
                        instance.close();
                    });
                    break;
            }
        },
    },
    activated() {},
};
</script>

<style lang="less">
html,
body {
    height: 100%;
}
.text {
    background: red;
    height: 50%;
    overflow: scroll;
}
</style>
