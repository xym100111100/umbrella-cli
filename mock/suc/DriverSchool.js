const Url = require('url');
const Mock = require('mockjs');

// 驾校信息
const schoolTemplate = {
    pageSize: 8, // 每页大小
    pages: 8, // 总页数
    total: '64', // 总记录数
    'list|8': [
        {
            'id|1000000000000000-9999999999999999': 1,
            //  text: '@ctitle(10,50) 商品',
            text: '@ctitle(10,50)',
            driverSchoolName: '@ctitle(3,8)',
            'price|30-3000.2': 1,
            'totalScoreValue|1-7': 1,
            'studentScoreValue|1-7': 1,
            'platformScoreValue|1-7': 1,
            thumb: /https:\/\/picsum\.photos\/200\/200\/\?image=\d{3}/,
        },
    ],
};

// 评论信息信息
const commentTemplate = {
    pageSize: 8, // 每页大小
    pages: 8, // 总页数
    total: '64', // 总记录数
    'list|8': [
        {
            'id|1000000000000000-9999999999999999': 1,
            userName: '@ctitle(3,8)',
            text: '@ctitle(10,50)',
            'scoreValue|1-7': 1,
            thumb: /https:\/\/picsum\.photos\/200\/200\/\?image=\d{3}/,
        },
    ],
};



const  getOne ={
    name:'强大驾校',
    establishTime:'2019-03-05',
    address:'西明商业广场',
    trainingCount:5, // 训练场地
    trainingMeasure:56, // 训练面积
    cartCount:5, // 训练车数量
    studentForYear:63, // 年学生数量
    isDeliver:true, // 是否接送
    passingRate:50,  // 通过率
    ordinaryClass:2451,
    allClass:5623,
    insureClass:3200,
}


exports.getById = function (req, res, u) {
    // 获取参数
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }
    const params = Url.parse(url, true).query;
    return res.json(getOne);
};

exports.list = function (req, res, u) {
    // 获取参数
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }
    const params = Url.parse(url, true).query;

    const data = Mock.mock(schoolTemplate);
    data.pageNum = params.pageNum - 0 || 1;
    return res.json(data);
};

exports.getComment = function (req, res, u) {
    // 获取参数
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }
    const params = Url.parse(url, true).query;

    const data = Mock.mock(commentTemplate);
    data.pageNum = params.pageNum - 0 || 1;
    return res.json(data);
};
