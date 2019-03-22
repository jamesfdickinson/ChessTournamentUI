<template>
  <layout-raw>
    <ion-toolbar color="primary">
      <ion-buttons slot="start">
        <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
      </ion-buttons>
      <ion-title>Round Details</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="print()">
          <ion-icon name="print" size="large"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
 <!-- <fieldset>
      <legend>Settings:</legend>   <ion-item>
      <ion-label>Round:</ion-label>
      <ion-input
        type="number"
        placeholder="round number"
        :value="roundId"
        @input="roundId = $event.target.value"
      ></ion-input>
      <ion-button v-on:click="save()">Update</ion-button>
    </ion-item>
  </fieldset> -->
    <!-- <fieldset>
      <legend>Settings:</legend>
      <ion-item>
        <ion-label>Round</ion-label>
        <ion-input></ion-input>
        <ion-button type="submit">Update</ion-button>
      </ion-item>
    </fieldset>

    <form @submit.prevent="handleSubmit">
      <fieldset>
        <legend>Settings:</legend>
        <label>
          Round:
          <input type="text" v-model="roundId">
        </label>
        <ion-button type="submit">Submit</ion-button>
      </fieldset>
    </form> -->
    <div class="section-to-print">
      <!--   <ion-content scroll-x="true">-->
      <!-- <a href="#" onclick="window.history.back();">Back</a> -->
      <!-- <h1>Detailed Scores </h1> -->
      <GridSort :data="gridData" :columns="gridColumns" :title="title" :description="description"></GridSort>
    </div>
  </layout-raw>
</template>

<script>
// @ is an alias to /src
import fetch from "@/fetch.js";
import GridSort from "@/components/GridSort.vue";
export default {
  name: "RoundDetails",
  components: {
    GridSort
  },
  data() {
    var roundId = this.$route.params.id;
    var tournamentId = this.$route.params.tournament;
    var title = "Round " + roundId;
    var description = null;
    return {
      tournamentId: tournamentId,
      roundId: roundId,
      data: [],
      searchQuery: "",
      gridColumns: [
        "table",
        "name",
        "color",
        "points",
        "totalPoints",
        "school",
        "grade",
        "division"
      ],
      gridData: [],
      title: title,
      description:description,
      errors: []
    };
  },
  methods: {
    save() {
      let roundId = this.roundId;
      if (roundId != "") {
        this.title = "Round " + roundId;
        this.loadData();
      }
    },
    loadData() {
      var tournamentId = this.tournamentId;
      var roundId = this.roundId;
      fetch
        .get(`round/${roundId}?tournament=${tournamentId}`)
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

