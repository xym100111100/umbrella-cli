// 配置代理
const proxy = {};
addProxy('suc-svr', 'http://127.0.0.1:9750/');
addProxy('wst-svr', 'http://127.0.0.1:9860/');

/**
 * 添加联调的微服务
 *
 * @param {String} key 微服务的名称
 * @param {String} value 微服务启动的地址
 */
function addProxy(key, value) {
    const pathRewrite = {};
    pathRewrite[`^/${key}`] = '';

    proxy[`/${key}`] = {
        target: value,
        pathRewrite,
    };
}

module.exports = proxy;
// export default proxy;
