import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import echarts from 'echarts'
import '../../static/css/index.css'
import Config from './Config'
Vue.prototype.$echarts = echarts
Vue.use(Element)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
axios.defaults.withCredentials=true;
Vue.http = Vue.prototype.$http=axios;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App,Config },
  router,
  template: '<App/>'
}).$mount('#app')


function Gettoken(next) {
    const token = sessionStorage.getItem("token");
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    next();
}


function GetStudentInfo(){
    const userName = sessionStorage.getItem("userName");
    axios.get(Config.studentInfo + '/get',{params:{userName:userName}}).then(response=>{
        if (response.data.code == '200' ){
            const userClass = response.data.data;
            sessionStorage.setItem("userClass",userClass);
        }
    })
}

function GetUserInfo(){
    const name = sessionStorage.getItem("userName");
    let p = {
        userName: name
    }
    axios.get(Config.studentInfo + '/findPersonalInfo',{params:p}).then(response=>{
        if (response.data.code == '200'){
            const user = response.data.data;
            sessionStorage.setItem("user",JSON.stringify(user));
        }
    })
}

router.beforeEach((to,from,next)=>{
    Gettoken(next);
    GetStudentInfo(next);
    GetUserInfo(next);
    next()
})




