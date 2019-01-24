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
        <ion-title>Chess Tournament</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- <ion-card>
        <ion-img src="./images/chess-board.jpg"></ion-img>
        <ion-card-header>
          <ion-card-title>{{tournament.name}}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>{{tournament.details}}</p>
        </ion-card-content>
      </ion-card>-->
      <ion-card>
        <ion-img src="/images/chess-board.jpg"></ion-img>
        <ion-card-header>
          <ion-card-title>Brookwood and Minter Bridge</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>Jan 26th Chess Tournament at Witch hazel led by Brookwood and Minter Bridge</p>
        </ion-card-content>
      </ion-card>

      <Menu/>


    </ion-content>
    <!-- </ion-page> -->
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import fetch from "@/fetch.js";
import Menu from "@/components/Menu.vue";

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
      errors: []
    };
  },
  methods: {
    openPlayers() {
      this.$router.push({
        name: "players",
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
