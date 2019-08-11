<template>
  <div class="more-goods-view">
    <div class="goods-navbar">
      <div class="callback" @click="onClickLeft">
        <van-icon color="#fafafa" name="back" />
      </div>
      <div id="heihgtText"   @scroll="handelScroll"  class=" wrap like-item">
        <ul>
          <li>毛衣</li>
          <li>衬衫</li>
          <li>鞋子</li>
          <li>羽绒服</li>
          <li>运动装</li>
          <li>毛衣</li>
          <li>衬衫</li>
          <li>鞋子</li>
          <li>羽绒服</li>
          <li>运动装</li>
          <li>毛衣</li>
          <li>衬衫</li>
          <li>鞋子</li>
          <li>羽绒服</li>
          <li>运动装</li>
          <li>毛衣</li>
          <li>衬衫</li>
          <li>鞋子</li>
          <li>羽绒服</li>
          <li>运动装</li>
          <li>毛衣</li>
          <li>衬衫</li>
          <li>鞋子</li>
          <li>羽绒服</li>
          <li>运动装</li>
        </ul>
      </div>
      <div class="more">
        <van-icon color="#fafafa" name="down" />
      </div>
    </div>
    <div class="goods-list"></div>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs, Icon } from 'vant';

export default {
    components: {
        [NavBar.name]: NavBar,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Icon.name]: Icon,
    },
    beforeRouteLeave(to, from, next) {
        this.scrollTop = document.querySelector('.wrap').scrollTop;
        //保存滚动条元素div的scrollTop值
        next();
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            document.querySelector('.wrap').scrollTop = vm.scrollTop;
            // 为div元素重新设置保存的scrollTop值
        });
    },
    data() {
        return {
            active: 0,
        };
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        handelScroll(event){
            console.log(event) 
        }
    },
};
</script>

<style lang="less" scoped>
body,
html {
    height: 100%;
}
.more-goods-view {
    display: flex;
    overflow: scroll;
    background-color: #fafafa;
    flex-direction: column;
    background: yellow;
    .goods-navbar {
        height: 1.3rem;
        background: linear-gradient(to right, rgb(241, 101, 50), red);
        display: flex;
        border-bottom: 1px solid #ededed;
        color: #fafafa;
        .callback {
            display: flex;
            align-items: center;
            padding: 0 0.2rem 0.15rem 0.2rem;
        }
        .like-item {
            overflow-x: scroll;
            flex-grow: 1;
            ul {
                display: flex;
                align-items: center;
                height: 100%;
                li {
                    margin: 0 0.4rem;
                    font-size: 0.45rem;
                    white-space: nowrap;
                }
            }
        }
        .more {
            display: flex;
            align-items: center;
            padding: 0 0.2rem 0.15rem 0.2rem;
        }
    }
    .goods-list {
        height: 20rem;
        width: 2rem;
        background: red;
    }
}
</style>


