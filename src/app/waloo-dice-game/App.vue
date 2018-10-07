<template>
  <div id="app">
    <div class="logo">W</div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';

@Component
export default class App extends Vue {}
</script>

<style>
body {
  display: flex;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: auto;
}
.logo {
  background-color: #fff;
  color: #0e4db2;
  font-size: 4rem;
  padding: 0.5rem 1rem;
  border: 0.25rem solid #0e4db2;
  width: 7rem;
  margin: auto;
  margin-bottom: 2rem;
  font-weight: bold;
}
</style>
