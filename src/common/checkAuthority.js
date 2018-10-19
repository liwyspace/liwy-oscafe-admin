import router from '@/router';
import store from '@/store';

/** 路由切换前校验权限 */
router.beforeEach((to, from, next) => {
    console.log(`[路由切换]：${from.path}->${to.path}`);
    console.log(router);
    console.log(router.app);
    router.app.currAppName = 'liwyapp';

    let user = localStorage.getItem('sessionKey');// 登录标示
    let isSetPerms = store.state.user.isSetPerms; // 是否设置过权限
    console.log(`[登录用户]：${localStorage.getItem('userName')}`);
    if((user === null || user === '') && to.path !== '/login') {
        next('/login');
    } else {
        if(to.path === '/login') {
            next();
        } else {
            console.log(`[用户权限路由]：${JSON.stringify(store.state.user.addRouters)}`);
            if(isSetPerms) {
                next();
            } else {
                store.dispatch('setPermiss').then(() => {
                    console.log(`[添加权限路由]：${JSON.stringify(store.state.user.addRouters)}`);
                    router.addRoutes(store.state.user.addRouters);
                    next({...to}); // hack方法 确保addRoutes已完成
                });
            }
        }
    }
});
