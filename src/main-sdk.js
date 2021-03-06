import './common/checkBrowserVersion'; // 校验浏览器版本
import Vue from 'vue';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/base.scss';
import 'jquery';
import App from './App'; // entry component
import router from './router'; // vue-router
import store from './store'; // vuex
import {asyRoutes, afterRoutes} from './router/routes';
import AppMain from './components/AppMain';
import AppMainChildren from './components/AppMainChildren';
import $http from './api/http';

console.log('------ Portal 开始加载 ------');

Vue.config.productionTip = false;
Vue.use(ElementUI);

function initPortal() {
    console.log('------ 开始初始化项目 ------');
    console.log(`[添加权限路由]：${JSON.stringify(asyRoutes.getRoutes())}`);
    store.dispatch('setRouters', asyRoutes.getRoutes());
    router.addRoutes(asyRoutes.getRoutes());
    router.addRoutes(afterRoutes);

    new Vue({
        router,
        store,
        components: {App},
        template: '<App/>'
    }).$mount('#portal');
    console.log('------ 项目初始化完成 ------');
}

const portalSDK = {
    version: '1.0.0',
    Vue: Vue,
    Vuex: Vuex,
    ElementUI: ElementUI,
    Store: store,
    HttpUtil: $http,
    AppMain: AppMain,
    AppMainChildren: AppMainChildren,
    addRoutes: asyRoutes.setRoutes,
    initPortal: initPortal
};
export default portalSDK;
console.log('------ Portal 加载完成 ------');
