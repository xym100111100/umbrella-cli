// import { list as listOnlOnlinePromo } from './onl/OnlOnlinePromo';
const OnlOnlinePromo = require('./onl/OnlOnlinePromo');
const GoodsDetail = require('./onl/GoodsDetail');
const Cart = require('./Cart');
const Order = require('./ord/Order');
const OrderDetail = require('./ord/OrderDetail');
const AfcAccount = require('./afc/AfcAccount');
const PntAccount = require('./pnt/PntAccount');
const ReturnGoods = require('./ord/ReturnGoods');
const getGoodsData = require('./onl/getGoodsData');
const Chat = require('./Chat');
const driverSchool = require('./DriverSchool');

const mock = {
    // 获取每日推荐
    // 'GET /onl-svr/onl/onlinepromotion/list': listOnlOnlinePromo,
    'GET /onl-svr/onl/onlinepromotion/list': OnlOnlinePromo.list,
    'GET /onl-svr/onl/online/getonlines': GoodsDetail.goodsList,
    'GET /onl-svr/onl/getGoodsData': getGoodsData.list,
    'GET /onl-svr/onl/onlinespec/list': GoodsDetail.skuList,
    'GET /onl-svr/onl/cart': Cart.goodsList,
    'GET /ord-svr/ord/order': Order.list,
    'GET /ord-svr/ord/orderDetail': OrderDetail.list,
    'GET /ord-svr/ord/ReturnGoods': ReturnGoods.goodsList,

    'GET /afc-svr/afc/account': AfcAccount.getById,

    'GET /pnt-svr/pnt/account': PntAccount.getById,
    'GET /chat-svr/chat': Chat.chatInfo,
    'GET /dri-svr/list': driverSchool.list,
    'GET /dri-svr/getComment': driverSchool.getComment,


};

module.exports = mock;
