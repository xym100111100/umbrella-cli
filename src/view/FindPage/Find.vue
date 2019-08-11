<template>
  <div id="iems"  class="iems">
    <header>
      <div class="find-header">
        <van-search
          v-on:click="()=>selectGoods(2)"
          v-on:blur="()=>selectGoods(1)"
          input-align="center"
          background="#fafafa"
          v-bind:placeholder="goodsDates[0]"
        />
      </div>
    </header>
    <div class="find-content" v-if="selectGoodsStep==1">
      <div class="content-link">
        <ul id="link-item">
          <li v-for="(goods,index) in goodsList" :key="goods.id">
            <span v-on:click="chooseClass(index)">{{goods.class}}</span>
          </li>
        </ul>
      </div>
      <div class="wrap content-item" @scroll="handelScroll">
        <lazy-component>
          <div v-for="(i,goods) in goodsList" :key="goods.id">
            <div class="item-title" @click="moreGoods">
              <span>{{i.class}}</span>
              <span>
                查看更多
                <van-icon name="qianjin" color="#555555" />
              </span>
            </div>
            <div class="item-goods">
              <div class="goods-detail" v-for="img in i.imageList" :key="img.id">
                <img v-lazy="img.src" />

                <span>秋冬新品</span>
              </div>
            </div>
          </div>
        </lazy-component>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Search, TreeSelect, Icon, Lazyload } from 'vant';
import { getGoodsData } from '../../svc/onl/OnlOnlinePromo';
// Lazyload插件需要初始化
Vue.use(Lazyload, {
    lazyComponent: true,
});
export default {
    components: {
        [Search.name]: Search,
        [TreeSelect.name]: TreeSelect,
        [Lazyload.name]: Lazyload,
        [Icon.name]: Icon,
    },
    data() {
        return {
            selectGoodsStep: 1,
            scrollTop: 200,
            goodsDates:[],
            goodsList: [
                {
                    class: '手机',
                    imageList: [
                        { src: 'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg' },
                        { src: 'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg' },
                        { src: 'https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg' },
                        { src: 'https://img.yzcdn.cn/public_files/2017/09/05/fd08f07665ed67d50e11b32a21ce0682.jpg' },
                        { src: 'https://img.yzcdn.cn/public_files/2017/09/05/bac1903e863834ace25773f3554b6890.jpg' },
                        { src: 'https://img.yzcdn.cn/public_files/2017/09/05/138c32d4384b5e4a78dc4e1ba58e6a80.jpg' },
                        { src: 'https://img.yzcdn.cn/public_files/2017/09/05/100a7845756a70af2df513bdd1307d0e.jpg' },
                        { src: 'https://img.yzcdn.cn/public_files/2017/09/05/8a4f5be8289cb3a7434fc19a3de780a2.jpg' },
                        {
                            src:
                                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556169708244&di=2390f27b0710c1b09879b1eacabd9059&imgtype=0&src=http%3A%2F%2Fwww.windows7en.com%2Fuploads%2Fallimg%2F180721%2F0952431225-1.png',
                        },
                        {
                            src:
                                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556169708244&di=9397e16f7a1f1302b9ce2a7ceb8b7f40&imgtype=0&src=http%3A%2F%2Fimg19.3lian.com%2Fd%2Ffile%2F201801%2F06%2Ff7e3abfe00a8fa04fab36f8d9bf5fd96.png',
                        },
                        {
                            src:
                                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556169708244&di=361a21d6b15084a5c840d300a4ce8988&imgtype=0&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20140102%2F20140102152012-1928858752.jpg',
                        },
                        {
                            src:
                                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556169813753&di=2c09ffb81dc5c23c91690b385bbabdc5&imgtype=0&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20140127%2F20140127161522-938882140.jpg',
                        },
                        {
                            src:
                                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556169813752&di=5155cf06f993537dbd856ce817371523&imgtype=0&src=http%3A%2F%2Fimage02.71.net%2Fimage02%2F89%2F77%2F42%2F14%2Fd5c2f421-09a0-4646-ab63-94f7b84f04ea.jpg',
                        },
                        {
                            src:
                                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556169840502&di=7a05d3afb564133f8851e165a4038657&imgtype=0&src=http%3A%2F%2Fimg11.hc360.cn%2F11%2Fbusin%2F173%2F951%2Fb%2F11-173951171.jpg',
                        },
                        {
                            src:
                                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556169840502&di=4ede6c10f410809aef868a1a4a15fb8b&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fproduct%2F585889%2F20165%2F10%2F14628678552388760_800.jpg',
                        },
                        {
                            src:
                                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556169840502&di=4ede6c10f410809aef868a1a4a15fb8b&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fproduct%2F585889%2F20165%2F10%2F14628678552388760_800.jpg',
                        },
                        {
                            src:
                                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556169840501&di=721e7f908206191a6cc1ecb3cef930ab&imgtype=0&src=http%3A%2F%2Fimgnews.mumayi.com%2Ffile%2F2017%2F06%2F05%2F303d6dc5676913f5b8d02a48520a3812.jpg',
                        },
                        {
                            src:
                                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556169840501&di=431e20afa73aab89e3543b7d73ec8c56&imgtype=0&src=http%3A%2F%2Fpic3.womai.com%2Fupload%2F601%2F602%2F977817%2F595783%2F595783_2_pic500_8346.jpg',
                        },
                    ],
                },
                {
                    class: '鞋子',
                    imageList: [
                        { src: 'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg' },
                        { src: 'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg' },
                        { src: 'https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg' },
                        { src: 'https://img.yzcdn.cn/public_files/2017/09/05/fd08f07665ed67d50e11b32a21ce0682.jpg' },
                        { src: 'https://img.yzcdn.cn/public_files/2017/09/05/bac1903e863834ace25773f3554b6890.jpg' },
                        { src: 'https://img.yzcdn.cn/public_files/2017/09/05/138c32d4384b5e4a78dc4e1ba58e6a80.jpg' },
                        { src: 'https://img.yzcdn.cn/public_files/2017/09/05/100a7845756a70af2df513bdd1307d0e.jpg' },
                        { src: 'https://img.yzcdn.cn/public_files/2017/09/05/8a4f5be8289cb3a7434fc19a3de780a2.jpg' },
                        {
                            src:
                                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556169708244&di=2390f27b0710c1b09879b1eacabd9059&imgtype=0&src=http%3A%2F%2Fwww.windows7en.com%2Fuploads%2Fallimg%2F180721%2F0952431225-1.png',
                        },
                        {
                            src:
                                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556169708244&di=9397e16f7a1f1302b9ce2a7ceb8b7f40&imgtype=0&src=http%3A%2F%2Fimg19.3lian.com%2Fd%2Ffile%2F201801%2F06%2Ff7e3abfe00a8fa04fab36f8d9bf5fd96.png',
                        },
                        {
                            src:
                                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556169708244&di=361a21d6b15084a5c840d300a4ce8988&imgtype=0&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20140102%2F20140102152012-1928858752.jpg',
                        },
                        {
                            src:
                                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556169813753&di=2c09ffb81dc5c23c91690b385bbabdc5&imgtype=0&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20140127%2F20140127161522-938882140.jpg',
                        },
                        {
                            src:
                                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556169813752&di=5155cf06f993537dbd856ce817371523&imgtype=0&src=http%3A%2F%2Fimage02.71.net%2Fimage02%2F89%2F77%2F42%2F14%2Fd5c2f421-09a0-4646-ab63-94f7b84f04ea.jpg',
                        },
                        {
                            src:
                                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556169840502&di=7a05d3afb564133f8851e165a4038657&imgtype=0&src=http%3A%2F%2Fimg11.hc360.cn%2F11%2Fbusin%2F173%2F951%2Fb%2F11-173951171.jpg',
                        },
                        {
                            src:
                                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556169840502&di=4ede6c10f410809aef868a1a4a15fb8b&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fproduct%2F585889%2F20165%2F10%2F14628678552388760_800.jpg',
                        },
                        {
                            src:
                                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556169840502&di=4ede6c10f410809aef868a1a4a15fb8b&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fproduct%2F585889%2F20165%2F10%2F14628678552388760_800.jpg',
                        },
                        {
                            src:
                                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556169840501&di=721e7f908206191a6cc1ecb3cef930ab&imgtype=0&src=http%3A%2F%2Fimgnews.mumayi.com%2Ffile%2F2017%2F06%2F05%2F303d6dc5676913f5b8d02a48520a3812.jpg',
                        },
                        {
                            src:
                                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556169840501&di=431e20afa73aab89e3543b7d73ec8c56&imgtype=0&src=http%3A%2F%2Fpic3.womai.com%2Fupload%2F601%2F602%2F977817%2F595783%2F595783_2_pic500_8346.jpg',
                        },
                        {
                            src:
                                'https://t00img.yangkeduo.com/goods/images/2019-02-17/930fb89401af1a746571234ae07dd524.jpeg?imageMogr2/sharpen/1%7CimageView2/2/w/1300/q/70/format/webp',
                        },
                    ],
                },
                {
                    class: '帽子',
                    imageList: [
                        { src: 'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg' },
                        {
                            src:
                                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556169840501&di=721e7f908206191a6cc1ecb3cef930ab&imgtype=0&src=http%3A%2F%2Fimgnews.mumayi.com%2Ffile%2F2017%2F06%2F05%2F303d6dc5676913f5b8d02a48520a3812.jpg',
                        },
                        {
                            src:
                                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556169840501&di=431e20afa73aab89e3543b7d73ec8c56&imgtype=0&src=http%3A%2F%2Fpic3.womai.com%2Fupload%2F601%2F602%2F977817%2F595783%2F595783_2_pic500_8346.jpg',
                        },
                        {
                            src:
                                'https://t00img.yangkeduo.com/goods/images/2019-02-17/930fb89401af1a746571234ae07dd524.jpeg?imageMogr2/sharpen/1%7CimageView2/2/w/1300/q/70/format/webp',
                        },
                    ],
                },
                {
                    class: '零食',
                    imageList: [
                        { src: 'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg' },
                    ],
                },
            ],
            goodsData: this.handleLoad(),
        };
    },
    methods: {
        selectGoods(step) {
            this.goodsList.push({
                class: '人妖',
                imageList: [
                    { src: 'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg' },
                ],
            });
        },
        moreGoods(classId) {
            console.log('sss');
            this.$router.push('/more-goods');
        },
        handleLoad() {
            getGoodsData({
                onSuccess: data => {
                    this.goodsDates = data;
                },
            });
        },

        handelScroll(e) {
            // 记录滚动位置
            console.log(this.$store);
            console.log(document.getElementById('iems').clientHeight);
        },
        chooseClass(index) {
            //去掉所有li的背景颜色和其子节点去掉span的左边框样式。
            let contentItemlChildren = document.getElementById('link-item').children;
            for (let i = 0; i < contentItemlChildren.length; i++) {
                contentItemlChildren[i].style.background = 'none';
                contentItemlChildren[i].children[0].style.border = 'none';
                contentItemlChildren[i].children[0].style.color = '#666';
            }
            //将选中的li的设置背景颜色和其子节点span的左边框设置样式。
            let chooseContentItemlChildren = document.getElementById('link-item').children[index];
            chooseContentItemlChildren.style.background = 'white';
            chooseContentItemlChildren.children[0].style.borderLeft = 'solid 2px red';
            chooseContentItemlChildren.children[0].style.color = 'red';
        },
    },
    beforeCreate() {
        console.log('-----1------beforeCreate1');
        console.log(document.getElementById('iems'));
        console.log('-----1------beforeCreate1');
    },
    beforeMounted() {
        console.log('-----2------beforeCreate1');
        console.log(document.getElementById('iems'));
        console.log('-----2------beforeCreate1');
    },
    beforeUpdate() {
        console.log('-----3------beforeUpdate1');
        console.log(document.getElementById('iems').scrollTop = 200);
        console.log('-----3------beforeCreate1');
    },
    updated() {
        console.log('-----4------updated1');
        console.log(document.getElementById('iems').scrollTop = 200);
        console.log('-----4------beforeCreate1');
    },
    beforeDestroy() {
        console.log('-----5------beforeDestroy1');
        console.log(document.getElementById('iems'));
        console.log('-----5------beforeCreate1');
    },
};
</script>

<style lang="less" scoped>
.find {
    &-box {
        display: flex;
        flex-direction: column;
    }
    &-header {
        // background: linear-gradient(to right, rgb(241, 101, 50), red);
        background: #fafafa;
        border-bottom: 1px solid #ededed;
    }
    &-content {
        display: flex;
        background: #fafafa;
        .content {
            &-link {
                flex-grow: 1;
                overflow: scroll;
                li {
                    padding: 0.25rem 0;
                    font-size: 0.42rem;
                    text-align: center;
                    color: #666;
                    span {
                        display: block;
                    }
                }
                li:nth-child(1) {
                    background: white;
                    span:nth-child(1) {
                        border-left: solid 2px red;
                        color: red;
                    }
                }
            }
            &-item {
                overflow-x: hidden; //这个属性必须要加，否则将会导致整个页面滚动。
                width: 75%;
                background: white;
                .item-title {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.2rem;
                    font-size: 0.42rem;
                    color: #666;
                    span:nth-child(2) {
                        font-size: 0.35rem;
                    }
                }
                .item-goods {
                    display: flex;
                    flex-wrap: wrap;
                    .goods-detail {
                        text-align: center;
                        width: 2.5rem;
                        height: 3rem;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding-top: 0.1rem;
                        img {
                            width: 1.5rem;
                        }
                        span {
                            font-size: 0.35rem;
                            color: #151516;
                            margin-top: 0.2rem;
                        }
                    }
                }
            }
        }
    }
}
.van-search__content {
    border-radius: 0.3rem;
    background: #ededed;
}

.van-tree-select {
    margin-top: 0.02rem;
    height: 100%;
    &__nav {
        width: unset;
        min-width: 2.2rem;
        font-weight: normal;
    }
    &__item {
        font-weight: normal;
    }
    &__content {
        width: unset;
        margin-left: 2.2rem;
    }
    &__nitem--active,
    __item {
        font-weight: normal;
    }
}
</style>
