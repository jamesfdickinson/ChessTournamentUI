<template>
  <layout-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.push({ name: 'Tournament', params: { tournament: tournamentId } })"></ion-icon>
        </ion-buttons>
        <!-- <ion-buttons slot="start">
          <ion-menu-toggle>
            <ion-button>
              <ion-icon slot="icon-only" name="menu"></ion-icon>
            </ion-button>
          </ion-menu-toggle>
        </ion-buttons>-->
        <ion-title>Rounds</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- <ul>
        <li v-for="tournament of tournaments" :key="tournament.id">
          <p>
            <strong>{{tournament.name}}</strong>
          </p>
          <p>{{tournament.name}}</p>
        </li>
      </ul>-->
      <ion-list>
        <ion-item detail="true" v-for="round of rounds" :key="round" v-on:click="openRound(round)">
          <ion-icon name="apps" slot="start"></ion-icon>
          <ion-label>Round {{round}}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <!-- </ion-page> -->
  </layout-menu>
</template>

<script>
import fetch from "@/fetch.js";

export default {
  name: "home",

  components: {},
  data() {
    var tournamentId = this.$route.params.tournament;
    return {
      tournamentId: tournamentId,
      rounds: [],
      errors: []
    };
  },
  methods: {
    openRound(id) {
      this.$router.push({
        name: "Round",
        params: { tournament: this.tournamentId, id: id }
      });
    },
    clearData() {
      this.players = [];
    },
    loadData() {
      var tournamentId = this.$route.params.tournament;
      fetch
        .get(`rounds/${tournamentId}`)
        .then(response => {
          this.rounds = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  created() {
    this.loadData();
  }
};
</script>
