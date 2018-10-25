import { expect } from 'chai';
import { request } from '../../src/util/Request';

describe('Request工具类测试', function() {
    it('测试正常网页', function() {
        request('https://www.baidu.com', {
            onSuccess: data => console.log(data),
        });
    });
    it('测试404', function() {
        request('https://news.163.com/18/1023/23/DURCBB2B000189FI.html', {
            onFail: (code, msg) => console.log(code + ':' + msg),
        });
    });
    it('测试网络断开', function() {
        request('https://192.168.10.1', {
            onFail: (code, msg) => console.log(code + ':' + msg),
        });
    });
});
