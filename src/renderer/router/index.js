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
            path: '/Menu',
            name: 'Menu',
            component: require('@/pages/Menu').default,
            children: [
                {
                    path: '/Sketch',
                    name: 'Sketch',
                    component: require('@/sketchs/Sketch').default,
                },
                {
                    path: '/SketchAudit',
                    name: 'SketchAudit',
                    component: require('@/sketchs/SketchAudit').default,
                },
                {
                    path: '/Moral',
                    name: 'Moral',
                    component: require('@/moral/Moral').default,
                },
                {
                    path: '/MoralAudit',
                    name: 'MoralAudit',
                    component: require('@/moral/MoralAudit').default,
                },
                {
                    path: '/MoralPlus',
                    name: 'MoralPlus',
                    component: require('@/moral/MoralPlus').default,
                },
                {
                    path: '/UserInformation',
                    name: 'UserInformation',
                    component: require('@/pages/UserInformation').default,
                },
                {
                    path: '/StudentInformation',
                    name: 'StudentInformation',
                    component: require('@/studentInformation/StudentInformation').default,
                },
                {
                    path: '/StudentFileCard',
                    name: 'StudentFileCard',
                    component: require('@/studentInformation/StudentFileCard').default,
                },
                {
                    path: '/DataDictionary',
                    name: 'DataDictionary',
                    component: require('@/dataDictionary/DataDictionary').default,
                },
                {
                    path: '/DataDictionaryEdit',
                    name: 'DataDictionaryEdit',
                    component: require('@/dataDictionary/DataDictionaryEdit').default,
                },
                {
                    path: '/CheckingInAdd',
                    name: 'CheckingInAdd',
                    component: require('@/checking-in/CheckingInAdd').default,
                },
                {
                    path: '/PersonalCheckingIn',
                    name: 'PersonalCheckingIn',
                    component: require('@/checking-in/PersonalCheckingIn').default,
                },
                {
                    path: '/CheckingManage',
                    name: 'CheckingManage',
                    component: require('@/checking-in/CheckingManage').default,
                },
                {
                    path: '/AskForLeave',
                    name: 'AskForLeave',
                    component: require('@/checking-in/AskForLeave').default,
                },
            ],
        },

    ]
})
