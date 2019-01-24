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
        <ion-title>Player</ion-title>
        <ion-buttons slot="end">
          <ion-button v-on:click="editPlayer()">
            <ion-icon name="create"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!--<ion-card>
        <ion-card-header color="primary">
          <ion-card-title>Profile</ion-card-title>
        </ion-card-header>
      <ion-card-content>-->
      <!-- </ion-card-content>
      </ion-card>-->
      <ion-list>
       
        <ion-item>
          <ion-label position="fixed">Name</ion-label>
          <ion-label slot>{{player.firstName}} {{player.lastName}}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label position="fixed">School</ion-label>
          <ion-label slot>{{player.school}}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Grade</ion-label>
          <ion-label slot>{{player.grade}}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Rating</ion-label>
          <ion-label slot>{{player.rating}}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Division</ion-label>
          <ion-label slot>{{player.division}}</ion-label>
        </ion-item>
        <!-- </ion-list>
     
        <ion-list>-->
        <ion-list-header color="primary">Score</ion-list-header>
        <ion-item>
          <ion-label  position="fixed">Score</ion-label>
           <ion-label slot>4</ion-label>
        </ion-item>
        <!-- </ion-list>

        <ion-list>-->
        <ion-list-header color="primary">Games</ion-list-header>
        <ion-item detail="true">
          <ion-label>Player Name</ion-label>
          <ion-badge>99</ion-badge>
        </ion-item>
        <ion-item detail="true">
          <ion-label>Player2 Name</ion-label>
          <ion-badge>99</ion-badge>
        </ion-item>
        <ion-item detail="true">
          <ion-label>Player3 Name</ion-label>
          <ion-badge>99</ion-badge>
        </ion-item>
        <ion-item detail="true">
          <ion-label>Player4 Name</ion-label>
          <ion-badge>99</ion-badge>
        </ion-item>
      </ion-list>
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
      var id = this.$route.params.id;
      this.$router.push({ name: "playerEdit", params: { id: id } });
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
