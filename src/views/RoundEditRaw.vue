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
      <h2>Round {{ roundId }}</h2>
      <table>
        <tr>
          <th>Name</th>
          <th>Table</th>
          <th>Room</th>
          <th>Points</th>
          <th></th>
        </tr>

        <template v-for="match of round">
          <tr :key="match.id">
            <!-- <td>
              <input
                type="text"
                size="5"
                v-model="match.playerId"
                @input="match.playerId = parseInt($event.target.value) || 0"
              />
            </td> -->
            <td>
              <select v-model="match.playerId"  style="max-width:150px;">
                <option disabled value="">Select One</option>
                <option value="-1">Bye</option>
                <template v-for="player in players">
                  <option :key="player.playerId" :value="player.playerId">
                    {{ `${player.firstName} ${player.lastName}` }}
                  </option>
                </template>
              </select>
            </td>
            <td>
              <input
                type="text"
                size="1"
                :value="match.table"
                @input="match.table = parseInt($event.target.value) || 0"
              />
            </td>
            <td>
              <input type="text"  size="4" v-model="match.room" />
            </td>
            <td>
              <input
                type="text"
                size="1"
                :value="match.points"
                @input="match.points = parseInt($event.target.value) || 0"
              />
            </td>
            <td>
              <input type="button" @click="save(match)" value="save" />
          </td>  <td>   <input type="button" @click="deleteMatch(match)" value="delete" />
            </td>
          </tr>
        </template>
        <tr>
          <td>
            <select v-model="match.playerId" style="max-width:150px;">
              <option disabled value="">Select One</option>
              <option value="-1">Bye</option>
              <template v-for="player in players">
                <option :key="player.playerId" :value="player.playerId">
                  {{ `${player.firstName} ${player.lastName}` }}
                </option>
              </template>
            </select>
          </td>
          <td>
            <input
              type="text"
              size="1"
              :value="match.table"
              @input="match.table = parseInt($event.target.value) || 0"
            />
          </td>
          <td>
            <input type="text"  size="4" v-model="match.room" />
          </td>
          <td>
            <input
              type="text"
              size="1"
              :value="match.points"
              @input="match.points = parseInt($event.target.value) || 0"
            />
          </td>
          <td>
            <input type="button" @click="create(match)" value="create" />
          </td>
        </tr>
      </table>

      <ul style="color: red">
        <li v-for="error in errors" v-bind:key="error">*{{ error }}</li>
      </ul>
      <ul style="color: green">
        <li v-for="message in messages" v-bind:key="message">*{{ message }}</li>
      </ul>

      <ion-list>
        <ion-list-header> <ion-label>Create</ion-label></ion-list-header>
        <ion-item>
          <ion-label>Name</ion-label>
          <select v-model="match.playerId">
            <option disabled value="">Select One</option>
            <option value="-1">Bye</option>
            <template v-for="player in players">
              <option :key="player.playerId" :value="player.playerId">
                {{ `${player.firstName} ${player.lastName}` }}
              </option>
            </template>
          </select>
        </ion-item>
        <ion-item>
          <ion-label>Table</ion-label>
          <input
            type="text"
            size="1"
            :value="match.table"
            @input="match.table = parseInt($event.target.value) || 0"
          />
        </ion-item>
        <ion-item>
          <ion-label>Room</ion-label>
          <input type="text" v-model="match.room" />
        </ion-item>
        <ion-item>
          <ion-label>Points</ion-label>

          <input
            type="text"
            size="1"
            :value="match.points"
            @input="match.points = parseInt($event.target.value) || 0"
          />
        </ion-item>
        <ion-item>
          <ion-label></ion-label>
          <input type="button" @click="create(match)" value="create" />
        </ion-item>
      </ion-list>

      <!-- <ion-list>
        <ion-button expand="block" v-on:click="save()">Save</ion-button>
      </ion-list> -->
    </ion-content>
    <!-- </ion-page> -->
    <!-- v-on:click="reportWin(position.playerId)" -->
  </layout-menu>
</template>

<script>
import TournamentAPI from "@/services/TournamentAPI";
const tournamentAPI = new TournamentAPI();

export default {
  name: "TableEdit",

  components: {},
  data() {
    let tournamentId = parseInt(this.$route.params.tournament);
    let roundId = parseInt(this.$route.params.id);
    //let redirect = this.$route.query.redirect;
    return {
      tournamentId: tournamentId,
      roundId: roundId,
      round: {},
      players: [],
      match: {
        tournamentId: tournamentId,
        round: roundId,
      },
      errors: [],
      messages: [],
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    save(match) {
      this.errors = [];
      this.messages = [];
      tournamentAPI
        .matchUpdate(match)
        .then(() => {
          this.messages.push("Saved");
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    deleteMatch(match) {
      this.errors = [];
      this.messages = [];
      tournamentAPI
        .matchDelete(match.id)
        .then(() => {
          this.messages.push("Deleted");
          this.loadData();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    create(match) {
      this.errors = [];
      this.messages = [];
      let tournamentId = this.tournamentId;
      let roundId = this.roundId;
      tournamentAPI
        .matchesSave(tournamentId, [match])
        .then(() => {
          this.messages.push("Created");
          this.loadData();
          //reset create row
          this.match = {
            tournamentId: tournamentId,
            round: roundId,
          };
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    loadData() {
      let roundId = this.roundId;
      let tournamentId = this.tournamentId;
      tournamentAPI
        .roundRaw(tournamentId, roundId)
        .then((data) => {
          this.round = data;
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
  },
  created() {
    this.loadData();
  },
};
</script>
