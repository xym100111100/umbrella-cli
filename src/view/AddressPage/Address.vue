<template>
  <div class="address-viwe">
    <div class="address-navbar">
      <van-nav-bar title="收货地址" left-arrow @click-left="handleBack"/>
    </div>
    <div class="address-list">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAddAddress"
        @edit="onEditAddress"
      />
    </div>
    <div style="z-index: 2001;">
      <van-popup v-model="show">
        <van-address-edit
          :area-list="areaList"
          show-postal
          show-delete
          show-set-default
          show-search-result
          :search-result="searchResult"
          @save="onSaveAddress"
          @delete="onDeleteAddress"
          @change-detail="onChangeDetail"
          :address-info="addressInfo"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import { NavBar, AddressList, AddressEdit, Popup } from 'vant';

export default {
    components: {
        [NavBar.name]: NavBar,
        [AddressList.name]: AddressList,
        [AddressEdit.name]: AddressEdit,
        [Popup.name]: Popup,
    },

    data() {
        return {
            show: false,
            chosenAddressId: '1',
            list: [
                {
                    id: '1',
                    name: '张三',
                    tel: '13000000000',
                    address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                },
                {
                    id: '2',
                    name: '李四',
                    tel: '1310000000',
                    address: '浙江省杭州市拱墅区莫干山路 50 号',
                },
            ],

            areaList: {
                province_list: {
                    110000: '北京市',
                    120000: '天津市',
                },
                city_list: {
                    110100: '北京市',
                    110200: '县',
                    120100: '天津市',
                    120200: '县',
                },
                county_list: {
                    110101: '东城区',
                    110102: '西城区',
                    110105: '朝阳区',
                    110106: '丰台区',
                    120101: '和平区',
                    120102: '河东区',
                    120103: '河西区',
                    120104: '南开区',
                    120105: '河北区',
                    // ....
                },
            },

            searchResult: [],

            addressInfo: {
                id: 1,
                name: '张三',
                tel: '13000000000',
                province: '浙江省',
                city: '杭州市',
                county: '西湖区',
                addressDetail: '文三路 138 号东方通信大厦 7 楼 501 室',
                areaCode: '110101',
                postalCode: '00000000',
                isDefault: true,
            },
        };
    },

    methods: {
        // 回退
        handleBack() {
            this.$router.go(-1);
        },

        // 点击新增地址事件
        onAddAddress() {
            console.log('新增地址');
            this.show = true;
        },

        // 点击编辑地址事件
        onEditAddress(item, index) {
            console.log(item);
        },

        // 点击保存事件
        onSaveAddress() {
            console.log('save');
        },

        // 点击删除事件
        onDeleteAddress() {
            console.log('delete');
        },

        onChangeDetail(val) {
            if (val) {
                this.searchResult = [
                    {
                        name: '黄龙万科中心',
                        address: '杭州市西湖区',
                    },
                ];
            } else {
                this.searchResult = [];
            }
        },
    },
};
</script>

<style lang="less" scoped>
.address-viwe {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    background-color: #fafafa;

    .address-navbar {
        width: 10rem;
        .van-nav-bar {
            background-color: red;
            &__arrow {
                font-size: 0.7rem;
            }

            &__title {
                color: #fafafa;
                font-size: 0.5rem;
            }

            .van-icon {
                color: #fafafa;
            }

            &__text {
                color: #fafafa;
                font-size: 0.4rem;
            }
        }
    }

    .address-list {
        .van-address-list__add {
            z-index: 1000;
        }
    }

    .van-popup {
        width: 10rem;
        top: 10rem;

        .van-address-edit {
            margin-top: 0.2rem;
        }
    }
}
</style>


