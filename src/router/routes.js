import Login from '@/components/Login';
import AppMain from '@/components/AppMain';
import HelloWorld from '@/components/HelloWorld';

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

export const asyRoutes = [{
    path: '/cms',
    name: 'CMS管理',
    children: [{
        path: '/sitStatus',
        name: '站点统计',
        leaf: true
    }, {
        path: '/contentMange',
        name: '内容',
        children: [{
            path: '/content',
            name: '内容管理',
            leaf: true,
            redirect: '/content/list',
            children: [{
                path: '/content/list',
                name: '内容列表'
            }, {
                path: '/content/save',
                name: '内容添加'
            }, {
                path: '/content/update',
                name: '内容修改'
            }]
        }, {
            path: '/topic',
            name: '专题管理',
            leaf: true,
            redirect: '/topic/list',
            children: [{
                path: '/topic/list',
                name: '专题列表'
            }, {
                path: '/topic/save',
                name: '专题添加'
            }, {
                path: '/topic/update',
                name: '专题修改'
            }]
        }]
    }, {
        path: '/channel',
        name: '栏目',
        leaf: true,
        redirect: '/channel/list',
        children: [{
            path: '/channel/list',
            name: '栏目列表'
        }, {
            path: '/channel/save',
            name: '栏目添加'
        }, {
            path: '/channel/update',
            name: '栏目修改'
        }, {
            path: '/channel/copy',
            name: '栏目复制'
        }]
    }, {
        path: '/cms/friend',
        name: '友情链接',
        leaf: true
    }, {
        path: '/cms/static',
        name: '页面静态化',
        leaf: true
    }, {
        path: '/cms/huishou',
        name: '回收站',
        leaf: true
    }, {
        path: '/cms/yunying',
        name: '运营管理',
        children: [{
            path: '/cms/sitemsg',
            name: '站点管理',
            leaf: true
        }, {
            path: '/cms/back',
            name: '数据备份',
            leaf: true
        }, {
            path: '/cms/guanggao',
            name: '广告管理',
            leaf: true
        }, {
            path: '/cms/weix',
            name: '公众号管理',
            leaf: true
        }, {
            path: '/cms/modelmsg',
            name: '模型管理',
            leaf: true
        }, {
            path: '/cms/neimuban',
            name: '内容模板',
            leaf: true
        }, {
            path: '/cms/caiji',
            name: '数据采集',
            leaf: true
        }]
    }]
}, {
    path: '/upms',
    name: 'UPMS管理',
    children: [{
        path: '/upms/user',
        name: '用户管理',
        leaf: true
    }, {
        path: '/upms/roler',
        name: '角色管理',
        leaf: true
    }, {
        path: '/upms/department',
        name: '部门管理',
        leaf: true
    }]
}, {
    path: '/config',
    name: '基础服务',
    children: [{
        path: '/data',
        name: '数据字典',
        leaf: true
    }, {
        path: '/activite',
        name: '工作流',
        leaf: true
    }, {
        path: '/crontab',
        name: '定时任务',
        leaf: true
    }, {
        path: '/ftp',
        name: 'FTP管理',
        leaf: true
    }, {
        path: '/oss',
        name: 'OSS管理',
        leaf: true
    }, {
        path: '/smsServer',
        name: '短信服务',
        children: [{
            path: '/smsServer/smsServer',
            name: '短信服务管理',
            leaf: true,
            redirect: '/smsServer/smsServer/list',
            children: [{
                path: '/smsServer/smsServer/list',
                name: '短信服务列表'
            }, {
                path: '/smsServer/smsServer/add',
                name: '短信服务添加'
            }, {
                path: '/smsServer/smsServer/edit',
                name: '短信服务修改'
            }]
        }, {
            path: '/smsServer/smsServer/smsRecord',
            name: '短信使用记录',
            leaf: true,
            redirect: '/smsServer/smsServer/smsRecord',
            children: [{
                path: '/smsServer/smsServer/smsRecord',
                name: '短信使用记录列表'
            }]
        }]
    }, {
        path: '/util',
        name: '常用工具',
        children: [{
            path: '/util/dimensioncode',
            name: '二维码生成',
            leaf: true
        }, {
            path: '/util/httptest',
            name: 'HTTP测试工具',
            leaf: true
        }, {
            path: '/util/unicode',
            name: 'Unicode转换工具',
            leaf: true
        }]
    }]
}];
