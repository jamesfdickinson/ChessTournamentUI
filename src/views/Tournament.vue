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
        <ion-title>Tournament</ion-title>
        <ion-buttons slot="end">
          <ion-button v-on:click="userDetails()">
            <ion-icon name="contact"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <div class="title">
          <img v-if="tournament.image" :src="tournament.image" />
        </div>
        <ion-item>
          <ion-label>
            <h1>{{ tournament.name }}</h1>
            <p>{{ tournament.details }}</p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-icon slot="start" name="alarm"></ion-icon>
          <ion-label>
            <div>{{ status.state }} - {{ status.status }}</div>
            <ion-progress-bar :value="status.percentage"></ion-progress-bar>
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

        <!-- <ion-card>
        <ion-item>
          <ion-thumbnail v-if="tournament.image" slot="start">
            <img :src="tournament.image" />
          </ion-thumbnail>
          <ion-label>
            <h1>{{tournament.name}}</h1>
            <p>{{tournament.details}}</p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-icon slot="start" name="alarm"></ion-icon>
          <ion-label>
            <div>{{status.state}} - {{status.status}}</div>
            <ion-progress-bar :value="status.percentage"></ion-progress-bar>
          </ion-label>
          <ion-button
            slot="end"
            @click="$router.push({ name: 'FAQ', params: { tournament:tournamentId } })"
          >FAQ</ion-button>
        </ion-item>
        </ion-card>-->

        <!-- </ion-card> -->
        <!-- <ion-item>
        <ion-icon slot="start" name="information-circle-outline"></ion-icon>
        <ion-label>{{tournament.details}}</ion-label>
        </ion-item>-->

        <!-- <ion-card> -->
        <!-- <ion-item v-if="status != null">
        <ion-icon slot="start" name="alarm"></ion-icon>
        <ion-label>
          <div>{{status.state}} - {{status.status}}</div>
          <ion-progress-bar :value="status.percentage"></ion-progress-bar>
        </ion-label>
        <ion-button
          slot="end"
          @click="$router.push({ name: 'SignUp', params: { tournament:tournamentId } })"
        >View</ion-button>
        </ion-item>-->

        <ion-item
          v-if="
            tournament.allowRegistration === true && userPlayers.length === 0
          "
        >
          <ion-icon name="clipboard" slot="start"></ion-icon>
          <ion-label>You are not registered</ion-label>
          <ion-button
            slot="end"
            @click="
              $router.push({
                name: 'SignUp',
                params: { tournament: tournamentId },
              })
            "
            >Sign-Up</ion-button
          >
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
              v-if="tournament.allowCheckIn && userPlayer.isPresent === false"
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
      <ion-card>
        <Table :table="userTable"></Table>
      </ion-card>

      <!-- </ion-card> -->

      <!-- <ion-card style="height:200px;  overflow-y: scroll;">
        <ion-card-header>
          <ion-card-subtitle>Standings</ion-card-subtitle>
        </ion-card-header>
        <Standings></Standings>
      </ion-card>
      <ion-item-header>Standings</ion-item-header>-->

      <!-- <ion-list-header >
        <ion-item>
          <ion-label>Standings</ion-label>
          <ion-icon slot="end" name="add" ></ion-icon>
        </ion-item>
      </ion-list-header>-->
      <!-- <ion-list-header>Standings</ion-list-header> -->

      <!-- <ion-card>
        <Standings style="height:200px;  overflow-y: scroll;"></Standings>
        <div class="pagination">
          <a href="#">&laquo;</a>
          <a href="#">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">5</a>
          <a href="#">6</a>
          <a href="#">&raquo;</a>
        </div>
      </ion-card>-->
      <!-- <div style="height:200px;  overflow-y: scroll;">
        <Standings></Standings>
      </div>-->
      <ion-card style="height: 200px">
        <Chat :channel="tournamentId.toString()" :userName="userName"></Chat>
      </ion-card>
      <!-- <div style="height:200px;">
        <Chat :channel="tournamentId.toString()" :userName="userName"></Chat>
      </div>-->

      <!-- <ion-list-header>Players</ion-list-header>
      <Standings></Standings>-->
      <ion-card v-if="tournament.video">
        <div v-html="tournament.video"></div>
      </ion-card>
      <ion-card
        v-if="standings && standings.length > 0"
        style="xheight: 220px; overflow-y: auto"
      >
        <ion-list-header>Standings</ion-list-header>
        <Standings :players="standings"></Standings>
      </ion-card>
    </ion-content>
    <!-- </ion-page> -->
  </layout-menu>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import fetch from "@/fetch.js";
import Chat from "@/components/Chat.vue";
import Standings from "@/components/Standings.vue";
import Table from "@/components/Table.vue";
import Authentication from "@/services/Authentication";
import EventBus from "@/services/EventBus.js";
//import LayoutMenu from "@/components/LayoutMenu.vue";
const authentication = new Authentication();

import SignalR from "@/services/SignalR.js";
const signalR = new SignalR();
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
      userName: userName,
      state: "signup1",
      status: { state: "" },
      userPlayers: [],
      userTable: {},
      players: [],
      standings: [],
      errors: [],
    };
  },
  methods: {
    userDetails() {
      this.$router.push({ name: "User" });
    },
    editPlayer() {},
    checkIn(playerId) {
      if (!playerId) return;
      fetch.post(`player/${playerId}/checkin/true`).then(() => {
        this.loadData();
      });
    },
    checkOut(playerId) {
      if (!playerId) return;
      fetch.post(`player/${playerId}/checkin/false`).then(() => {
        this.loadData();
      });
    },
    loadData() {
      var tournamentId = this.tournamentId;
      // fetch
      //   .get(`tournament/${tournamentId}`)
      //   .then(response => {
      //     this.tournament = response.data;
      //   })
      //   .catch(e => {
      //     this.errors.push(e);
      //   });

      fetch
        .get(`status/${tournamentId}`)
        .then((response) => {
          this.status = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      // let user = authentication.getUser();
      // if (user && user.email) {
      //   fetch
      //     .get(`players/${tournamentId}?email=${user.email}`)
      //     .then(response => {
      //       this.userPlayers = response.data || [];
      //     })
      //     .catch(e => {
      //       this.errors.push(e);
      //     });
      //}
      //   fetch
      //     .get(`report/AllPlayers/${tournamentId}`)
      //     .then(response => {
      //       this.players = response.data || [];
      //     })
      //     .catch(e => {
      //       this.errors.push(e);
      //     });

      fetch
        .get(`TournamentView/${tournamentId}`)
        .then((response) => {
          //this.players = response.data || [];
          let tournament = response.data || {};
          let user = authentication.getUser() || {};
          let email = user.email;
          let userPlayers = [];
          let userTable = {};
          if (email) {
            userPlayers = tournament.players.filter((i) => i.email == email);
            let tablePositions = tournament.tablePositions || [];
            userTable = this.getTableUser(tablePositions, email) || {};
          }
          this.tournament = tournament;
          this.players = tournament.players || [];
          this.standings = tournament.standings || [];
          this.userPlayers = userPlayers;
          this.userTable = userTable;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getTableUser(allPositions, email) {
      let round = allPositions.reduce(
        (max, p) => (p.round > max ? p.round : max),
        0
      );
      let tablePositionsUser = allPositions.filter(
        (t) => t.playerEmail === email && t.round === round
      );
      if (tablePositionsUser.length === 0) return null;

      let userPosition = tablePositionsUser[0];
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

      return table;
    },
    onUpdate(message) {
      console.log("onUpdate: " + message);
      this.loadData();
    },
    disconnectToChat() {
      if (signalR) signalR.close();
    },
  },
  mounted() {
    this.loadData();
    // this.connectToChat();
    //todo: move data to store and listen to data updates
    EventBus.$on("updated", this.onUpdate.bind(this));
  },
  created() {},
  beforeDestroy() {
    //this.disconnectToChat();
    EventBus.$off("updated", this.onUpdate.bind(this));
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
</style>
