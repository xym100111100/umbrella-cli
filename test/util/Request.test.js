import { expect } from 'chai';
import { request } from '../../src/util/Request';

describe('Request工具类测试', function() {
    it('测试正常网页', function(done) {
        request('https://www.baidu.com', {
            onSuccess: data => {
                // console.log(data);
                done();
            },
            onFail: (code, msg) => {
                // console.log(code + ':' + msg);
                done('测试失败');
            },
        });
    });
    it('测试404', function(done) {
        request('https://news.163.com/18/1023/23/DURCBB2B000189FI.html', {
            onSuccess: data => {
                // console.log(data);
                done('测试失败');
            },
            onFail: (code, msg) => {
                // console.log(code + ':' + msg);
                done();
            },
        });
    });
    // 下面测试时间较长，暂时封闭
    // it('测试网络断开', function(done) {
    //     request('https://192.168.10.1', {
    //         onSuccess: data => {
    //             console.log(data);
    //             done('测试失败');
    //         },
    //         onFail: (code, msg) => {
    //             console.log(code + ':' + msg);
    //             done();
    //         },
    //     });
    // });
});
