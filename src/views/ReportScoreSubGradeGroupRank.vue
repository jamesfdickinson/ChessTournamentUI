<template>
  <layout-raw>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title>Scores - ScoreGroupRank</ion-title>
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
    var title = "Score Sub Grade Group Rank";
    var description =
      "This report generates scores based on 3 grade groups k-2, 3-5, 6-8. The points are of the top 4 scores of per school.";
    return {
      tournamentId: tournamentId,
      data: [],
      searchQuery: "",
      gridColumns: ["grouping", "school", "rank", "totalPoints", "players"],
      gridData: [],
      title: title,
      description: description,
      errors: []
    };
  },
  methods: {
    openPlayer(id) {
      this.$router.push({ name: "Player", params: { id: id } });
    },
    print() {
      window.print();
    },
    loadData() {
      var tournamentId = this.tournamentId;

      fetch
        .get(`report/ScoreSubGradeGroupRank/${tournamentId}`)
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
