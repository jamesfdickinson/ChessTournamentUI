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
            <h1>{{tournament.name}}</h1>
            <p>{{tournament.details}}</p>
          </ion-label>
        </ion-item>
      </ion-card>
      <!-- <ion-item>
        <ion-icon slot="start" name="information-circle-outline"></ion-icon>
        <ion-label>{{tournament.details}}</ion-label>
      </ion-item>-->

       <ion-card>
      <ion-item v-if="status != null">
        <ion-icon slot="start" name="alarm"></ion-icon>
        <ion-label>
          <div>{{status.state}} - {{status.status}}</div>
          <ion-progress-bar :value="status.percentage"></ion-progress-bar>
        </ion-label>
        <!-- <ion-button
          slot="end"
          @click="$router.push({ name: 'SignUp', params: { tournament:tournamentId } })"
        >View</ion-button>-->
      </ion-item>

      <!-- <ion-list v-if="status != null">
        <ion-list-header>
          <ion-label>{{status.state}} - {{status.status}}</ion-label>
        </ion-list-header>
        <ion-item>
          <ion-progress-bar :value="status.percentage"></ion-progress-bar>
        </ion-item>
      </ion-list>-->

      <!--      
      <ion-card v-if="status != null">
        <ion-card-header>
          <ion-card-title>{{status.state}} - {{status.status}}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-progress-bar :value="status.percentage"></ion-progress-bar>
        </ion-card-content>
      </ion-card>-->

      <!--    
      <ion-card>
        <ion-item>
          <ion-icon name="mic" slot="start"></ion-icon>
          <ion-label>Discord Chat</ion-label>
          <ion-button slot="end" href="https://discord.gg/75VYvF5" target="_blank">Join Chat</ion-button>
        </ion-item>
      </ion-card>-->

      <ion-item v-if="tournament.allowRegistration === true && userPlayers.length === 0">
        <ion-icon name="clipboard" slot="start"></ion-icon>
        <ion-label>You are not registered</ion-label>
        <ion-button
          slot="end"
          @click="$router.push({ name: 'SignUp', params: { tournament:tournamentId } })"
        >Sign-Up</ion-button>
      </ion-item>

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
        <!-- <ion-list-header :key="userPlayer.playerId">
          {{userPlayer.firstName}} {{userPlayer.lastName}}
        </ion-list-header>-->
        <div :key="userPlayer.playerId">
          <!-- <ion-card :key="userPlayer.playerId"> -->
          <!-- <ion-card-header>
            <ion-card-subtitle>{{userPlayer.firstName}} {{userPlayer.lastName}}</ion-card-subtitle>
          </ion-card-header>-->
          <!-- <ion-item>
            <ion-icon name="contact" slot="start"></ion-icon>
            <ion-label>{{userPlayer.firstName}} {{userPlayer.lastName}}</ion-label>
            <ion-button
              slot="end"
              @click="$router.push({ name: 'PlayerEdit', params: { id: userPlayer.playerId} })"
            >Edit</ion-button>
          </ion-item>
          <ion-item>
            <ion-icon name="contact" slot="start"></ion-icon>
            <ion-label>{{userPlayer.firstName}} {{userPlayer.lastName}}</ion-label>
            <ion-icon
              name="create"
              slot="end"
              @click="$router.push({ name: 'PlayerEdit', params: { id: userPlayer.playerId} })"
            ></ion-icon>
          </ion-item>-->
          <ion-item v-if="!tournament.allowCheckIn">
            <ion-icon name="clipboard" slot="start"></ion-icon>
            <ion-label>Registered</ion-label>
            <ion-button
              slot="end"
              @click="$router.push({ name: 'Player', params: { id: userPlayer.playerId} })"
            >View</ion-button>
          </ion-item>
          <!-- <ion-item>
            <ion-icon name="clipboard" slot="start"></ion-icon>
            <ion-label>Registered</ion-label>
            <ion-button
              slot="end"
              @click="$router.push({ name: 'PlayerEdit', params: { id: userPlayer.playerId} })"
            >Edit</ion-button>
          </ion-item>-->
          <ion-item v-if="tournament.allowCheckIn && userPlayer.isPresent === false">
            <ion-icon name="close-circle-outline" slot="start" color="danger"></ion-icon>
            <ion-label color="danger">NOT checked-in</ion-label>
            <ion-button
              slot="end"
              :disabled="!tournament.allowCheckIn"
              @click="checkIn(userPlayer.playerId)"
            >Check-in</ion-button>
          </ion-item>
          <ion-item v-if="userPlayer.isPresent === true">
            <ion-icon name="checkmark" slot="start" color="success"></ion-icon>
            <ion-label>Ready to play</ion-label>
            <ion-button slot="end" @click="checkOut(userPlayer.playerId)">Leave</ion-button>
          </ion-item>
          <!-- </ion-card> -->
        </div>
      </template>
        </ion-card>
      <!-- <iframe frameborder="0"
        scrolling="no"
        id="chat_embed"
        src="https://www.twitch.tv/embed/jamesfdickinson/chat?parent=192.168.1.11"
        height="500"
        width="100%">
      </iframe>-->
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
      <ion-items>
        <router-link :to="{ name: 'Rounds'}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="paper"></ion-icon>
            <ion-label>Rounds</ion-label>
          </ion-item>
        </router-link>
        <router-link :to="{ name: 'Standings'}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="podium"></ion-icon>
            <ion-label>Standings</ion-label>
          </ion-item>
        </router-link>
        <router-link :to="{ name: 'Players'}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="contact"></ion-icon>
            <ion-label>Players</ion-label>
          </ion-item>
        </router-link>
        <router-link :to="{ name: 'FAQ'}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="help"></ion-icon>
            <ion-label>FAQ</ion-label>
          </ion-item>
        </router-link>
        <!-- <router-link :to="{ name: 'SignUp'}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="clipboard"></ion-icon>
            <ion-label>Sign Up</ion-label>
          </ion-item>
        </router-link> -->
      </ion-items>
      <ion-card style="height:200px;">
        <Chat :channel="tournamentId.toString()" :userName="userName"></Chat>
      </ion-card>

      <router-link :to="{ name: 'Admin', params: { tournament: tournamentId }}">
        <ion-item button detail="true">
          <ion-icon slot="start" name="cog"></ion-icon>
          <ion-label>Admin Settings</ion-label>
        </ion-item>
      </router-link>
      <ion-list-header>
        <ion-label>Other</ion-label>
      </ion-list-header>
      <router-link :to="{ name: 'Tournaments'}">
        <ion-item button detail="true">
          <ion-icon slot="start" name="trophy"></ion-icon>
          <ion-label>Tournaments</ion-label>
        </ion-item>
      </router-link>
    </ion-content>
    <!-- </ion-page> -->
  </layout-menu>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import fetch from "@/services/fetch";
import Menu from "@/components/Menu.vue";
import Chat from "@/components/Chat.vue";
import Authentication from "@/services/Authentication";
//import LayoutMenu from "@/components/LayoutMenu.vue";
const authentication = new Authentication();
export default {
  name: "home",
  components: {
    Menu,
    Chat
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
      fetch.put(`player/${playerId}/checkin/true`).then(() => {
        this.loadData();
      });
    },
    checkOut(playerId) {
      if (!playerId) return;
      fetch.put(`player/${playerId}/checkin/false`).then(() => {
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
<style scoped>
.title {
  position: relative;
  text-align: center;
  background: rgb(0, 0, 0);

  color: white;
}
.title img {
  max-height: 200px;
  width: auto;
  margin: 0 auto;
}
.title .bottomLabel {
  position: absolute;
  bottom: 0px;
  background: rgba(0, 0, 0, 0.8); /* Black see-through */
  width: 100%;
  padding: 3px 8px;
  box-sizing: border-box;
}

a {
  text-decoration: none;
}
</style>
