import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import Boards from './views/Boards.vue'
import Board from './components/Board.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'

Vue.use(VueRouter);
Vue.use(BootstrapVue)
Vue.config.productionTip = false

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

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
