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

/**
 * 这里使用的是list不分页的方法，但是这里名字
 * 是获取商品数量，其实是为了省事的写法
 * @param {} options 
 */
export function goodsCountByUserId(options) {
              // 初始化options
              const defaultOptions = {
                            type: 'GET', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
              };
              const newOptions = { ...defaultOptions, ...options };
              return get(`/suc-svr/suc/goods/list-goods`, newOptions);
}