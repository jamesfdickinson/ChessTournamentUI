<template>
  <layout-raw>
    <ion-toolbar color="primary">
      <ion-buttons slot="start">
        <ion-icon
          name="arrow-round-back"
          size="large"
          @click="$router.go(-1)"
        ></ion-icon>
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
      <GridSort
        :data="gridData"
        :columns="gridColumns"
        :sortKeys="sortKeys"
        :sortOrders="sortOrders"
        :title="title"
        :description="description"
      ></GridSort>
    </div>
  </layout-raw>
</template>

<script>
// @ is an alias to /src
import GridSort from "@/components/GridSort.vue";
import EventBus from "@/services/EventBus.js";
import TournamentAPI from "@/services/TournamentAPI";
const tournamentAPI = new TournamentAPI();
export default {
  name: "ReportPlayerDetailedAdmin",
  components: {
    GridSort,
  },
  data() {
    var tournamentId = this.$route.params.tournament;

    var title = this.$route.params.title || "Player Details";
    var description = this.$route.params.description || null;
    var sortKeys = this.$route.params.sortKeys || ["firstName"];
    var sortOrders = this.$route.params.sortOrders || {};

    return {
      tournamentId: tournamentId,
      data: [],
      searchQuery: "",
      gridColumns: [
        "playerId",
        "firstName",
        "lastName",
        "grade",
        //"age",
        "team",
        //"level",
        "paid",
        "division",
        "isPresent",
        "rating",
        "email",
        "parentName",
        "parentPhone",
        "gamerId",
        "avatar",
      ],
      gridData: [],
      title: title,
      description: description,
      sortKeys: sortKeys,
      sortOrders: sortOrders,
      errors: [],
    };
  },
  methods: {
    loadData() {
      var tournamentId = this.tournamentId;
      return tournamentAPI
        .tournamentView(tournamentId)
        .then((data) => {
          this.populate(data);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    populate(data) {
      this.data = data.players;
      this.gridData = this.data;
    },
    onUpdate(data) {
      //console.log("onUpdate", data);
      this.populate(data);
    },

    refresh(event) {
      this.loadData().then(() => {
        event.target.complete();
      });
    },
    print() {
      window.print();
    },
  },
  mounted() {
    this.loadData();

    EventBus.$on("updated", this.onUpdate);
  },
  created() {},
  beforeDestroy() {
    //todo: move event to notification class
    EventBus.$off("updated", this.onUpdate);
  },
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

