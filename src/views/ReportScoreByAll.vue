<template>
  <layout-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
               <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title>Scores - All Players</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item
          detail="true"
          v-for="score of data"
          :key="score.playerId"
          v-on:click="openPlayer(score.playerId)"
        >
          <ion-label>{{score.firstName}} {{score.lastName}}</ion-label>
          <ion-badge slot="end" color="light">{{score.points}}</ion-badge>
        </ion-item>
      </ion-list>
    </ion-content>
    <!-- </ion-page> -->
</layout-menu>
</template>

<script>
// @ is an alias to /src
import fetch from "@/fetch.js";

export default {
  name: "ReportScoreByGrade",
  components: {},
  data() {
    var tournamentId = this.$route.params.tournament || 118;
    return {
      tournamentId: tournamentId,
      data: [],
      errors: []
    };
  },
  methods: {
    openPlayer(id) {
      this.$router.push({ name: "Player", params: { id: id } });
    },
    loadData() {
      var tournamentId = this.tournamentId;

      fetch
        .get(`report/AllPlayers/${tournamentId}`)
        .then(response => {
          this.data = response.data;
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
