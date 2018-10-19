import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = process.env.apiBaseUrl;
axios.defaults.timeout = 15000;

/** 请求拦截器 */
axios.interceptors.request.use(config => { // 在此处统一配置公共参数
    console.log(`[HTTP请求]：${config.url}`);
    config.data = qs.stringify(config.data); // 序列化
    return config;
}, error => {
    Promise.reject(error); // 错误提示
});


/** 响应拦截器 */
axios.interceptors.response.use(response => {
    console.log(`[HTTP响应]：${JSON.stringify(response.data)}`);
    return response.data;
},
error => {
    return Promise.reject(error);
});

export default axios;
