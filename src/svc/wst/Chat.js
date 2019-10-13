import { get ,put} from '../../util/Request';

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


export function getUnreadContentByToUserId(options) {
    // 初始化options
    const defaultOptions = {
        type: 'GET', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
    };
    const newOptions = { ...defaultOptions, ...options };
    return get(`/wst-svr/wst/chat/get-unread-content-by-to-user-id`, newOptions);
}


export function cleanUnreadContent(options) {
    // 初始化options
    const defaultOptions = {
        type: 'PUT', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
    };
    const newOptions = { ...defaultOptions, ...options };
    return put(`/wst-svr/wst/chat/clean-unread-content`, newOptions);
}