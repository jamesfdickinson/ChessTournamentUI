<template>
  <layout-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title>Edit Rounds</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item
          detail="true"
          v-for="round of rounds"
          :key="round"
          v-on:click="editRound(round)"
        >
          <ion-icon
            name="trash"
            slot="start"
            v-on:click="deleteRound(round);$event.stopPropagation();"
          ></ion-icon>
          <ion-label>Round {{round}}</ion-label>
        </ion-item>
      </ion-list>
      <div style="color:green;">{{message}}</div>
      <ul style="color:red;">
        <li v-for="error in errors" v-bind:key="error">*{{ error }}</li>
      </ul>
    </ion-content>
    <!-- </ion-page> -->
  </layout-menu>
</template>

<script>
import fetch from "@/fetch.js";

export default {
  name: "home",

  components: {},
  data() {
    var tournamentId = this.$route.params.tournament;
    return {
      tournamentId: tournamentId,
      rounds: [],
      errors: [],
      message: ""
    };
  },
  methods: {
    deleteRound(id) {
      this.errors = [];
      this.message = "";

      let round = id;
      let tournamentId = this.$route.params.tournament;

      this.$confirm(`Do you want to delete round ${round}?`).then(() => {
        fetch
          .delete(`round/${round}?tournament=${tournamentId}`)
          .then(response => {
            this.message = "Round deleted: " + response.data;
            this.loadData();
          })
          .catch(e => {
            this.errors.push(e);
          });
      });
    },
    editRound(id) {
     // this.errors = [];
     // this.errors.push("Round edit comming soon. Use users view to make edits. "+id);
      this.$router.push({
        name: "Round",
        params: { tournament: this.tournamentId, id: id }
      });
    },
    clearData() {
      this.players = [];
    },
    loadData() {
      var tournamentId = this.$route.params.tournament;
      fetch
        .get(`rounds/${tournamentId}`)
        .then(response => {
          this.rounds = response.data;
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
