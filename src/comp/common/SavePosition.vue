<template>
  <!-- 能保存位置的组件 -->
  <div
    class="save-position"
    @scroll="handelScroll"
    ref="content"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
    name: 'save-position',
    data() {
        return {
            scrollTop: 0,
        };
    },
    methods: {
        /**
         * 处理本区块滚动事件
         */
        handelScroll() {
            // 记录滚动位置
            this.scrollTop = this.$refs.content.scrollTop;
            // 触发本组件自定义的滚动事件，将滚动位置传出去(目前自定义该事件是为了在PullRefresh中使用，让向上滚动与下拉刷新不要产生冲突)
            this.$emit('scroll', this.scrollTop);
        },
        /**
         * 滚动到顶部
         */
        goTop() {
            cancelAnimationFrame(timer);
            //获取当前毫秒数
            let startTime = +new Date();
            //获取当前页面的滚动高度
            let b = this.scrollTop;
            let d = 500;
            let c = b;
            let content = this.$refs.content;
            let timer = requestAnimationFrame(function func() {
                var t = d - Math.max(0, startTime - +new Date() + d);
                content.scrollTop = (t * -c) / d + b;
                timer = requestAnimationFrame(func);
                if (t == d) {
                    cancelAnimationFrame(timer);
                }
            });
        },
    },
    activated() {
        this.$refs.content.scrollTop = this.scrollTop;
    },
};
</script>
