<template>
  <layout-no-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title>Scores - ScoreGroupRank</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content scroll-x="true">
     
     
       <ion-item>  <h1>ScoreGroupRank</h1>
         </ion-item>
      <ion-item>
      
      <p>This report generates scores based on 3 grade groups k-2, 3-5, 6-8. The points are of the top 4 scores of per school.</p>
      </ion-item>
      <!-- <form id="search">
        Search
        <input name="query" v-model="searchQuery">
      </form>
      <GridSort :data="gridData" :columns="gridColumns" :filter-key="searchQuery"></GridSort>-->
      <GridSort :data="gridData" :columns="gridColumns"></GridSort>

      <!-- <ion-list>
        <ion-item
          detail="true"
          v-for="score of data"
          :key="score.playerId"
          v-on:click="openPlayer(score.playerId)"
        >
          <ion-label>{{score.firstName}} {{score.lastName}}</ion-label>
          <ion-badge slot="end" color="light">{{score.points}}</ion-badge>
        </ion-item>
      </ion-list>-->
    </ion-content>
    <!-- </ion-page> -->
 </layout-no-menu>
</template>

<script>
// @ is an alias to /src
import fetch from "@/fetch.js";
import GridSort from "@/components/GridSort.vue";
export default {
  name: "ReportScoreGroupRank",
  components: {
    GridSort
  },
  data() {
    var tournamentId = this.$route.params.tournament;
    return {
      tournamentId: tournamentId,
      data: [],
      searchQuery: "",
      gridColumns: ["grouping", "school", "rank", "totalPoints",  "players"],
      gridData: [],
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
        .get(`report/ScoreGroupRank/${tournamentId}`)
        .then(response => {
          this.data = response.data;
          this.gridData = this.data;
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
