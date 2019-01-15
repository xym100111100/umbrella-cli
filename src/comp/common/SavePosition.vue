<template>
  <!-- 能保存位置的组件 -->
  <div
    class="save-position"
    @scroll="scroll"
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
        scroll() {
            this.scrollTop = this.$refs.content.scrollTop;
        },
    },
    activated() {
        this.$refs.content.scrollTop = this.scrollTop;
    },
};
</script>
