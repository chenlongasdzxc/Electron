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
                    path: '/SketchManage',
                    name: 'SketchManage',
                    component: require('@/sketchs/SketchManage').default,
                },
                {
                    path: '/SketchView',
                    name: 'SketchView',
                    component: require('@/sketchs/SketchView').default,
                },
                {
                    path: '/MoralExpression',
                    name: 'MoralExpression',
                    component: require('@/moral/MoralExpression').default,
                },
                {
                    path: '/MoralExpressionManage',
                    name: 'MoralExpressionManage',
                    component: require('@/moral/MoralExpressionManage').default,
                },
                {
                    path: '/MoralPlus',
                    name: 'MoralPlus',
                    component: require('@/moral/MoralPlus').default,
                },
                {
                    path: '/MoralPlusManage',
                    name: 'MoralPlusManage',
                    component: require('@/moral/MoralPlusManage').default,
                },
                {
                    path: '/PersonalMoralPlus',
                    name: 'PersonalMoralPlus',
                    component: require('@/moral/PersonalMoralPlus').default,
                },
                {
                    path: '/MoralOutManage',
                    name: 'MoralOutManage',
                    component: require('@/moral/MoralOutManage').default,
                },
                {
                    path: '/MoralOut',
                    name: 'MoralOut',
                    component: require('@/moral/MoralOut').default,
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
                {
                    path: '/MoralPlusDataDictionary',
                    name: 'MoralPlusDataDictionary',
                    component: require('@/dataDictionary/MoralPlusDataDictionary').default,
                },
                {
                    path: '/MoralDeductionDataDicitionary',
                    name: 'MoralDeductionDataDicitionary',
                    component: require('@/dataDictionary/MoralDeductionDataDicitionary').default,
                },
                {
                    path: '/SketchDataDictionary',
                    name: 'SketchDataDictionary',
                    component: require('@/dataDictionary/SketchDataDictionary').default,
                },
                {
                    path: '/MoralOutDataDictionary',
                    name: 'MoralOutDataDictionary',
                    component: require('@/dataDictionary/MoralOutDataDictionary').default,
                },
                {
                    path: '/ComprehensiveMoralPlus',
                    name: 'ComprehensiveMoralPlus',
                    component: require('@/comprehensive/ComprehensiveMoralPlus').default,
                },
                {
                    path:'/RoleSetting',
                    name:'RoleSetting',
                    component: require('@/Setting/RoleSetting').default,
                },
            ],
        },

    ]
})
