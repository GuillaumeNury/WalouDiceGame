<template>
  <form>
    <div v-for="(player, index) in players" :key="`player-${index}`">
        <label>
            <input type="text"
                :placeholder="`Nom du joueur ${index + 1}`"
                v-model.trim="player.name">
        </label>
        <button class="button tiny alert"
            @click="removePlayer(index)"
            type="button">x</button>
    </div>
    <button class="hollow button expanded"
        @click="addPlayer"
        type="button">Ajouter un joueur</button>
    <button class="button expanded"
        @click="start"
        type="submit">Lancer la partie</button>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface IPlayer {
  name: string;
}

@Component
export default class PlayersForm extends Vue {
  public players: IPlayer[] = [];

  public addPlayer(): void {
    this.players.push({ name: '' });
  }

  public removePlayer(index: number): void {
    this.players.splice(index, 1);
  }

  public start(): void {
    alert(
      `Et c'est parti pour un walou avec ${
        this.players.length
      } joueurs ! (${this.players.map(p => p.name).join(', ')})`,
    );
  }
}
</script>

<style scoped>
form {
  text-align: left;
}
form > div {
  display: flex;
}
form > div > label {
  flex: 9;
}
form > div > button {
  flex: 1;
}
</style>
