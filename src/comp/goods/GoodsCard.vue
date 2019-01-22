<template>
  <div
    class="goods-card"
    @click="handleGo"
  >
    <goods-card-1
      v-if="columnCount==1"
      :item="item"
    />
    <goods-card-2
      v-else-if="columnCount==2"
      :item="item"
    />
  </div>
</template>
<script>
import Vue from 'vue';
import GoodsCard1 from './GoodsCard1.vue';
import GoodsCard2 from './GoodsCard2.vue';

// 注册组件
Vue.component('goods-card');

export default {
    name: 'goods-card',
    components: {
        GoodsCard1,
        GoodsCard2,
    },
    props: {
        item: Object, // 当前商品的信息
        columnCount: String, // 列数，目前只支持1和2
    },
    methods: {
        handleGo: function() {
            this.$router.push('/goods-detail');
        },
    },
};
</script>
