<template>
  <div class="ion-page" main>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <!-- <ion-buttons slot="start">
          <ion-menu-toggle>
            <ion-button>
              <ion-icon slot="icon-only" name="menu"></ion-icon>
            </ion-button>
          </ion-menu-toggle>
        </ion-buttons>-->
        <ion-title>Scores</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-list-header>
          <ion-label>Reports</ion-label>
        </ion-list-header>

        <router-link :to="{ name: 'ReportScoreByAll', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="podium"></ion-icon>
            <ion-label>All Players</ion-label>
          </ion-item>
        </router-link>
        <router-link :to="{ name: 'ReportScoreByGrade', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="podium"></ion-icon>
            <ion-label>Scores By Grade</ion-label>
          </ion-item>
        </router-link>
        <router-link :to="{ name: 'ReportScoreByDivision', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="podium"></ion-icon>
            <ion-label>Scores By Division</ion-label>
          </ion-item>
        </router-link>

        <ion-list-header>
          <ion-label>Detailed Reports</ion-label>
        </ion-list-header>

        <router-link :to="{ name: 'ReportScoreDetailed', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="paper"></ion-icon>
            <ion-label>Scores Detailed</ion-label>
          </ion-item>
        </router-link>

        <ion-list-header>
          <ion-label>Custom Reports</ion-label>
        </ion-list-header>
        <router-link :to="{ name: 'ReportScoreGroupRank', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="school"></ion-icon>
            <ion-label>Group Rank School</ion-label>
          </ion-item>
        </router-link>
      </ion-list>

      <!-- <ion-button v-on:click="openPlayers()">Players</ion-button>fdfggdfg
      <ion-button v-on:click="loadData()">Load</ion-button>
      <ion-button color="danger" v-on:click="clearData()">Clear</ion-button>

      <ion-button color="light">Light</ion-button>
      <ion-button>Default</ion-button>
      <ion-button color="secondary">Secondary</ion-button>
      <ion-button color="danger">Danger</ion-button>
      <ion-button color="dark">Dark</ion-button>

      <ion-fab-button class="todo-fab">
        <ion-icon name="add"></ion-icon>
      </ion-fab-button>-->
    </ion-content>
    <!-- </ion-page> -->
  </div>
</template>

<script>
// @ is an alias to /src
//import fetch from "@/fetch.js";

export default {
  name: "home",
  components: {},
  data() {
    var tournamentId = this.$route.params.tournament || 118;
    return {
      tournamentId: tournamentId,
      tournament: {},
      errors: []
    };
  },
  methods: {
    loadData() {}
  },
  created() {
    this.loadData();
  }
};
</script>
