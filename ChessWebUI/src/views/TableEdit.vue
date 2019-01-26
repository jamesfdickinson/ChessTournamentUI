<template>
  <div class="ion-page" main>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title>Record Score</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-item>
        <h1>Who Won?</h1>
      </ion-item>
      <ion-item>
        <ion-label>Table: {{table.id}}</ion-label>
      </ion-item>

      <ion-list>
        <template v-for="position of table.positions">
          <ion-list-header :key="position.color">
            <ion-label>{{position.color}}</ion-label>
          </ion-list-header>
          <ion-item detail="true" :key="position.id" v-on:click="reportWin(position.playerId)">
            <ion-icon
              v-if="position.color=='Black'"
              src="/images/chess_pawn_black.svg"
              slot="start"
            ></ion-icon>
            <ion-icon
              v-else-if="position.color=='White'"
              src="/images/chess_pawn_white.svg"
              slot="start"
            ></ion-icon>
            <ion-icon v-else name="contact" slot="start"></ion-icon>
            <ion-label>{{position.playerFirstName}} {{position.playerLastName}}</ion-label>
          </ion-item>
        </template>
        <ion-list-header>
          <ion-label>Tie</ion-label>
        </ion-list-header>
        <ion-item detail="true" v-on:click="reportTie()">
          <ion-icon name="radio-button-off" slot="start"></ion-icon>
          <ion-label>Tie Game</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <!-- </ion-page> -->
  </div>
</template>

<script>
import fetch from "@/fetch.js";

export default {
  name: "TableEdit",

  components: {},
  data() {
    let tournamentId = this.$route.params.tournament;
    let round = this.$route.params.round;
    let tableId = this.$route.params.id;
    let redirect = this.$route.query.redirect;
    return {
      tournamentId: tournamentId,
      round: round,
      tableId: tableId,
      table: {},
      errors: []
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    reportWin(playerId) {
      let round = this.round;
      let tableId = this.tableId;
      let tournamentId = this.tournamentId;

      fetch
        .post(
          `table/ReportWin/${tableId}?round=${round}&tournament=${tournamentId}&winner=${playerId}`
        )
        .then(response => {
          console.log(response.data);
          this.$router.go(-1);
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    reportTie() {
      let round = this.round;
      let tableId = this.tableId;
      let tournamentId = this.tournamentId;

      fetch
        .post(
          `table/ReportTie/${tableId}?round=${round}&tournament=${tournamentId}`
        )
        .then(response => {
          console.log(response.data);
          this.$router.go(-1);
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    loadData() {
      //api/table/1?round=2&tournament=117

      let round = this.round;
      let tableId = this.tableId;
      let tournamentId = this.tournamentId;

      fetch
        .get(`table/${tableId}?round=${round}&tournament=${tournamentId}`)
        .then(response => {
          this.table = response.data;
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
