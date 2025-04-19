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

        <router-link :to="{ name: 'ReportScoreDetailed', params: { tournament: tournamentId, title:'Detailed Scores by Division',sortKeys:['division','points'],sortOrders:{division:-1,points:-1} }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="paper"></ion-icon>
            <ion-label>Scores by Division</ion-label>
          </ion-item>
        </router-link>
        <router-link :to="{ name: 'ReportScoreDetailed', params: { tournament: tournamentId, title:'Detailed Scores by Grade',sortKeys:['division','grade','points'],sortOrders:{division:-1,points:-1} }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="paper"></ion-icon>
            <ion-label>Scores by Grade</ion-label>
          </ion-item>
        </router-link>
               <router-link :to="{ name: 'ReportScoreDetailed', params: { tournament: tournamentId, title:'Detailed Scores by Team',sortKeys:['team','points'],sortOrders:{team:1,points:-1} }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="paper"></ion-icon>
            <ion-label>Scores by Team</ion-label>
          </ion-item>
        </router-link>
               <router-link :to="{ name: 'ReportScoreDetailed', params: { tournament: tournamentId, title:'Detailed Scores by Name',sortKeys:['name','points'],sortOrders:{name:1,points:-1} }}">
     
          <ion-item button detail="true">
            <ion-icon slot="start" name="paper"></ion-icon>
            <ion-label>Scores by Name</ion-label>
          </ion-item>
        </router-link>
        <ion-list-header>
          <ion-label>Player Details</ion-label>
        </ion-list-header>

        <router-link :to="{ name: 'ReportPlayerDetailed', params: { tournament: tournamentId, title:'Player Details',sortKeys:['firstName'] }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="person"></ion-icon>
            <ion-label>Player Details</ion-label>
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
        <router-link :to="{ name: 'ReportScoreGroupRank', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="contacts"></ion-icon>
            <ion-label>Team Group Rank</ion-label>
          </ion-item>
        </router-link>
        <router-link :to="{ name: 'ReportScoreGroupRankDetails', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="contacts"></ion-icon>
            <ion-label>Team Group Rank Details</ion-label>
          </ion-item>
        </router-link>

        <router-link :to="{ name: 'ReportScoreSubGradeGroupRank', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="contacts"></ion-icon>
            <ion-label>Group Sub-Grade Rank Team</ion-label>
          </ion-item>
        </router-link>
        <router-link :to="{ name: 'ReportWallChart', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="albums"></ion-icon>
            <ion-label>Wall Chart</ion-label>
          </ion-item>
        </router-link>
        <router-link :to="{ name: 'ReportTournamentStats', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="albums"></ion-icon>
            <ion-label>Tournament Stats</ion-label>
          </ion-item>
        </router-link>
        <router-link :to="{ name: 'ReportPairingReport', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start"  name="calculator"></ion-icon>
            <ion-label>Pairing Report</ion-label>
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
//import fetch from "@/services/fetch";

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
