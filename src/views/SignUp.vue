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
            <ion-item>
              <ion-label position="stacked">Last Name</ion-label>
              <ion-input
                :value="player.lastName"
                @input="player.lastName = $event.target.value"
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
                  <option value="">Other</option>
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

            <ion-item v-if="type === 'Chess'">
              <ion-label position="stacked">Grade</ion-label>
              <div style="width: 100%">
                <select
                  v-model="player.grade"
                  @change="player.rating = player.grade * 100 + parseInt(skillLevelAdjustment)"
                >
                  <option disabled value="">Select One</option>
                  <option value="0">K</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="12">Open Division</option>
                </select>
              </div>
            </ion-item>
            <!-- <ion-item>
              <ion-label position="stacked">Grade</ion-label>
              <select 
                placeholder="Select One"
                :value="player.grade"
                @ionChange="player.grade= $event.target.value;player.rating =player.grade*100;"
              >
               <option disabled value="">Select One</option>
                <option value="0">K</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="12">Open Division</option>
              </select>
            </ion-item> -->
            <!-- <ion-item>
              <ion-label position="stacked">Grade</ion-label>
              <ion-select
                placeholder="Select One"
                :value="player.grade"
                @ionChange="player.grade= $event.target.value;player.rating =player.grade*100;"
              >
                <ion-select-option value="0">K</ion-select-option>
                <ion-select-option value="1">1</ion-select-option>
                <ion-select-option value="2">2</ion-select-option>
                <ion-select-option value="3">3</ion-select-option>
                <ion-select-option value="4">4</ion-select-option>
                <ion-select-option value="5">5</ion-select-option>
                <ion-select-option value="6">6</ion-select-option>
                <ion-select-option value="7">7</ion-select-option>
                <ion-select-option value="8">8</ion-select-option>
                 <ion-select-option value="9">9</ion-select-option>
                <ion-select-option value="10">10</ion-select-option>
                <ion-select-option value="11">11</ion-select-option>
                <ion-select-option value="12">12</ion-select-option>
                <ion-select-option value="12">Open Division</ion-select-option>
              </ion-select>
            </ion-item> -->
            <!-- <ion-item>
              <ion-label position="stacked">Grade</ion-label>
              <ion-input
                type="number"
                :value="player.grade"
                @input="player.grade = $event.target.value;player.rating =player.grade*100"
              ></ion-input>
            </ion-item>-->
            <ion-item v-if="type === 'Chess'">
              <ion-label position="stacked">Skill level</ion-label>
              <div style="width: 100%">
                <select
                  v-model="skillLevelAdjustment"
                  @change="player.rating = player.grade * 100 + parseInt(skillLevelAdjustment)"
                >
                  <option disabled value="">Select One</option>
                  <option value="-50">Beginning</option>
                  <option value="0">Intermediate</option>
                  <option value="50">Advanced</option>
      
                </select>
              </div>
            </ion-item>
            <ion-item v-if="type === 'Chess'">
              <ion-label position="stacked">Rating</ion-label>
              <ion-input
                type="number"
                :value="player.rating"
                @input="player.rating = $event.target.value"
              ></ion-input>
            </ion-item>
            <ion-item v-if="type === 'Chess'">
              <ion-label position="stacked">Parent's Name</ion-label>
              <ion-input
                :value="player.parentName"
                @input="player.parentName = $event.target.value"
              ></ion-input>
            </ion-item>

            <ion-item v-if="type === 'Chess'">
              <ion-label position="stacked">Phone Number</ion-label>
              <ion-input
                inputmode="tel"
                :value="player.parentPhone"
                @input="player.parentPhone = $event.target.value"
              ></ion-input>
            </ion-item>

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
      skillLevelAdjustment: 0,
      showSignUpPage: true,
      type: null,
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
      let isTeamRequired = this.teams.length > 0;

      //add default grade
      if (!player.grade) player.grade = 12;

      if (!player.timeZone) {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        player.timeZone = timezone;
      }


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
      if (isNaN(player.rating)) this.rating = 1000;
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
          //display error
          console.error(e);
          this.errors.push("error signing up.");
          if (e.response && e.response.data) {
            console.error(e.response.data);
            this.errors.push(e.response.data);
          }
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
          if (tournament && tournament.type) {
            this.type = tournament.type;
            if (tournament.type === "Chess") {
              this.player.firstName = "";
            }
          }
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
        if (user.timeZone) this.player.timeZone = user.timeZone;
      }
    },
  },
  created() {
    this.loadData();
  },
};
</script>
