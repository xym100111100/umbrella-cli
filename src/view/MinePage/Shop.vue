<template>
    <div class="shop">
        <van-nav-bar
            title="我的小店"
            right-text="按钮"
            left-arrow
            @click-left="$router.go(-1)"
            @click-right="onClickRight"
        />
        <div style="backgrouond:red">
            <van-uploader :max-count="2" :after-read="afterRead" v-model="fileList" multiple>
                <span>文件上传</span>
            </van-uploader>
        </div>
    </div>
</template>

<script>
import { NavBar, Toast, Uploader } from 'vant';
import { upload } from '../../svc/Mine';
import { list2 as ordList } from '../../svc/ord/Order';
import axios from 'axios';
export default {
    components: {
        [NavBar.name]: NavBar,
        [Toast.name]: Toast,
        [Uploader.name]: Uploader,
    },
    data() {
        return {
            fileList: [
                { url: 'https://img.yzcdn.cn/vant/cat.jpeg' },
                // Uploader 根据文件后缀来判断是否为图片文件
                // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
                { url: 'https://cloud-image', isImage: true },
            ],
        };
    },
    methods: {
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
            // // 此时可以自行将文件上传至服务器
            // let data = {};
            // data.file = multipartFile;
            // upload({
            //     data,
            // });
        },
        onClickLeft() {
            Toast('返回');
        },
        onClickRight() {
            this.$router.push({ name: 'school' });
        },
    },
};
</script>

<style lang="less" scoped>
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
