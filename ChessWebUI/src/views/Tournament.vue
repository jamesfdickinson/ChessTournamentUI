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
        <ion-title>Chess Tournament</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-img v-if="!tournament.image" src="./images/chess-board.jpg"></ion-img>
        <ion-img v-if="tournament.image" :src="tournament.image"></ion-img>
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
      <Menu/>
    </ion-content>
    <!-- </ion-page> -->
  </layout-menu>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import fetch from "@/fetch.js";
import Menu from "@/components/Menu.vue";
import LayoutMenu from "@/components/LayoutMenu.vue";

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
