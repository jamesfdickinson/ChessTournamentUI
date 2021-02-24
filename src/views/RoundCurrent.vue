<template>
  <layout-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon
            name="arrow-round-back"
            size="large"
            @click="
              $router.push({
                name: 'Rounds',
                params: { tournament: tournamentId },
              })
            "
          ></ion-icon>
        </ion-buttons>
        <ion-title>Round {{ roundId }}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="details()">
            <ion-icon name="paper" size="large"></ion-icon>
          </ion-button>
          <ion-button @click="edit()">
            <ion-icon name="create" size=""></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-searchbar
        placeholder="Table #, First, or Last Name"
        :value="searchInput"
        @ionInput="searchInput = $event.target.value"
        @ionChange="searchInput = $event.target.value"
      ></ion-searchbar>
      <ion-item>
        <ion-label>Hide Completed Games</ion-label>
        <ion-toggle
          :checked="hideCompletedGames"
          @ionInput="hideCompletedGames = $event.target.checked"
          @ionChange="hideCompletedGames = $event.target.checked"
        ></ion-toggle>
      </ion-item>

      <ion-list>
        <template v-for="table of filteredItems">
          <div :key="table.id">
            <ion-item color="primary">
              <!-- <ion-label slot="start">Table {{table.id}}</ion-label> -->

              <ion-label slot="start">Room {{ table.id }}</ion-label>

              <ion-button
                v-if="table.positions.some((p) => p.email == user.email)"
                slot="end"
                color="light"
                fill="outline"
                @click="openGame(table.id)"
                target="_blank"
                >Join</ion-button
              >
              <ion-button
                v-else
                slot="end"
                color="light"
                fill="outline"
                @click="watchGame(table.id)"
                target="_blank"
                >Watch</ion-button
              >

              <ion-buttons slot="end">
                <ion-button v-on:click="openTable(table.id)">
                  <ion-icon name="create"></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-item>
            <ion-item
              detail="true"
              v-for="position of table.positions"
              :key="position.id"
              v-on:click="openPlayer(position.playerId)"
            >
              <ion-icon
                name="radio-button-on"
                slot="start"
                :color="[
                  isInRoom(position.email, position.room) ? 'success' : 'light',
                ]"
              ></ion-icon>
              <TeamIcon
                :title="position.firstName"
                style="margin-right: 10px"
              ></TeamIcon>

              <ion-label
                >{{ position.firstName }} {{ position.lastName }}</ion-label
              >
              <ion-badge slot="end" color="light">{{
                position.points
              }}</ion-badge>
            </ion-item>
          </div>
        </template>
      </ion-list>
    </ion-content>
    <!-- </ion-page> -->
  </layout-menu>
</template>

<script>
import TournamentAPI from "@/services/TournamentAPI";
import TeamIcon from "@/components/TeamIcon.vue";
import Authentication from "@/services/Authentication";
import EventBus from "@/services/EventBus.js";
//import TournamentSocket from "@/services/TournamentSocket.js";
const tournamentAPI = new TournamentAPI();
const authentication = new Authentication();
//const tournamentSocket = new TournamentSocket();
export default {
  name: "home",
  components: { TeamIcon },
  data() {
    var roundId = this.$route.params.id;
    var tournamentId = this.$route.params.tournament;
    let user = authentication.getUser();
    //todo: save app wide settings
    var hideCompletedGames = localStorage.getItem("hideCompletedGames");
    if (hideCompletedGames == null) hideCompletedGames = false;
    else hideCompletedGames = JSON.parse(hideCompletedGames);

    return {
      tournamentId: tournamentId,
      roundId: roundId,
      user: user,
      hideCompletedGames: hideCompletedGames,
      searchInput: "",
      round: [],
      errors: [],
    };
  },
  methods: {
    stringToColour(str) {
      var hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      var colour = "#";
      for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xff;
        value = Math.floor(value * 0.7); //make darker
        colour += ("00" + value.toString(16)).substr(-2);
      }
      return colour;
    },
    details() {
      let roundId = this.roundId;
      let tournamentId = this.tournamentId;
      this.$router.push({
        name: "RoundDetails",
        params: { id: roundId, tournament: tournamentId },
      });
    },
    edit() {
      let roundId = this.roundId;
      let tournamentId = this.tournamentId;
      this.$router.push({
        name: "RoundEditRaw",
        params: { id: roundId, tournament: tournamentId },
      });
    },
    openGame(id) {
      this.$router.push({
        name: "PlayGame",
        params: { id: id },
      });
    },
    watchGame(id) {
      this.$router.push({
        name: "PlayGame",
        params: { id: id, spectate: true },
      });
    },
    openTable(id) {
      let roundId = this.roundId;
      let tournamentId = this.tournamentId;
      this.$router.push({
        name: "TableEdit",
        params: { id: id, round: roundId, tournament: tournamentId },
      });
    },
    openPlayer(id) {
      this.$router.push({ name: "Player", params: { id: id } });
    },
    clearData() {
      this.players = [];
    },
    isInRoom(email, room) {
      let players = this.tournament.players || [];
      let isInRoom = players.some(
        (p) =>
          p.email == email && p.location != null && p.location.endsWith(room)
      );
      return isInRoom;
    },
    getUsersInRoom(room) {
      let tournament = this.tournament;
      let players = tournament.players || [];
      let playersInRoom = players
        .filter((p) => p.location == room)
        .map((p) => p.firstName);
      let playersInRoomString = playersInRoom.join(",");
      return playersInRoomString;
    },
    loadData() {
      var tournamentId = this.tournamentId;
      tournamentAPI.tournamentView(tournamentId).then((data) => {
        this.populate(data);
      });
    },
    groupBy(xs, key) {
      return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    },
    populate(data) {
      let tournament = data || {};
      let players = tournament.players || [];
      this.tournament = data;
      this.roundId = tournament.roundId;
      //let rooms = this.groupBy(players, "room");
      //this.round = rooms;
      let playerWithTables = players.filter((p) => p.room != null);
      var group_to_values = playerWithTables.reduce(function (obj, item) {
        obj[item.room] = obj[item.room] || [];
        obj[item.room].push(item);
        return obj;
      }, {});
      var groups = Object.keys(group_to_values).map(function (key) {
        return { id: key, positions: group_to_values[key] };
      });
      this.round = groups;
    },
    onUpdate(data) {
      this.populate(data);
    },
  },
  computed: {
    filteredItems() {
      if (this.hideCompletedGames != null)
        localStorage.setItem("hideCompletedGames", this.hideCompletedGames);
      let filteredRound = this.round;
      let hideCompletedGames = this.hideCompletedGames;
      let searchInput = this.searchInput;

      if (hideCompletedGames) {
        filteredRound = filteredRound.filter((t) => {
          let totalPoints = t.positions.reduce(
            (a, p) => a + (p.points || 0),
            0
          );
          return totalPoints == 0;
        });
      }
      if (searchInput) {
        searchInput = searchInput.toLowerCase();
        filteredRound = filteredRound.filter((t) => {
          let anyMatched = t.positions.find((p) => {
            if (p.room && p.room == searchInput) return true;
            if (
              p.room &&
              typeof p.room === "string" &&
              p.room.startsWith(searchInput)
            )
              return true;
            if (
              p.firstName &&
              p.firstName.toLowerCase().startsWith(searchInput)
            )
              return true;
            if (p.lastName && p.lastName.toLowerCase().startsWith(searchInput))
              return true;
            if (p.team && p.team.toLowerCase().startsWith(searchInput))
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
    },
  },
  mounted() {
    this.loadData();
    //tournamentSocket.onUpdate = this.onUpdate.bind(this);
    //tournamentSocket.connect(this.tournamentId);
    EventBus.$on("updated", this.onUpdate);
  },
  created() {},
  beforeDestroy() {
    //tournamentSocket.close();
    EventBus.$off("updated", this.onUpdate);
  },
};
</script>
