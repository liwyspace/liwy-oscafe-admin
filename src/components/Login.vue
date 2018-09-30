<template>
    <div id="login">
        <div class="val user-after">
            <input type="text" autocomplete="off" placeholder="用户名"
                   v-model="params.userName"
                   @blur="requireUserName"
                   @keyup.enter="login"
                   class="login-input user">
            <label id="userName"></label>
        </div>
        <div class="val pwd-after">
            <input type="password" autocomplete="new-password" placeholder="密码"
                   v-model="params.password"
                   @blur="requirePwd"
                   @keyup.enter="login"
                   class="login-input user">
            <label id="pwd"></label>
        </div>
        <el-button :loading="loading" class="login-input login-btn" @click="login" id="loginBtn">登录</el-button>
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
                    $('#loginBtn').css('background', '#ebcd41');
                } else {
                    $('#pwd')
                        .removeClass('error')
                        .text(' ');
                    $('#loginBtn').css('background', '#fee300');
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
                        console.log(res);
                        if(res.code === '200') {
                            this.$store.dispatch('setRouters').then(res => {
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

</style>
