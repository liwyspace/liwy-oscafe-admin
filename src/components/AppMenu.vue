<template>
    <el-aside id="appMenu" style="width: 220px;">
        <el-scrollbar wrap-style="overflow-x: hidden;" ref="scrollbar">
            <el-menu
                :default-active="activeIndex"
                @open="handleOpen"
                @close="handleClose"
                @select="handleSelect"
                router
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <span class="system-label">系统菜单</span>
                <template v-for="(item,index) in $store.state.user.routes" v-if="!item.hidden">
                    <el-menu-item v-if="item.leaf" :index="item.path" :key="index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.name}}</span>
                    </el-menu-item>
                    <el-submenu :index="item.path" v-else :key="index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{item.name}}</span>
                        </template>
                        <template v-for="(child,index2) in item.children" v-if="!child.hidden">
                            <el-menu-item v-if="child.leaf" :index="child.path" :key="child.path">
                                <i :class="child.icon"></i>
                                <span slot="title">{{child.name}}</span>
                            </el-menu-item>
                            <el-submenu v-else :index="child.path" :key="index2">
                                <template slot="title">
                                    <i :class="child.icon"></i>
                                    <span>{{child.name}}</span>
                                </template>
                                <el-menu-item v-for="child2 in child.children" v-if="!child2.hidden"
                                              :index="child2.path" :key="child2.path">
                                    <i :class="child2.icon"></i>
                                    <span slot="title">{{child2.name}}</span>
                                </el-menu-item>
                            </el-submenu>
                        </template>
                    </el-submenu>
                </template>
            </el-menu>
        </el-scrollbar>
    </el-aside>
</template>

<script>
    import ResizeObserver from 'resize-observer-polyfill';

    export default {
        name: 'AppMenu',
        data() {
            return {
                activeIndex: ''
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            // 修复el-scrollbar组件当wrap改变时更新
            repairScrollbar() {
                const myObserver = new ResizeObserver(entries => {
                    for(let entry of entries) {
                        this.$refs.scrollbar.update();
                    }
                });
                myObserver.observe($('#appMenu .el-scrollbar__wrap')[0]);
            }
        },
        mounted: function () {
            // 初始化后修改菜单的默认激活项
            console.log(this.$route);
            let matched = this.$route.matched;
            let currentRoute = matched[matched.length - 1];
            let parentRoute = currentRoute.parent;
            if(parentRoute && parentRoute.redirect) {
                if(parentRoute.path === '') {
                    this.activeIndex = '/';
                } else {
                    this.activeIndex = parentRoute.path;
                }
            } else {
                this.activeIndex = currentRoute.path;
            }

            // 所有子组件初始化完成后重置滚动条
            this.$nextTick(function () {
                this.repairScrollbar();
            });
        }
    };


</script>

<style lang="scss" scoped>
    #appMenu {
        position: fixed;
        top: 60px;
        bottom: 0;
        background: rgb(84, 92, 100);
        border-right: solid 1px #e6e6e6;

        .system-label {
            color: #cccccc;
            font-size: 18px;
            display: block;
            padding: 20px 20px 10px 20px;
        }

        .el-menu {
            border-right: none;
        }

        .el-scrollbar {
            height: 100%;
        }
    }
</style>
