<template>
  <layout-raw>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title id="title" >Scores - Score Group Rank</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="print()">
            <ion-icon name="print" size="large"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <div class="section-to-print">
      <GridSort :data="gridData" :columns="gridColumns" :title="title" :description="description"></GridSort>
    </div>
  </layout-raw>
</template>

<script>
// @ is an alias to /src
import fetch from "@/services/fetch";
import GridSort from "@/components/GridSort.vue";
export default {
  name: "ReportScoreGroupRank",
  components: {
    GridSort
  },
  data() {
    var tournamentId = this.$route.params.tournament;
    var title = "Score Group Rank";
    var description =
      "This report ranks teams based on the top 5 total points from each team (per division).";
    return {
      tournamentId: tournamentId,
      data: [],
      searchQuery: "",
      gridColumns: ["team", "rank", "groupPoints", "players", "division"],
      gridData: [],
      title: title,
      description: description,
      errors: []
    };
  },
  methods: {
    print() {
      window.print();
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
