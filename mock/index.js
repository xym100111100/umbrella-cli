import { onlonlinepromoList } from './onl/OnlOnlinePromo';

const mock = {
    // 获取每日推荐
    'GET /onl-svr/onl/onlinepromotion/list': onlonlinepromoList,
};

module.exports = mock;
