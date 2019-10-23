<template>
    <div class="signop-detail">
        <header class="detail-header">
            <van-nav-bar
                title="报名步骤"
                left-arrow
                @click-left="$router.go(-1)"
                @click-right="onClickRight"
                right-text="关注公众号"
            />
        </header>
        <div>
            <van-notice-bar
                color="#1989fa"
                background="#ecf9ff"
                left-icon="info-o"
                text="点击右上角关注公众号，享受更多资源，服务与保障!!!"
            />
        </div>
        <div class="detail-content">
            <div class="content-info">
                <p>1平台报名：</p>
                <p class="padding-left">在本平台后在一个工作日内会收到客服电话确认报名与接送到驾校进行报名。</p>
                <p>2驾校报名：</p>
                <p class="padding-left">
                    去到驾校看过驾校相应环境与本平台描述一致，与驾校报名时将根据本人意愿与
                    广西安布雷拉科技有限公司签订驾校学车保障合约后上传合约照片到平台
                    签订后学生可随时作废合约，合约具体内容见下方声明。
                </p>
                <p>3拿证评论：</p>
                <p class="padding-left">拿到驾驶证后对驾校进行评论。</p>
                <p>备注:</p>
                <p class="padding-left">如有对报名有疑问或报名后一个工作日内没有收到客服来电的请致电下方客服电话或加微信了解详情</p>
                <p class="info-service">客服:18577093618(微信同号)</p>
            </div>
            <div class="content-statement">
                <!-- <div class="statement-info">合约由广西安布雷拉科技有限公司声明，本公司对此合约承担法律责任与郑重承诺会履行合约中的条款。</div>
                <div class="statement-autograph">广西安布雷拉科技有限公司</div> -->
               <img src="https://temp.duamai.com/ise-svr/files/umbrella/contract.jpg" class="" width="100%"/>
              <!-- <img width="100%" src="/img/contract.jpg"  /> -->
            </div>
        </div>
    </div>
</template>

<script>
import { NavBar, NoticeBar, Icon } from 'vant';

export default {
    components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
        [NoticeBar.name]: NoticeBar,
    },
    data() {
        return {};
    },
    methods: {
        doSubmit() {
            console.log(this.data);
        },
        onClickRight() {},
    },
};
</script>

<style lang="less" scoped>
html,
body {
    height: 100%;
    width: 100%;
}
.signop-detail {
    height: 100vh;
    overflow: scroll;
    .detail-content {
        margin-top: 0.2rem;
        .content-info {
            background: rgba(123, 191, 234, 0.2);
            padding: 0.5rem;
            p {
                padding: 0;
                margin: 0;
                font-size: 0.4rem;
                padding-bottom: 0.1rem;
            }
            .padding-left {
                padding-left: 0.3rem;
            }
            .info-service{
                          text-align: right;
            }
        }
        .content-statement {
            width: 98%;
            margin: 0.1rem 0 0rem 0.1rem;
            border-radius: 0.2rem;
            font-size: 0.4rem;
            p {
                color: #499df1;
                padding: 0;
                margin: 0;
                font-size: 0.4rem;
               
            }
            .statement-info {
                padding: 0.5rem;
            }
            .statement-autograph {
                width: 90%;
                text-align: right;
                padding-bottom: 0.5rem;
            }
        }
    }
}
</style>
