import { createRouter, createWebHistory } from 'vue-router'
import HomeApp from '../views/HomeApp.vue'
import store from '@/store'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeApp,
    meta: {
        layout: 'main',
        auth: true
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/HelpApp.vue'),
    meta: {
        layout: 'main'
    }
  },
  {
    path: '/request/:id',
    name: 'Request',
    component: () => import('../views/RequestApp.vue'),
    meta: {
        layout: 'main'
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/AuthApp.vue'),
    meta: {
        layout: 'auth',
        auth: false,
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from ,next) => {
  const requireAuth = to.meta.auth
  if (requireAuth && store.getters['isAuthenticated']) {
    next()
  }
  else if (requireAuth && !store.getters['auth/isAuthenticated']) {
    next('/auth?message=auth')
  } else {
    next()
  }
}) 
export default router
