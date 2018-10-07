<template>
  <div>
    <h1>Waloo !</h1>
    <div class="links">
      <div>
        <router-link class="large button" to="/game/players" tag="button">Jouer</router-link>
      </div>
      <div>
        <router-link class="large button" to="/rules" tag="button">Règles du jeu</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {}
</script>

<style scoped>
h1 {
  margin-bottom: 2rem;
}
.links {
  margin-top: 5rem;
  text-align: center;
}
</style>
