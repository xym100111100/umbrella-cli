const onlonlinepromo = require('./onlonlinepromo');

const mock = {
    // 获取每日推荐
    'GET /onl-svr/onl/onlinepromotion/list': onlonlinepromo.onlonlinepromoList,
};

module.exports = mock;
