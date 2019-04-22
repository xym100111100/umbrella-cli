const Url = require('url');
const Mock = require('mockjs');

const template = [
    {
        id: '1234567812345678',
        orderCode: '12345678-12345678-12345678',
        orderState: 1,
        orderTime: '2019-04-19 17:02:22',
        isOrderState: true,
        realMoney: 10000,
        goods: [
            {
                id: '1',
                title:
                    '进口香蕉asdaadasadasdasdasdasdsadsadassdadadad爱仕达大大大大大大所大所大所大大大所大所大所大所大所付多所付过多过法师打发第三方士大夫事故发生',
                desc: '约250g，2根',
                price: 20000,
                num: 1,
                thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg',
            },
        ],
    },
    {
        id: '1234567812345678',
        orderCode: '12345678-12345678-12345678',
        orderState: 1,
        orderTime: '2019-04-19 17:02:22',
        isOrderState: true,
        realMoney: 10000,
        goods: [
            {
                id: '2',
                title: '陕西蜜梨',
                desc: '约600g',
                price: 690,
                num: 1,
                thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg',
            },
        ],
    },
    {
        id: '1234567812345678',
        orderCode: '12345678-12345678-12345678',
        orderState: 1,
        orderTime: '2019-04-19 17:02:22',
        isOrderState: true,
        realMoney: 10000,
        goods: [
            {
                id: '3',
                title: '美国伽力果',
                desc: '约680g/3个',
                price: 2680,
                num: 1,
                thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg',
            },
        ],
    },
    {
        id: '1234567812345678',
        orderCode: '12345678-12345678-12345678',
        orderState: 1,
        orderTime: '2019-04-19 17:02:22',
        isOrderState: false,
        realMoney: 10000,
        goods: [
            {
                id: '4',
                title: '美国伽力果',
                desc: '约680g/3个',
                price: 2680,
                num: 1,
                thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg',
            },
            {
                id: '5',
                title: '美国伽力果',
                desc: '约680g/3个',
                price: 2680,
                num: 1,
                thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg',
            },
        ],
    },
    {
        id: '1234567812345678',
        orderCode: '12345678-12345678-12345678',
        orderState: 1,
        orderTime: '2019-04-19 17:02:22',
        isOrderState: false,
        realMoney: 10000,
        goods: [
            {
                id: '5',
                title: '美国伽力果',
                desc: '约680g/3个',
                price: 2680,
                num: 1,
                thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg',
            },
        ],
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
