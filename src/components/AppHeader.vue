<template>
    <el-header id="appHeader">
        <div class="header-left">
            <img src="" alt="" class="header-logo">
            <a href="javascript:void(0)">左侧</a>
        </div>
        <div class="header-right">
            <span class="username">{{userName}}</span>
            <a href="javascript:void(0)" @click="getIndex">查看首页</a>
            <a href="javascript:void(0)" @click="logout">退出</a>
        </div>
    </el-header>
</template>

<script>
    export default {
        name: 'AppHeader',
        data() {
            return {
                userName: localStorage.getItem('userName')
            };
        },
        methods: {
            logout() { // 退出登录
                this.$confirm('确定退出吗？', '提示', {type: 'warning'}).then(mes => {
                    this.$store.dispatch('logout').then(res => {
                        if(res.code === '200') {
                            this.$router.push('/login');
                        } else {
                            this.errorMessage();
                        }
                    });
                }).catch(error => {
                });
            },
            getIndex() { // 查看首页
                window.open('http://www.oscafe.net');
            }
        }
    };
</script>

<style lang="scss" scoped>
    #appHeader {
        background: #fff;
        border-bottom: 1px solid #e0e4e9;
        box-shadow: 10px 1px 15px rgba(0, 0, 0, 0.17);
        transform: translateZ(0);

        position: fixed;
        top: 0;
        left: 0;
        right: 0;

        .header-left {
            float: left;
            display: flex;
            align-items: center;
            height: 100%;
            width: 220-24px;
        }
        .header-right {
            float: right;
            display: flex;
            align-items: center;
            height: 100%;
        }

        @media screen and(max-width: 700px) {
            .header-right {
                display: none;
            }
            .header-left {
                width: 100%;
            }
        }
    }
</style>
