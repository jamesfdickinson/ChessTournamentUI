<template>
  <layout-menu>
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

        <ion-title @click="$router.push({ name: 'Tournaments' })">
          Tournament
        </ion-title>
        <ion-buttons slot="end">
          <ion-button v-on:click="userDetails()">
            <ion-icon name="contact"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="flex-container">
        <div class="flex-item-full">
          <ion-card>
            <!-- <div class="title">
          <img v-if="tournament.image" :src="tournament.image" />
        </div> -->
            <ion-item>
              <ion-thumbnail slot="start">
                <img v-if="tournament.image" :src="tournament.image" />
              </ion-thumbnail>
              <ion-label style="white-space: normal;">
                <h1 >{{ tournament.name }}</h1>
                <p>{{ getLocalDate(tournament.startDateTime) }}</p>
              </ion-label>
              <ion-icon
                name="settings"
                slot="end"
                @click="
                  $router.push({
                    name: 'Admin',
                    params: { tournament: tournamentId },
                  })
                "
              >
              </ion-icon>
            </ion-item>
            <ion-item >
              <ion-icon slot="start" name="alarm"></ion-icon>
              <ion-label>
                <div style="white-space: normal;">{{ tournament.status }}</div>
                <div>{{ countDownDisplay }}</div>
                <ion-progress-bar
                  :value="tournament.statusPercentage"
                ></ion-progress-bar>
              </ion-label>
              <ion-button
                slot="end"
                @click="
                  $router.push({
                    name: 'FAQ',
                    params: { tournament: tournamentId },
                  })
                "
                >FAQ</ion-button
              >
            </ion-item>
            <ion-item
              v-if="
                tournament.allowRegistration === true &&
                userPlayers.length === 0
              "
            >
              <ion-icon name="clipboard" slot="start"></ion-icon>
              <ion-label>You are not registered</ion-label>
              <ion-button slot="end" @click="signup()">Sign-Up</ion-button>
              <!-- <ion-button
            slot="end"
            @click="
              $router.push({
                name: 'SignUp',
                params: { tournament: tournamentId },
              })
            "
            >Sign-Up</ion-button> -->
            </ion-item>

            <template v-for="userPlayer of userPlayers">
              <div :key="userPlayer.playerId">
                <ion-item v-if="!tournament.allowCheckIn">
                  <ion-icon name="clipboard" slot="start"></ion-icon>
                  <ion-label>Registered</ion-label>
                  <ion-button
                    slot="end"
                    @click="
                      $router.push({
                        name: 'Player',
                        params: { id: userPlayer.playerId },
                      })
                    "
                    >View</ion-button
                  >
                </ion-item>

                <ion-item
                  v-if="
                    tournament.allowCheckIn && userPlayer.isPresent === false
                  "
                >
                  <ion-icon
                    name="close-circle-outline"
                    slot="start"
                    color="danger"
                  ></ion-icon>
                  <ion-label color="danger">NOT checked-in</ion-label>
                  <ion-button
                    slot="end"
                    :disabled="!tournament.allowCheckIn"
                    @click="checkIn(userPlayer.playerId)"
                    >Check-in</ion-button
                  >
                </ion-item>
                <ion-item v-if="userPlayer.isPresent === true">
                  <ion-icon
                    name="checkmark"
                    slot="start"
                    color="success"
                  ></ion-icon>
                  <ion-label>Ready to play</ion-label>
                  <ion-button slot="end" @click="checkOut(userPlayer.playerId)"
                    >Leave</ion-button
                  >
                </ion-item>
              </div>
            </template>
          </ion-card>

          <div style="color: red">
            <div v-for="error in errors" v-bind:key="error">*{{ error }}</div>
          </div>
        </div>
        <div class="flex-item">
          <div v-if="tournament.state == 'play'">
            <template v-for="userTable of userTables">
              <ion-card :key="userTable.id">
                <Table :table="userTable"></Table>
                <ion-item>
                  <ion-button
                    slot="end"
                    @click="
                      $router.push({
                        name: 'Round',
                        params: {
                          tournament: tournamentId,
                          id: tournament.round,
                        },
                      })
                    "
                    >View All</ion-button
                  >
                </ion-item>
              </ion-card>
            </template>
          </div>
        </div>
        <div class="flex-item">
          <ion-card style="height: 200px">
            <Chat
              :channel="tournamentId.toString()"
              :userName="userName"
            ></Chat>
          </ion-card>
        </div>
        <div class="flex-item">
          <ion-card v-if="tournament.video">
            <div v-html="tournament.video"></div>
          </ion-card>
        </div>
        <div class="flex-item">
          <ion-card
            v-if="players && players.length > 0"
            style="xheight: 220px; overflow-y: auto"
          >
            <ion-list-header lines="inset">
              <ion-label
                >Players {{ players.length }} ({{
                  playersCheckedIn
                }})</ion-label
              >
            </ion-list-header>
            <Standings :players="players"></Standings>
          </ion-card>
        </div>
      </div>
    </ion-content>
    <!-- </ion-page> -->
  </layout-menu>
</template>

<script>
// @ is an alias to /src
import TournamentAPI from "@/services/TournamentAPI";
import fetch from "@/services/fetch";
import Chat from "@/components/Chat.vue";
import Standings from "@/components/Standings.vue";
import Table from "@/components/Table.vue";
import Authentication from "@/services/Authentication";
//import EventBus from "@/services/EventBus.js";
import TournamentSocket from "@/services/TournamentSocket.js";
//import LayoutMenu from "@/components/LayoutMenu.vue";
const tournamentAPI = new TournamentAPI();
const authentication = new Authentication();
const tournamentSocket = new TournamentSocket();
export default {
  name: "home",
  components: {
    Chat,
    Standings,
    Table,
  },
  data() {
    var tournamentId = this.$route.params.tournament || 118;
    //var tournamentGuid = ...
    let user = authentication.getUser();
    var userName = user && user.name ? user.name : "unknown";

    return {
      tournamentId: tournamentId,
      tournament: {},
      user: user,
      userName: userName,
      userPlayers: [],
      userTables: [],
      players: [],
      countDownDisplay: null,
      errors: [],
    };
  },
  methods: {
    userDetails() {
      this.$router.push({ name: "User" });
    },
    editPlayer() {},
    signup() {
      let user = this.user;
      let tournamentId = parseInt(this.tournamentId);

      this.errors = [];
      if (!user)
        this.errors.push("User is not logged in.  Can't sign up user.");

      var player = {
        tournamentId: tournamentId,
        firstName: user.name,
        lastName: "",
        grade: 12,
        team: "",
        rating: 1000,
        division: 1,
        isPresent: false,
        paid: false,
        parentName: null,
        email: user.email,
        parentPhone: null,
        emailHelpList: false,
        allowNotifications: true,
        gamerId: user.gamerId,
        avatar: user.avatar,
      };
      if (this.errors.length > 0) return;
      fetch
        .post(`player`, player)
        .then(() => {
          this.loadData();
        })
        .catch((e) => {
          console.error(e.response);
          let errorMessage = "error signing up.";
          if (e && e.response && e.response.data)
            errorMessage = e.response.data;
          this.errors.push(errorMessage);
        });
    },
    checkIn(playerId) {
      if (!playerId) return;
      fetch.put(`player/${playerId}/checkin/true`).then(() => {
        //this.loadData();
      });
    },
    checkOut(playerId) {
      if (!playerId) return;
      fetch.put(`player/${playerId}/checkin/false`).then(() => {
        //this.loadData();
      });
    },
    getLocalDate(date) {
      if (!date) return null;
      let localDate = new Date(date);
      if (!localDate) return null;
      let options = { dateStyle: "medium", timeStyle: "short" };
      return localDate.toLocaleString(undefined, options);
    },
    updateCountDown(countDownToTime) {
      // Set the date we're counting down to
      this.countDownDisplay = this.getCountDownDisplay(countDownToTime);

      // Update the count down every 1 second
      clearInterval(this.timer);

      if (countDownToTime - new Date() < 0) return;
      this.timer = setTimeout(
        function () {
          this.updateCountDown(countDownToTime);
        }.bind(this),
        1000
      );
    },
    getCountDownDisplay(countDownDate) {
      if (!countDownDate) return null;

      let countDownDateTime = countDownDate.getTime();
      // Get today's date and time
      //var now = new Date().getTime();
      //utc time
      var now = new Date();
      var nowTime = now.getTime();
      // Find the distance between now and the count down date
      var distance = countDownDateTime - nowTime;
      if (distance < 0) return null;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      let displayTime = "";

      if (days > 0) displayTime += days + "d ";

      if (hours > 0 || days > 0) displayTime += hours + "h ";

      displayTime += minutes + "m " + seconds + "s ";

      return displayTime;
    },
    loadData() {
      var tournamentId = this.tournamentId;
      tournamentAPI
        .tournamentView(tournamentId)
        .then((data) => {
          this.populate(data);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getTableUserOld(allPositions, email) {
      let round = allPositions.reduce(
        (max, p) => (p.round > max ? p.round : max),
        0
      );
      let tablePositionsUser = allPositions.filter(
        (t) => t.playerEmail === email && t.round === round
      );
      if (tablePositionsUser.length === 0) return null;

      let tables = [];
      for (let i = 0; i < tablePositionsUser.length; i++) {
        let userPosition = tablePositionsUser[i];
        let tablePositions = allPositions.filter(
          (t) => t.table === userPosition.table && t.round === round
        );
        let table = {
          id: userPosition.room,
          round: userPosition.round,
          table: userPosition.table,
          room: userPosition.room,
          positions: tablePositions,
        };
        tables.push(table);
      }
      return tables;
    },
    getTableUser(allPositions, email) {
      let tablePositionsUser = allPositions.filter(
        (t) => t.email === email && t.room
      );
      if (tablePositionsUser.length === 0) return null;

      let tables = [];
      for (let i = 0; i < tablePositionsUser.length; i++) {
        let userPosition = tablePositionsUser[i];
        let tablePositions = allPositions
          .filter((t) => t.room === userPosition.room)
          .map((p) => {
            return {
              playerId: p.playerId,
              playerName: p.name,
              playerFirstName: p.firstName,
              playerLastName: p.lastName,
              playerEmail: p.email,
              avatar: p.avatar,
              points: p.roundPoints,
            };
          });
        let isCompleted = tablePositions.some((x) => x.points > 0);
        let table = {
          id: userPosition.room,
          round: userPosition.round,
          table: userPosition.table,
          room: userPosition.room,
          positions: tablePositions,
          isCompleted: isCompleted,
        };
        tables.push(table);
      }
      return tables;
    },
    populate(data) {
      let tournament = data || {};
      let user = authentication.getUser() || {};
      let email = user.email;
      let userPlayers = [];
      let userTables = [];
      // if (email) {
      //   userPlayers = tournament.players.filter((i) => i.email == email);
      //   let tablePositions = tournament.tablePositions || [];
      //   userTables = this.getTableUser(tablePositions, email) || {};
      // }
      if (email) {
        userPlayers = tournament.players.filter((i) => i.email == email);
        userTables = this.getTableUser(tournament.players, email) || {};
      }
      this.tournament = tournament;
      this.players = tournament.players || [];

      this.playersCheckedIn = this.players.filter((p) => p.isPresent).length;
      this.userPlayers = userPlayers;
      this.userTables = userTables;

      //todo: bind in markup
      //this.countDown
      //this.updateCountDown(new Date("Jan 7, 2021 14:51:25"));
      let timerDateTime = new Date(
        Math.max(
          new Date(tournament.startDateTime),
          new Date(tournament.timerDateTime)
        )
      );
      this.updateCountDown(timerDateTime);
    },
    onUpdate(data) {
      //console.log("onUpdate", data);
      this.populate(data);
    },
  },
  mounted() {
    this.loadData();
    // this.connectToChat();
    //todo: move data to store and listen to data updates
    //EventBus.$on("updated", this.onUpdate);

    tournamentSocket.onUpdate = this.onUpdate.bind(this);
    tournamentSocket.connect(this.tournamentId);
  },
  created() {},
  beforeDestroy() {
    //this.disconnectToChat();
    //EventBus.$off("updated", this.onUpdate);

    tournamentSocket.close();
  },
};
</script>
<style scoped>
.pagination {
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
}

.title {
  position: relative;
  text-align: center;
  background: rgb(0, 0, 0);

  color: white;
}
.title img {
  max-height: 170px;
  width: auto;
  margin: 0 auto;
}
.title .bottomLabel {
  position: absolute;
  bottom: 0px;
  color: black;
  background: rgba(255, 255, 255, 1); /* Black see-through */
  margin: 10px auto;
  width: 80%;
  padding: 3px 8px;
  box-sizing: border-box;
}

a {
  text-decoration: none;
}
.flex-container {
  display: flex;
  flex-wrap: wrap;
  background-color: #f1f1f1;
}
.flex-item-full {
  flex: 100%;
}
.flex-item {
  flex: 50%;
}
.flex-item:empty {
  flex: 0%;
}

/* Responsive layout - makes a one column-layout instead of a two-column layout */
@media (max-width: 800px) {
  .flex-item {
    flex: 100%;
  }
}
</style>
