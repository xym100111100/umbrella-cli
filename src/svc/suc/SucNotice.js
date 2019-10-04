import { post} from '../../util/Request';

export function add(options) {
              // 初始化options
              const defaultOptions = {
                            type: 'POST', // 请求的方法类型(GET/POST/PUT/DELETE)，默认为GET
              };
              const newOptions = { ...defaultOptions, ...options };
              return post(`/suc-svr//suc/notice`, newOptions);
}