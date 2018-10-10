import './common/checkBrowserVersion'; // 校验浏览器版本
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/base.scss';

import App from './App'; // entry component
import router from './router'; // vue-router
import store from './store'; // vuex
import './common/checkAuthority'; // 路由切换时校验权限

import {asyRoutes} from './router/routes';
import AppMain from './components/AppMain';
import AppMainChildren from './components/AppMainChildren';

Vue.config.productionTip = false;
Vue.use(ElementUI);

/** Vue入口 */
new Vue({
    router,
    store,
    components: {App},
    template: '<App/>'
}).$mount('#portal');

const portalSDK = {
    version: '1.0.0',
    Vue: Vue,
    ElementUI: ElementUI,
    jQuery: jQuery,
    AppMain: AppMain,
    AppMainChildren: AppMainChildren,
    addRoutes: asyRoutes.setRoutes
};
export default portalSDK;

// 动态加载子项目
// $('head').append('<link href="/static/project/liwy-oscafe-admin-cms/static/css/app.13e1e7056fb9ad71af8702f830f0b11e.css" rel="stylesheet"></link>');
// $('body').append('<script src="/static/project/liwy-oscafe-admin-cms/static/js/app.bdff00c4b8bdf58d9cfe.js"></script>');
