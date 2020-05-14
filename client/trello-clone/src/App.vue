<template>
  <div id="app">
    <b-button @click="logout()" variant="link" href="/login">Go Back To Login</b-button>
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
      console.log('logout');
      console.log(localStorage.getItem('jwt'));
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
