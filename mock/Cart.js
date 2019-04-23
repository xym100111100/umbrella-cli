const Url = require('url');
const Mock = require('mockjs');

// 商品信息
const goodsTemplate = {
    pageSize: 8, // 每页大小
    pages: 11, // 总页数
    total: '83', // 总记录数
    'list|8': [
        {
            'id|1000000000000000-9999999999999999': 1,
            title: '@ctitle(10,50) 商品',
            desc: '@ctitle(5,15)',
            'price|30-3000.2': 1,
            'num|100-9999': 1,
            thumb: /https:\/\/picsum\.photos\/200\/200\/\?image=\d{3}/,
        },
    ],
};

exports.goodsList = function(req, res, u) {
    // 获取参数
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const data = Mock.mock(goodsTemplate);
    return res.json(data);
};
