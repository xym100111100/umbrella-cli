// import Url from 'url';
// import Mock from 'mockjs';
const Url = require('url');
const Mock = require('mockjs');

const template = {
    pageSize: 8, // 每页大小
    pages: 11, // 总页数
    total: '83', // 总记录数
    'list|8': [
        {
            'id|1000000000000000-9999999999999999': 1,
            // picPath: 'https://unsplash.it/200/200/?random',
            picPath: /https:\/\/picsum\.photos\/200\/200\/\?image=\d{3}/,
            'specId|1000000000000000-9999999999999999': 1,
            promotionType: 1,
            'salePrice|30-3000.2': 1,
            onlineSpec: '@ctitle(3,10) 规格',
            'onlineId|1000000000000000-9999999999999999': 1,
            'cashbackAmount|0-10.2': 1,
            'subjectType|1': [0, 1],
            onlineTitle: '@ctitle(10,50) 商品',
        },
    ],
};

exports.list = function(req, res, u) {
    // 获取参数
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }
    const params = Url.parse(url, true).query;

    const data = Mock.mock(template);
    data.pageNum = params.pageNum - 0 || 1;
    return res.json(data);
};
