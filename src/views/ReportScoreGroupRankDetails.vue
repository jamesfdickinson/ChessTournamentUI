<template>
  <layout-raw>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title>Scores - Score Group Rank Details</ion-title>
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
import fetch from "@/fetch.js";
import GridSort from "@/components/GridSort.vue";
export default {
  name: "ReportScoreGroupRank",
  components: {
    GridSort
  },
  data() {
    var tournamentId = this.$route.params.tournament;
    var title = "Score Group Rank - Details";
    var description =
      "This report ranks schools based on the top 5 total points from each school (per division).";
    return {
      tournamentId: tournamentId,
      data: [],
      searchQuery: "",
      gridColumns: [
        "school",
        "rank",
        "groupPoints",
        "division",
        "player",
        "points",
        "grade"
      ],
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
        .get(`report/ScoreGroupRankDetails/${tournamentId}`)
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
