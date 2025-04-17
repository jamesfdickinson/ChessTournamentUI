<template>
  <layout-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="
            $router.push({
              name: 'Rounds',
              params: { tournament: tournamentId },
            })
            "></ion-icon>
        </ion-buttons>
        <ion-title>Round {{ roundId }}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="details()">
            <ion-icon name="paper" size="large"></ion-icon>
          </ion-button>
          <ion-button @click="edit()">
            <ion-icon name="create" size=""></ion-icon>
          </ion-button>
          <ion-button @click="createTable()">
            <ion-icon name="add-circle-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-searchbar placeholder="Table #, First, Last Name, or Team" :value="searchInput"
        @ionInput="searchInput = $event.target.value" @ionChange="searchInput = $event.target.value"></ion-searchbar>
      <ion-item>
        <ion-label>Hide Completed Games</ion-label>
        <ion-toggle :checked="hideCompletedGames" @ionInput="hideCompletedGames = $event.target.checked"
          @ionChange="hideCompletedGames = $event.target.checked"></ion-toggle>
      </ion-item>

      <ion-list>
        <template v-for="table of filteredItems">
          <div :key="table.id">
            <ion-item color="primary">
              <!-- <ion-label slot="start">Table {{table.id}}</ion-label> -->
              <!-- <ion-label slot="start">Room {{ table.id }}</ion-label> -->
              <ion-label slot="start">Table {{ table.tableNumber }}</ion-label>


              <ion-button v-if="table.positions.some((p) => p.room)" slot="end" color="light" fill="outline"
                @click="openGame(table.id, !table.positions.some((p) => p.playerEmail == user.email))" target="_blank">
                {{table.positions.some((p) => p.playerEmail == user.email) ? 'Join' : 'Watch'}}
              </ion-button>


              <!-- <ion-button slot="start" v-on:click="openTable(table.id)">
                  <ion-icon name="open"></ion-icon>
                </ion-button>
              -->
              <!-- <ion-icon slot="start" name="open"></ion-icon> -->

              <!--              
                <ion-icon slot="end" name="open"></ion-icon>
          
                <ion-icon slot="end" name="eye"></ion-icon>
              <ion-icon  slot="end" name="logo-game-controller-b"></ion-icon>-->
              <!--  -->
              <!-- <ion-buttons slot="start">
                <ion-button v-on:click="openTable(table.id)">
                <ion-icon name="add-circle-outline"></ion-icon>
                </ion-button>
              </ion-buttons>-->
              <!-- <ion-icon name="logo-game-controller-b"></ion-icon>
              <ion-icon name="open"></ion-icon>
              <ion-button v-on:click="openTable(table.id)">
                <ion-icon name="open"></ion-icon>
              </ion-button>-->

              <!-- <ion-icon name="open"></ion-icon>
              -->

              <!-- <ion-button
                slot="start"
                color="light"
                fill="outline"
                v-on:click="play(table.id);$event.stopPropagation();"
              >{{getRoomName(table.id,table.round,table.tournamentId)}}</ion-button>-->

              <!-- <ion-button slot="start" color="light" v-on:click="openTable(table.id)">🔊</ion-button> -->
              <!-- <ion-button slot="end" color="light" v-on:click="openTable(table.id)">Record</ion-button> -->

              <ion-buttons slot="end">
                <!-- <ion-button :href="getRoomLink(table.id,table.round,table.tournamentId)">
                  <ion-icon name="logo-game-controller-b"></ion-icon>
                </ion-button>-->
                <!-- <ion-button
                  :href="getRoomLink(table.id,table.round,table.tournamentId)"
                  target="_blank"
                >
                  <ion-icon name="open"></ion-icon>
                </ion-button>-->
                <ion-button v-on:click="openTable(table.id)">
                  <ion-icon name="create"></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-item>
            <ion-item detail="true" v-for="position of table.positions" :key="position.id"
              v-on:click="openPlayer(position.playerId)">
              <ion-icon name="radio-button-on" xslot="start" :color="[
                isInRoom(position.playerEmail, position.room)
                  ? 'success'
                  : 'light',
              ]"></ion-icon>

              <ion-icon v-if="position.color == 'Black'" src="/images/chess_pawn_black.svg" slot></ion-icon>
              <ion-icon v-else-if="position.color == 'White'" src="/images/chess_pawn_white.svg" slot></ion-icon>


              <ion-label>{{ position.playerFirstName }}
                {{ position.playerLastName }}</ion-label>
              <TeamIcon :title="position.playerTeam" style="margin-right: 10px"></TeamIcon>
              <ion-badge slot="end" color="light">{{
                position.points
              }}</ion-badge>
            </ion-item>
            <!-- <ion-item>
              <ion-label slot="start">Room {{getRoom(table.id)}}</ion-label>
              <ion-button slot="end" expand="block" v-on:click="play(table.id)">Join</ion-button>
            </ion-item>
            <ion-item text-center>
              <ion-label>
                <ion-button v-on:click="play(table.id)" color="light">Join: {{getRoom(table.id)}}</ion-button>
              </ion-label>
            </ion-item>-->

            <!-- <ion-item>
              <ion-grid>
                <ion-row>
                  <ion-col class="ion-text-center">
                    <ion-button
                      expand="block"
                      v-on:click="play(table.id)"
                    >Join {{getRoom(table.id)}}</ion-button>
                  </ion-col>
                  <ion-col class="ion-text-center">
                    <ion-button expand="block" color="light" v-on:click="play(table.id)">Spectate</ion-button>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-item>-->
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
      tournament: null,
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
    openGame(id, watch) {
      if (!watch) {
        this.$router.push({
          name: "PlayGame",
          params: { id: id },
        });
      }
      if (watch) {
        this.$router.push({
          name: "PlayGame",
          params: { id: id, spectate: true },
        });
      }
    },
    createTable() {
      let roundId = this.roundId;
      let tournamentId = this.tournamentId;
      //get max table number from round
      let tables = this.round.reduce((max, t) => Math.max(max, t.tableNumber), 0);



      let table = (tables || 0) + 1;
      let id = table + "R" + roundId + "T" + tournamentId;
      this.$router.push({
        name: "TableEdit",
        params: {
          id: id,
          round: roundId,
          tournament: tournamentId,
          table: table,
        }
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
      if (!this.tournament) return;
      let players = this.tournament.players || [];
      let isInRoom = players.some(
        (p) =>
          p.email == email && p.location != null && p.location.endsWith(room)
      );
      return isInRoom;
    },
    loadData() {
      var tournamentId = this.tournamentId;
      var roundId = this.roundId;
      tournamentAPI
        .roundGrouped(tournamentId, roundId)
        .then((data) => {
          this.populate(data);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    populate(data) {
      this.round = data;
      var collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: "base",
      });
      this.round.sort(function (a, b) {
        return collator.compare(a.id, b.id);
      });
    },
    onUpdate(tournament) {
      this.tournament = tournament;
      //todo: pull round data from tournament data
      this.loadData();
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
            if (p.team && p.team.toLowerCase().startsWith(searchInput))
              return true;

            if (p.playerTeam && p.playerTeam.toLowerCase().startsWith(searchInput))
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
  created() { },
  beforeDestroy() {
    //tournamentSocket.close();
    EventBus.$off("updated", this.onUpdate);
  },
};
</script>
