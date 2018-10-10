<template>
    <el-header id="appHeader">
        <div class="header-left">
            <img src="../assets/images/header-logo.png" alt="开源小屋后台管理系统" class="header-logo">
        </div>
        <div class="header-right">
            <div class="header-user-group">
                <img src="../assets/images/userlogo.png" alt="" class="user-logo">
                <span class="username">{{userName}}</span>
            </div>
            <a href="javascript:void(0)" @click="getIndex" class="header-operation">
                <i class="iconfont icon-home"></i> 查看首页
            </a>
            <a href="javascript:void(0)" @click="logout" class="header-operation">
                <i class="iconfont icon-jinzhi"></i> 退出
            </a>
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
        background: #F0F0F0;
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
            .header-logo {
                height: 40px;
            }
        }
        .header-right {
            float: right;
            display: flex;
            align-items: center;
            height: 100%;

            .header-user-group {
                display: flex;
                height: 100%;
                line-height: 100%;
                align-items: center;
                .user-logo {
                    width: 32px;
                    height: 32px;
                    margin-right: 10px;
                }
            }
            .header-operation {
                .iconfont {
                    font-size: 20px;
                }
                margin-left: 25px;
                &:hover {
                    color: #188ae2;
                }
            }
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
