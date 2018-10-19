import $http from '@/api/http';
import api from '@/api/api';

import {routes, asyRoutes} from '@/router/routes';

/**
 * 递归处理角色权限
 */
function getansycRoutes(tmpRoutes, perms) {
    let aa = perms.split(',');
    const result = tmpRoutes.filter(route => {
        if(aa.indexOf(route.path) !== -1) {
            if(route.children !== undefined) {
                let cc = aa.join(',');
                route.children = getansycRoutes(route.children, cc);
            }
            return true;
        }
        return false;
    });
    return result;
}

export default {
    state: {
        routes: routes,
        addRouters: [],
        isSetPerms: false // 判断是否刷新过页面
    },
    mutations: {
        SET_ROUTERS: (state, asRouters) => {
            state.routes = routes.concat(asRouters); // 设置路由表
            state.addRouters = asRouters; // 动态路由表
            state.isSetPerms = true; // 是否设置权限
        },
        CLEAR_ROUTERS: (state) => {
            state.routes = routes;
            state.addRouters = [];
            state.perms = false;
            localStorage.setItem('sessionKey', '');
            localStorage.setItem('userName', '');
            window.location.reload(); // 此处退出vuex状态不刷新，目前发现重载页面可以处理。。
        }
    },
    actions: {
        setRouters({commit}, asRouters) {
            commit('SET_ROUTERS', asRouters);
        },
        userLogin({commit}, params) { // 登录异步操作
            let userName = params.userName;
            let password = params.password;
            return new Promise((resolve, reject) => {
                $http.post(api.userLogin, {username: userName, aesPassword: password}).then(res => {
                    if(res.code === '200') {
                        localStorage.setItem('userName', userName);
                        localStorage.setItem('sessionKey', res.body);
                    }
                    resolve(res);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        setPermiss({commit}) {
            return new Promise((resolve, reject) => { // 动态加载路由权限
                $http.post(api.getPerms).then(res => {
                    let asRouters;
                    if(res.body.perms === '*') {
                        asRouters = asyRoutes.getRoutes();
                    } else {
                        asRouters = getansycRoutes(asyRoutes.getRoutes(), res.body.perms); // 递归过滤
                    }
                    commit('SET_ROUTERS', asRouters);
                    resolve(res);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                $http.post(api.userLogout).then(res => {
                    if(res.code === '200') {
                        commit('CLEAR_ROUTERS');
                    }
                    resolve(res);
                }).catch(error => {
                    reject(error);
                });
            });
        }
    }
};
