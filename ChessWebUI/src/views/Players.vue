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
        <ion-title>Players</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-searchbar
        :value="searchInput"
        @ionInput="searchInput = $event.target.value;"
        @ionChange="searchInput= $event.target.value;"
      ></ion-searchbar>
      <!-- <ul>
        <li v-for="tournament of tournaments" :key="tournament.id">
          <p>
            <strong>{{tournament.name}}</strong>
          </p>
          <p>{{tournament.name}}</p>
        </li>
      </ul>-->
      <ion-list>
        <ion-item
          detail="true"
          v-for="player of players"
          :key="player.playerId"
          v-bind:mhref="`player/${player.playerId}`"
          v-on:click="openPlayer(player.playerId)"
        >
          <ion-icon name="contact" slot="start"></ion-icon>
         <ion-label> {{player.firstName}} {{player.lastName}} </ion-label>
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
    return {
      searchInput:"",
      players: [],
      errors: []
    };
  },
  methods: {
    openPlayer(id) {
      this.$router.push({ name: "Player", params: { id: id } });
    },
    clearData() {
      this.players = [];
    },
    loadData() {
      var tournamentId = this.$route.params.tournament;
      fetch
        .get(`players/${tournamentId}`)
        .then(response => {
          this.players = response.data;
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
