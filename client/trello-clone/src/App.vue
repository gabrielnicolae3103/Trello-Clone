<template>
  <div id="app">
    <div>
      <b-navbar fixed="top" toggleable="lg" type="dark" variant="info" v-show="true">
        <b-navbar-nav>
          <b-nav-item href="/boards">Boards</b-nav-item>
        </b-navbar-nav>
        <b-navbar-brand href="#">Trello Clone</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
              <!-- Using 'button-content' slot -->
            <b-nav-item @click="logout()">Logout</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import auth from './services/auth';

export default {
  name: 'App',
  components: {
  },
  methods: {
    logout: function() {
      auth.logout();
      this.$router.push('/login');
    },
    loggedIn: function() {
      return localStorage.getItem('jwt') !== undefined;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
