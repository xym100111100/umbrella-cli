const Url = require('url');
const Mock = require('mockjs');

//商品信息
const goodsTemplate=[
    {
        id: '022154436-101412421-2012004527',
        title: '美国伽力果',
        desc: '约680g/3个',
        price: 2680,
        num: 2,
        thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg',
        state: 1,
    }
];

exports.goodsList = function(req, res, u) {
    // 获取参数
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const data = Mock.mock(goodsTemplate);
    return res.json(data);
};