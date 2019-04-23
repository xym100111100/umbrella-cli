const Url = require('url');
const Mock = require('mockjs');

const template = {
    pageSize: 8, // 每页大小
    pages: 11, // 总页数
    total: '83', // 总记录数
    'list|8': [
        {
            'id|1000000000000000-9999999999999999': 1,
            'orderCode|1000000000000000-9999999999999999': 1,
            'orderState|1': [0, 1, 2, 3, 4, 5],
            orderTime: '2019-04-19 17:02:22',
            'isOrderState|1': true,
            'realMoney|30-3000.2': 1,
            goods: [
                {
                    'id|1000000000000000-9999999999999999': 1,
                    title: '@ctitle(10,50) 商品',
                    desc: '@ctitle(5,15)',
                    'price|30-3000.2': 1,
                    'num|100-9999': 1,
                    'subjectType|1': [0, 1],
                    thumb: /https:\/\/picsum\.photos\/200\/200\/\?image=\d{3}/,
                },
            ],
        },
    ],
};

exports.list = function(req, res, u) {
    // 获取参数
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const data = Mock.mock(template);
    return res.json(data);
};
