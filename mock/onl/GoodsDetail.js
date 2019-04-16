const Url = require('url');
const Mock = require('mockjs');

// 商品信息
const goodsTemplate = {
    title: '美国伽力果（约680g/3个）',
    price: 2680,
    express: '免运费',
    remain: 19,
    // 默认商品 sku 缩略图
    picture: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
    thumb: [
        'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
        'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg',
    ],
    detail: '<p>商品详情</p><p>厨小宝<br/>清水洗涤神器<br/><br/>厨小宝是运用多项国家专利，完全物理原理，应用定频离子共振技术，与水分子团产生共振，高穿透深度瓦解油腻顽渍的聚合，从而使去污、除菌在清洗中一次完成，并达到高效的洁净力。<br/><br/>详情介绍</p><img src="https://duamai.com/ise-svr/files/goodsDetail/2018/11/20/14/25/A931E164D6724F6AAB2A22324C3D00AD.jpg"/><p></p><p></p><p></p>',
};

exports.goodsList = function(req, res, u) {
    // 获取参数
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const data = Mock.mock(goodsTemplate);
    return res.json(data);
};

// sku信息
const skuTemplate = {
    // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
    // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
    tree: [
        {
            k: '颜色', // skuKeyName：规格类目名称
            v: [
                {
                    id: '1215',
                    name: '蓝色',
                    imgUrl: 'https://img.yzcdn.cn/2.jpg',
                },
                {
                    id: '1216', // skuValueId：规格值 id
                    name: '红色', // skuValueName：规格值名称
                    imgUrl: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg', // 规格类目图片，只有第一个规格类目可以定义图片
                },
            ],
            k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
        },
        {
            k: '属性', // skuKeyName：规格类目名称
            v: [
                {
                    id: '30349', // skuValueId：规格值 id
                    name: '红色', // skuValueName：规格值名称
                    imgUrl: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg', // 规格类目图片，只有第一个规格类目可以定义图片
                },
            ],
            k_s: 's2', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
        },
    ],
    // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
    list: [
        {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
            s2: '30349', // 规格类目 k_s 为 s2 的对应规格值 id
            s3: '0', // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110, // 当前 sku 组合对应的库存
        },
        {
            id: 2260, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: '1216', // 规格类目 k_s 为 s1 的对应规格值 id
            s2: '30349', // 规格类目 k_s 为 s2 的对应规格值 id
            s3: '0', // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110, // 当前 sku 组合对应的库存
        },
    ],
    price: '1.00', // 默认价格（单位元）
    stock_num: 227, // 商品总库存
    collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
    none_sku: false, // 是否无规格商品
    hide_stock: false, // 是否隐藏剩余库存
};

exports.skuList = function(req, res, u) {
    // 获取参数
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const data = Mock.mock(skuTemplate);
    return res.json(data);
};
