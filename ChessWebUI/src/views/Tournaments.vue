<template>
  <layout-no-menu>
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

        <!-- <router-link
          :to="{ name: 'Tournament', params: { tournament: 120 }}"
          style="text-decoration: none;"
        >
          <ion-card style="max-width:600px;">
            <ion-img src="/images/chess-board-thin.jpg"></ion-img>
            <ion-card-header>
              <ion-card-title>Brookwood and Minter Bridge</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>Jan 26th Chess Tournament at Witch hazel led by Brookwood and Minter Bridge</p>
            </ion-card-content>
          </ion-card>
        </router-link>

        <router-link
          :to="{ name: 'Tournament', params: { tournament: 121 }}"
          style="text-decoration: none;"
        >
          <ion-card style="max-width:600px;">
            <ion-img src="/images/chess-board-colored-thin.jpg"></ion-img>
            <ion-card-header>
              <ion-card-title>Girls Tournament @ Brookwood</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>Chess Tournament for girls at Brookwood sponsored by Chess for Success. March 23rd</p>
            </ion-card-content>
          </ion-card>
        </router-link>-->
        <ion-list>
          <template v-for="tournament of filteredItems">
            <router-link
              :key="tournament.id"
              :to="{ name: 'Tournament', params: { tournament: tournament.id }}"
              style="text-decoration: none;"
            >
              <ion-card style="max-width:600px;">
                <ion-img v-if="!tournament.image" src="/images/chess-board-thin.jpg"></ion-img>
                <ion-img v-if="tournament.image" :src="tournament.image"></ion-img>
                <ion-card-header>
                  <ion-card-title>{{tournament.name}}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <p>{{tournament.details}}</p>
                </ion-card-content>
              </ion-card>
            </router-link>
          </template>
        </ion-list>
      </ion-content>
    </div>
  </layout-no-menu>
</template>

<script>
// @ is an alias to /src
import fetch from "@/fetch.js";

export default {
  name: "home",
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
          if (this.tournaments) this.tournaments.sort((a, b) => b.id - a.id);
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  created() {
    this.loadData();
  },
  computed: {
    filteredItems() {
      let filteredData = this.tournaments;
      let searchInput = this.searchInput;
      if (searchInput) {
        searchInput = searchInput.toLowerCase();
        filteredData = filteredData.filter(p => {
          if (p.name && p.name.toLowerCase().startsWith(searchInput))
            return true;
          if (p.details && p.details.toLowerCase().startsWith(searchInput))
            return true;
          if (p.schools && p.schools.toLowerCase().startsWith(searchInput))
            return true;
          return false;
        });
      }
      return filteredData;
    }
  }
};
</script>
