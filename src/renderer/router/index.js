import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: require('@/pages/Login').default
    },
      {
        path:'/Menu',
          name:'Menu',
          component:require('@/pages/Menu').default,
          children:[
              {
                  path:'/Sketch',
                  name:'Sketch',
                  component:require('@/pages/Sketch').default,
              }
          ]
      },


  ]
})
