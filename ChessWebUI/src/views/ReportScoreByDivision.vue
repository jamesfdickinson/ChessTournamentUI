<template>
  <div class="ion-page" main>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-toggle>
            <ion-button>
              <ion-icon slot="icon-only" name="menu"></ion-icon>
            </ion-button>
          </ion-menu-toggle>
        </ion-buttons>
        <ion-title>Scores - ScoreByDivision</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>


        <template v-for="group of data">
          <!-- <ion-list   :key="table.id"> -->
          <ion-item :key="group.division" color="primary">
            <ion-label>Division {{group.division}}</ion-label>
          </ion-item>
          <ion-item
            detail="true"
            v-for="score of group.scores"
            :key="score.playerId"
            v-on:click="openPlayer(score.playerId)"
          >
            <ion-label>{{score.firstName}} {{score.lastName}}</ion-label>
            <ion-badge slot="end" color="light">{{score.points}}</ion-badge> 
          </ion-item>
          <!-- </ion-list> -->
        </template>
      </ion-list>
    </ion-content>
    <!-- </ion-page> -->
  </div>
</template>

<script>
// @ is an alias to /src
import fetch from "@/fetch.js";

export default {
  name: "ReportScoreByDivision",
  components: {
   
  },
  data() {
    var tournamentId = this.$route.params.tournament || 118;
    return {
      tournamentId: tournamentId,
      data: [],
      errors: []
    };
  },
  methods: {
       openPlayer(id) {
      this.$router.push({ name: "player", params: { id: id } });
    },
    loadData() {
  var tournamentId = this.tournamentId;

      fetch
        .get(`report/ScoreByDivision/${tournamentId}`)
        .then(response => {
          this.data = response.data;
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
