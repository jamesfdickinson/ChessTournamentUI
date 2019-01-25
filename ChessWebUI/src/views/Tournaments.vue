<template>
  <div class="ion-page" main>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <!-- <ion-menu-toggle> -->
            <ion-button>
              <ion-icon slot="icon-only" name="home"></ion-icon>
            </ion-button>
          <!-- </ion-menu-toggle> -->
        </ion-buttons>
        <ion-title>Chess Tournaments</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-searchbar
        :value="searchInput"
        @ionInput="searchInput = $event.target.value;"
        @ionChange="searchInput= $event.target.value;"
      ></ion-searchbar>

      <router-link :to="{ name: 'Tournament', params: { tournament: 117 }}"  style="text-decoration: none;">
        <ion-card style="max-width:600px;">
           <ion-img   src="/images/chess-board-thin.jpg"></ion-img>
          <!-- <ion-img src="./images/icons/chess_rook_white.png"></ion-img> -->
          <!-- <ion-img src="./images/chess-board.jpg"></ion-img> -->
          <ion-card-header>
            <ion-card-title>Brookwood and Minter Bridge</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>Jan 26th Chess Tournament at Witch hazel led by Brookwood and Minter Bridge</p>
          </ion-card-content>
        </ion-card>
      </router-link>

      <router-link :to="{ name: 'Tournament', params: { tournament: 120 }}" style="text-decoration: none;">
        <ion-card style="max-width:600px;">
           <ion-img src="/images/chess-board-colored-thin.jpg"></ion-img>
          <!-- <ion-img src="./images/icons/chess_rook_white.png"></ion-img> -->
          <!-- <ion-img src="./images/chess-board.jpg"></ion-img> -->
          <ion-card-header>
            <ion-card-title>Girls Tournament @ Brookwood</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>Chess Tournament for girls at Brookwood sponsored by Chess for Success. March 23rd </p>
          </ion-card-content>
        </ion-card>
      </router-link>
      <!-- <ion-list>
        <template v-for="tournament of tournaments">
          <router-link
            :key="tournament.id"
            :to="{ name: 'Tournament', params: { tournament: tournamentId }}"
          >
            <ion-card>
               <ion-img src="./images/chess-board-thin.jpg"></ion-img>
              <ion-card-header>
                <ion-card-title>{{tournament.name}}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <p>{{tournament.details}}</p>
              </ion-card-content>
            </ion-card>
          </router-link>
        </template>
      </ion-list> -->
    </ion-content>
  </div>
</template>

<script>
// @ is an alias to /src
import fetch from "@/fetch.js";

export default {
  name: "home",
  components: {},
  data() {
    return {
      tournaments: [],
      searchInput: "",
      errors: []
    };
  },
  methods: {
    loadData() {
      fetch
        .get(`tournament`)
        .then(response => {
          this.tournaments = response.data;
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
