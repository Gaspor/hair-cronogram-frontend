
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

const routes = [
  {
    path: '/',
    name: "Home",
    component: () => HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => LoginView,
  },
  {
    path: '/register',
    name: 'Register',
    component: () => RegisterView,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router