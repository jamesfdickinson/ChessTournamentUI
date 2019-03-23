<template>
  <layout-raw>
  
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
          </ion-buttons>
          <ion-title>Scores - Detailed</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="print()">
              <ion-icon name="print" size="large"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
   
   
  
    <div class="section-to-print">
      <!--   <ion-content scroll-x="true">-->
      <!-- <a href="#" onclick="window.history.back();">Back</a> -->
      <!-- <h1>Detailed Scores </h1> -->
      <GridSort :data="gridData" :columns="gridColumns" :sortKeys="sortKeys" :sortOrders="sortOrders" :title="title" :description="description"></GridSort>
    </div>
  
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
    var title = this.$route.params.title ||"Detailed Scores";
    var description = this.$route.params.description || null;
    var sortKeys = this.$route.params.sortKeys || ["division","points"];
    var sortOrders = this.$route.params.sortOrders || {division:-1,points:-1};

     return {
      tournamentId: tournamentId,
      data: [],
      searchQuery: "",
      gridColumns: ["name", "points", "school", "grade", "division"],
      gridData: [],
      title: title,
      description:description,
      sortKeys:sortKeys,
      sortOrders:sortOrders,
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
    },
    print() {
      window.print();
    }
  },
  created() {
    this.loadData();
  }
};
</script>
<style>
@media print {
  body * {
    visibility: hidden;
  }
  .section-to-print,
  .section-to-print * {
    visibility: visible;
  }
  .section-to-print {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
  } 
 .section-not-to-print {
    visibility: hidden;
  }
}
</style>

