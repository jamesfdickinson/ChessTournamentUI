<template>
  <layout-no-menu>
    <div class="ion-page" main>
      <!-- <ion-page class="ion-page" main> -->
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <!-- <ion-menu-toggle> -->
            <ion-button v-on:click="home()">
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
        <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
        <!-- Text summary of the tournaments type such as cribbage, chess, etc. -->
        <ion-card v-if="type == 'cribbage'">
          <ion-card-header>
            <ion-card-title>Cribbage Tournaments</ion-card-title>
            <!-- <ion-card-subtitle>Card Subtitle</ion-card-subtitle> -->
          </ion-card-header>
          <ion-card-content>
            <p>Find an Online Cribbage tournament and register to play.
              Be on the page when the tournament starts.
              Read the FAQ for the tournament rules, each tournament host may have different rules.
              <a href="https://cardsjd.com/cribbage">Cribbage JD</a> software is integrated in the tournament to play
              the matches.
            </p>
          </ion-card-content>
        </ion-card>
        <ion-card v-if="type == 'chess'">
          <ion-card-header>
            <ion-card-title>Chess Tournaments</ion-card-title>
            <!-- <ion-card-subtitle>Card Subtitle</ion-card-subtitle> -->
          </ion-card-header>
          <ion-card-content>
            <p>Find the Chess tournament and register to play. Chess tournaments are live in-person tournament.
              Read the FAQ for the tournament rules, each tournament host may have different rules.
            </p>
          </ion-card-content>
        </ion-card>
        <ion-item>
          <ion-label position="fixed">Name</ion-label>
          <ion-searchbar :value="searchInput" @ionInput="searchInput = $event.target.value"
            @ionChange="searchInput = $event.target.value"></ion-searchbar>
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Game Type</ion-label>
          <ion-searchbar :value="type" @ionInput="type = $event.target.value"
            @ionChange="type = $event.target.value"></ion-searchbar>
        </ion-item>

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
            <ion-item :key="tournament.id" button detail="true" v-on:click="tournamentSummary(tournament.id)">
              <ion-thumbnail slot="start">
                <img v-if="!tournament.image" src="images/chess-board-thin.jpg" />
                <img v-if="tournament.image" :src="tournament.image" />
              </ion-thumbnail>
              <ion-label>
                <h2>{{ tournament.name }}</h2>
                <p>
                  {{ getLocalDate(tournament.startDateTime) }}
                </p>
                <p>Host: {{ tournament.hostName || "" }} Rounds: {{ tournament.rounds }}</p>

              </ion-label>
              <ion-badge slot="end">
                {{ tournament.state }}
              </ion-badge>
              <!--                 
                <ion-button slot="end" color="light" :href="tournament.id" >View </ion-button> -->
            </ion-item>
          </template>
          <ion-item>
            <ion-label> </ion-label>
          </ion-item>
          <ion-item>
            <ion-button expand="block" :href='"tournaments/" + type + "/end"'>View Completed Tournaments</ion-button>
            <ion-button expand="block" v-on:click="createTournament()">Create Tournament</ion-button>
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
import TournamentAPI from "@/services/TournamentAPI";
import Authentication from "@/services/Authentication";
const tournamentAPI = new TournamentAPI();
const authentication = new Authentication();
export default {
  name: "home",
  metaInfo() {
    let type = this.$route.params.type || "all";
    if (type == "cribbage") type = "Cribbage";
    if (type == "chess") type = "Chess";
    if (type == "ginrummy") type = "Gin Rummy";
    if (type == "spades") type = "Spades";

    const title = `Online ${type} Tournament List`;
    return {
      title: title,
      meta: [
        {
          name: 'description', content: title
        }
      ]
    }
  },
  data() {
    let type = this.$route.params.type || "all";
    let searchInput = this.$route.params.searchQuery || "";
    let stateFilter = this.$route.params.stateFilter || "";
    const dateFilter = ((d) => new Date(d.setDate(d.getDate() - 1)))(
      new Date()
    );
    const dateFilterMax = ((d) => new Date(d.setDate(d.getDate() - 60)))(
      new Date()
    );
    return {
      type: type,
      tournaments: [],
      searchInput: searchInput,
      dateFilter: dateFilter,
      dateFilterMax: dateFilterMax,
      stateFilter: stateFilter,
      errors: [],
    };
  },
  methods: {
    home() {
      this.$router.push({ name: "Home" });
    },
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
    tournamentSummary(tournamentId) {
      this.$router.push({
        name: "TournamentOverview",
        params: { tournament: tournamentId },
      });
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
    refresh(event) {
      this.loadData().then(() => {
        event.target.complete();
      });
    },
    async loadData() {
      //const type = this.type;
      const type = "all";

      try {
        const tournaments = await tournamentAPI.tournaments(type);
        this.tournaments = tournaments;
        if (this.tournaments) {
          this.tournaments.sort((a, b) => {
            return new Date(a.startDateTime) - new Date(b.startDateTime);
          });
        }
      } catch (e) {
        this.errors.push(e);
      }
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
      let typeFilter = this.type;
      let stateFilter = this.stateFilter;
      let dateFilterMax = this.dateFilterMax;
      let userNameFilter =  authentication.getUser()?.userName;
      let sortOrder = "asc";
      if (stateFilter !== "end") {
        filteredData = filteredData.filter(
          (a) => new Date(a.startDateTime) > dateFilter && a.state != "end"
        );
      }
      if (stateFilter === "end") {
        filteredData = filteredData.filter(
          (a) =>
            (new Date(a.startDateTime) < dateFilter && new Date(a.startDateTime) > dateFilterMax)
            ||
            (new Date(a.startDateTime) > dateFilterMax && a.state == "end")
        );
        sortOrder = "desc";
      }

      if (typeFilter && typeFilter != "all") {
        typeFilter = typeFilter.toLowerCase();
        filteredData = filteredData.filter((a) => a.type.toLowerCase().startsWith(typeFilter));
      }
      console.log("userNameFilter", userNameFilter);
      if (userNameFilter) {
        userNameFilter = userNameFilter.toLowerCase();
        filteredData = filteredData.filter((a) => {
          if(!a.bannedUsers) return true;
          if(!a.bannedUsers.toLowerCase().includes(userNameFilter)) return true;
          return false;
        });
      }
      if (sortOrder == "desc") {
        filteredData.sort((a, b) => {
          return new Date(b.startDateTime) - new Date(a.startDateTime);
        });
      }
      if (sortOrder == "asc") {
        filteredData.sort((a, b) => {
          return new Date(a.startDateTime) - new Date(b.startDateTime);
        });
      }

      if (searchInput) {
        searchInput = searchInput.toLowerCase();
        filteredData = filteredData.filter((p) => {
          if (p.name && p.name.toLowerCase().includes(searchInput))
            return true;
          if (p.details && p.details.toLowerCase().startsWith(searchInput))
            return true;
          if (p.teams && p.teams.toLowerCase().startsWith(searchInput))
            return true;
          if (p.type && p.type.toLowerCase().startsWith(searchInput))
            return true;
          if (p.hostName && p.hostName.toLowerCase().startsWith(searchInput))
            return true;

          return false;
        });
      }
      return filteredData;
    }
  },
};
</script>
