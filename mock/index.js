// import { list as listOnlOnlinePromo } from './onl/OnlOnlinePromo';
const OnlOnlinePromo = require('./onl/OnlOnlinePromo');
const GoodsDetail = require('./onl/GoodsDetail');
const Cart = require('./Cart');
const Order = require('./ord/Order');
const OrderDetail = require('./ord/OrderDetail');
const AfcAccount = require('./afc/AfcAccount');

const mock = {
    // 获取每日推荐
    // 'GET /onl-svr/onl/onlinepromotion/list': listOnlOnlinePromo,
    'GET /onl-svr/onl/onlinepromotion/list': OnlOnlinePromo.list,
    'GET /onl-svr/onl/online/getonlines': GoodsDetail.goodsList,
    'GET /onl-svr/onl/onlinespec/list': GoodsDetail.skuList,
    'GET /onl-svr/onl/cart': Cart.goodsList,
    'GET /ord-svr/ord/order': Order.list,
    'GET /ord-svr/ord/orderDetail': OrderDetail.list,

    'GET /afc-svr/afc/account': AfcAccount.getById,

};

module.exports = mock;
