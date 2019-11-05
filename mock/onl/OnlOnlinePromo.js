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
            'classId|1000000000000000-9999999999999999': 1,
            className: '@ctitle(3,10)',
            goodTitle: '@ctitle(3,10)',
            goodDetail: '@ctitle(3,10)',
            goodType: 1,
            oldPrice: 1,
            newPrice: 1,
            buyTime: '2019-08-08 00:00:00',
            aotuDownTime: '2019-08-08 00:00:00',
            priceDay: 1,
            isNowSell: true,
            isDiscuss: true,
            'userId|1000000000000000-9999999999999999': 1,
            userName: 'umbrella',
            wxFacePath: "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoMjjGbIZlstK74IZk2tfkCGw/132",
            state:true,
            fileList:[{
                imgPath:""
            }],
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
