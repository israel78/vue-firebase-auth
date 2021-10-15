import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{rutaProtegida:true}
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    component: () => import(/* webpackChunkName: "about" */ '../views/Editar.vue')
    , meta:{rutaProtegida:true}
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import(/* webpackChunkName: "about" */ '../views/Registro.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
//to: accede al meta de la url
//next: si se cumple la condicion accede a la ruta
router.beforeEach((to,from,next)=>{
  //Si la ruta esta protegida, se pregunta si hay usuario, si no hay usuario mandamos al login
  //Si la ruta no está protegida, manda al login
  if (to.meta.rutaProtegida){
        if (store.getters.usuarioAutenticado){
          next()
        } else{
          next('/login')
        }
  }else{
    next()
  }
})
export default router
