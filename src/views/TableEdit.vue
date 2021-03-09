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
          <ion-label slot="end">{{tableId}}</ion-label>
        </ion-item>-->
        <ion-item>
          <ion-label>Id</ion-label>
          <ion-label slot="end">{{ tableId }}</ion-label>
          <ion-button
            slot="end"
            color="light"
            v-on:click="watchGame(tableId)"
            target="_blank"
            >Watch</ion-button
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
          <template v-for="position of positions">
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
                {{ position.playerLastName }}
              </ion-label>
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
          <h3>Players</h3>
        </ion-list-header>
        <template v-for="position of positions">
          <ion-item :key="position.id">
            <ion-label slot
              >{{ position.playerFirstName }}
              {{ position.playerLastName }}
            </ion-label>
            <ion-input
              slot="end"
              type="number"
              :value="position.points"
              @input="position.points = parseInt($event.target.value) || 0"
            ></ion-input>
            <ion-input
              slot="end"
              type="number"
              :value="position.tieBreaker"
              @input="position.tieBreaker = parseInt($event.target.value) || 0"
            ></ion-input>
            <ion-icon
              name="trash"
              slot="end"
              v-on:click="
                deletePosition(position);
                $event.stopPropagation();
              "
            ></ion-icon>
          </ion-item>
        </template>
        <ion-item
          >
          <ion-label>
            <select v-model="positionNew.playerId">
              <option disabled value="">Select One</option>
              <option value="-1">Bye</option>
              <template v-for="player in players">
                <option :key="player.playerId" :value="player.playerId">
                  {{ `${player.firstName} ${player.lastName}` }}
                </option>
              </template>
            </select>
          </ion-label>
          <!-- <on-label>
            <select v-model="positionNew.color">
              <option disabled value="">Select One</option>
              <option value="White">White</option>
              <option value="Black">Black</option>
            </select></on-label> -->
          <ion-button slot="end" v-on:click="createPosition(positionNew)"
            >Add</ion-button
          >
        </ion-item>
      </ion-list>
      <ion-list>
        <ion-button expand="block" v-on:click="save()">Save</ion-button>
      </ion-list>

      <ion-list> </ion-list>
    </ion-content>
    <!-- </ion-page> -->
    <!-- v-on:click="reportWin(position.playerId)" -->
  </layout-menu>
</template>

<script>
import TournamentAPI from "@/services/TournamentAPI";
//import Authentication from "@/services/Authentication";
//import Authorization from "@/services/Authorization";
const tournamentAPI = new TournamentAPI();
//const authentication = new Authentication();
//const authorization = new Authorization();

export default {
  name: "TableEdit",

  components: {},
  data() {
    let tournamentId = parseInt(this.$route.params.tournament);
    let roundId = parseInt(this.$route.params.round);
    let tableId = this.$route.params.id;
    let table = parseInt(this.$route.params.table) || 0;
    //let redirect = this.$route.query.redirect;
    return {
      tournamentId: tournamentId,
      roundId: roundId,
      tableId: tableId,
      winner: "",
      players: [],
      positions: [],
      positionNew: {
        tournamentId: tournamentId,
        round: roundId,
        room: tableId,
        table: table,
        points: 0,
      },
      errors: [],
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    watchGame(id) {
      this.$router.push({
        name: "PlayGame",
        params: { id: id, spectate: true },
      });
    },
    save() {
      let positions = this.positions;
      tournamentAPI
        .matchUpdate(positions)
        .then((data) => {
          console.log(data);
          this.$router.go(-1);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    deletePosition(position) {
      this.errors = [];
      this.messages = [];
      this.$confirm(
        `Do you want to delete player ${position.playerFirstName}?`
      ).then(() => {
        tournamentAPI
          .matchDelete(position.id)
          .then(() => {
            this.messages.push("Deleted");
            this.loadData();
          })
          .catch((e) => {
            this.errors.push(e);
          });
      });
    },
    createPosition(match) {
      this.errors = [];
      this.messages = [];
      let tournamentId = this.tournamentId;
      //let roundId = this.roundId;
      tournamentAPI
        .matchesCreate(tournamentId, [match])
        .then(() => {
          this.messages.push("Created");
          this.loadData();
          //reset create row
          this.positionNew.playerId = null;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    selectWinner(winner) {
      let positions = this.positions;
      if (!positions) return;
      for (let i = 0; i < positions.length; i++) {
        let position = positions[i];
        //todo: give point to player and zero to all others
        if (winner == position.playerId) {
          position.points = 2;
        } else {
          position.points = 0;
        }
        //tie
        if (winner === "tie") {
          position.points = 1;
        }
      }
    },
    loadData() {
      //let round = this.round;
      let tableId = this.tableId;
      let tournamentId = this.tournamentId;
      tournamentAPI
        .tableGet(tableId)
        .then((data) => {
          this.positions = data.positions || [];
          //this.checkAccess(this.table);
        })
        .catch((e) => {
          this.errors.push(e);
        });

      tournamentAPI
        .players(tournamentId)
        .then((data) => {
          this.players = data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // checkAccess(table) {
    //   let round = this.round;
    //   let tableId = this.tableId;
    //   let tournamentId = this.tournamentId;

    //   //page access based on role
    //   let allowAccess = this.authorizationPage();
    //   if (allowAccess) return true;

    //   //allow self report
    //   let allowAccessUser = this.authorizationPageUser(table);
    //   if (!allowAccessUser && !allowAccess) {
    //     let redirectUrl = `/${tournamentId}/AccessDenied?redirect=/${tournamentId}/round/${round}/TableEdit/${tableId}`;
    //     this.$router.replace(redirectUrl);
    //   }
    // },
    //authorizationPage() {
    //   let tournamentId = this.tournamentId;
    //   let user = authentication.getUser();
    //   if (!user) return false;
    //   let roles = user.roles || [];

    //   //page access based on role
    //   let allowAccess = authorization.isPageAllowed(
    //     "TableEdit",
    //     tournamentId,
    //     roles
    //   );

    //   return allowAccess;
    // },
    // authorizationPageUser(table) {
    //   let user = authentication.getUser();
    //   if (!user) return false;
    //   let userName = user.userName;

    //   //allow self report
    //   if (!table) return false;
    //   let positions = table.positions;
    //   if (!positions) return;

    //   for (let i = 0; i < positions.length; i++) {
    //     let position = positions[i];
    //     let playerEmail = position.playerEmail;
    //     if (playerEmail === userName) return true;
    //   }
    //   return false;
    // },
  },
  created() {
    this.loadData();
  },
};
</script>
