import { post,get,put,del} from '../../util/Request';

export function add(options) {
              // 初始化options
              const defaultOptions = {
                            type: 'POST', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
              };
              const newOptions = { ...defaultOptions, ...options };
              return post(`/suc-svr/suc/goods`, newOptions);
}

export function list(options) {
              // 初始化options
              const defaultOptions = {
                            type: 'GET', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
              };
              const newOptions = { ...defaultOptions, ...options };
              return get(`/suc-svr/suc/goods`, newOptions);
}

export function modify(options) {
              // 初始化options
              const defaultOptions = {
                            type: 'PUT', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
              };
              const newOptions = { ...defaultOptions, ...options };
              return put(`/suc-svr/suc/goods`, newOptions);
}



export function deleteGoods(options) {
              // 初始化options
              const defaultOptions = {
                            type: 'DELETE', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
              };
              const newOptions = { ...defaultOptions, ...options };
              return del(`/suc-svr/suc/goods`, newOptions);
}