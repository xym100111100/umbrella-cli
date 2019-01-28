<template>
  <!-- 测试sticky -->
  <div class="root">
    <div class="aaa">aaa</div>
    <div class="bbb">bbb</div>
    <div class="ccc">ccc</div>
    <div class="ddd">ddd</div>
    <div class="eee">eee</div>
  </div>
</template>

<style lang="less">
.root {
    height: 100vh;
}
.aaa,
.bbb,
.ccc,
.ddd,
.eee {
    border: 1px solid black;
    height: 300px;
}
.bbb {
    position: sticky;
    top: 0;
}
</style>
