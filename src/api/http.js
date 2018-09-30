import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = process.env.baseUrl;
axios.defaults.timeout = 15000;

/** 请求拦截器 */
axios.interceptors.request.use(config => { // 在此处统一配置公共参数
    console.log('拦截到http请求：');
    console.log(config);
    config.data = qs.stringify(config.data); // 序列化
    return config;
}, error => {
    Promise.reject(error); // 错误提示
});


/** 响应拦截器 */
axios.interceptors.response.use(response => {
    let res = response.data;
    console.log('拦截到http响应：');
    console.log(res);
    return response.data;
},
error => {
    console.log('服务器响应失败');
    return Promise.reject(error);
});

export default axios;
