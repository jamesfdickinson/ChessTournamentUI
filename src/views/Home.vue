<template>
  <layout-no-menu>
    <ion-page class="ion-page" main>
      <!-- <ion-page class="ion-page" main> -->
      <!-- <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start"> </ion-buttons>
          <ion-img
            slot=""
            style="height: 100px"
            src="./images/trophyflat.png"
          ></ion-img>
          <ion-title>
            <h1 style="text-align: center">Bracket JD</h1>
          </ion-title>

          <ion-buttons slot="end">
             <ion-button v-on:click="userDetails()">
              <ion-icon name="contact"></ion-icon>
            </ion-button> 
          </ion-buttons>
        </ion-toolbar>
      </ion-header> -->
      <ion-content>
        <div  style="background-color:#3880ff;color:#FFFFFF;">
          <ion-img
            slot=""
            style="height: 100px"
            src="./images/trophyflat.png"
          ></ion-img>
          <ion-title>
            <h1 style="text-align: center">Bracket JD</h1>
          </ion-title>
        </div>
        <ion-list>
          <!-- <ion-item>
        
          <div style="background-color: var(--ion-background-color)">
              <h1 style="text-align: center">Bracket JD</h1>
            </div> 
          </ion-item> -->

          <ion-item>
            <!-- <ion-item>
              Play live tournaments online. Find an upcomming tournament and
              register to play. The tournaments are hosted live by the
              community. Hosts utilize a live video stream to answer questions,
              create rounds, and entertain the players.
            </ion-item> -->

            <!-- <ion-img
            style="height: 100px"
            src="./images/trophyflat.png"
          ></ion-img> -->
            <!-- <ion-card-header>
            <ion-card-title>Bracket JD</ion-card-title>
          </ion-card-header> -->
            <div>
              <p>
                Play live tournaments online. Find an upcoming tournament and
                register to play. The tournaments are hosted live by the
                community. Hosts utilize a live video stream to answer
                questions, create rounds, and entertain the players.
              </p>
              <!-- <ion-button>More Details</ion-button> -->
            </div>
          </ion-item>
          <ion-item>
            <ion-button v-on:click="login()">Login / Sign up</ion-button>
            <!-- <ion-button>Login / Sign up</ion-button> -->
            <!-- <ion-button>FAQ</ion-button> -->
          </ion-item>

          <ion-list-header>
            <ion-label>How to play</ion-label>
          </ion-list-header>
          <ion-item>
            <ol>
              <li>Click on LOGIN/SIGNUP and create an account (FREE)</li>
              <li>Select a tournament</li>
              <li>Click on Registration</li>
              <li>Be on the Tournament Page when it starts</li>
              <li>Have Fun!</li>
            </ol>
          </ion-item>
          <!-- <ion-card>

          <ion-card-content>
            <p>How to play</p>
            <ol>
              <li>Login or create an account (free)</li>
              <li>Select a tournament</li>
              <li>Click the “Sign Up” button</li>
              <li>Be on Tournament page when it starts</li>
            </ol>
          </ion-card-content>
        </ion-card> -->
          <!-- <ion-card>

          <ion-card-header>
            <ion-card-title>Format</ion-card-title>
          </ion-card-header>
          <ion-card-content>
                     <p>
              Tournament format and rules are created by the host of that
              tournament. A common tournament format that has been used using
              Bracket JD has been 5 games with 2 points for a win and 3 points
              for a skunk. Players play all games and the player with the more
              points wins. Those tournament last from 60-90 miutes.
            </p>
          </ion-card-content>
        </ion-card> -->

          <!-- <ion-card>
          <ion-card-content> -->

          <ion-list-header>
            <ion-label>Tournaments</ion-label>
          </ion-list-header>
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
            <ion-button slot="end" v-on:click="tournamentsPage()">
              More Tournaments
            </ion-button>
          </ion-item>
        </ion-list>
        <!-- </ion-card-content>
        </ion-card> -->
      </ion-content>
    </ion-page>
  </layout-no-menu>
</template>

<script>
// @ is an alias to /src
import fetch from "@/services/fetch";
export default {
  name: "home",
  components: {},
  data() {
    const dateFilter = ((d) => new Date(d.setDate(d.getDate() - 1)))(
      new Date()
    );
    return {
      tournaments: [],
      searchInput: "",
      dateFilter: dateFilter,
      errors: [],
    };
  },
  methods: {
    login() {
      this.$router.push({ name: "Login" });
    },
    userDetails() {
      this.$router.push({ name: "User" });
    },
    tournamentsPage() {
      this.$router.push({ name: "Tournaments" });
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
  },
};
</script>
