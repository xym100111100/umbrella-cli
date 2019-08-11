<template>
  <div class="dy-cell">
    <div class="cell-left">
      <van-icon color="#7bbfea"  v-bind:name="MyIcon" />
    </div>
    <div class="cell-right" v-bind:class="{isBootomLine:isBootomLine}"  >
      <div class="right-content">{{content}}</div>
      <div class="right-icon">
        <van-icon name="qianjin" />
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant';
export default {
    components: {
        [Icon.name]: Icon,
    },
    name: 'DyCell',
    props: {
        content: String,
        isLeft: {
            type: Boolean,
            default: false,
        },
        isBootomLine: {
            type: Boolean,
            default: true,
        },
        MyIcon: String,
    },
};
</script>
<style lang="less" scoped>
.dy-cell {
    display: flex;
    align-items: center;
    font-size: 0.6rem;
    background: white;
    font-family: PingFang-SC-Regular, Helvetica Neue, Helvetica, microsoft yahei, sans-serif;

    .cell-left {
        padding: 0.05rem 0.2rem 0 0.35rem;
    }
    .cell-right {
        display: flex;
        flex-grow: 2;
        justify-content: space-between;
        .right-content {
            display: flex;
            align-items: center;
            font-size: 0.4rem;
            color: #323233;
            padding: 0.3rem 0;
        }
        .right-icon {
            font-size: 0.7rem;
            color: #969799;
            padding: 0.2rem 0.3rem 0 0;
        }
    }
}
.isBootomLine {
    border-bottom: 0.02667rem solid #ebedf0;
}
</style>
