import { post,put } from '../../util/Request';


export function login(options) {
    console.log(options)
    // 初始化options
    const defaultOptions = {
        type: 'POST', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
    };
    const newOptions = { ...defaultOptions, ...options };
    return post(`/suc-svr/suc/user/user-login`, newOptions);
}

export function modify(options) {
    console.log(options)
    // 初始化options
    const defaultOptions = {
        type: 'PUT', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
    };
    const newOptions = { ...defaultOptions, ...options };
    return put(`/suc-svr/suc/user`, newOptions);
}