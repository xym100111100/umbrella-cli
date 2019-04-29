const Url = require('url');
const Mock = require('mockjs');

const template = [
    {
        id: '123',
        point:99,
        yesterdayIncome:84,
        cumulativeIncome:45,
        waitingPoint:56,
    },
];

exports.list = function(req, res, u) {
    // 获取参数
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const data = Mock.mock(template);
    return res.json(data);
};
