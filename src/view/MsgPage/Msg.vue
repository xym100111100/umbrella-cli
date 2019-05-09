<template>
  <van-search
    placeholder="请输入搜索关键词"
    v-model="value"
  />
</template>

<script>
import { Search } from 'vant';
export default {
    components: {
        [Search.name]: Search,
    },
    data() {
        return { value: undefined };
    },
};
</script>
