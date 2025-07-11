import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import FormularioView from '../views/FormularioView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/formulario', component: FormularioView },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: false, requiresAdmin: false }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Validación de rutas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  if (to.meta.requiresAdmin && user.role !== 'admin') {
    return next('/')
  }

  next()
})

export default router
