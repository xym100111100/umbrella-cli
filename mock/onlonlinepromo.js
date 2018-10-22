const Mock = require('mockjs');

const template = {
    'list|200': [
        {
            picPath: 'https://unsplash.it/200/200/?random',
            specId: '522009343650955288',
            promotionType: 1,
            'salePrice|30-3000.2': 1,
            onlineSpec: '@ctitle(3,10) 规格',
            onlineId: '522009343600623638',
            'cashbackAmount|0-10.2': 1,
            'subjectType|1': [0, 1],
            onlineTitle: '@ctitle(10,50) 商品',
        },
    ],
};

exports.onlonlinepromoList = function(req, res) {
    return res.json(Mock.mock(template).list);
};
