<template>
    <el-aside id="appMenu" style="width: 240px;">
        <el-scrollbar wrap-style="overflow-x: hidden;">
            <el-menu
                default-active="2"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <span style="color: #CCC; line-height: 60px;margin-left: 14px;">系统菜单</span>
                <template v-for="(item,index) in $store.state.user.routes" v-if="!item.hidden">
                    <el-menu-item v-if="item.leaf" :index="item.path" :key="index">
                        <i class="el-icon-setting"></i>
                        <span slot="title">{{item.name}}</span>
                    </el-menu-item>
                    <el-submenu :index="item.path" v-else :key="index">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item.name}}</span>
                        </template>
                        <template v-for="(child,index2) in item.children" v-if="!child.hidden">
                            <el-menu-item v-if="child.leaf" :index="child.path" :key="child.path">
                                <i class="el-icon-setting"></i>
                                <span slot="title">{{child.name}}</span>
                            </el-menu-item>
                            <el-submenu v-else :index="child.path" :key="index2">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>{{child.name}}</span>
                                </template>
                                <el-menu-item v-for="child2 in child.children" v-if="!child2.hidden"
                                              :index="child2.path" :key="child2.path">
                                    {{child2.name}}
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
    export default {
        name: 'AppMenu',
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
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

        .el-menu {
            border-right: none;
        }

        .el-scrollbar {
            width: 100%;
            height: 100%;
        }
    }
</style>
