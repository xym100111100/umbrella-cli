import { post,get } from '../util/Request';

/**
 * 上传文件
 * @param {文件} options 
 */
export function upload(options) {
    console.log(options)
    // 初始化options
    const defaultOptions = {
        type: 'POST', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
    };
    const newOptions = { ...defaultOptions, ...options };
    return post(`/ise-svr/ise/upload`, newOptions);
}


export function getNotice(options) {
    // 初始化options
    const defaultOptions = {
        type: 'GET', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
    };
    const newOptions = { ...defaultOptions, ...options };
    return get(`/suc-svr/getNotice`, newOptions);
}