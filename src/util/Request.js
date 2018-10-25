import axios from 'axios';

const codeMessage = {
    ETIMEDOUT: '网络断开或服务器异常，请稍后重试',
    // 200: '服务器成功返回请求的数据',
    // 201: '新建或修改数据成功',
    // 202: '一个请求已经进入后台排队（异步任务）',
    // 204: '删除数据成功',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作',
    401: '用户授权过期，请重新登录',
    403: '用户没有此权限',
    404: '找不到此页面',
    406: '请求的格式不可得',
    410: '请求的资源被永久删除，且不会再得到的',
    422: '当创建一个对象时，发生一个验证错误',
    500: '服务器发生错误，请检查服务器',
    502: '网关错误',
    503: '服务不可用，服务器暂时过载或维护',
    504: '网关超时',
};

/**
 * 发出HTTP请求
 *
 * @param {String} url 请求的地址
 * @param {Object} options 请求的选项
 */
export function request(url, options) {
    // 初始化options
    const defaultOptions = {
        type: 'GET', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
        data: undefined, // 请求的参数数据
        onSuccess: undefined, // 请求完成事件
        onFail: undefined, // 请求失败事件
    };
    const newOptions = { ...defaultOptions, ...options };

    // 请求的config
    const config = {
        url,
        method: newOptions.type.toLowerCase(),
        data: newOptions.data,
    };
    // 发出请求
    return (
        axios
            .request(config)
            // 如果状态正常
            .then(response => {
                // 检查状态，错误状态会抛出异常
                // checkStatus(response);

                // 如果没有响应回正确的数据，则抛出异常
                if (!response.data) {
                    const error = new Error();
                    error.response = response;
                    throw error;
                }

                // 产生请求成功事件
                newOptions.onSuccess && newOptions.onSuccess(response.data);
                return;
            })
            // 如果状态异常
            .catch(e => {
                // 状态码
                const status = e.code || e.response.status;
                const errorText = codeMessage[status] || e.response.statusText;
                // 产生请求失败事件
                newOptions.onFail && newOptions.onFail(status, errorText);

                // TODO 根据错误状态进行相应处理
                if (status === 'ETIMEDOUT') {
                } else if (status === 401) {
                } else if (status === 403) {
                } else if (status <= 504 && status >= 500) {
                } else if (status >= 404 && status < 422) {
                }
            })
    );
}

// function checkStatus(response) {
//     if (response.status >= 200 && response.status < 300) {
//         return;
//     }

//     const error = new Error();
//     error.code = response.status;
//     error.response = response;
//     throw error;
// }
