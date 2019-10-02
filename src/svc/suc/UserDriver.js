import { post, get,put } from '../../util/Request';


export function addUserDriver(options) {
              // 初始化options
              const defaultOptions = {
                            type: 'POST', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
              };
              const newOptions = { ...defaultOptions, ...options };
              return post(`/suc-svr/suc/user-driver`, newOptions);
}

export function editUserDriver(options) {
              // 初始化options
              const defaultOptions = {
                            type: 'PUT', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
              };
              const newOptions = { ...defaultOptions, ...options };
              return put(`/suc-svr/suc/user-driver`, newOptions);
}

export function getOne(options) {
              // 初始化options
              const defaultOptions = {
                            type: 'GET', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
              };
              const newOptions = { ...defaultOptions, ...options };
              return get(`/suc-svr/suc/user-driver/get-one`, newOptions);
}