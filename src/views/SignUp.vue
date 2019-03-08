<template>
  <layout-no-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>

        <ion-title>Sign Up</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-item>
        <h3>Sign Up</h3>
      </ion-item>
      <ion-item>
        <p v-html="tournament.signUpText"></p>
      </ion-item>
      <ion-item>
        <router-link :to="{ name: 'FAQ'}">
          <a>Read the FAQ and Rules</a>
        </router-link>
      </ion-item>
      <form @submit.prevent="handleSubmit">
        <ion-card>
          <ion-list>
            <ion-item>
              <ion-label position="stacked">First Name</ion-label>
              <ion-input :value="player.firstName" @input="player.firstName = $event.target.value"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Last Name</ion-label>
              <ion-input :value="player.lastName" @input="player.lastName = $event.target.value"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">School</ion-label>
              <ion-input :value="player.school" @input="player.school = $event.target.value"></ion-input>
            </ion-item>
            <!-- <ion-item>
              <ion-label position="stacked">Grade</ion-label>
              <select placeholder="Select One">
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
                <option value="13">Adult</option>
              </select>
            </ion-item> -->
            <ion-item>
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
                <ion-select-option value="13">Adult</ion-select-option>
              </ion-select>
            </ion-item>
            <!-- <ion-item>
              <ion-label position="stacked">Grade</ion-label>
              <ion-input
                type="number"
                :value="player.grade"
                @input="player.grade = $event.target.value;player.rating =player.grade*100"
              ></ion-input>
            </ion-item> -->
            <ion-item>
              <ion-label position="stacked">Rating</ion-label>
              <ion-input
                type="number"
                :value="player.rating"
                @input="player.rating = $event.target.value"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Parent's Name</ion-label>
              <ion-input
                :value="player.parentName"
                @input="player.parentName = $event.target.value"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Parent's Email</ion-label>
              <ion-input
                type="email"
                :value="player.parentEmail"
                @input="player.parentEmail = $event.target.value"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Parent's Phone Number</ion-label>
              <ion-input
                inputmode="tel"
                :value="player.parentPhone"
                @input="player.parentPhone = $event.target.value"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label>Allow SMS Notifications</ion-label>
              <ion-checkbox
                slot="start"
                :checked="player.allowNotifications"
                @ionChange="player.allowNotifications = ($event.target.checked == true);"
              ></ion-checkbox>
            </ion-item>
            <ion-item>
              <ion-label
                text-wrap
              >By signing up, you agree to our terms of use, privacy policy, another rules found in the</ion-label>
              <ion-checkbox
                slot="start"
                :checked="agreeTerms"
                @ionChange="agreeTerms = ($event.target.checked == true);"
              ></ion-checkbox>
            </ion-item>
          </ion-list>
        </ion-card>
        <ion-button type="submit" expand="block">Submit</ion-button>
        <!-- <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
        </p>-->
        <ul style="color:red;">
          <li v-for="error in errors" v-bind:key="error">*{{ error }}</li>
        </ul>
      </form>
    </ion-content>
    <!-- </ion-page> -->
   </layout-no-menu>
</template>

<script>
import fetch from "@/fetch.js";
import LayoutNoMenu from "@/components/LayoutNoMenu.vue";

export default {
  name: "home",
  components: {LayoutNoMenu},
  data() {
    var tournamentId = this.$route.params.tournament;
    var playerId = this.$route.params.id;
    var player = {
      tournamentId: tournamentId,
      firstName: "",
      lastName: "",
      school: "",
      grade: "",
      rating: 1000,
      division: 1,
      isPresent: false,
      paid: false,
      parentName: "",
      parentEmail: "",
      parentPhone: "",
      emailHelpList: true,
      allowNotifications: true
    };
    return {
      playerId: playerId,
      tournamentId: tournamentId,
      tournament: {},
      player: player,
      agreeTerms: false,
      errors: []
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    handleSubmit() {
      let tournamentId = this.tournamentId;
      let player = this.player;
      let agreeTerms = this.agreeTerms;

      player.tournamentId = tournamentId;

      //validation
      this.errors = [];
      if (!agreeTerms) this.errors.push("agree to terms is required.");
      if (!player.firstName) this.errors.push("first name is required.");
      if (!player.lastName) this.errors.push("last name is required.");
      if (!player.school) this.errors.push("school is required.");
      if (!player.grade) this.errors.push("grade is required.");
      if (isNaN(player.grade)) this.errors.push("grade is not a number.");
      if (!player.rating) this.rating = 1000;
      if (isNaN(player.rating)) this.errors.push("rating is not a number.");

      if (this.errors.length > 0) return;

      fetch
        .put(`player`, player)
        .then(response => {
          console.log(response);
          //back
          this.$router.push({ name: `SignUpComplete` });
        })
        .catch(e => {
          //todo: display error
          console.error(e);
          this.errors.push("error signing up.");
        });
    },
    loadData() {
      let tournamentId = this.tournamentId;
      fetch
        .get(`tournament/${tournamentId}`)
        .then(response => {
          this.tournament = response.data;
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
