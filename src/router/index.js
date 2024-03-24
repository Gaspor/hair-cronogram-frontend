
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/Home.vue'
import LoginView from '@/pages/Login.vue'
import RegisterView from '@/pages/Register.vue'
import PageNotFoundView from '@/pages/404.vue'

const routes = [
  {
    path: '/',
    name: "Home",
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: PageNotFoundView
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router