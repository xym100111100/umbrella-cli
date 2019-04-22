const Url = require('url');
const Mock = require('mockjs');

const template = [
    {
        id: '1234567812345678',
        orderCode: '12345678-12345678-12345678',
        orderState: 1,
        orderTime: '2019-04-19 17:02:22',
        isOrderState: false,
        realMoney: 10000,
        receiverName: '测试',
        receiverMobile: '15787454542',
        receiverProvince: '广西壮族自治区',
        receiverCity: '南宁市',
        receiverExpArea: '西乡塘区',
        receiverAddress: '安吉华尔街工谷',
        goods: [
            {
                id: '1',
                title: '进口香蕉asdaadasadasdasdasdasdsadsadassdadadad',
                desc: '约250g，2根',
                price: 20000,
                subjectType: 0,
                num: 1,
                thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg',
            },
            {
                id: '2',
                title: '进口香蕉asdaadasadasdasdasdasdsadsadassdadadad',
                desc: '约250g，2根',
                price: 20000,
                subjectType: 0,
                num: 1,
                thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg',
            },
            {
                id: '3',
                title: '进口香蕉asdaadasadasdasdasdasdsadsadassdadadad',
                desc: '约250g，2根',
                price: 20000,
                subjectType: 0,
                num: 1,
                thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg',
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
