<template>
  <layout-menu>
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
        <ion-title>Reports</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-list-header>
          <ion-label>Simple Reports</ion-label>
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
          <ion-label>Player Scores</ion-label>
        </ion-list-header>

        <router-link :to="{ name: 'ReportScoreDetailed', params: { tournament: tournamentId, title:'Detailed Scores' }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="paper"></ion-icon>
            <ion-label>Scores by Points</ion-label>
          </ion-item>
        </router-link>
        <router-link :to="{ name: 'Reports', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="paper"></ion-icon>
            <ion-label>Scores by Grade</ion-label>
          </ion-item>
        </router-link>
        <router-link :to="{ name: 'Reports', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="paper"></ion-icon>
            <ion-label>Scores by School</ion-label>
          </ion-item>
        </router-link>
        <router-link :to="{ name: 'Reports', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="paper"></ion-icon>
            <ion-label>Scores by Name</ion-label>
          </ion-item>
        </router-link>

        <ion-list-header>
          <ion-label>Round Details</ion-label>
        </ion-list-header>
        <router-link :to="{ name: 'RoundDetails', params: {id: 1 , tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="apps"></ion-icon>
            <ion-label>Round 1</ion-label>
          </ion-item>
        </router-link>
        <router-link :to="{ name: 'RoundDetails', params: {id: 2 , tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="apps"></ion-icon>
            <ion-label>Round 2</ion-label>
          </ion-item>
        </router-link>
        <router-link :to="{ name: 'RoundDetails', params: {id: 3 , tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="apps"></ion-icon>
            <ion-label>Round 3</ion-label>
          </ion-item>
        </router-link>
        <router-link :to="{ name: 'RoundDetails', params: {id: 4, tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="apps"></ion-icon>
            <ion-label>Round 4</ion-label>
          </ion-item>
        </router-link>
        <router-link :to="{ name: 'RoundDetails', params: {id: 5 , tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="apps"></ion-icon>
            <ion-label>Round 5</ion-label>
          </ion-item>
        </router-link>

        <ion-list-header>
          <ion-label>Custom Reports</ion-label>
        </ion-list-header>
        <router-link :to="{ name: 'Reports', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="school"></ion-icon>
            <ion-label>School Group Rank</ion-label>
          </ion-item>
        </router-link>

        <router-link :to="{ name: 'ReportScoreGroupRank', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="school"></ion-icon>
            <ion-label>Group Sub-Grade Rank School</ion-label>
          </ion-item>
        </router-link>
        <router-link :to="{ name: 'ReportWallChart', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="albums"></ion-icon>
            <ion-label>Wall Chart</ion-label>
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
  </layout-menu>
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
