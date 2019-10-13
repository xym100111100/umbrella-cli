import { get } from '../../util/Request';

export function getChatByUserId(options) {
    // 初始化options
    const defaultOptions = {
        type: 'GET', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
    };
    const newOptions = { ...defaultOptions, ...options };
    return get(`/wst-svr/wst/chat/get-chat-by-user-id`, newOptions);
}


export function list(options) {
    // 初始化options
    const defaultOptions = {
        type: 'GET', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
    };
    const newOptions = { ...defaultOptions, ...options };
    return get(`/wst-svr/wst/chat`, newOptions);
}