import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import Boards from './views/Boards.vue'
import Board from './components/Board.vue'
import Login from './views/Login.vue'

Vue.use(VueRouter);
Vue.use(BootstrapVue)
Vue.config.productionTip = false

const routes = [
  {path: '/boards', component: Boards},
  {path: '/b/:id', component: Board},
  {path: '/login', component: Login}
];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
