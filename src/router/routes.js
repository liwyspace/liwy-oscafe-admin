import Login from '@/components/Login';
import AppMain from '@/components/AppMain';
import HelloWorld from '@/components/HelloWorld';

// 基础路由数据
export const routes = [
    {
        path: '/login',
        name: '登录',
        component: Login,
        hidden: true
    },
    {
        path: '/',
        name: '欢迎页',
        leaf: true,
        component: AppMain,
        redirect: '/helloWorld',
        children: [{
            path: '/helloWorld',
            component: HelloWorld
        }]
    }
];

// 动态路由数据，由子系统添加，并通过权限过滤
let asyRoutesData = [];
export const asyRoutes = {
    getRoutes() {
        return asyRoutesData;
    },
    setRoutes(appName, datas) {
        for(let index in datas) {
            appendPrefix(appName, datas[index]);
        }
        console.log(`[${appName}添加路由]：${JSON.stringify(datas)}`);
        asyRoutesData = asyRoutesData.concat(datas);
    }
};

// 添加路由前缀AppName
function appendPrefix(appName, route) {
    if(route.path) {
        route.path = '/' + appName + route.path;
    }
    if(route.redirect) {
        route.redirect = '/' + appName + route.redirect;
    }

    for(let index in route.children) {
        appendPrefix(appName, route.children[index]);
    }
}
