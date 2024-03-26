
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { store } from '../stores/auth'
import HomeView from '@/pages/Home.vue'
import LoginView from '@/pages/Login.vue'
import RegisterView from '@/pages/Register.vue'
import PageNotFoundView from '@/pages/404.vue'
import ActiveAccount from '@/pages/ActiveAccount.vue'

const routes = [
  {
    path: '/',
    name: "Home",
    component: HomeView,
    meta: {
      requiresAuth: true
    }
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
    path: '/active',
    name: 'ActiveAccount',
    component: ActiveAccount
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
});

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth && !localStorage.getItem('access_token')) {
    return next("/login");
  }

  return next();
});

export default router