<template>
    <div id="appMain">
            <app-header></app-header>
            <div>
                <app-menu></app-menu>
                <el-container direction="vertical">
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                    <app-footer></app-footer>
                </el-container>
            </div>
    </div>
</template>

<script>
    import AppHeader from '@/components/AppHeader.vue';
    import AppFooter from '@/components/AppFooter.vue';
    import AppMenu from '@/components/AppMenu.vue';

    export default {
        name: 'AppMain',
        components: {
            AppHeader,
            AppFooter,
            AppMenu
        }
    };
</script>

<style lang="scss" scoped>
    #appMain {
        & > div > .el-container {
            margin-top: 60px;
            margin-left: 220px;
            background: #EFEFEF;
        }
    }
</style>
