import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../pages/MainPage.vue'
import LoginPage from '../pages/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/',
      name: 'main',
      component: MainPage,
      children: [
        {
          path: '/pricing',
          name: 'pricing',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../pages/PricingPlansPage.vue')
        },
        {
          path: '/registration',
          name: 'registration',
          component: () => import('../pages/RegistrationPage.vue')
        },
        {
          path: '/checkout',
          name: 'checkout',
          component: () => import('../pages/CheckoutPage.vue')
        }
      ]
    },  
  ]
})

export default router
