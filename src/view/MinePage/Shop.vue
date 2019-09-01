<template>
    <div class="shop">
        <van-nav-bar
            title="我的小店"
            left-arrow
            @click-left="$router.go(-1)"
            @click-right="onClickRight"
        />
        <div class="shop-content">
            <div class="content-title">
                <van-notice-bar
                    color="#1989fa"
                    background="#ecf9ff"
                    left-icon="info-o"
                >温馨提示:拍摄时请将宝贝置于镜头的上部分</van-notice-bar>
            </div>
            <div class="content-upload">
                <template v-for=" item in fileList">
                    <div class="upload-file" :key="item.id">
                        <div class="file-img">
                            <img :src="item.url" />
                        </div>
                        <div @click="deleteImg(item.id)" class="upload-delete">
                            <van-icon color="white" name="shanchu" />
                        </div>
                    </div>
                </template>
                <div v-if="fileList.length < 6" class="upload-icon">
                    <van-uploader :after-read="uploadIMG">
                        <van-icon name="tianjiajiahaowubiankuang" />
                    </van-uploader>
                </div>
            </div>
            <div class="content-info">
                <div class="info-title">
                    <span>宝贝详情</span>
                </div>
                <div class="info-radio">
                    <div>
                        <van-radio-group v-model="radio">
                            <van-radio name="1">即刻出售</van-radio>
                            <van-radio name="2">议时出售</van-radio>
                        </van-radio-group>
                    </div>
                    <div>
                        <van-radio-group v-model="radio">
                            <van-radio name="1">可议价</van-radio>
                            <van-radio name="2">不可议价</van-radio>
                        </van-radio-group>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { NavBar, NoticeBar, Icon, RadioGroup, Radio, Toast, Uploader } from 'vant';
import { upload } from '../../svc/Mine';
import { list2 as ordList } from '../../svc/ord/Order';
import axios from 'axios';
export default {
    components: {
        [NavBar.name]: NavBar,
        [Toast.name]: Toast,
        [Uploader.name]: Uploader,
        [NoticeBar.name]: NoticeBar,
        [Icon.name]: Icon,
        [RadioGroup.name]: RadioGroup,
        [Radio.name]: Radio,
    },
    data() {
        return {
            fileList: [
                {
                    id: 1,
                    url:
                        'http://192.168.1.104:20180/files/umbrella/2019/09/01/16/09/6F25169381AF455E95E88A95216FF2F5.jpeg',
                },
                {
                    id: 2,
                    url:
                        'http://192.168.1.104:20180/files/umbrella/2019/09/01/16/09/6F25169381AF455E95E88A95216FF2F5.jpeg',
                },
                {
                    id: 3,
                    url:
                        'http://192.168.1.104:20180/files/umbrella/2019/09/01/16/09/6F25169381AF455E95E88A95216FF2F5.jpeg',
                },
                {
                    id: 4,
                    url:
                        'http://192.168.1.104:20180/files/umbrella/2019/09/01/16/09/6F25169381AF455E95E88A95216FF2F5.jpeg',
                },
                {
                    id: 5,
                    url:
                        'http://192.168.1.104:20180/files/umbrella/2019/09/01/16/09/6F25169381AF455E95E88A95216FF2F5.jpeg',
                },
            ],
            radio: '1',
        };
    },
    computed: {},
    methods: {
        deleteImg(index) {
            this.fileList.map((item, i) => {
                if (item.id === index) {
                    this.fileList.splice(i, 1);
                    console.log(this.fileList);
                }
            });
        },
        afterRead(file) {
            let param = new FormData();
            param.append('name', 'wiiiiiinney');
            //通过append向form对象添加数据
            param.append('file', file.file);
            //FormData私有类对象，访问不到，可以通过get判断值是否传进去
            console.log(file);
            let config = {
                //添加请求头
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: e => {
                    var completeProgress = (((e.loaded / e.total) * 100) | 0) + '%';
                    this.progress = completeProgress;
                },
            };

            axios.post('http://192.168.1.104:20180/ise/upload', param, config).then(res => {
                console.log('数据保存成功');
            });
        },
        onClickLeft() {
            Toast('返回');
        },
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
                        axios.post('http://192.168.1.104:20180/ise/upload', formData, config).then(res => {
                            console.log(res.data.filePaths);
                            let fileObj = {};
                            fileObj.id = self.fileList + 1;
                            fileObj.url = 'http://192.168.1.104:20180/files' + res.data.filePaths;
                            self.fileList.push(fileObj);
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
};
</script>

<style lang="less" scoped>
html,
body {
    height: 100%;
}

.shop {
    height: 100vh;
    .shop-content {
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
                        background: rgba(180, 194, 202, 0.1);
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
            .info-title {
                font-size: 0.42rem;
                padding: 0 0 0.2rem 0.4rem;
            }
            .info-radio {
                display: flex;
                font-size: 0.5rem;
                background: rgba(183, 210, 226, 0.2);
                width: 94%;
                margin-left: 0.3rem;
                div {
                    padding-left: 0.5rem;
                    .van-radio {
                        margin-top: 0.2rem;
                        padding-bottom: 0.1rem;

                        .van-radio__label {
                        }
                    }
                }
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
