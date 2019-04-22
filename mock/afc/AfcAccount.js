const Url = require('url');
const Mock = require('mockjs');

const template = [
    {
        id: '123',
        balance:1213,
        cashback:787,
        commissionTotal:45,
        commissioning:56,
    },
];

exports.getById = function(req, res, u) {
    // 获取参数
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const data = Mock.mock(template);
    return res.json(data);
};
