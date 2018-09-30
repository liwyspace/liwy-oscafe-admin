// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import bowser from 'bowser';

import App from './App';
import router from './router'; // vue-router
import store from './store'; // vuex

// import 'normalize.css';
import '~/css/base.scss';


// 校验浏览器版本
const browser = bowser.getParser(window.navigator.userAgent);
const isValidBrowser = browser.satisfies({
    // declare browsers per OS
    windows: {
        'internet explorer': '>10'
    },
    macos: {
        safari: '>10.1'
    },

    // per platform (mobile, desktop or tablet)
    mobile: {
        safari: '>9',
        'android browser': '>3.10'
    },

    // or in general
    chrome: '>20.1.1432',
    firefox: '>31',
    opera: '>22'
});
if(!isValidBrowser) {
    window.alert('很抱歉，本系统不支持您当前使用的浏览器。推荐您使用 Chrome 或 Firefox 浏览器打开本系统');
}

// 权限校验
router.beforeEach((to, from, next) => {
    console.log('登录校验');
    let user = localStorage.getItem('sessionKey');// 登录标示
    let isSetPerms = store.state.user.isSetPerms; // 是否设置过权限
    if((user === null || user === '') && to.path !== '/login') {
        next('/login');
    } else {
        if(to.path === '/login') {
            next();
        } else {
            if(isSetPerms) {
                next();
            } else {
                store.dispatch('setRouters').then(() => {
                    router.addRoutes(store.state.user.addRouters);
                    next({...to}); // hack方法 确保addRoutes已完成
                });
            }
        }
    }
})
;

Vue.config.productionTip = false;
Vue.use(ElementUI);

console.log('localStorage对象:');
console.log(localStorage);
console.log('process.env对象:');
console.log(process.env);


// Vue入口
new Vue({
    router,
    store,
    components: {App},
    template: '<App/>'
}).$mount('#portalApp');
