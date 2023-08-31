// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from 'vuefire'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
      },
    ],
  },
  {
    path: '/property',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '/property/:property',
        name: 'SingleProperty',
        component: () => import('@/views/SingleProperty.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from) => {
  const currentUser = await getCurrentUser()
  if (to.path !== '/login' && !currentUser) {
    return {
      path: '/login',
      query: {
        // we keep the current path in the query so we can
        // redirect to it after login with
        // `router.push(route.query.redirect || '/')`
        redirect: to.fullPath,
      }
    }
  }
})

export default router
