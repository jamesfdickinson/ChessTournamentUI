<template>
  <layout-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.push({ name: 'Rounds', params: { tournament:tournamentId } })"></ion-icon>
        </ion-buttons>
        <ion-title>Round {{roundId}}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="details()">
            <ion-icon name="paper" size="large"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-searchbar
        placeholder="Table #, First, or Last Name"
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
  </layout-menu>
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
    details() {
      let roundId = this.roundId;
      let tournamentId = this.tournamentId;
      this.$router.push({
        name: "RoundDetails",
        params: { id: roundId, tournament: tournamentId }
      });
    },
    openTable(id) {
      let roundId = this.roundId;
      let tournamentId = this.tournamentId;
      this.$router.push({
        name: "TableEdit",
        params: { id: id, round: roundId, tournament: tournamentId }
      });
    },
    openPlayer(id) {
      this.$router.push({ name: "Player", params: { id: id } });
    },
    clearData() {
      this.players = [];
    },
    loadData() {
      var tournamentId = this.tournamentId;
      var roundId = this.roundId;
      fetch
        .get(`round/Grouped/${roundId}?tournament=${tournamentId}`)
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
      if (this.hideCompletedGames != null)
        localStorage.setItem("hideCompletedGames", this.hideCompletedGames);
      let filteredRound = this.round;
      let hideCompletedGames = this.hideCompletedGames;
      let searchInput = this.searchInput;

      if (hideCompletedGames) {
        filteredRound = filteredRound.filter(t => {
          let totalPoints = t.positions.reduce(
            (a, p) => a + (p.points || 0),
            0
          );
          return totalPoints == 0;
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
