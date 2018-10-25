import Url from 'url';
import Mock from 'mockjs';

const template = {
    pageSize: 8,
    pages: 11,
    total: '83',
    'list|8': [
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

export function onlonlinepromoList(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }
    const params = Url.parse(url, true).query;

    const data = Mock.mock(template);
    data.pageNum = params.pageNum || 1;
    return res.json(data);
}
