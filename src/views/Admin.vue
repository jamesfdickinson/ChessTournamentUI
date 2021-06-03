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
        <ion-title>Admin</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <StateFlow :key="state"> </StateFlow>
      <ion-list>
        <!-- <ion-list-header>
          <ion-label>Players</ion-label>
        </ion-list-header>
        <router-link :to="{ name: 'Players', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="people"></ion-icon>
            <ion-label>Players</ion-label>
          </ion-item>
        </router-link> 
        <router-link :to="{ name: 'PlayerNew', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="person-add"></ion-icon>
            <ion-label>Add Player</ion-label>
          </ion-item>
        </router-link>
        -->

        <!-- <ion-item button detail="true" v-on:click="openRounds()">
          <ion-icon slot="start" name="paper"></ion-icon>
          <ion-label>*Edit Players Bulk 1</ion-label>
        </ion-item>
        <ion-item button detail="true" v-on:click="openScores()">
          <ion-icon slot="start" name="podium"></ion-icon>
          <ion-label>*Edit Players Bulk 2</ion-label>
        </ion-item>-->
        <!-- <router-link :to="{ name: 'Check-In', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="clipboard"></ion-icon>
            <ion-label>Check-In</ion-label>
          </ion-item>
        </router-link>-->

        <!-- <ion-item button detail="true" v-on:click="openRoster()">
          <ion-icon slot="start" name="filing"></ion-icon>
          <ion-label>Roster</ion-label>
        </ion-item>-->

        <ion-list-header>
          <ion-label>Tournament Settings</ion-label>
        </ion-list-header>

        <router-link
          :to="{ name: 'TournamentEdit', params: { tournament: tournamentId } }"
        >
          <ion-item button detail="true">
            <ion-icon slot="start" name="cog"></ion-icon>
            <ion-label>Tournament</ion-label>
          </ion-item>
        </router-link>
        <router-link
          :to="{ name: 'FAQEdit', params: { tournament: tournamentId } }"
        >
          <ion-item button detail="true">
            <ion-icon slot="start" name="cog"></ion-icon>
            <ion-label>FAQ</ion-label>
          </ion-item>
        </router-link>
        <router-link
          :to="{ name: 'SignUpEdit', params: { tournament: tournamentId } }"
        >
          <ion-item button detail="true">
            <ion-icon slot="start" name="cog"></ion-icon>
            <ion-label>Sign Up</ion-label>
          </ion-item>
        </router-link>
        <router-link
          :to="{
            name: 'TournamentVideoEdit',
            params: { tournament: tournamentId },
          }"
        >
          <ion-item button detail="true">
            <ion-icon slot="start" name="cog"></ion-icon>
            <ion-label>Video Edit</ion-label>
          </ion-item>
        </router-link>
        <router-link
          :to="{ name: 'UserAccess', params: { tournament: tournamentId } }"
        >
          <ion-item button detail="true">
            <ion-icon slot="start" name="cog"></ion-icon>
            <ion-label>Users Access</ion-label>
          </ion-item>
        </router-link>
        <ion-list-header>
          <ion-label>Check-In</ion-label>
        </ion-list-header>
        <router-link
          :to="{ name: 'CheckIn', params: { tournament: tournamentId } }"
        >
          <ion-item button detail="true">
            <ion-icon slot="start" name="clipboard"></ion-icon>
            <ion-label>Check-In</ion-label>
          </ion-item>
        </router-link>
        <router-link
          :to="{ name: 'Players', params: { tournament: tournamentId } }"
        >
          <ion-item button detail="true">
            <ion-icon slot="start" name="person"></ion-icon>
            <ion-label>Players</ion-label>
          </ion-item>
        </router-link>
        <ion-list-header>
          <ion-label>Manage Rounds</ion-label>
        </ion-list-header>
        <router-link
          :to="{ name: 'RoundCreate', params: { tournament: tournamentId } }"
        >
          <ion-item button detail="true">
            <ion-icon slot="start" name="list"></ion-icon>
            <ion-label>Create Round</ion-label>
          </ion-item>
        </router-link>
        <router-link
          :to="{ name: 'RoundsEdit', params: { tournament: tournamentId } }"
        >
          <ion-item button detail="true">
            <ion-icon slot="start" name="list"></ion-icon>
            <ion-label>Edit Rounds</ion-label>
          </ion-item>
        </router-link>

        <ion-list-header>
          <ion-label>Tools</ion-label>
        </ion-list-header>
        <router-link
          :to="{ name: 'SendMessage', params: { tournament: tournamentId } }"
        >
          <ion-item button detail="true">
            <ion-icon slot="start" name="notifications"></ion-icon>
            <ion-label>*Send Message</ion-label>
          </ion-item>
        </router-link>
        <router-link
          :to="{ name: 'AdminTools', params: { tournament: tournamentId } }"
        >
          <ion-item button detail="true">
            <ion-icon slot="start" name="hammer"></ion-icon>
            <ion-label>Tools</ion-label>
          </ion-item>
        </router-link>
        <router-link
          :to="{ name: 'TournamentCreate', params: { copyId: tournamentId } }"
        >
          <ion-item button detail="true">
            <ion-icon slot="start" name="copy"></ion-icon>
            <ion-label>Copy Tournament</ion-label>
          </ion-item>
        </router-link>

        <!-- <a v-bind:href="'https://admin.chessclub.io/'+ tournamentId+'/'">
          <ion-item button detail="true">
            <ion-icon slot="start" name="cog"></ion-icon>
            <ion-label>Old Admin Site</ion-label>
          </ion-item>
        </a>-->

        <!-- <ion-list-header>
          <ion-label>Reports</ion-label>
        </ion-list-header>
        <router-link :to="{ name: 'ReportWallChart', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="cog"></ion-icon>
            <ion-label>Wall Chart</ion-label>
          </ion-item>
        </router-link>-->
      </ion-list>
    </ion-content>
    <!-- </ion-page> -->
  </layout-menu>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import fetch from "@/services/fetch";
import Toast from "@/components/Toast.js";
const toast = new Toast();
import StateFlow from "@/components/StateFlow.vue";
import EventBus from "@/services/EventBus.js";

export default {
  name: "home",
  components: {
    StateFlow,
  },
  data() {
    var tournamentId = this.$route.params.tournament || 118;
    return {
      tournamentId: tournamentId,
      tournament: {},
      state: null,
      errors: [],
    };
  },
  methods: {
    changeState(state) {
      this.results = "";
      var tournamentId = this.tournamentId;
      fetch
        .post(`tournamentState/${tournamentId}?state=${state}`)
        .then(() => {
          this.loadData();
          const message = "Mode updated to " + state;
          toast.show(message);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    loadData() {
      var tournamentId = this.tournamentId;
      fetch
        .get(`tournamentView/${tournamentId}`)
        .then((response) => {
          this.tournament = response.data;
          this.state = this.tournament.state;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    onUpdate(tournament) {
      this.tournament = tournament;
      //todo: pull round data from tournament data
      this.loadData();
    },
  },
  mounted() {
    this.loadData();
    EventBus.$on("updated", this.onUpdate);
  },
  created() {},
  beforeDestroy() {
    EventBus.$off("updated", this.onUpdate);
  },
};
</script>