<template>
  <layout-no-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon
            name="arrow-round-back"
            size="large"
            @click="$router.go(-1)"
          ></ion-icon>
        </ion-buttons>

        <ion-title>Team Join</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form @submit.prevent="handleSubmit">
        <ion-list>
          <ion-item>
            <ion-label position="stacked">Team/Club</ion-label>
            <div style="width: 100%">
              <select v-model="player.team">
                <option disabled value="">Select One</option>
                <option v-for="team in teams" :key="team" :value="team">
                  {{ team }}
                </option>
                <option value="">Other</option>
              </select>
            </div>
          </ion-item>
          <ion-item>
            <ion-input
              :value="player.team"
              @input="player.team = $event.target.value"
            ></ion-input>
          </ion-item>
        </ion-list>

        <ul style="color: red">
          <li v-for="error in errors" v-bind:key="error">*{{ error }}</li>
        </ul>
        <ion-button type="submit" expand="block">Submit</ion-button>
      </form>
    </ion-content>
    <!-- </ion-page> -->
  </layout-no-menu>
</template>

<script>
import fetch from "@/services/fetch";
import TournamentAPI from "@/services/TournamentAPI";
//import Authentication from "@/services/Authentication";
//const authentication = new Authentication();
const tournamentAPI = new TournamentAPI();
export default {
  name: "home",
  components: {},
  data() {
    var tournamentId = this.$route.params.tournament;
    var playerId = this.$route.params.id;
    return {
      playerId: playerId,
      tournamentId: tournamentId,
      teams: [],
      player: {},
      errors: [],
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    handleSubmit() {
      let player = this.player;
      let playerId = this.playerId;
      //validation
      this.errors = [];
      if (this.errors.length > 0) return;

      fetch
        .put(`player/${playerId}`, player)
        .then((response) => {
          console.log(response);
          this.$router.push({ name: `Tournament` }); //back
        })
        .catch((e) => {
          console.error(e);
          this.errors.push("error.");
        });
    },
    loadData() {
      let playerId = this.playerId;
      let tournamentId = this.tournamentId;
      tournamentAPI
        .tournamentView(tournamentId)
        .then((tournament) => {
          tournament = tournament || {};
          let players = tournament.players || [];

          if (playerId) {
            let selectedPlayer = players.find((player) => player && player.playerId == playerId);
            this.player = selectedPlayer || {};
          }

          let configuredTeams = [];
          if (tournament && tournament.teams) {
            configuredTeams = tournament.teams
              .split(",")
              .map((item) => item.trim())
              .filter((item) => !!item);
          }

          let existingTeams = (players || [])
            .map((player) => (player && player.team ? player.team.toString().trim() : ""))
            .filter((team) => !!team);

          this.teams = [...new Set([...configuredTeams, ...existingTeams])]
            .sort((left, right) => left.localeCompare(right));
        })
        .catch((e) => {
          this.errors.push(e);
        });
      // let user = authentication.getUser();
      // if (user) {
      //   if (user.email) this.player.email = user.email;
      //   if (user.name) this.player.firstName = user.name;
      //   if (user.gamerId) this.player.gamerId = user.gamerId;
      //   if (user.avatar) this.player.avatar = user.avatar;
      // }
    },
  },
  created() {
    this.loadData();
  },
};
</script>
