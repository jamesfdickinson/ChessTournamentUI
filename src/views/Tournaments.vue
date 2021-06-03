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
          <ion-title>Tournaments</ion-title>
          <ion-buttons slot="end">
            <ion-button v-on:click="userDetails()">
              <ion-icon name="contact"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-searchbar
          :value="searchInput"
          @ionInput="searchInput = $event.target.value"
          @ionChange="searchInput = $event.target.value"
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
          <template v-for="tournament of filteredItemsFuture">
            <ion-item
              :key="tournament.id"
              button
              detail="true"
              v-on:click="tournamentDetails(tournament.id)"
            >
              <ion-thumbnail slot="start">
                <img
                  v-if="!tournament.image"
                  src="images/chess-board-thin.jpg"
                />
                <img v-if="tournament.image" :src="tournament.image" />
              </ion-thumbnail>
              <ion-label>
                <h2>{{ tournament.name }}</h2>
                <p>
                  {{ getLocalDate(tournament.startDateTime) }}
                </p>
              </ion-label>
              <ion-badge slot="end">
                {{ tournament.state }}
              </ion-badge>
              <!--                 
                <ion-button slot="end" color="light" :href="tournament.id" >View </ion-button> -->
            </ion-item>
          </template>
          <ion-item>
            <ion-label> Completed </ion-label>
          </ion-item>
          <template v-for="tournament of filteredItemsCompleted">
            <ion-item
              style="opacity: 0.5"
              :key="tournament.id"
              button
              detail="true"
              v-on:click="tournamentDetails(tournament.id)"
            >
              <ion-thumbnail slot="start">
                <img
                  v-if="!tournament.image"
                  src="images/chess-board-thin.jpg"
                />
                <img v-if="tournament.image" :src="tournament.image" />
              </ion-thumbnail>
              <ion-label>
                <h2>{{ tournament.name }}</h2>
                <p>
                  {{ getLocalDate(tournament.startDateTime) }}
                </p>
              </ion-label>
              <ion-badge slot="end">
                {{ tournament.state }}
              </ion-badge>
              <!--                 
                <ion-button slot="end" color="light" :href="tournament.id" >View </ion-button> -->
            </ion-item>
          </template>
          <ion-item>
            <ion-button expand="block" v-on:click="createTournament()"
              >Create Tournament</ion-button
            >
          </ion-item>
        
          
        </ion-list>
        <!-- <router-link
              :key="tournament.id"
              :to="{
                name: 'Tournament',
                params: { tournament: tournament.id },
              }"
              style="text-decoration: none"
            >
            </router-link> -->
      </ion-content>
    </div>
  </layout-no-menu>
</template>

<script>
// @ is an alias to /src
import fetch from "@/services/fetch";
export default {
  name: "home",
  data() {
    const dateFilter = ((d) => new Date(d.setDate(d.getDate() - 1)))(
      new Date()
    );
    const dateFilterMax = ((d) => new Date(d.setDate(d.getDate() - 30)))(
      new Date()
    );
    return {
      tournaments: [],
      searchInput: "",
      dateFilter: dateFilter,
      dateFilterMax: dateFilterMax,
      errors: [],
    };
  },
  methods: {
    userDetails() {
      this.$router.push({ name: "User" });
    },
    getLocalDate(date) {
      if (!date) return null;
      let localDate = new Date(date);
      if (!localDate) return null;
      let options = { dateStyle: "medium", timeStyle: "short" };
      return localDate.toLocaleString(undefined, options);
    },
    getStatus(state) {
      if (state == "setup") return "open";
      if (state == "registration") return "open";
      if (state == "check-in") return "open";
      if (state == "play") return "open";
      if (state == "end") return "open";
      return state;
    },
    tournamentDetails(tournamentId) {
      this.$router.push({
        name: "Tournament",
        params: { tournament: tournamentId },
      });
    },
    createTournament() {
      this.$router.push({
        name: "TournamentCreate",
        params: {},
      });
    },
    loadData() {
      fetch
        .get(`tournament/type/Cribbage`)
        .then((response) => {
          this.tournaments = response.data;
          if (this.tournaments) {
            this.tournaments.sort((a, b) => {
              return new Date(a.startDateTime) - new Date(b.startDateTime);
            });
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  created() {
    this.loadData();
  },
  computed: {
    filteredItemsFuture() {
      let filteredData = this.tournaments;
      let searchInput = this.searchInput;
      let dateFilter = this.dateFilter;
      if (dateFilter) {
        filteredData = filteredData.filter(
          (a) => new Date(a.startDateTime) > dateFilter
        );
      }
      filteredData.sort((a, b) => {
        return new Date(a.startDateTime) - new Date(b.startDateTime);
      });
      if (searchInput) {
        searchInput = searchInput.toLowerCase();
        filteredData = filteredData.filter((p) => {
          if (p.name && p.name.toLowerCase().startsWith(searchInput))
            return true;
          if (p.details && p.details.toLowerCase().startsWith(searchInput))
            return true;
          if (p.teams && p.teams.toLowerCase().startsWith(searchInput))
            return true;

          return false;
        });
      }
      return filteredData;
    },
    filteredItemsCompleted() {
      let filteredData = this.tournaments;
      let searchInput = this.searchInput;
      let dateFilter = this.dateFilter;
      let dateFilterMax = this.dateFilterMax;
      if (dateFilter) {
        filteredData = filteredData.filter(
          (a) =>
            new Date(a.startDateTime) < dateFilter &&
            new Date(a.startDateTime) > dateFilterMax
        );
      }
      filteredData.sort((a, b) => {
        return new Date(b.startDateTime) - new Date(a.startDateTime);
      });
      if (searchInput) {
        searchInput = searchInput.toLowerCase();
        filteredData = filteredData.filter((p) => {
          if (p.name && p.name.toLowerCase().startsWith(searchInput))
            return true;
          if (p.details && p.details.toLowerCase().startsWith(searchInput))
            return true;
          if (p.teams && p.teams.toLowerCase().startsWith(searchInput))
            return true;

          return false;
        });
      }
      return filteredData;
    },
  },
};
</script>
