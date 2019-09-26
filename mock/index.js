// import { list as listOnlOnlinePromo } from './onl/OnlOnlinePromo';
const OnlOnlinePromo = require('./onl/OnlOnlinePromo');
const GoodsDetail = require('./onl/GoodsDetail');
const Cart = require('./Cart');
const Order = require('./ord/Order');
const OrderDetail = require('./ord/OrderDetail');
const Chat = require('./Chat');
const driverSchool = require('./suc/DriverSchool');
const notice = require('./suc/Notice');
const userLogin = require('./suc/UserLogin');

const mock = {
    // 获取每日推荐
    'GET /onl-svr/onl/onlinepromotion/list': OnlOnlinePromo.list,
    'GET /onl-svr/onl/online/getonlines': GoodsDetail.goodsList,
    'GET /onl-svr/onl/onlinespec/list': GoodsDetail.skuList,
    'GET /onl-svr/onl/cart': Cart.goodsList,
    'GET /ord-svr/ord/order': Order.list,
    'GET /ord-svr/ord/orderDetail': OrderDetail.list,
    'GET /chat-svr/chat': Chat.chatInfo,
    'GET /dri-svr/list': driverSchool.list,
    'GET /dri-svr/getById': driverSchool.getById,

    'GET /dri-svr/getComment': driverSchool.getComment,
    'GET /suc-svr/notice': notice.list,
    'POST /suc-svr/login': userLogin.login,


};

module.exports = mock;
