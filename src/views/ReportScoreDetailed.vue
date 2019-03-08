<template>
  <layout-raw>
    <!-- <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-toggle>
            <ion-button>
              <ion-icon slot="icon-only" name="menu"></ion-icon>
            </ion-button>
          </ion-menu-toggle>
        </ion-buttons>
        <ion-title>Scores - Detailed</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content scroll-x="true">-->
     <a href="#" onclick="window.history.back();">Back</a>
      <h1>Detailed Scores </h1>
    <GridSort :data="gridData" :columns="gridColumns"></GridSort>

    <!-- </ion-content> -->
  </layout-raw>
</template>

<script>
// @ is an alias to /src
import fetch from "@/fetch.js";
import GridSort from "@/components/GridSort.vue";
export default {
  name: "ReportScoreDetailed",
  components: {
    GridSort
  },
  data() {
    var tournamentId = this.$route.params.tournament;
    return {
      tournamentId: tournamentId,
      data: [],
      searchQuery: "",
      gridColumns: ["name", "points", "school", "grade", "division"],
      gridData: [],
      // [
      //   { name: "Chuck Norris", points: Infinity, grade: 1 },
      //   { name: "Bruce Lee", points: 3000, grade: 1 },
      //   { name: "Bruce Lee", points: 2000, grade: 1 },
      //   { name: "Bruce Lee", points: 9000, grade: 1 },
      //   { name: "Bruce Lee", points: 8000, grade: 1 },
      //   { name: "Bruce Lee", points: 5000, grade: 1 },
      //   { name: "Jackie Chan", points: 6000, grade: 1 },
      //   { name: "Jackie Chan", points: 7000, grade: 1 },
      //  ],
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
