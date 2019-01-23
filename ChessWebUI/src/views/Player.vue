<template>
  <div class="ion-page" main>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-toggle>
            <ion-button>
              <ion-icon slot="icon-only" name="menu"></ion-icon>
            </ion-button>
          </ion-menu-toggle>
        </ion-buttons>
        <ion-title>Player</ion-title>
        <ion-buttons slot="end">
            <ion-button v-on:click="editPlayer()">
             <ion-icon name="create"></ion-icon>
            </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-list>
        <ion-list-header color="primary">Profile</ion-list-header>

       
        <ion-item>
          <ion-label position="fixed">First Name</ion-label>
          <ion-label slot="end">{{player.firstName}}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Last Name</ion-label>
          <ion-label slot="end">{{player.lastName}}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label position="fixed">School</ion-label>
          <ion-label slot="end">{{player.school}}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Grade</ion-label>
          <ion-label slot="end">{{player.grade}}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Rating</ion-label>
          <ion-label slot="end">{{player.rating}}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Division</ion-label>
          <ion-label slot="end">{{player.division}}</ion-label>
        </ion-item>


      </ion-list>

      <ion-list>
        <ion-list-header color="primary">Score</ion-list-header>
        <ion-item>
          <ion-label>Score</ion-label>
          <ion-note>0</ion-note>
        </ion-item>
      </ion-list>

      <ion-list>
        <ion-list-header color="primary">Games</ion-list-header>
        <ion-item ion-activatable>
          <ion-label>Player Name</ion-label>
          <ion-badge>99</ion-badge>
        </ion-item>
      </ion-list>

      <ion-button color="light">Light</ion-button>
      <ion-button>Default</ion-button>
      <ion-button color="secondary">Secondary</ion-button>
      <ion-button color="danger">Danger</ion-button>
      <ion-button color="dark">Dark</ion-button>
    </ion-content>
    <!-- </ion-page> -->
  </div>
</template>

<script>
import fetch from "@/fetch.js";

export default {
  name: "home",

  components: {},
  data() {
    var tournamentId = this.$route.params.tournament;
    return {
      tournamentId: tournamentId,
      player: {},
      errors: []
    };
  },
  methods: {
     editPlayer() {
      var  id = this.$route.params.id;
      this.$router.push({ name: "playeredit", params: { id: id } });
    },
    loadData() {
      
      var id = this.$route.params.id;

      fetch
        .get(`player/${id}`)
        .then(response => {
          this.player = response.data;
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
