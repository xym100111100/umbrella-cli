// import { list as listOnlOnlinePromo } from './onl/OnlOnlinePromo';
const OnlOnlinePromo = require('./onl/OnlOnlinePromo');
const GoodsDetail = require('./onl/GoodsDetail');

const mock = {
    // 获取每日推荐
    // 'GET /onl-svr/onl/onlinepromotion/list': listOnlOnlinePromo,
    'GET /onl-svr/onl/onlinepromotion/list': OnlOnlinePromo.list,
    'GET /onl-svr/onl/online/getonlines': GoodsDetail.goodsList,
    'GET /onl-svr/onl/onlinespec/list': GoodsDetail.skuList,
};

module.exports = mock;
