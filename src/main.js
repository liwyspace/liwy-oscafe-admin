import './common/checkBrowserVersion'; // 校验浏览器版本
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/base.scss';
import 'jquery';

import App from './App'; // entry component
import router from './router'; // vue-router
import store from './store'; // vuex
import './common/checkAuthority'; // 路由切换时校验权限

import {asyRoutes} from './router/routes';
import AppMain from './components/AppMain';
import AppMainChildren from './components/AppMainChildren';

console.log('------ Portal 开始加载 ------');

Vue.config.productionTip = false;
Vue.use(ElementUI);

const portalSDK = {
    version: '1.0.0',
    Vue: Vue,
    ElementUI: ElementUI,
    AppMain: AppMain,
    AppMainChildren: AppMainChildren,
    addRoutes: asyRoutes.setRoutes
};
export default portalSDK;

$(document).ready(function () {
    console.log('------ 开始加载所有子项目 ------');
    $('head').append('<link href="/static/project/liwy-oscafe-admin-cms/css/app.75aac20b959a3967f48fe05e86176c86.css" rel="stylesheet"></link>');
    $('body').append('<script src="/static/project/liwy-oscafe-admin-cms/js/app.53b2d4780160c2965ab6.js"></script>');
    console.log('------ 所有子项目加载完成 ------');

    console.log('------ 开始初始化项目 ------');
    /** Vue入口 */
    new Vue({
        router,
        store,
        components: {App},
        template: '<App/>'
    }).$mount('#portal');
    console.log('------ 项目初始化完成 ------');
});
console.log('------ Portal 加载完成 ------');
