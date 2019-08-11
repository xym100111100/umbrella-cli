const Url = require('url');
const Mock = require('mockjs');

// 商品信息
const goodsTemplate = {
    pageSize: 16, // 每页大小
    pages: 8, // 总页数
    total: '32', // 总记录数
    'list|16': [
        {
            'id|1000000000000000-9999999999999999': 1,
          //  text: '@ctitle(10,50) 商品',
          text: '@ctitle(10,50)',
            name: '@ctitle(3,8)',
            'price|30-3000.2': 1,
            'num|100-9999': 1,
            thumb: /https:\/\/picsum\.photos\/200\/200\/\?image=\d{3}/,
        },
    ],
};

exports.chatInfo = function(req, res, u) {
    // 获取参数
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }
    const params = Url.parse(url, true).query;

    const data = Mock.mock(goodsTemplate);
    data.pageNum = params.pageNum - 0 || 1;
    return res.json(data);
};
