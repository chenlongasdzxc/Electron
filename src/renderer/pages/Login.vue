<template>
    <div>
        <div class="logindiv">
            <el-form ref="loginform" :model="loginform">
                <el-form-item>
                    <el-input style="width: 200px" v-model="loginform.userName" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input style="width: 200px" type="password" v-model="loginform.userPassword" size="small" ></el-input>
                </el-form-item>
                    <el-button style="width: 200px" size="small"  @click="loginButton">LOGIN</el-button>
            </el-form>

        </div>
    </div>
</template>

<script>
    const {ipcRenderer: ipc} = require('electron');
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
              let url = 'http://localhost:8083/login';
              this.$http.get(url,{params:this.loginform}).then((response)=>{
                  if (response.data.code=='200'){
                      debugger
                      this.items.name=JSON.parse(sessionStorage.getItem('user'));
                      console.log(name);
                      debugger
                      ipc.send('success');
                      this.$router.push({path:'/Menu'})
                  }
              })
          }
        },
    }
</script>

<style>

</style>