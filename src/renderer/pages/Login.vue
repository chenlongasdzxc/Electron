<template>
    <div>
        <div class="logindiv">
            <el-form ref="loginform" :model="loginForm">
                <el-form-item>
                    <el-input style="width: 200px" v-model="loginForm.userName" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input style="width: 200px" type="password" v-model="loginForm.userPassword"
                              size="small"></el-input>
                </el-form-item>
                <el-button style="width: 200px" size="small" @click="loginButton">LOGIN</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
    const {ipcRenderer: ipc} = require('electron');
    import Config from '../config'

    export default {

        data() {
            return {
                loginForm: {
                    userName: '',
                    userPassword: '',
                },
                items: {
                    name: '',
                },
                params: [],
                permissionCode:[],
                permissionBoolen: false,
            }
        },
        methods: {
            loginButton: function () {
                this.$http.get(Config.login, {params: this.loginForm}).then((response) => {
                    if (response.data.code == '200') {
                        sessionStorage.setItem("userName", this.loginForm.userName)
                        this.params = response.data.data;
                        sessionStorage.setItem("token", this.params.message);
                        sessionStorage.setItem("studentNumber", this.params.number);
                        this.$router.push({path: '/menu'});

                    }
                    if (response.data.code == '401') {
                        this.$message({
                            message: '密码错误',
                            type: 'warning'
                        })
                    }
                    if (response.data.code == '405') {
                        this.$message({
                            message: '账号不存在',
                            type: 'warning'
                        })
                    }
                })
            },



        },
    }
</script>

<style>

</style>