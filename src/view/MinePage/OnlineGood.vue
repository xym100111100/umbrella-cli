<template>
    <div class="onlie-good">
        <van-nav-bar
            title="发布商品"
            left-arrow
            @click-left="$router.go(-1)"
            @click-right="onClickRight"
        />
        <van-popup
            position="right"
            :style="{ height: '100%',width:'25%' }"
            get-container="body"
            v-model="show"
        >
            <div>
                <ol>
                    <template v-for="item in goodsClassData">
                        <li :key="item.id" @click="choiceClass(item.id,item.className)">
                            <span>{{item.className}}</span>
                        </li>
                    </template>
                </ol>
            </div>
        </van-popup>
        <van-popup position="bottom" v-model="showDate" :style="{ height: '35%' }">
            <van-datetime-picker
                @confirm="confimDate"
                @cancel="cancelDate"
                v-model="currentDate"
                type="date"
                :formatter="formatter"
            />
        </van-popup>
        <div class="onlie-good-content">
            <div class="content-title">
                <van-notice-bar
                    color="#1989fa"
                    background="#ecf9ff"
                    left-icon="info-o"
                    text="温馨提示:拍摄时请将宝贝置于镜头的上部分,以防商品无法完整展示出来。"
                />
            </div>
            <div class="content-upload">
                <template v-for=" item in payload.fileList">
                    <div class="upload-file" :key="item.id">
                        <div class="file-img">
                            <img :src="'http://192.168.8.108:20180/files' + item.imgPath" />
                        </div>
                        <div @click="deleteImg(item.id)" class="upload-delete">
                            <van-icon color="white" name="shanchu" />
                        </div>
                    </div>
                </template>
                <div v-if="payload.fileList.length < 6" class="upload-icon">
                    <van-uploader :after-read="uploadIMG">
                        <van-icon name="tianjiajiahaowubiankuang" />
                    </van-uploader>
                </div>
            </div>
            <div class="content-info">
                <van-tabs
                    v-model="payload.goodType"
                    :swipeable="true"
                    color="greenyellow"
                    :animated="true"
                    background="rgba(123, 191, 234, 0.1)"
                >
                    <van-tab title="出售宝贝">
                        <div class="info-tab1">
                            <div class="info-class">
                                <span @click="showPopup">选择分类</span>
                                <span>{{payload.goodClass.name}}</span>
                            </div>
                            <div class="info-radio">
                                <template v-for="item in payload.isNowSell">
                                    <div
                                        :key="item.index"
                                        class="radio-sell"
                                        @click="changeRadio1(item.index)"
                                    >
                                        <div
                                            class="sell-radio"
                                            :class="{sellRadioActive:item.active===true}"
                                        ></div>
                                        <div class="sell-text">{{item.value}}</div>
                                    </div>
                                </template>
                            </div>
                            <div class="info-radio">
                                <template v-for="item in payload.isDiscuss">
                                    <div
                                        :key="item.index"
                                        class="radio-bargaining"
                                        @click="changeRadio2(item.index)"
                                    >
                                        <div
                                            class="bargaining-radio"
                                            :class="{bargainingRadioActive:item.active===true}"
                                        ></div>
                                        <div
                                            :class="{moveLeft:item.index===1}"
                                            class="bargaining-text"
                                        >{{item.value}}</div>
                                    </div>
                                </template>
                            </div>
                            <div class="info-bottom">
                                <div @click="choiceBuyTime" class="bottom-buyTime">
                                    <span>选择购买时间:</span>
                                    <span>{{payload.buyTime}}</span>
                                </div>
                                <div class="bottom-price">
                                    <span>原价:</span>
                                    <input
                                        type="number"
                                        placeholder="只能输入千位价格"
                                        v-model="payload.oldPrice"
                                    />
                                </div>
                                <div class="bottom-price">
                                    <span>现价:</span>
                                    <input
                                        type="number"
                                        placeholder="只能输入千位价格"
                                        v-model="payload.newPrice"
                                    />
                                </div>
                                <div class="bottom-textArea-title">
                                    <textarea
                                        v-model="payload.goodTitle"
                                        maxlength="20"
                                        placeholder="请简短地输入宝贝标题 如:华为耳机黑色"
                                    ></textarea>
                                </div>
                                <div class="bottom-textArea-detail">
                                    <textarea
                                        v-model="payload.goodDetail"
                                        placeholder="请简短地输入你对宝贝的描述"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="出租宝贝">
                        <div class="info-tab2">
                            <div class="info-class">
                                <span @click="showPopup">选择分类</span>
                                <span>{{payload.goodClass.name}}</span>
                            </div>
                            <div class="info-radio">
                                <template v-for="item in payload.isNowSell">
                                    <div
                                        :key="item.index"
                                        class="radio-sell"
                                        @click="changeRadio1(item.index)"
                                    >
                                        <div
                                            class="sell-radio"
                                            :class="{sellRadioActive:item.active===true}"
                                        ></div>
                                        <div class="sell-text">{{item.value}}</div>
                                    </div>
                                </template>
                            </div>
                            <div class="info-radio">
                                <template v-for="item in payload.isDiscuss">
                                    <div
                                        :key="item.index"
                                        class="radio-bargaining"
                                        @click="changeRadio2(item.index)"
                                    >
                                        <div
                                            class="bargaining-radio"
                                            :class="{bargainingRadioActive:item.active===true}"
                                        ></div>
                                        <div
                                            :class="{moveLeft:item.index===1}"
                                            class="bargaining-text"
                                        >{{item.value}}</div>
                                    </div>
                                </template>
                            </div>
                            <div class="info-bottom">
                                <div class="bottom-left">
                                    <span>租价</span>
                                    <span @click="changeUseTime(-1)">
                                        <van-icon color="#7bbfea" name="jianhao" />
                                    </span>
                                    <span>{{payload.priceDay}}</span>
                                    <span @click="changeUseTime(1)">
                                        <van-icon color="#7bbfea" name="tianjiajiahaowubiankuang" />
                                    </span>
                                    <span>/元/天</span>
                                </div>
                                <div class="bottom-textArea-title">
                                    <textarea
                                        v-model="payload.goodTitle"
                                        maxlength="20"
                                        placeholder="请简短地输入宝贝标题 如:华为耳机黑色"
                                    ></textarea>
                                </div>
                                <div class="bottom-textArea-detail">
                                    <textarea
                                        v-model="payload.goodDetail"
                                        maxlength="50"
                                        placeholder="请简短地输入你对宝贝的描述"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
            <div class="onlie-good-footer">
                <button @click="doSubmit">提交</button>
            </div>
        </div>
    </div>
</template>

<script>
import { NavBar, NoticeBar, Stepper, Tab, Tabs, DatetimePicker, Popup, Icon, Toast, Uploader } from 'vant';
import axios from 'axios';
import { list as goodsClassList } from '../../svc/suc/SucGoodsClass';
import { add as addGoodsClass } from '../../svc/suc/SucGoods';

export default {
    components: {
        [NavBar.name]: NavBar,
        [Toast.name]: Toast,
        [Uploader.name]: Uploader,
        [NoticeBar.name]: NoticeBar,
        [Icon.name]: Icon,
        [Popup.name]: Popup,
        [Stepper.name]: Stepper,
        [Tabs.name]: Tabs,
        [Tab.name]: Tab,
        [DatetimePicker.name]: DatetimePicker,
    },
    data() {
        return {
            payload: {
                id: null,
                goodClass: {
                    name: '未选择',
                    id: null,
                },
                oldPrice: '',
                newPrice: '',
                goodTitle: '',
                goodDetail: '',
                buyTime: '未选择',
                priceDay: 1,
                isNowSell: [
                    {
                        index: 1,
                        value: '即时交易',
                        active: true,
                    },
                    {
                        index: 2,
                        value: '议时交易',
                        active: false,
                    },
                ],
                isDiscuss: [
                    {
                        index: 1,
                        value: '可议价',
                        active: true,
                    },
                    {
                        index: 2,
                        value: '不可议价',
                        active: false,
                    },
                ],
                goodType: 0,
                fileList: [],
            },
            goodsClassData: [],
            show: false,
            showDate: false,
            currentDate: new Date(),
        };
    },
    computed: {},

    methods: {
        getGoodsClassList() {
            goodsClassList({
                onSuccess: data => {
                    this.goodsClassData = data;
                },
            });
        },
        confimDate(e) {
            this.showDate = false;
            let d = new Date(e);
            let buyTime = d.getFullYear() + '-' + this.checkTime(d.getMonth() + 1) + '-' + this.checkTime(d.getDate());
            console.log(buyTime);
            this.payload.buyTime = buyTime;
        },
        checkTime(i) {
            if (i < 10) {
                i = '0' + i;
            }
            return i;
        },
        cancelDate() {
            this.showDate = false;
        },
        choiceBuyTime() {
            this.showDate = true;
        },
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`;
            } else if (type === 'month') {
                return `${value}月`;
            }
            return value;
        },
        doSubmit() {
            // 校验参数
            let data = this.payload;
            console.log(this.payload);
            if (data.fileList.length < 1) {
                Toast('请上传商品图片');
                return;
            }
            if (data.goodClass.id === null) {
                Toast('请选择分类');
                return;
            }
            // 是出售的商品才判断这几个
            if (data.goodType === 0) {
                if (data.buyTime === '未选择') {
                    Toast('请选择购买时间');
                    return;
                }
                let reg = new RegExp('^[0-9]*$');
                if (!reg.test(data.oldPrice) || data.oldPrice === '' || data.oldPrice.length > 4) {
                    Toast('输入原价且只能输入到千位');
                    return;
                }
                if (!reg.test(data.newPrice) || data.newPrice === '' || data.newPrice.length > 4) {
                    Toast('输入现价且只能输入到千位');
                    return;
                }
                data.buyTime = data.buyTime + ' 00:00:00';
            }else{
                data.buyTime = null;
            }

            if (data.goodTitle.trim() === '') {
                Toast('请输入商品标题');
                return;
            }
            if (data.goodDetail.trim() === '') {
                Toast('请输入详情');
                return;
            }

            if (data.isNowSell[0].active) {
                data.isNowSell = true;
            } else {
                data.isNowSell = false;
            }
            if (data.isDiscuss[0].active) {
                data.isDiscuss = true;
            } else {
                data.isDiscuss = false;
            }
            data.classId = this.payload.goodClass.id;
            data.userId = this.$store.getters.user.id;

            addGoodsClass({
                data,
                onSuccess: result => {
                    this.$router.push({ name: 'shop', params: { load: true } });
                },
            });
        },
        changePrice(even) {
            console.log(even.target.value);
            this.oldPrice = even.target.value.replace(/[^\d]/g, '');
        },
        changeUseTime(count) {
            if ((this.payload.priceDay === 1 && count === -1) || (this.payload.priceDay === 99 && count === 1)) return;
            this.payload.priceDay += count;
            console.log(this.payload.priceDay);
        },
        changeRadio1(index) {
            this.payload.isNowSell.map(item => {
                if (item.index === index) {
                    item.active = true;
                } else {
                    item.active = false;
                }
            });
        },
        changeRadio2(index) {
            this.payload.isDiscuss.map(item => {
                if (item.index === index) {
                    item.active = true;
                } else {
                    item.active = false;
                }
            });
        },
        showPopup() {
            this.show = true;
        },
        choiceClass(id, name) {
            this.payload.goodClass.name = name;
            this.payload.goodClass.id = id;
            this.show = false;
        },
        deleteImg(index) {
            this.payload.fileList.map((item, i) => {
                if (item.id === index) {
                    this.payload.fileList.splice(i, 1);
                    console.log(this.payload.fileList);
                }
            });
        },
        // afterRead(file) {
        //     let param = new FormData();
        //     param.append('name', 'wiiiiiinney');
        //     //通过append向form对象添加数据
        //     param.append('file', file.file);
        //     //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        //     console.log(file);
        //     let config = {
        //         //添加请求头
        //         headers: { 'Content-Type': 'multipart/form-data' },
        //         onUploadProgress: e => {
        //             var completeProgress = (((e.loaded / e.total) * 100) | 0) + '%';
        //             this.progress = completeProgress;
        //         },
        //     };

        //     axios.post('http://192.168.8.108:20180/ise/upload', param, config).then(res => {
        //         console.log('数据保存成功');
        //     });
        // },
        onClickRight() {
            this.$router.push({ name: 'school' });
        },

        uploadIMG(e) {
            this.picavalue = e.file;
            console.log('-----' + this.picavalue.size * 1024);
            this.imgPreview(this.picavalue);
        },
        //获取图片
        imgPreview(file, callback) {
            let self = this;
            //判断支不支持FileReader
            if (!file || !window.FileReader) return;
            if (/^image/.test(file.type)) {
                //创建一个reader
                let reader = new FileReader();

                //将图片转成base64格式
                reader.readAsDataURL(file);
                //读取成功后的回调
                reader.onloadend = function() {
                    let result = this.result;
                    let img = new Image();
                    img.src = result;
                    console.log('********未压缩前的图片大小********');
                    console.log(result.length);
                    img.onload = function() {
                        let data = self.compress(img);
                        self.imgUrl = result;
                        let blob = self.dataURItoBlob(data);
                        console.log('*******base64转blob对象******');
                        // console.log(blob);
                        var formData = new FormData();
                        formData.append('file', blob);
                        console.log('********将blob对象转成formData对象********');
                        console.log(formData.get('file'));
                        let config = {
                            headers: { 'Content-Type': 'multipart/form-data' },
                        };
                        // 发送请求;
                        axios.post('http://192.168.8.108:20180/ise/upload', formData, config).then(res => {
                            console.log(res.data.filePath);
                            let fileObj = {};
                            fileObj.id = new Date().getTime();
                            fileObj.imgPath = res.data.filePath;
                            self.payload.fileList.push(fileObj);
                        });
                    };
                };
            }
        },
        // 压缩图片
        compress(img) {
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            let initSize = img.src.length;
            console.log('initSize:' + initSize);
            let width = img.width;
            let height = img.height;
            canvas.width = width;
            canvas.height = height;
            // 铺底色
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, width, height);

            //进行最小压缩
            let ndata = canvas.toDataURL('image/jpeg', 0.1);
            // console.log("*******压缩后的图片大小*******");
            //  console.log(ndata)
            console.log(ndata.length);
            return ndata;
        },
        // base64转成bolb对象
        dataURItoBlob(base64Data) {
            var byteString;
            if (base64Data.split(',')[0].indexOf('base64') >= 0) byteString = atob(base64Data.split(',')[1]);
            else byteString = unescape(base64Data.split(',')[1]);
            var mimeString = base64Data
                .split(',')[0]
                .split(':')[1]
                .split(';')[0];
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ia], { type: mimeString });
        },
        //删除事件
        delImg() {
            this.imgUrl = null;
        },
    },
    activated() {
        this.getGoodsClassList();
        if (this.$route.params.payload !== undefined) {
            // 构造回显参数。
            let data = this.$route.params.payload;
            data.goodClass = {
                id: data.classId,
                name: data.className,
            };
            if (data.isNowSell) {
                data.isNowSell = [
                    {
                        index: 1,
                        value: '即时交易',
                        active: true,
                    },
                    {
                        index: 2,
                        value: '议时交易',
                        active: false,
                    },
                ];
            } else {
                data.isNowSell = [
                    {
                        index: 1,
                        value: '即时交易',
                        active: false,
                    },
                    {
                        index: 2,
                        value: '议时交易',
                        active: true,
                    },
                ];
            }
            if (data.isDiscuss) {
                data.isDiscuss = [
                    {
                        index: 1,
                        value: '可议价',
                        active: true,
                    },
                    {
                        index: 2,
                        value: '不可议价',
                        active: false,
                    },
                ];
            } else {
                data.isDiscuss = [
                    {
                        index: 1,
                        value: '可议价',
                        active: false,
                    },
                    {
                        index: 2,
                        value: '不可议价',
                        active: true,
                    },
                ];
            }
            this.payload = data;
        } else {
            this.payload = {
                id: null,
                goodClass: {
                    name: '未选择',
                    id: null,
                },
                oldPrice: '',
                newPrice: '',
                goodTitle: '',
                goodDetail: '',
                buyTime: '未选择',
                priceDay: 1,
                isNowSell: [
                    {
                        index: 1,
                        value: '即时交易',
                        active: true,
                    },
                    {
                        index: 2,
                        value: '议时交易',
                        active: false,
                    },
                ],
                isDiscuss: [
                    {
                        index: 1,
                        value: '可议价',
                        active: true,
                    },
                    {
                        index: 2,
                        value: '不可议价',
                        active: false,
                    },
                ],
                goodType: 0,
                fileList: [],
            };
            console.log(this.payload);
        }
    },
};
</script>

<style lang="less" scoped>
html,
body {
    height: 100%;
}

.onlie-good {
    height: 100vh;

    .onlie-good-content {
        height: 93%;
        overflow: scroll;
        width: 100vw;
        .content-upload {
            display: flex;
            flex-wrap: wrap;
            .upload-file {
                width: 2.6rem;
                margin: 0.2rem 0 0.2rem 0.5rem;
                height: 2.6rem;
                overflow: hidden;
                .file-img {
                    width: 2.6rem;
                    height: 2.6rem;
                    overflow: hidden;
                    border-radius: 0.2rem;
                }
                img {
                    width: 2.6rem;
                }
                .upload-delete {
                    margin-top: -1rem;
                    margin-left: 1.8rem;
                    font-size: 0.7rem;
                    height: 1rem;
                    width: 1rem;
                    .van-icon {
                        background: rgba(180, 194, 202, 0.3);
                        padding-bottom: 0.2rem;
                    }
                }
            }
            .upload-icon {
                width: 2.6rem;
                margin: 0.2rem 0 0.2rem 0.5rem;
                border: 1px dashed #e5e5e5;
                height: 2.6rem;
                overflow: hidden;
                border-radius: 0.2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #bebaba;
            }
            .upload-icon:active {
                background: rgba(123, 191, 234, 0.2);
            }
        }
        .content-info {
            width: 94%;
            margin-left: 0.3rem;
            border-radius: 0.4rem;
            margin-top: 0.2rem;
            overflow: hidden;
            background: rgba(123, 191, 234, 0.2);
            .info-class {
                padding-top: 0.2rem;
                height: 1.3rem;
                width: 100%;
                font-size: 0.35rem;
                line-height: 1.3rem;
                span:first-child {
                    background: rgba(123, 191, 234, 0.2);
                    border-radius: 0.2rem;
                    padding: 0.15rem;
                    color: #499df1;
                    margin-left: 0.5rem;
                }
                span:last-child {
                    padding-left: 0.4rem;
                    font-size: 0.38rem;
                }
            }
            .info-radio {
                display: flex;
                font-size: 0.38rem;
                width: 100%;
                .radio-sell {
                    height: 1.3rem;
                    width: 50%;

                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .sell-radio {
                        background: white;
                        border-radius: 5rem;
                        height: 0.25rem;
                        width: 0.25rem;
                        border: solid 0.15rem rgba(66, 76, 82, 0.2);
                    }
                    .sellRadioActive {
                        border: solid 0.15rem greenyellow;
                    }
                    .sell-text {
                        margin-left: 0.5rem;
                        font-size: 0.38rem;
                    }
                }
                .radio-bargaining {
                    height: 1.3rem;
                    width: 50%;

                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .bargaining-radio {
                        background: white;
                        border-radius: 5rem;
                        height: 0.25rem;
                        width: 0.25rem;
                        border: solid 0.15rem rgba(66, 76, 82, 0.2);
                    }
                    .bargainingRadioActive {
                        border: solid 0.15rem greenyellow;
                    }
                    .bargaining-text {
                        margin-left: 0.5rem;
                        font-size: 0.38rem;
                    }
                    .moveLeft {
                        padding-right: 0.4rem;
                    }
                }
            }
            .info-bottom {
                width: 100%;
                display: flex;
                font-size: 0.5rem;
                flex-wrap: wrap;
                .bottom-left {
                    height: 1.3rem;
                    line-height: 1.3rem;
                    width: 50%;
                    text-align: center;
                    font-size: 0.38rem;
                    span:nth-child(3) {
                        font-size: 0.5rem;
                    }
                    span:nth-child(2),
                    span:nth-child(4) {
                        background: rgba(66, 76, 82, 0.1);
                        padding: 0.1rem 0.12rem;
                        border-radius: 0.3rem;
                        margin: 0 0.2rem;
                    }
                    span:nth-child(2):active,
                    span:nth-child(4):active {
                        background: rgba(123, 191, 234, 0.5);
                    }
                }

                .bottom-buyTime {
                    height: 1rem;
                    line-height: 1rem;
                    width: 100%;
                    font-size: 0.38rem;
                    padding-left: 0.5rem;
                    span:first-child {
                        color: #499df1;
                        margin-right: 0.2rem;
                        padding: 0.15rem;
                        background: rgba(123, 191, 234, 0.2);
                        border-radius: 0.2rem;
                    }
                }
                .bottom-price {
                    width: 100%;
                    overflow: hidden;
                    height: 1.3rem;
                    line-height: 1.3rem;
                    font-size: 0.38rem;
                    margin-left: 0.5rem;
                    span:first-child {
                        padding-right: 0.15rem;
                    }
                    input {
                        width: 70%;
                        height: 0.7rem;
                        border: none;
                        font-size: 0.35rem;
                        padding-left: 0.2rem;
                    }
                }
                .bottom-textArea-title {
                    width: 100%;
                    text-align: center;
                    textarea {
                        width: 90%;
                        font-size: 0.35rem;
                        height: 1.2rem;
                        border: none;
                        padding-left: 0.2rem;
                    }
                }
                .bottom-textArea-detail {
                    width: 100%;
                    text-align: center;
                    textarea {
                        width: 90%;
                        font-size: 0.35rem;
                        height: 2rem;
                        border: none;
                        padding-left: 0.2rem;
                    }
                }
            }
        }
    }
    .onlie-good-footer {
        height: 2rem;
        text-align: center;
        width: 100%;
        line-height: 2rem;
        button {
            width: 90%;
            height: 1rem;
            font-size: 0.45rem;
            line-height: 1rem;
            border-radius: 0.2rem;
            border: none;
            background: greenyellow;
        }
        button:active {
            background: rgba(123, 191, 234, 0.2);
        }
    }
}

.van-popup--right {
    div:last-child {
        position: fixed;
        height: 100%;
        width: 100%;
        overflow: scroll;
        color: #4a4a4c;
        font-size: 0.42rem;

        ol {
            padding-bottom: 1rem;
            li {
                margin: 0;
                padding: 0;
                height: 1.4rem;
                line-height: 1.4rem;
                text-align: center;
                span {
                    padding: 0.1rem 0.2rem;
                    border-bottom: solid 0.03rem #ededed;
                    color: #499df1;
                }
            }
            li:active {
                background: rgba(123, 191, 234, 0.2);
            }
        }
    }
}

.van-nav-bar {
    &__right {
        bottom: -0.1rem;
        .van-nav-bar__text {
            font-size: 0.4rem;
            color: #499df1;
        }
    }
}
</style>
