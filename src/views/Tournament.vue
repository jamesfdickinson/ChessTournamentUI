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
        <!-- <img
          style="max-height:300px;width: auto;margin: 0 auto;"
          v-if="!tournament.image"
          src="images/chess-board.jpg"
        /> -->
        <img
          style="max-height:300px;width: auto;margin: 0 auto;"
          v-if="tournament.image"
          :src="tournament.image"
        />

        <ion-card-header>
          <ion-card-title>{{tournament.name}}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>{{tournament.details}}</p>
        </ion-card-content>
      </ion-card>

      <ion-card v-if="status != null">
        <ion-card-header>
          <ion-card-title>{{status.state}} - {{status.status}}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-progress-bar :value="status.percentage"></ion-progress-bar>
        </ion-card-content>
      </ion-card>

      <ion-card v-if="tournament.allowRegistration === true && userPlayers.length === 0">
        <ion-item>
          <ion-icon name="clipboard" slot="start"></ion-icon>
          <ion-label>You not are registered</ion-label>
          <ion-button
            slot="end"
            @click="$router.push({ name: 'SignUp', params: { tournament:tournamentId } })"
          >Sign-Up</ion-button>
        </ion-item>
      </ion-card>
      <!-- 
      <ion-card v-if="tournament.allowRegistration === true">

        <ion-item v-if="userPlayers.length === 0">
          <ion-icon name="clipboard" slot="start"></ion-icon>
          <ion-label>You not are registered</ion-label>
          <ion-button
            slot="end"
            @click="$router.push({ name: 'SignUp', params: { tournament:tournamentId } })"
          >Sign-Up</ion-button>
        </ion-item>
        <ion-item v-if=" userPlayers.length !== 0">
          <ion-icon name="clipboard" slot="start"></ion-icon>
          <ion-label>You are registered</ion-label>
        </ion-item>
      </ion-card>-->
      <template v-for="userPlayer of userPlayers">
        <ion-card :key="userPlayer.playerId">
          <ion-card-header>
            <ion-card-title>{{userPlayer.firstName}} {{userPlayer.lastName}}</ion-card-title>
          </ion-card-header>
          <!-- <ion-item>
            <ion-icon name="contact" slot="start"></ion-icon>
            <ion-icon
              name="create"
              slot="end"
              @click="$router.push({ name: 'PlayerEdit', params: { id: userPlayer.playerId} })"
            ></ion-icon>
            <ion-label>{{userPlayer.firstName}} {{userPlayer.lastName}}</ion-label>
          </ion-item>-->
          <ion-item>
            <ion-icon name="clipboard" slot="start"></ion-icon>
            <ion-label>You are registered</ion-label>
            <ion-button
              slot="end"
              @click="$router.push({ name: 'Player', params: { id: userPlayer.playerId} })"
            >View</ion-button>
            <!-- <ion-button
              slot="end"
              @click="$router.push({ name: 'PlayerEdit', params: { id: userPlayer.playerId} })"
            >Edit</ion-button> -->
          </ion-item>
          <ion-item v-if="tournament.allowCheckIn === true && userPlayer.isPresent === false">
            <ion-icon name="close-circle-outline" slot="start" color="danger"></ion-icon>
            <ion-label color="danger">You are NOT checked-in</ion-label>
            <ion-button slot="end" @click="checkIn(userPlayer.playerId)">Check-in</ion-button>
          </ion-item>
          <ion-item v-if="userPlayer.isPresent === true">
            <ion-icon name="checkmark" slot="start" color="success"></ion-icon>
            <ion-label>You are ready to play</ion-label>
            <ion-button slot="end" @click="checkOut(userPlayer.playerId)">Leave</ion-button>
          </ion-item>
        </ion-card>
      </template>
<!-- <iframe frameborder="0"
        scrolling="no"
        id="chat_embed"
        src="https://www.twitch.tv/embed/jamesfdickinson/chat?parent=192.168.1.11"
        height="500"
        width="100%">
</iframe>   -->
      <!-- <ion-card>
        <ion-card-header>
          <ion-card-title>Your Pairing</ion-card-title>
        </ion-card-header>
        <ion-item color="primary">
          <ion-label slot="start">Table 1</ion-label>
          <ion-button fill="outline" color="light" slot="end">View</ion-button>
        </ion-item>
        <ion-item detail="true">
          <TeamIcon style="margin-right: 10px;"></TeamIcon>

          <ion-label>Jimmy Dickinson</ion-label>
        </ion-item>
        <ion-item detail="true">
          <TeamIcon style="margin-right: 10px;"></TeamIcon>

          <ion-label>John Smith</ion-label>
        </ion-item>
      </ion-card>-->

      <div></div>
      <Menu />
    </ion-content>
    <!-- </ion-page> -->
  </layout-menu>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import fetch from "@/fetch.js";
import Menu from "@/components/Menu.vue";
import Authentication from "@/services/Authentication";
//import LayoutMenu from "@/components/LayoutMenu.vue";
const authentication = new Authentication();
export default {
  name: "home",
  components: {
    Menu
  },
  data() {
    var tournamentId = this.$route.params.tournament || 118;
    return {
      tournamentId: tournamentId,
      tournament: {},
      state: "signup1",
      status: null,
      userPlayers: [],
      errors: []
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
      fetch
        .get(`tournament/${tournamentId}`)
        .then(response => {
          this.tournament = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });

      fetch
        .get(`status/${tournamentId}`)
        .then(response => {
          this.status = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
      let user = authentication.getUser();
      if (user && user.email) {
        fetch
          .get(`players/${tournamentId}?email=${user.email}`)
          .then(response => {
            this.userPlayers = response.data || [];
          })
          .catch(e => {
            this.errors.push(e);
          });
      }
    }
  },
  created() {
    this.loadData();
  }
};
</script>
