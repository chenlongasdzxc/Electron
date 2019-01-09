import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.use(Element)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
axios.defaults.withCredentials=true;
Vue.http = Vue.prototype.$http=axios;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')


function Gettoken(next) {
    const token = sessionStorage.getItem("token");
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    next();
}

function Getid(){
    const userName = sessionStorage.getItem("userName");
    let url = 'http://localhost:8083/user/find'
    axios.get(url,{params:{userName:userName}}).then(response=>{
        if (response.data.code == '200'){
            const uid = response.data.data;
            sessionStorage.setItem("uid",uid);
        }
    })

}

router.beforeEach((to,from,next)=>{
    console.log("--------");
    console.log(to.query)
    Gettoken(next);
    Getid(next);
    next()
    console.log(to.query)
})




