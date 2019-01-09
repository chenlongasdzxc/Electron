<template>
    <div>
        <div class="logindiv">
            <el-form ref="loginform" :model="loginform">
                <el-form-item>
                    <el-input style="width: 200px" v-model="loginform.userName" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input style="width: 200px" type="password" v-model="loginform.userPassword" size="small"></el-input>
                </el-form-item>
                    <el-button style="width: 200px" size="small"  @click="loginButton">LOGIN</el-button>
            </el-form>

        </div>
    </div>
</template>

<script>
    const {ipcRenderer: ipc} = require('electron');
    import Config from '../config'
    export default {

        data(){
            return{
                loginform:{
                    userName:'',
                    userPassword:'',
                },
                items:{
                  name:'',
                }
            }
        },
        methods:{
          loginButton:function () {
              this.$http.get(Config.login,{params:this.loginform}).then((response)=>{
                  if (response.data.code=='200'){
                      sessionStorage.setItem("userName",this.loginform.userName)
                      const token = response.data.data.data;
                      sessionStorage.setItem("token",token);
                      this.$router.push({path:'/Menu'})
                  }
                  if(response.data.code=='401'){
                        this.$message({
                          message:'密码错误',
                            type:'warning'
                        })
                  }
                  if(response.data.code=='405'){
                      this.$message({
                          message:'账号不存在',
                          type:'warning'
                      })
                  }
              })
          }
        },
    }
</script>

<style>

</style>