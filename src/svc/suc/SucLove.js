import { post ,get ,put,del} from '../../util/Request';

export function add(options) {
              // 初始化options
              const defaultOptions = {
                            type: 'POST', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
              };
              const newOptions = { ...defaultOptions, ...options };
              return post(`/suc-svr/suc/love`, newOptions);
}

export function modify(options) {
              // 初始化options
              const defaultOptions = {
                            type: 'PUT', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
              };
              const newOptions = { ...defaultOptions, ...options };
              return put(`/suc-svr/suc/love`, newOptions);
}

export function loveCount(options) {
              // 初始化options
              const defaultOptions = {
                            type: 'GET', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
              };
              const newOptions = { ...defaultOptions, ...options };
              return get(`/suc-svr/suc/love/get-count-by-user-id`, newOptions);
}

export function list(options) {
              // 初始化options
              const defaultOptions = {
                            type: 'GET', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
              };
              const newOptions = { ...defaultOptions, ...options };
              return get(`/suc-svr/suc/love`, newOptions);
}


export function deleteByids(options) {
              // 初始化options
              const defaultOptions = {
                            type: 'PUT', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
              };
              const newOptions = { ...defaultOptions, ...options };
              return put(`/suc-svr/suc/love/by-ids`, newOptions);
}