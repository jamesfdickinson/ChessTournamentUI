<template>
  <layout-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title>Create Round</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-list-header>
          <ion-label class="ion-text-wrap">Weights</ion-label>
        </ion-list-header>
        <!-- <ion-list-header>
          <ion-label
            class="ion-text-wrap"
          >Adjust each weight accroding to your needs. Absolute values can cause a bye.</ion-label>
        </ion-list-header>-->
        <ion-item>
          <ion-label>Round</ion-label>
          <ion-input :value="round" @input="round = $event.target.value"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label>Score Match</ion-label>
          <ion-range
            min="0"
            max="100"
            :value="filter.scoreMatchWeight"
            @ionChange="filter.scoreMatchWeight = $event.target.value"
          >
            <ion-label slot="end">{{filter.scoreMatchWeight}}</ion-label>
          </ion-range>
        </ion-item>

        <ion-item>
          <ion-label>Different Team</ion-label>
          <ion-range
            min="0"
            max="100"
            :value="filter.sameTeamWeight"
            @ionChange="filter.sameTeamWeight = $event.target.value"
          >
            <ion-label slot="end">{{filter.sameTeamWeight}}</ion-label>
          </ion-range>
        </ion-item>
        <ion-item>
          <ion-label>Played Before</ion-label>
          <ion-range
            min="0"
            max="100"
            :value="filter.playedBeforeWeight"
            @ionChange="filter.playedBeforeWeight = $event.target.value"
          >
            <ion-label slot="end">{{filter.playedBeforeWeight}}</ion-label>
          </ion-range>
        </ion-item>
        <ion-item>
          <ion-label>Same Grade</ion-label>
          <ion-range
            min="0"
            max="100"
            :value="filter.sameGradeWeight"
            @ionChange="filter.sameGradeWeight = $event.target.value"
          >
            <ion-label slot="end">{{filter.sameGradeWeight}}</ion-label>
          </ion-range>
        </ion-item>
        <ion-item>
          <ion-label>Same Rating</ion-label>
          <ion-range
            min="0"
            max="100"
            :value="filter.sameRatingWeight"
            @ionChange="filter.sameRatingWeight = $event.target.value"
          >
            <ion-label slot="end">{{filter.sameRatingWeight}}</ion-label>
          </ion-range>
        </ion-item>

        <ion-list-header>
          <ion-label>Absolutes</ion-label>
        </ion-list-header>
        <!-- <ion-item>
          <ion-label>Max Grade Difference</ion-label>
          <ion-range min="0" max="5" color="warning"></ion-range>
        </ion-item>
        <ion-item>
          <ion-label>Max Score Difference</ion-label>
          <ion-range min="0" max="5" color="warning">
            <ion-label slot="end">{{filter.maxScoreDifference}}</ion-label>
          </ion-range>
        </ion-item>-->
        <ion-item>
          <ion-label>Not Played Before</ion-label>
          <ion-checkbox
            slot="start"
            :checked="filter.playedBeforeAbsolute"
            @ionChange="filter.playedBeforeAbsolute = ($event.target.checked == true);"
          ></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-label>Not Same Team</ion-label>
          <ion-checkbox
            slot="start"
            :checked="filter.sameTeamAbsolute"
            @ionChange="filter.sameTeamAbsolute = ($event.target.checked == true);"
          ></ion-checkbox>
        </ion-item>
      </ion-list>
      <div class="ion-padding">
        <ion-button expand="block" @click="generateTopDownRound()">Generate</ion-button>
      </div>

      <div v-if="matches.length">
        <div class="ion-padding">
          <div>After you have reviewed the proposed round, scroll to the bottom and click "Save".</div>
        </div>
        <table class="table tableZebra2">
          <thead>
            <tr>
              <th>Table</th>
              <th>Player</th>
              <th>Color</th>
              <th>Team</th>
              <th>Points</th>
              <th>Grade</th>
              <th>Div</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="match of matches">
              <tr :key="`${match.table}-${match.playerId}`">
                <!-- <td>
                  <input v-model="match.table" style="width: 40px;" />
                </td> -->
                <td>{{match.table}}</td>
                <td>{{match.firstName}} {{match.lastName}}</td>
                <td>{{match.color}}</td>
                <td>{{match.team}}</td>
                <td>{{match.totalPoints}}</td>
                <td>{{match.grade}}</td>
                <td>{{match.division}}</td>
                <td>{{match.rating}}</td>
              </tr>
            </template>
          </tbody>
        </table>
        <div class="ion-padding">
          <ion-list>
            <ion-item>
              <ion-label>Send notifications on create</ion-label>
              <ion-checkbox
                slot="start"
                :checked="sendNotifications"
                @ionChange="sendNotifications = ($event.target.checked == true);"
              ></ion-checkbox>
            </ion-item>
          </ion-list>
          <ion-button expand="block" @click="save()">Save</ion-button>
        </div>
      </div>

      <div class="ion-padding">
        <div style="color:green;">{{message}}</div>
        <ul style="color:red;">
          <li v-for="error in errors" v-bind:key="error">*{{ error }}</li>
        </ul>
      </div>
    </ion-content>
    <!-- </ion-page> -->
  </layout-menu>
</template>

<script>
import TournamentAPI from "@/services/TournamentAPI";
const tournamentAPI = new TournamentAPI();
export default {
  name: "home",

  components: {},
  data() {
    var tournamentId = this.$route.params.tournament;
    return {
      round: 1,
      tournamentId: tournamentId,
      sendNotifications: true,
      filter: {
        scoreMatchWeight: 90,
        sameTeamWeight: 50,
        playedBeforeWeight: 70,
        sameGradeWeight: 10,
        sameRatingWeight: 10,
        sameTeamAbsolute: false,
        playedBeforeAbsolute: false
      },
      matches: [],
      errors: [],
      message: ""
    };
  },
  methods: {
    generateTopDownRound() {
      this.errors = [];

      let tournamentId = this.$route.params.tournament;
      let round = this.round;
      let filter = this.filter;

      tournamentAPI
        .generateTopDownRound(tournamentId,round,filter)
        .then(data => {
          this.matches = data;
          console.log(data);
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    save() {
      this.errors = [];

      let tournamentId = this.$route.params.tournament;
      let round = this.round;
      let matches = this.matches;
      let sendNotifications = this.sendNotifications;

      tournamentAPI
        .matchesSave(tournamentId, matches)
        .then(data => {
          console.log(`Round ${round} created : ${data}`);
          //send notifications
          if (sendNotifications) {
            this.sendRoundNotifications(tournamentId, round);
            this.sendRoundGameInvites(tournamentId, round);
          }
          //go to round page
          this.$router.push({
            name: "Round",
            params: { tournament: tournamentId, id: round }
          });
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    sendRoundNotifications(tournamentId, round) {
      if (tournamentId && round) {
        tournamentAPI
          .sendRoundNotifications(tournamentId, round)
          .then(data => {
            this.success = "Sent: " + data || "";
            console.log(data);
          })
          .catch(e => {
            this.error = "Error: " + e;
            console.warn(e);
          });
      }
    },
    sendRoundGameInvites(tournamentId,round){
      if (tournamentId && round) {
        tournamentAPI
          .sendRoundGameInvite(tournamentId, round)
          .then(data => {
            this.success = "Sent: " + data || "";
            console.log(data);
          })
          .catch(e => {
            this.error = "Error: " + e;
            console.warn(e);
          });
      }
    },    
    loadData() {
      let tournamentId = this.$route.params.tournament;
      tournamentAPI
        .rounds(tournamentId)
        .then(data => {
          let rounds = data;
          let maxRound = 0;
          if (rounds && rounds.length != 0) {
            maxRound = Math.max(...rounds) || 0;
          }
          this.round = maxRound + 1;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style>

</style>
