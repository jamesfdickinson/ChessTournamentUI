<template>
  <layout-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon
            name="arrow-round-back"
            size="large"
            @click="$router.go(-1)"
          ></ion-icon>
        </ion-buttons>
        <ion-title>Table</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <!-- <ion-card> -->
      <ion-list>
        <!-- <ion-item>
          <ion-label>Table</ion-label>
          <ion-label slot="end">{{table.id}}</ion-label>
        </ion-item>-->
        <ion-item>
          <ion-label>Room</ion-label>
          <ion-label slot="end">{{ table.id }}</ion-label>
          <ion-button
            slot="end"
            color="light"
            :href="getRoomLink(table.id)"
            target="_blank"
            >Join</ion-button
          >
        </ion-item>
      </ion-list>
      <ion-list>
        <ion-list-header>
          <h3>Verify the winner</h3>
        </ion-list-header>
        <ion-radio-group
          :value="winner"
          @ionChange="selectWinner($event.target.value)"
        >
          <template v-for="position of table.positions">
            <ion-item :key="position.id">
              <ion-radio slot="start" :value="position.playerId"></ion-radio>
              <ion-icon
                v-if="position.color == 'Black'"
                src="/images/chess_pawn_black.svg"
                slot
              ></ion-icon>
              <ion-icon
                v-else-if="position.color == 'White'"
                src="/images/chess_pawn_white.svg"
                slot
              ></ion-icon>
              <ion-label
                >{{ position.playerFirstName }}
                {{ position.playerLastName }}</ion-label
              >
            </ion-item>
          </template>
          <ion-item>
            <ion-radio slot="start" value="tie"></ion-radio>
            <ion-label>Tie</ion-label>
          </ion-item>
        </ion-radio-group>
      </ion-list>

      <ion-list>
        <ion-list-header>
          <h3>Scores</h3>
        </ion-list-header>
        <template v-for="position of table.positions">
          <ion-item :key="position.id">
            <ion-label slot
              >{{ position.playerFirstName }}
              {{ position.playerLastName }}</ion-label
            >
            <ion-input
              slot="end"
              type="number"
              :value="position.points"
              @input="position.points = parseInt($event.target.value) || 0"
            ></ion-input>
          </ion-item>
        </template>
      </ion-list>

      <ion-list>
        <ion-button expand="block" v-on:click="save()">Save</ion-button>
      </ion-list>
    </ion-content>
    <!-- </ion-page> -->
    <!-- v-on:click="reportWin(position.playerId)" -->
  </layout-menu>
</template>

<script>
import TournamentAPI from "@/services/TournamentAPI";
import Authentication from "@/services/Authentication";
import Authorization from "@/services/Authorization";
const tournamentAPI = new TournamentAPI();
const authentication = new Authentication();
const authorization = new Authorization();

export default {
  name: "TableEdit",

  components: {},
  data() {
    let tournamentId = this.$route.params.tournament;
    let round = this.$route.params.round;
    let tableId = this.$route.params.id;
    //let redirect = this.$route.query.redirect;
    return {
      tournamentId: tournamentId,
      round: round,
      tableId: tableId,
      winner: "",
      table: {},
      errors: [],
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getRoomLink(room) {
      //todo: pass template in from tournament settings or position
      let linkTemplate = "https://cardgames.app/cribbage/game/?room=[room]";

      if (!linkTemplate) return "";

      let url = linkTemplate;

      url = url.replace("[room]", room);
      // url = url.replace("[tournament]", tournament);
      // url = url.replace("[round]", round);
      // url = url.replace("[table]", table);

      return url;
    },
    play(table) {
      let room = this.getRoom(table);
      let parameters = `room=${room}`;
      let urlBase = "https://cardgames.app/cribbage/game/?";
      let url = urlBase + parameters;
      window.open(url, "_blank");
      return false;
    },
    save() {
      let promises = [];
      let positions = this.table.positions;
      if (!positions) return;
      for (let i = 0; i < positions.length; i++) {
        let position = positions[i];
        let promise = tournamentAPI.matchUpdate(position);
        promises.push(promise);
      }
      Promise.all(promises)
        .then((values) => {
          console.log(values);
          this.$router.go(-1);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    selectWinner(winner) {
      let positions = this.table.positions;
      if (!positions) return;
      for (let i = 0; i < positions.length; i++) {
        let position = positions[i];
        //todo: give point to player and zero to all others
        if (winner == position.playerId) {
          position.points = 1;
        } else {
          position.points = 0;
        }
        //tie
        if (winner === "tie") {
          position.points = 0.5;
        }
      }
    },
    checkAccess(table) {
      let round = this.round;
      let tableId = this.tableId;
      let tournamentId = this.tournamentId;

      //page access based on role
      let allowAccess = this.authorizationPage();
      if (allowAccess) return true;

      //allow self report
      let allowAccessUser = this.authorizationPageUser(table);
      if (!allowAccessUser && !allowAccess) {
        let redirectUrl = `/${tournamentId}/AccessDenied?redirect=/${tournamentId}/round/${round}/TableEdit/${tableId}`;
        this.$router.replace(redirectUrl);
      }
    },
    authorizationPage() {
      let tournamentId = this.tournamentId;
      let user = authentication.getUser();
      if (!user) return false;
      let roles = user.roles || [];

      //page access based on role
      let allowAccess = authorization.isPageAllowed(
        "TableEdit",
        tournamentId,
        roles
      );

      return allowAccess;
    },
    authorizationPageUser(table) {
      let user = authentication.getUser();
      if (!user) return false;
      let userName = user.userName;

      //allow self report
      if (!table) return false;
      let positions = table.positions;
      if (!positions) return;

      for (let i = 0; i < positions.length; i++) {
        let position = positions[i];
        let playerEmail = position.playerEmail;
        if (playerEmail === userName) return true;
      }
      return false;
    },
    loadData() {
      let round = this.round;
      let tableId = this.tableId;
      let tournamentId = this.tournamentId;
      tournamentAPI
        .tableGet(tournamentId, round, tableId)
        .then((data) => {
          this.table = data;
          //this.checkAccess(this.table);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  created() {
    this.loadData();
  },
};
</script>
