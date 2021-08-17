<template>
  <layout-no-menu>
    <ion-content>
      <div class="section-to-print">
        <GridSort :data="gridData" :columns="gridColumns"></GridSort>
       
        <h1 v-show="title" class="title">{{ title }}</h1>
        <div v-show="description" class="description">{{ description }}</div>
         <ion-item>
          <ion-button slot="end" @click="reload()">Refresh</ion-button>
        </ion-item>
      </div>
    </ion-content>
  </layout-no-menu>
</template>

<script>
// @ is an alias to /src
import fetch from "@/services/fetch";
import GridSort from "@/components/GridSort.vue";
export default {
  name: "ReportScoreGroupRank",
  components: {
    GridSort,
  },
  data() {
    var tournamentId = this.$route.params.tournament;
    var title = "Score Group Rank";
    var description =
      "Ranks teams based on the top 5 total points from each team .";
    return {
      tournamentId: tournamentId,
      data: [],
      searchQuery: "",
      gridColumns: ["team", "rank", "groupPoints", "players"],
      gridData: [],
      title: title,
      description: description,
      errors: [],
    };
  },
  methods: {
    print() {
      window.print();
    },
    loadData() {
      var tournamentId = this.tournamentId;

      return fetch
        .get(`report/ScoreGroupRank/${tournamentId}`)
        .then((response) => {
          this.data = response.data;
          this.gridData = this.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    refresh(event) {
      this.loadData().then(() => {
        event.target.complete();
      });
    },
    reload() {
      window.location.reload();
    },
  },
  created() {
    this.loadData();
  },
};
</script>
