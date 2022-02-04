<template>
  <layout-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title>Send Message</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <!-- <ion-list-header>
          <ion-label>Send New Round Message to All</ion-label>
        </ion-list-header>-->
        <ion-card>
          <ion-list>
            <ion-list-header>
              <ion-label>Send Tournament Message to All (nofitication)</ion-label>
            </ion-list-header>
            <ion-item>
              <ion-input placeholder="title" :value="title" @input="title = $event.target.value"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input placeholder="body" :value="body" @input="body = $event.target.value"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input placeholder="url" :value="url" @input="url = $event.target.value"></ion-input>
            </ion-item>
            <ion-item>
              <ion-button
                expand="block"
                v-on:click="sendTournamentPlayersNotifications(title,body,url)"
              >Send to All Players</ion-button>
            </ion-item>
          </ion-list>
        </ion-card>
        <ion-card>
          <ion-list>
            <ion-list-header>
              <ion-label>Send Round Message to All (nofitication)</ion-label>
            </ion-list-header>
            <ion-item>
              <ion-input
                placeholder="Round number"
                :value="round"
                @input="round = $event.target.value"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-button expand="block" v-on:click="sendRoundNotification()">Send Notification</ion-button>
              <ion-button expand="block" v-on:click="sendRoundSMS()">Send SMS</ion-button>
            </ion-item>
          </ion-list>
        </ion-card>

        <ion-card>
          <ion-list>
            <ion-list-header>
              <ion-label>Send Message to Player</ion-label>
            </ion-list-header>
            <ion-item>
              <ion-label position="stacked">Player</ion-label>
              <ion-select
                placeholder="Select One"
                :value="player"
                @ionChange="player= $event.target.value;"
              >
                <ion-select-option
                  v-for="player in players"
                  :key="player.id"
                  :value="player.id"
                >{{ player.name }}</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-input
                placeholder="message"
                :value="message"
                @input="message = $event.target.value"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-button expand="block" v-on:click="sendPlayerNotification()">Send Notification</ion-button>
              <ion-button expand="block" v-on:click="sendPlayerSMS()">Send SMS</ion-button>
            </ion-item>
          </ion-list>
        </ion-card>

        <ion-card>
          <ion-list>
            <ion-list-header>
              <ion-label>Send game invites to All</ion-label>
            </ion-list-header>
            <ion-item>
              <ion-input
                placeholder="Round number"
                :value="round"
                @input="round = $event.target.value"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-button expand="block" v-on:click="sendRoundGameInvites()">Send Invites</ion-button>
            </ion-item>
          </ion-list>
        </ion-card>
      </ion-list>
      <div style="color:green;">{{success}}</div>
      <div style="color:red;">{{error}}</div>
    </ion-content>
    <!-- </ion-page> -->
  </layout-menu>
</template>

<script>
import TournamentAPI from "@/services/TournamentAPI";
const tournamentAPI = new TournamentAPI();
export default {
  name: "home",
  components: {},
  data() {
    var tournamentId = this.$route.params.tournament;

    return {
      tournamentId: tournamentId,
      players: [],
      round: null,
      player: null,
      message: null,
      title: null,
      body: null,
      url: null,
      error: "",
      success: ""
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    sendTournamentPlayersNotifications(title, body, url) {
      let tournamentId = this.tournamentId;
      if (tournamentId && (title || body)) {
        tournamentAPI
          .sendTournamentPlayersNotifications(tournamentId, title, body, url)
          .then(data => {
            this.success = "Sent: " + data || "";
            console.log(data);
          })
          .catch(e => {
            this.error = "Error: " + e;
            console.warn(e);
          });
      }
    },
    sendTournamentSMS() {
      this.error = "SMS is disabled";
    },
    sendRoundNotification() {
      let tournamentId = this.tournamentId;
      let round = this.round;
      this.error = "";
      this.success = "";

      if (!round) {
        this.error = "Missing round number";
        return;
      }
      if (tournamentId && round) {
        tournamentAPI
          .sendRoundNotifications(tournamentId, round)
          .then(data => {
            this.success = "Sent: " + data || "";
            console.log(data);
          })
          .catch(e => {
            this.error = "Error: " + e;
            console.warn(e);
          });
      }
    },
    sendRoundGameInvites() {
      let tournamentId = this.tournamentId;
      let round = this.round;
      this.error = "";
      this.success = "";

      if (!round) {
        this.error = "Missing round number";
        return;
      }
      if (tournamentId && round) {
        tournamentAPI
          .sendRoundGameInvite(tournamentId, round)
          .then(data => {
            this.success = "Sent: " + data || "";
            console.log(data);
          })
          .catch(e => {
            this.error = "Error: " + e;
            console.warn(e);
          });
      }
    },
    sendRoundSMS() {
      let tournamentId = this.tournamentId;
      let round = this.round;
      this.error = "";
      this.success = "";

      if (!round) {
        this.error = "Missing round number";
        return;
      }
      if (tournamentId && round) {
        tournamentAPI
          .sendRoundSMS(tournamentId, round)
          .then(data => {
            this.success = data;
            console.log(data);
          })
          .catch(e => {
            this.error = "Error: " + e;
            console.warn(e);
          });
      }
    },
    sendPlayerNotification() {
      this.error = "sendPlayerNotification is disabled";
    },
    sendPlayerSMS() {
      this.error = "sendPlayerSMS is disabled";
    },
    loadData() {
      //todo: get current round number
    }
  },
  created() {
    this.loadData();
  }
};
</script>
