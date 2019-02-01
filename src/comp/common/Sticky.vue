<template>
  <div class="sticky">
    <slot></slot>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { isSupportSticky } from '../../util/SysUtils.js';
import { getRelTop } from '../../util/DomUtils.js';
export default {
    name: 'sticky',
    data() {
        return { isSupportSticky: false };
    },
    mounted() {
        if (isSupportSticky(this.$el)) {
            // Toast('浏览器支持Sticky');
            this.isSupportSticky = true;
            this.$el.style.position = 'sticky';
            this.$el.style.top = '-0.03rem'; // 避免在chrome的iphone 6/7/8 plus中看到顶部还漏了一条缝
        } else {
            // Toast('浏览器不支持Sticky' + this.$el.offsetHeight);
            this.isSupportSticky = false;
            this.$el.style.position = 'relative';
            this.$el.style.top = 0;

            // 在本区块后面插入克隆的节点，初始时不显示，在组件往上滚超出范围的时候显示出来
            const cloneNode = this.$el.cloneNode(true);
            cloneNode.style.display = 'none';
            cloneNode.style.position = 'fixed';
            this.$el.after(cloneNode);

            const top = getRelTop(this.$el);

            // 监听父容器的scroll事件
            this.$el.parentNode.addEventListener('scroll', e => {
                const scrollTop = e.target.scrollTop;
                if (scrollTop - top >= 0) {
                    cloneNode.style.display = 'block';
                } else {
                    cloneNode.style.display = 'none';
                }
            });
        }
    },
};
</script>

<style lang="less" scoped>
.sticky {
    width: 100%;
    position: sticky;
    left: 0;
    right: 0;
    z-index: 999;
    will-change: display;
}
</style>
