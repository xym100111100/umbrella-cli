const Url = require('url');
const Mock = require('mockjs');


// 通知信息信息
const commentTemplate = {
    pageSize: 8, // 每页大小
    pages: 8, // 总页数
    total: '64', // 总记录数
    'list|8': [
        {
            'id|1000000000000000-9999999999999999': 1,
            text: '@ctitle(10,50)',
            userName: '@ctitle(2,10)',
            'scoreValue|1-7': 1,
            thumb: /https:\/\/picsum\.photos\/200\/200\/\?image=\d{3}/,
        },
    ],
};

const data = {
    isNewUser: false,
    msg: "登录成功",
    result: 1,
    sucUserMo: {
        id: "653596523128553475",
        wxName: "umbrella",
        schoolName:"桂林理工大学",
        wxFacePath: "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhWsvfKH394wkdqecxib6TO3sTpsx8Flwj696Cabq39XoMjjGbIZlstK74IZk2tfkCGw/132",
        role:1
    }

}

exports.login = function (req, res, u) {
    // 获取参数

    return res.json(data);
};
