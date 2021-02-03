<template>
  <layout-menu>
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
        <ion-title>Edit Tournament</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>
          <ion-label position="stacked">Name</ion-label>
          <ion-input
            :value="tournament.name"
            @input="tournament.name = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Type</ion-label>
          <ion-input
            :value="tournament.type"
            @input="tournament.type = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Details</ion-label>
          <ion-textarea
            auto-grow="true"
            :value="tournament.details"
            @input="tournament.details = $event.target.value"
          ></ion-textarea>
        </ion-item>
        <!-- <ion-item>
          <ion-label position="stacked">Start Date/Time</ion-label>
          <ion-datetime
            display-format="D MMM YYYY H:mm"
            :value="new Date(tournament.startDateTime+'Z').toISOString()"
          ></ion-datetime>
        </ion-item> -->
        <ion-item>
          <ion-label position="stacked">Start Date/Time</ion-label>
          <ion-datetime
            display-format="D MMM YYYY H:mm"
            :value="tournament.startDateTime"
            @ionChange="tournament.startDateTime = $event.target.value"
          ></ion-datetime>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Rounds</ion-label>
          <ion-input
            :value="tournament.rounds"
            @input="tournament.rounds = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Pairing Algorithm</ion-label>
          <ion-select
            placeholder="Select One"
            :value="tournament.pairing"
            @ionChange="tournament.pairing = $event.target.value"
          >
            <ion-select-option value="Swiss">Swiss</ion-select-option>
            <!-- <ion-select-option value="SingleElimination">Single Elimination</ion-select-option> -->
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">State</ion-label>
          <ion-input
            :value="tournament.state"
            @input="tournament.state = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Access Code: Basic</ion-label>
          <ion-input
            :value="tournament.accessCodeBasic"
            @input="tournament.accessCodeBasic = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Access Code: Recorder</ion-label>
          <ion-input
            :value="tournament.accessCodeRecorder"
            @input="tournament.accessCodeRecorder = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Access Code: Admin</ion-label>
          <ion-input
            :value="tournament.accessCodeAdmin"
            @input="tournament.accessCodeAdmin = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Image (url)</ion-label>
          <ion-input
            :value="tournament.image"
            @input="tournament.image = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Teams (separated by commas)</ion-label>
          <ion-textarea
            auto-grow="true"
            :value="tournament.teams"
            @input="tournament.teams = $event.target.value"
          ></ion-textarea>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Max Players</ion-label>
          <ion-input
            :value="tournament.maxPlayers"
            @input="tournament.maxPlayers = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Auto Advance Rounds</ion-label>
          <ion-checkbox
            slot="start"
            :checked="tournament.autoAdvanceRounds"
            @ionChange="
              tournament.autoAdvanceRounds = $event.target.checked == true
            "
          ></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-label>Allow Notifications</ion-label>
          <ion-checkbox
            slot="start"
            :checked="tournament.allowNotifications"
            @ionChange="
              tournament.allowNotifications = $event.target.checked == true
            "
          ></ion-checkbox>
        </ion-item>

        <ion-item>
          <ion-label>Is Hidden</ion-label>
          <ion-checkbox
            slot="start"
            :checked="tournament.hidden"
            @ionChange="tournament.hidden = $event.target.checked == true"
          ></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-label>Show Signup Page</ion-label>
          <ion-checkbox
            slot="start"
            :checked="tournament.showSignUpPage"
            @ionChange="
              tournament.showSignUpPage = $event.target.checked == true
            "
          ></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-label>Require Check-In</ion-label>
          <ion-checkbox
            slot="start"
            :checked="tournament.requireCheckIn"
            @ionChange="
              tournament.requireCheckIn = $event.target.checked == true
            "
          ></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-label>Allow Check-In</ion-label>
          <ion-checkbox
            slot="start"
            :checked="tournament.allowCheckIn"
            @ionChange="tournament.allowCheckIn = $event.target.checked == true"
          ></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-label>Allow Registration</ion-label>
          <ion-checkbox
            slot="start"
            :checked="tournament.allowRegistration"
            @ionChange="
              tournament.allowRegistration = $event.target.checked == true
            "
          ></ion-checkbox>
        </ion-item>

        <!-- <ion-item>
          <ion-label>Is Public</ion-label>
          <ion-checkbox
            slot="start"
            :checked="tournament.isPublic"
            @ionChange="tournament.isPublic = ($event.target.checked == true);"
          ></ion-checkbox>
        </ion-item>-->
        <!-- <ion-item>
          <ion-label position="stacked">Signup Content</ion-label>
           <ion-label position="stacked">(Use &lt;br&gt; for new line)</ion-label>
          
          <ion-textarea auto-grow="true"
            :value="tournament.signUpText"
            @input="tournament.signUpText = $event.target.value"
          ></ion-textarea>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">FAQ Content</ion-label>
          <ion-label position="stacked">(Use &lt;br&gt; for new line)</ion-label>
             <ion-textarea auto-grow="true"
            :value="tournament.faqcontent"
            @input="tournament.faqcontent = $event.target.value"
          ></ion-textarea>
        </ion-item>-->
      </ion-list>

      <ion-button expand="block" v-on:click="save()">Save</ion-button>
      <hr />
      <ion-button expand="block" color="light" v-on:click="back()"
        >Cancel</ion-button
      >
      <hr />
      <!-- <ion-button color="danger" v-on:click="deletePlayer()">Delete</ion-button> -->
      <!-- <ion-button @click="presentAlertConfirm">Show Alert (confirm)</ion-button> -->
      <!-- <ion-button color="danger">Delete</ion-button> -->
      <div style="color: red">{{ error }}</div>
    </ion-content>
    <!-- </ion-page> -->
  </layout-menu>
</template>

<script>
import fetch from "@/services/fetch";

export default {
  name: "home",
  components: {},
  data() {
    var tournamentId = this.$route.params.tournament;
    var randomInviteCode =
      Math.random().toString(36).substring(2, 5) +
      Math.random().toString(36).substring(2, 5);
    var randomInviteCodeRecorder =
      Math.random().toString(36).substring(2, 5) +
      Math.random().toString(36).substring(2, 5);
    var randomInviteCodeAdmin =
      Math.random().toString(36).substring(2, 5) +
      Math.random().toString(36).substring(2, 5);
    return {
      tournamentId: tournamentId,
      tournament: {
        name: "",
        accessCodeBasic: randomInviteCode,
        accessCodeRecorder: randomInviteCodeRecorder,
        accessCodeAdmin: randomInviteCodeAdmin,
        details: "",
        faqcontent: "",
        hidden: false,
        id: 0,
        image: null,
        isPublic: true,
        owner: null,
        teams: "",
        showSignUpPage: true,
        signUpText: "",
        type: null,
        rounds: 5,
        pairing: "Swiss",
        gameRoomLink: null,
        autoAdvanceRounds: false,
        allowNotifications: true,
        allowRegistration: true,
        state: "setup",
        maxPlayers: 50,
        requireCheckIn: true,
        allowCheckIn: false,
        startDateTime: null,
        video: ""
      },
      error: "",
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    save() {
      let tournamentId = this.tournamentId;
      let tournament = this.tournament;
      tournament.rounds = parseInt(tournament.rounds);
      if (isNaN(tournament.rounds)) {
         this.error = "Error: rounds is not a number";
         return;
      }
      tournament.maxPlayers = parseInt(tournament.maxPlayers);
      if (isNaN(tournament.maxPlayers)) {
         this.error = "Error: maxPlayers is not a number";
         return;
      }

      if (tournamentId && tournament) {
        fetch
          .put(`tournament/${tournamentId}`, tournament)
          .then((response) => {
            console.log(response);
            this.$router.back(); //back
          })
          .catch((e) => {
            this.error = "Error: Save failed";
            console.warn(e);
          });
      } else {
        fetch
          .post(`tournament`, tournament)
          .then((response) => {
            console.log(response);
            //back
            this.$router.back();
          })
          .catch((e) => {
            this.error = "Error: Save failed";
            console.warn(e);
          });
      }
    },
    deletePlayer() {
      //  let tournamentId = this.tournamentId;
      // if (tournamentId) {
      //   fetch
      //     .delete(`tournament/${tournamentId}`)
      //     .then(response => {
      //       console.log(response);
      //       //back
      //       this.$router.back();
      //     })
      //     .catch(e => {
      //       this.error = "Error: Delete failed";
      //       console.warn(e);
      //     });
      // }
    },
    loadData() {
      let tournamentId = this.tournamentId;
      if (tournamentId) {
        fetch
          .get(`tournament/${tournamentId}`)
          .then((response) => {
            this.tournament = response.data;
            //this.tournament.startDateTime = new Date(tournament.startDateTime+'Z').toISOString()
          })
          .catch((e) => {
            this.error = "Error: Load failed";
            console.warn(e);
          });
      }
    },
  },
  created() {
    this.loadData();
  },
};
</script>
