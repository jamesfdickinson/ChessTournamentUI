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
        <img
          style="max-height:300px;width: auto;margin: 0 auto;"
          v-if="!tournament.image"
          src="images/chess-board.jpg"
        />
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
      </ion-card> -->

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
//import LayoutMenu from "@/components/LayoutMenu.vue";

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
      status: null,
      errors: []
    };
  },
  methods: {
    userDetails() {
      this.$router.push({ name: "User" });
    },
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

      fetch
        .get(`status/${tournamentId}`)
        .then(response => {
          this.status = response.data;
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
