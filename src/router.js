import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
// import { useUserStore } from './stores';
// import pinia from './stores'

// import UserService from './service/UserService'


// const routes = [
//     {
//         path: '/',
//         name: 'app',
//         component: App,
//         children: [
//             {
//                 path: '/',
//                 name: 'dashboard',
//                 // component: () => import('./components/Dashboard.vue')
//             },
//             {
//                 path: '/admission',
//                 // name: 'Admission',
//                 children: [
//                     {
//                         path: '/admission/applications',
//                         // name: 'admission-applications',
//                         component: () => import('./pages/admission/applications.vue')
//                     },
//                     {
//                         path: '/admission/admit',
//                         // name: 'admit-student',
//                         component: () => import('./pages/admission/admit.vue')
//                     }
//                 ]
//             },
//             {
//                 path: '/academic',
//                 children: [
//                     {
//                         path: '/academic/class',
//                         // name: 'class',
//                         component: () => import('./components/academic/class/index.vue')
//                     },
//                     {
//                         path: '/academic/subject',
//                         // name: 'subject',
//                         component: () => import('./components/academic/subject/index.vue')
//                     },
//                     {
//                         path: '/academic/classroom',
//                         // name: 'classroom',
//                         component: () => import('./components/academic/classroom/index.vue')
//                     },
//                     {
//                         path: '/academic/classtime',
//                         // name: 'classtime',
//                         component: () => import('./components/academic/classtime/index.vue')
//                     },
//                     {
//                         path: '/academic/class-routine',
//                         // name: 'class-routine',
//                         component: () => import('./components/academic/classRoutine/index.vue')
//                     }
//                 ]
//             },
//             {
//                 path: '/users',
//                 children: [
//                     {
//                         path: '/users/students',
//                         // name: 'class',
//                         component: () => import('./pages/users/student/index.vue')
//                     },
//                     {
//                         path: '/users/teachers',
//                         // name: 'subject',
//                         component: () => import('./pages/users/teachers')
//                     }
//                 ]
//             },
//             {
//                 path: '/reports',
//                 children: [
//                     {
//                         path: '/reports/students',
//                         // name: 'class',
//                         component: () => import('./pages/reports/student/index.vue')
//                     },
//                     {
//                         path: '/reports/teachers',
//                         // name: 'subject',
//                         component: () => import('./pages/reports/teachers/index.vue')
//                     }
//                 ]
//             }
//             // {
//             //     path: '/reports',
//             //     children: [
//             //         {
//             //             path: '/reports/students',
//             //             // name: 'Students',
//             //             component: () => import('./pages/reports/student')
//             //         },
//             //         {
//             //             path: '/reports/teachers',
//             //             // name: 'Teachers',
//             //             component: () => import('./pages/reports/teachers')
//             //         }
//             //     ]
//             // }
//         ]
//     },
//     {
//         path: '/login',
//         name: 'login',
//         component: () => import('./pages/Login.vue')
//     },
//     {
//         path: '/landing',
//         name: 'landing',
//         component: () => import('./pages/LandingDemo.vue')
//     },
//     {
//         path: '/error',
//         name: 'error',
//         component: () => import('./pages/Error.vue')
//     },
//     {
//         path: '/notfound',
//         name: 'notfound',
//         component: () => import('./pages/NotFound.vue')
//     },
//     {
//         path: '/access',
//         name: 'access',
//         component: () => import('./pages/Access.vue')
//     }
// ];

const routes = [
    {
        path: '/',
        name: 'app',
        component: App,
        children: [
            {
                path: '/',
                name: 'dashboard',
                // component: () => import('./components/Dashboard.vue')
            },
            {
                path: '/admission/applications',
                // name: 'admission-applications',
                component: () => import('./pages/admission/applications.vue')
            },
            {
                path: '/admission/admit',
                // name: 'admit-student',
                component: () => import('./pages/admission/admit.vue')
            },
            {
                path: '/academic/class',
                // name: 'class',
                component: () => import('./components/academic/class/index.vue')
            },
            {
                path: '/academic/subject',
                // name: 'subject',
                component: () => import('./components/academic/subject/index.vue')
            },
            {
                path: '/academic/classroom',
                // name: 'classroom',
                component: () => import('./components/academic/classroom/index.vue')
            },
            {
                path: '/academic/classtime',
                // name: 'classtime',
                component: () => import('./components/academic/classtime/index.vue')
            },
            {
                path: '/academic/class-routine',
                // name: 'class-routine',
                component: () => import('./components/academic/classRoutine/index.vue')
            },
            {
                path: '/users/students',
                // name: 'class',
                component: () => import('./pages/users/student/index.vue')
            },
            {
                path: '/users/teachers',
                // name: 'subject',
                component: () => import('./pages/users/teachers')
            },
            {
                path: '/reports/students',
                // name: 'class',
                component: () => import('./pages/reports/student/index.vue')
            },
            {
                path: '/reports/teachers',
                // name: 'subject',
                component: () => import('./pages/reports/teachers/index.vue')
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./pages/Login.vue')
    },
    {
        path: '/landing',
        name: 'landing',
        component: () => import('./pages/LandingDemo.vue')
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('./pages/Error.vue')
    },
    {
        path: '/notfound',
        name: 'notfound',
        component: () => import('./pages/NotFound.vue')
    },
    {
        path: '/access',
        name: 'access',
        component: () => import('./pages/Access.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});



// router.beforeEach((to) => {
//     console.log(to);
//     console.log(UserService.authenticate())

//     if (!UserService.authenticate() && to.path !== '/login') return '/login';
// })




export default router;
