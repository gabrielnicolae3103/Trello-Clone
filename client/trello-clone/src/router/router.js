import VueRouter from 'vue-router'
import Boards from '../views/Boards.vue'
import Board from '../views/Board.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Vue from 'vue';

Vue.use(VueRouter);

const routes = [
    {path: '/boards', component: Boards},
    {path: '/b/:id', component: Board},
    {path: '/login', component: Login},
    {path: '/register', component: Register},
  ];
  
  const router = new VueRouter({
    routes: routes,
    mode: 'history'
  });
  
  router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('jwt');
  
    if (authRequired && !loggedIn) {
      return next('/login');
    }
  
    next();
  })

export default router;