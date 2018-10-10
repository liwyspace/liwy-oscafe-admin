import router from '@/router';
import store from '@/store';

/** 路由切换前校验权限 */
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
});
