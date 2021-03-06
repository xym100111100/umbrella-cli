// import { list as listOnlOnlinePromo } from './onl/OnlOnlinePromo';
const OnlOnlinePromo = require('./onl/OnlOnlinePromo');
const GoodsDetail = require('./onl/GoodsDetail');
const Cart = require('./Cart');
const Order = require('./ord/Order');
const OrderDetail = require('./ord/OrderDetail');
const Chat = require('./Chat');
const driverSchool = require('./suc/DriverSchool');
const notice = require('./suc/Notice');
const User = require('./suc/User');
const ShopGood = require('./suc/ShopGood');

const mock = {
    // 获取每日推荐
    'GET /suc-svr/suc/goods': OnlOnlinePromo.list,
    'GET /suc-svr/suc/goods-class': ShopGood.goodClass,
    'GET /onl-svr/onl/online/getonlines': GoodsDetail.goodsList,
    'GET /onl-svr/onl/onlinespec/list': GoodsDetail.skuList,
    'GET /onl-svr/onl/cart': Cart.goodsList,
    'GET /ord-svr/ord/order': Order.list,
    'GET /ord-svr/ord/orderDetail': OrderDetail.list,
    'GET /chat-svr/chat': Chat.chatInfo,

   // 'GET /suc-svr/suc/driver-school/get-by-id': driverSchool.getById,

   // 'GET /suc-svr/suc/user-driver': driverSchool.getComment,
    'GET /suc-svr/notice': notice.list,
   // 'GET /suc-svr/suc/driver-school': driverSchool.list,
    
    'POST /suc-svr/suc/user/user-login': User.login,

    
};

module.exports = mock;
