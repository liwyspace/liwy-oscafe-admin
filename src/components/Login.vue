<template>
    <div id="login">
        <div class="login-form">
            <div>
                <input type="text" autocomplete="off" placeholder="用户名"
                       v-model="params.userName"
                       @blur="requireUserName"
                       @keyup.enter="login">
                <label id="userName"></label>
            </div>
            <div>
                <input type="password" autocomplete="new-password" placeholder="密码"
                       v-model="params.password"
                       @blur="requirePwd"
                       @keyup.enter="login">
                <label id="pwd"></label>
            </div>
            <el-button :loading="loading" @click="login" id="loginBtn">登录</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                loading: false,
                params: {
                    userName: '',
                    password: ''
                }
            };
        },
        methods: {
            requireUserName() {
                if(this.params.userName === '') {
                    $('#userName')
                        .addClass('error')
                        .text('请填写用户名');
                } else {
                    $('#userName')
                        .removeClass('error')
                        .text(' ');
                }
            },
            requirePwd() {
                if(this.params.password === '') {
                    $('#pwd')
                        .addClass('error')
                        .text('请填写密码');
                } else {
                    $('#pwd')
                        .removeClass('error')
                        .text(' ');
                }
            },
            login() {
                if(this.params.userName === '' || this.params.password === '') {
                    this.requireUserName();
                    this.requirePwd();
                } else {
                    this.loading = true;
                    this.loginFont = '正在登录...';
                    this.$store.dispatch('userLogin', this.params).then(res => {
                        if(res.code === '200') {
                            this.$store.dispatch('setPermiss').then(res => {
                                if(res.code === '200') {
                                    this.$router.addRoutes(this.$store.state.user.addRouters);
                                    this.$router.push('/helloWorld');
                                    this.loading = false;
                                } else {
                                    this.restInfo();
                                }
                            }).catch(error => {
                                this.restInfo();
                            });
                        } else if(res.code === '304') {
                            this.errorMessage('用户或密码名错误!');
                            this.restInfo();
                        } else if(res.code === '301') {
                            this.errorMessage(res.message + '!');
                            this.restInfo();
                        } else if(res.code === '209') {
                            this.restInfo();
                        }
                    }).catch(error => {
                        this.restInfo();
                    });
                }
            },
            restInfo() {
                this.loading = false;
                this.params.password = '';
            }
        }
    };
</script>

<style lang="scss" scoped>
    .login-form {
        width: 400px;
        height: 260px;
        background: #8cc5ff;

        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -200px;
        margin-top: -130px;
        padding: 30px;

        input {
            width: 100%;
            height: 40px;
            padding: 5px;
            line-height: 30px;
            font-size: 18px;
            display: block;
            border: solid 1px #fffdef;
        }
        label {
            display: block;
            height: 30px;
            color: red;
        }

        #loginBtn {
            width: 100%;
            font-size: 16px;
            color: #2c3e50;
            font-weight: bold;
            letter-spacing: 10px;
        }
    }
</style>
