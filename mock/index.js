// import { list as listOnlOnlinePromo } from './onl/OnlOnlinePromo';
const OnlOnlinePromo = require('./onl/OnlOnlinePromo');

const mock = {
    // 获取每日推荐
    // 'GET /onl-svr/onl/onlinepromotion/list': listOnlOnlinePromo,
    'GET /onl-svr/onl/onlinepromotion/list': OnlOnlinePromo.list,
};

module.exports = mock;
