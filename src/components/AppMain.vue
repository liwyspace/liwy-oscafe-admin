<template>
    <div id="appMain">
        <app-header></app-header>
        <div>
            <app-menu></app-menu>
            <el-container direction="vertical">
                <el-scrollbar wrap-style="overflow-x: hidden;" id="appMainScroll" ref="mainScrollbar">
                    <el-main>
                        <div :class="[appCssClass]">
                            <router-view></router-view>
                        </div>
                    </el-main>
                    <app-footer></app-footer>
                </el-scrollbar>
            </el-container>
        </div>
    </div>
</template>

<script>
    import ResizeObserver from 'resize-observer-polyfill';
    import AppHeader from '@/components/AppHeader.vue';
    import AppFooter from '@/components/AppFooter.vue';
    import AppMenu from '@/components/AppMenu.vue';

    export default {
        name: 'AppMain',
        components: {
            AppHeader,
            AppFooter,
            AppMenu
        },
        computed: {
            appCssClass() {
                return this.$route.meta.appName ? this.$route.meta.appName + '-app' : '';
            }
        },
        methods: {
            // 修复el-scrollbar组件当wrap改变时更新
            repairScrollbar() {
                const myObserver = new ResizeObserver(entries => {
                    for(let entry of entries) {
                        this.$refs.mainScrollbar.update();
                    }
                });
                myObserver.observe($('#appMainScroll>.el-scrollbar__wrap')[0]);
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.repairScrollbar();
            });
        }
    };
</script>

<style lang="scss" scoped>
    #appMain {
        & > div > .el-container {
            position: fixed;
            top: 60px;
            bottom: 0px;
            left: 220px;
            right: 0px;

            .el-scrollbar {
                height: 100%;
            }
        }
    }
</style>
