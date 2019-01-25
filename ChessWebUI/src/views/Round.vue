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
        <ion-title>Round {{roundId}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-searchbar
        :value="searchInput"
        @ionInput="searchInput = $event.target.value;"
        @ionChange="searchInput= $event.target.value;"
      ></ion-searchbar>
      <ion-item>
        <ion-label>Hide Completed Games</ion-label>
        <ion-toggle
          :checked="hideCompletedGames"
          @ionInput="hideCompletedGames = $event.target.checked;"
          @ionChange="hideCompletedGames= $event.target.checked;"
        ></ion-toggle>
      </ion-item>

      <ion-list>
        <template v-for="table of filteredItems">
          <!-- <ion-list   :key="table.id"> -->
          <ion-item :key="table.id" color="primary">
            <ion-label>Table {{table.id}}</ion-label>
            <ion-button slot="end" color="light" v-on:click="openTable(table.id)">Record Results</ion-button>
          </ion-item>
          <ion-item
            detail="true"
            v-for="position of table.positions"
            :key="position.id"
            v-on:click="openPlayer(position.playerId)"
          >
            <ion-icon
              v-if="position.color=='Black'"
              src="/images/chess_pawn_black.svg"
              slot="start"
            ></ion-icon>
            <ion-icon
              v-else-if="position.color=='White'"
              src="/images/chess_pawn_white.svg"
              slot="start"
            ></ion-icon>
            <ion-icon v-else name="contact" slot="start"></ion-icon>
            <ion-label>{{position.playerFirstName}} {{position.playerLastName}}</ion-label>
            <ion-badge slot="end" color="light">{{position.points}}</ion-badge>
          </ion-item>
          <!-- </ion-list> -->
        </template>
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
    var roundId = this.$route.params.id;
    var tournamentId = this.$route.params.tournament;
    //todo: save app wide settings
    var hideCompletedGames = localStorage.getItem("hideCompletedGames");
    if (hideCompletedGames == null) hideCompletedGames = false;
    else hideCompletedGames = JSON.parse(hideCompletedGames);

    return {
      tournamentId: tournamentId,
      roundId: roundId,
      hideCompletedGames: hideCompletedGames,
      searchInput: "",
      round: [],
      errors: []
    };
  },
  methods: {
    openTable(id) {
      this.$router.push({ name: "table", params: { id: id } });
    },
    openPlayer(id) {
      this.$router.push({ name: "player", params: { id: id } });
    },
    clearData() {
      this.players = [];
    },
    loadData() {
      var tournamentId = this.tournamentId;
      var roundId = this.roundId;
      fetch
        .get(`round/${roundId}?tournament=${tournamentId}`)
        .then(response => {
          this.round = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  computed: {
    filteredItems() {
      localStorage.setItem("hideCompletedGames", this.hideCompletedGames);
      let filteredRound = this.round;
      let hideCompletedGames = this.hideCompletedGames;
      let searchInput = this.searchInput;

      if (hideCompletedGames) {
        filteredRound = filteredRound.filter(t => {
          let totalPoints = t.positions.reduce(p => p.score || 0);
          return totalPoints > 0;
        });
      }
      if (searchInput) {
        searchInput = searchInput.toLowerCase();
        filteredRound = filteredRound.filter(t => {
          let anyMatched = t.positions.find(p => {
            if (p.table && p.table == searchInput) return true;
            if (
              p.table &&
              typeof p.table === "string" &&
              p.table.startsWith(searchInput)
            )
              return true;
            if (
              p.playerFirstName &&
              p.playerFirstName.toLowerCase().startsWith(searchInput)
            )
              return true;
            if (
              p.playerLastName &&
              p.playerLastName.toLowerCase().startsWith(searchInput)
            )
              return true;
            if (p.school && p.school.toLowerCase().startsWith(searchInput))
              return true;
            return false;
          });
          return anyMatched;
        });
      }
      return filteredRound;
      //  return this.items.filter(item => {
      //     return item.type.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      //  })
    }
  },
  created() {
    this.loadData();
  }
};
</script>
