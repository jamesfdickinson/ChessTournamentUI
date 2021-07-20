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

        <ion-title>Sign Up</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div v-if="!showSignUpPage">
        <ion-item>
          <p>Sign up is closed</p>
        </ion-item>
      </div>
      <div v-if="showSignUpPage">
        <!-- <ion-item>
        <h3>Sign Up</h3>
        </ion-item>-->
        <ion-item>
          <p v-html="tournament.signUpText"></p>
        </ion-item>
        <ion-item>
          <router-link :to="{ name: 'FAQ' }">
            <a>FAQ, Rules, and Terms and Conditions</a>
          </router-link>
        </ion-item>
        <form @submit.prevent="handleSubmit">
          <!-- <ion-card> -->
          <ion-list>
            <ion-item>
              <ion-label position="stacked">Name</ion-label>
              <ion-input
                :value="player.firstName"
                @input="player.firstName = $event.target.value"
              ></ion-input>
            </ion-item>
            <ion-item v-if="teams.length > 0">
              <ion-label position="stacked">Team/Club</ion-label>
              <div style="width: 100%">
                <select v-model="player.team">
                  <option disabled value="">Select One</option>
                  <option v-for="team in teams" :key="team" :value="team">
                    {{ team }}
                  </option>
                   <option  value="">Unassigned</option>
                </select>
              </div>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Team/Club (optional)</ion-label>
              <ion-input
                :value="player.team"
                @input="player.team = $event.target.value"
              ></ion-input>
            </ion-item>

            <!-- <ion-item>
            <ion-label position="stacked">Last Name</ion-label>
            <ion-input :value="player.lastName" @input="player.lastName = $event.target.value"></ion-input>
            </ion-item>-->
            <!-- <ion-item>
              <ion-label position="stacked">Cribbage ID</ion-label>
              <ion-input
                type="number"
                :value="player.gamerId"
                @input="player.gamerId = $event.target.value"
              ></ion-input>
            </ion-item> -->
            <ion-item>
              <ion-label position="stacked">Email</ion-label>
              <ion-input
                type="email"
                :value="player.email"
                @input="player.email = $event.target.value"
              ></ion-input>
            </ion-item>
            <ion-item v-if="tournament.accessCodeBasic">
              <ion-label position="stacked">Access Code</ion-label>
              <ion-input
                :value="password"
                @input="password = $event.target.value"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label text-wrap
                >I agree to the terms of use, privacy policy, and tournament
                rules</ion-label
              >
              <ion-checkbox
                slot="start"
                :checked="agreeTerms"
                @ionChange="agreeTerms = $event.target.checked == true"
              ></ion-checkbox>
            </ion-item>
          </ion-list>
          <!-- </ion-card> -->
          
          <!-- <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          </p>-->
          <ul style="color: red">
            <li v-for="error in errors" v-bind:key="error">*{{ error }}</li>
          </ul>
          <ion-button type="submit" expand="block">Submit</ion-button>
        </form>
      </div>
    </ion-content>
    <!-- </ion-page> -->
  </layout-no-menu>
</template>

<script>
import fetch from "@/services/fetch";
import Authentication from "@/services/Authentication";
const authentication = new Authentication();
export default {
  name: "home",
  components: {},
  data() {
    var tournamentId = this.$route.params.tournament;
    var playerId = this.$route.params.id;
    var player = {
      tournamentId: tournamentId,
      firstName: "",
      lastName: "",
      grade: "",
      team: "",
      rating: 1000,
      division: 1,
      isPresent: false,
      paid: false,
      parentName: "",
      email: "",
      parentPhone: "",
      emailHelpList: true,
      allowNotifications: true,
    };
    return {
      playerId: playerId,
      tournamentId: tournamentId,
      tournament: {},
      teams: [],
      showSignUpPage: true,
      player: player,
      agreeTerms: false,
      password: null,
      errors: [],
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    handleSubmit() {
      let tournamentId = parseInt(this.tournamentId);
      let player = this.player;
      let agreeTerms = this.agreeTerms;
      let tournament = this.tournament;
      let password = this.password;
      let accessCodeBasic = null;
      let isTeamRequired = this.teams.length > 0
      //add default grade for cribbage
      if (!player.grade) player.grade = 12;

      player.tournamentId = tournamentId;
      if (tournament) {
        //player.isPresent = !(tournament.requireCheckIn === true);
        accessCodeBasic = tournament.accessCodeBasic;
      }

      //validation
      this.errors = [];
      if (!agreeTerms) this.errors.push("Agree to terms is required.");
      if (!player.firstName) this.errors.push("First name is required.");
      //if (!player.lastName) this.errors.push("last name is required.");
      if (!player.team && isTeamRequired) this.errors.push("Team is required.");
      if (!player.grade) this.errors.push("Grade is required.");
      if (isNaN(player.grade)) this.errors.push("Grade is not a number.");
      if (!player.rating) this.rating = 1000;
      if (isNaN(player.rating)) this.errors.push("Rating is not a number.");
      if (!player.email) this.errors.push("Email is required.");
      if (accessCodeBasic && accessCodeBasic != password)
        this.errors.push("Incorrect access code");

      if (this.errors.length > 0) return;

      fetch
        .post(`player`, player)
        .then((response) => {
          console.log(response);
          //back
          this.$router.push({ name: `Tournament` });
        })
        .catch((e) => {
          //todo: display error
          console.error(e);
          this.errors.push("error signing up.");
        });
    },
    loadData() {
      let tournamentId = this.tournamentId;
      fetch
        .get(`tournament/${tournamentId}`)
        .then((response) => {
          let tournament = response.data;
          this.tournament = tournament;
          if (tournament) this.showSignUpPage = tournament.allowRegistration;
          if (tournament && tournament.teams) {
            this.teams = tournament.teams.split(",").map(function (item) {
              return item.trim();
            });
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
      let user = authentication.getUser();
      if (user) {
        if (user.email) this.player.email = user.email;
        if (user.name) this.player.firstName = user.name;
        if (user.gamerId) this.player.gamerId = user.gamerId;
        if (user.avatar) this.player.avatar = user.avatar;
      }
    },
  },
  created() {
    this.loadData();
  },
};
</script>
