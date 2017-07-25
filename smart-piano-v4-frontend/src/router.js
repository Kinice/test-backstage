import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// ===================== Pages Components ======================
import trackVersion from './pages/trackVersion'
import songSet from './pages/songSet'
import tagEdit from './pages/tagEdit'

import Frame from './components/frame'
import Login from './pages/common/login'
import ErrorPage from './pages/common/404'

// ==================== Router registration ====================
export default new Router({
  mode: 'hash',
  routes: [
    {
        path: '/login',
        component: Login,
        meta: { auth: false }
    },
    { 
        path: '/', 
        component: Frame,
        children: [
        {
            path: '/trackVersion',
            component: trackVersion
        },
        {
            path: '/songSet',
            component: songSet
        },
        {
            path: '/tagEdit',
            component: tagEdit
        }
        ],
        redirect: '/trackVersion'
    },
    {
        path: '*',
        component: ErrorPage,
        meta: { auth: false }
    }
  ]
})
