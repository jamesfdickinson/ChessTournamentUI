<template>
  <div class="ion-page" main>
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
        <ion-title>Admin</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-list-header>
          <ion-label>Admin Settings</ion-label>
        </ion-list-header>
        <ion-item button detail="true" v-on:click="openPlayers()">
          <ion-icon slot="start" name="contact"></ion-icon>
          <ion-label>Add Player</ion-label>
        </ion-item>
        <ion-item button detail="true" v-on:click="openRounds()">
          <ion-icon slot="start" name="paper"></ion-icon>
          <ion-label>Edit Players</ion-label>
        </ion-item>
        <ion-item button detail="true" v-on:click="openScores()">
          <ion-icon slot="start" name="podium"></ion-icon>
          <ion-label>Edit Players Bulk</ion-label>
        </ion-item>
        <router-link :to="{ name: 'Registration', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="clipboard"></ion-icon>
            <ion-label>Registration</ion-label>
          </ion-item>
        </router-link>
        <ion-item button detail="true" v-on:click="openFAQ()">
          <ion-icon slot="start" name="help"></ion-icon>
          <ion-label>Create Round</ion-label>
        </ion-item>
          <ion-item button detail="true" v-on:click="openFAQ()">
          <ion-icon slot="start" name="help"></ion-icon>
          <ion-label>Edit Rounds</ion-label>
        </ion-item>
        <ion-list-header>
          <ion-label>Manage Rounds</ion-label>
        </ion-list-header>

        <ion-item button detail="true" v-on:click="openPlayers()">
          <ion-icon slot="start" name="create"></ion-icon>
          <ion-label>Tools</ion-label>
        </ion-item>
        <ion-item button detail="true" v-on:click="openPlayers()">
          <ion-icon slot="start" name="cog"></ion-icon>
          <ion-label>Edit FAQ</ion-label>
        </ion-item>
        <router-link :to="{ name: 'players', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="cog"></ion-icon>
            <ion-label>Send Message</ion-label>
          </ion-item>
        </router-link>
        <router-link :to="{ name: 'players', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="cog"></ion-icon>
            <ion-label>Edit Tournament</ion-label>
          </ion-item>
        </router-link>
        <ion-list-header>
          <ion-label>Reports</ion-label>
        </ion-list-header>
        <router-link :to="{ name: 'ReportWallChart', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="cog"></ion-icon>
            <ion-label>Wall Chart</ion-label>
          </ion-item>
        </router-link>

        <ion-item button detail="true" v-on:click="openRoster()">
          <ion-icon slot="start" name="filing"></ion-icon>
          <ion-label>Roster</ion-label>
        </ion-item>
      </ion-list>

      <!-- <ion-button v-on:click="openPlayers()">Players</ion-button>fdfggdfg
      <ion-button v-on:click="loadData()">Load</ion-button>
      <ion-button color="danger" v-on:click="clearData()">Clear</ion-button>

      <ion-button color="light">Light</ion-button>
      <ion-button>Default</ion-button>
      <ion-button color="secondary">Secondary</ion-button>
      <ion-button color="danger">Danger</ion-button>
      <ion-button color="dark">Dark</ion-button>

      <ion-fab-button class="todo-fab">
        <ion-icon name="add"></ion-icon>
      </ion-fab-button>-->
    </ion-content>
    <!-- </ion-page> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import fetch from "@/fetch.js";

export default {
  name: "home",
  components: {
    //HelloWorld
  },
  data() {
    var tournamentId = this.$route.params.tournament || 118;
    return {
      tournamentId: tournamentId,
      tournament: {},
      errors: []
    };
  },
  methods: {
    openPlayers() {
      this.$router.push({
        name: "Players",
        params: { tournament: this.tournamentId }
      });
    },
    openRounds() {
      this.$router.push({
        name: "rounds",
        params: { tournament: this.tournamentId }
      });
    },
    openScores() {
      this.$router.push({
        name: "scores",
        params: { tournament: this.tournamentId }
      });
    },
    openSignUp() {
      this.$router.push({
        name: "signup",
        params: { tournament: this.tournamentId }
      });
    },
    openFAQ() {
      this.$router.push({
        name: "faq",
        params: { tournament: this.tournamentId }
      });
    },
    clearData() {
      this.$router.push({ path: "home" });
      this.posts = [];
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
    }
  },
  created() {
    this.loadData();
  }
};
</script>
