import { get } from '../../util/Request';

export function goodsList(options) {
    // 初始化options
    const defaultOptions = {
        type: 'GET', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
    };
    const newOptions = { ...defaultOptions, ...options };
    return get(`/onl-svr/onl/online/getonlines`, newOptions);
}

export function skuList(options) {
    // 初始化options
    const defaultOptions = {
        type: 'GET', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
    };
    const newOptions = { ...defaultOptions, ...options };
    return get(`/onl-svr/onl/onlinespec/list`, newOptions);
}