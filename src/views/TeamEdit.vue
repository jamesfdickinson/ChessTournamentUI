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
//import Authentication from "@/services/Authentication";
//const authentication = new Authentication();
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
      if (playerId) {
        fetch
          .get(`player/${playerId}`)
          .then((response) => {
            this.player = response.data;
          })
          .catch((e) => {
            this.error = "Error: Load failed";
            console.warn(e);
          });
      }
      let tournamentId = this.tournamentId;
      fetch
        .get(`tournament/${tournamentId}`)
        .then((response) => {
          let tournament = response.data;
          if (tournament && tournament.teams) {
            this.teams = tournament.teams.split(",").map(function (item) {
              return item.trim();
            });
          }
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
