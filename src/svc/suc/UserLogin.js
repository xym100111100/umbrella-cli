import { post } from '../../util/Request';


export function login(options) {
    console.log(options)
    // 初始化options
    const defaultOptions = {
        type: 'POST', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
    };
    const newOptions = { ...defaultOptions, ...options };
    return post(`/suc-svr/login1`, newOptions);
}