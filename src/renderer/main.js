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
import Vuex from 'vuex'

Vue.prototype.$echarts = echarts
Vue.use(Element)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
axios.defaults.withCredentials = true;
Vue.http = Vue.prototype.$http = axios;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
Vue.use(Vuex);
/* eslint-disable no-new */
new Vue({
    components: {App, Config},
    router,
    template: '<App/>'
}).$mount('#app')



function Gettoken(next) {
    const token = sessionStorage.getItem("token");
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    next();
}

function GetPermissionCode() {
    const studentNumber = sessionStorage.getItem("studentNumber");
    axios.get(`${Config.RolePermission}/findPermissionCode/${studentNumber}`)
        .then(response => {
            if (response.data.code == '200') {
                sessionStorage.setItem("permissionCode", JSON.stringify(response.data.data));
            }
        })

}


function GetUserInfo() {
    const name = sessionStorage.getItem("userName");
    let p = {
        userName: name
    }
    axios.get(Config.studentInfo + '/findPersonalInfo', {params: p}).then(response => {
        if (response.data.code == '200') {
            const user = {
                studentName: response.data.data.studentName,
                studentClass: response.data.data.studentClass,
                studentNumber: response.data.data.studentNumber,
                major: response.data.data.major,
                grade: response.data.data.grade,
            }
            sessionStorage.setItem("user", JSON.stringify(user));
            GetPermissionCode();
        }
    })
}

router.beforeEach((to, from, next) => {
    GetUserInfo();
    next()
})




