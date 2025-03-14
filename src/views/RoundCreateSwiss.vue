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

      <ion-item-group>
        <ion-list-header>
          <ion-label class="ion-text-wrap">Pairing</ion-label>
        </ion-list-header>
        <ion-item>
          <div class="radioButtons" style="margin:0 10px;">
            <input type="radio" name="pairing" id="Weights" value="Weights" v-model="tournament.pairing">
            <label for="Weights">Weights</label>
            <input type="radio" name="pairing" id="Swiss" value="Swiss" v-model="tournament.pairing">
            <label for="Swiss">Swiss (Dutch)</label>
            <input type="radio" name="pairing" id="SwissOld" value="SwissOld" v-model="tournament.pairing">
            <label for="SwissOld">Swiss</label>
            <input type="radio" name="pairing" id="RoundRobin" value="RoundRobin" v-model="tournament.pairing">
            <label for="RoundRobin">Round Robin</label>
            <input type="radio" name="pairing" id="Stable" value="Stable" v-model="tournament.pairing">
            <label for="Stable">Stable</label>


          </div>
        </ion-item>
      </ion-item-group>
      <ion-item-group v-if="tournament.pairing == 'Weights'">
        <ion-list-header>
          <h1>Weights</h1>
        </ion-list-header>
        <ion-list-header>
          <ion-label class="ion-text-wrap">Adjust each weight accroding to your needs. Absolute values can cause a
            bye. Weights is efficient and flexible finding the most compatible pairing starting from the
            top.</ion-label>
        </ion-list-header>


        <ion-item>
          <div class="input-row">
            <label>Score Match</label>
            <input type="range" v-model="tournament.pairingWeightScore">
            <span>{{ tournament.pairingWeightScore }}</span>
          </div>
        </ion-item>
        <ion-item>
          <div class="input-row">
            <label>Different Team</label>
            <input type="range" v-model="tournament.pairingWeightTeam">
            <span>{{ tournament.pairingWeightTeam }}</span>
          </div>
        </ion-item>
        <ion-item>
          <div class="input-row">
            <label>Played Before</label>
            <input type="range" v-model="tournament.pairingWeightPlayed">
            <span>{{ tournament.pairingWeightPlayed }}</span>
          </div>
        </ion-item>
        <ion-item>
          <div class="input-row">
            <label>Same Grade</label>
            <input type="range" v-model="tournament.pairingWeightGrade">
            <span>{{ tournament.pairingWeightGrade }}</span>
          </div>
        </ion-item>
        <ion-item>
          <div class="input-row">
            <label>Same Rating</label>
            <input type="range" v-model="tournament.pairingWeightRating">
            <span>{{ tournament.pairingWeightRating }}</span>
          </div>
        </ion-item>

        <ion-list-header>
          <ion-label>Absolutes</ion-label>
        </ion-list-header>
        <ion-item>
          <ion-label>Not Played Before</ion-label>
          <ion-checkbox slot="start" :checked="tournament.pairingAbsolutePlayed" @ionChange="
            tournament.pairingAbsolutePlayed = $event.target.checked == true
            "></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-label>Not Same Team</ion-label>
          <ion-checkbox slot="start" :checked="tournament.pairingAbsoluteTeam"
            @ionChange="tournament.pairingAbsoluteTeam = $event.target.checked == true"></ion-checkbox>
        </ion-item>


      </ion-item-group>
      <ion-item-group v-if="tournament.pairing == 'Swiss'">
        <ion-list-header>
          <h1>Swiss (Dutch)</h1>
        </ion-list-header>
        <ion-list-header>
          <ion-label class="ion-text-wrap">
            Adjust each setting accroding to your needs. Absolute values can cause a bye.
          </ion-label>

        </ion-list-header>
        <ion-list-header>
          <ion-label class="ion-text-wrap">
            The Swiss Dutch system is a non-elimination tournament format that's used when there are too many
            competitors
            for a round-robin tournament, but eliminating competitors before the end of the tournament isn't desirable.
            Rating is used for the first round ordering and splitting top half and matched with bottom half.
            Following rounds the tournament is sorted by points, then rating and splitting top half and matched with
            bottom half.
            Swiss Dutch pairing is often referred to as Swiss in the chess world.

            <ul>
              <li>The primary goal of the swiss pairing is to match players with similar points.</li>
              <li>Seeding is based on rating.</li>
              <li>Each player will receive a maximum of 1 bye, unless all players have received a bye</li>
              <li>There should be no more than 1 bye per division. Exceptions can occur with strong absolute settings or
                small division.</li>

            </ul>
            <p>IFDA -Swiss Ducth Rules: <a
                href="https://handbook.fide.com/chapter/C0403Till2025">https://handbook.fide.com/chapter/C0403Till2025</a>
            </p>

          </ion-label>

        </ion-list-header>


        <ion-list-header>
          <ion-label>Absolutes</ion-label>
        </ion-list-header>
        <ion-item>
          <ion-label>Not Played Before</ion-label>
          <ion-checkbox slot="start" :checked="tournament.pairingAbsolutePlayed" @ionChange="
            tournament.pairingAbsolutePlayed = $event.target.checked == true
            "></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-label>Not Same Team</ion-label>
          <ion-checkbox slot="start" :checked="tournament.pairingAbsoluteTeam"
            @ionChange="tournament.pairingAbsoluteTeam = $event.target.checked == true"></ion-checkbox>
        </ion-item>

      </ion-item-group>
      <ion-item-group v-if="tournament.pairing == 'SwissOld'">
        <ion-list-header>
          <h1>Swiss (previous version)</h1>
        </ion-list-header>
        <ion-list-header>
          <ion-label class="ion-text-wrap">
            This is the previous version of Swiss. Only use in case the current version is not working correctly.
            Adjust each setting according to your needs. Absolute values can cause a bye.
          </ion-label>

        </ion-list-header>
        <ion-list-header>
          <ion-label class="ion-text-wrap">
            The Swiss Dutch system is a non-elimination tournament format that's used when there are too many
            competitors
            for a round-robin tournament, but eliminating competitors before the end of the tournament isn't desirable.
            Rating is used for the first round ordering and splitting top half and matched with bottom half.
            Following rounds the tournament is sorted by points, then rating and splitting top half and matched with
            bottom half.
            Swiss Dutch pairing is often referred to as Swiss in the chess world.

            <ul>
              <li>The primary goal of the swiss pairing is to match players with similar points.</li>
              <li>Seeding is based on rating.</li>
              <li>Each player will receive a maximum of 1 bye, unless all players have received a bye</li>
              <li>There should be no more than 1 bye per division. Exceptions can occur with strong absolute settings or
                small division.</li>

            </ul>
            <p>IFDA -Swiss Ducth Rules: <a
                href="https://handbook.fide.com/chapter/C0403Till2025">https://handbook.fide.com/chapter/C0403Till2025</a>
            </p>

          </ion-label>

        </ion-list-header>


        <ion-list-header>
          <ion-label>Absolutes</ion-label>
        </ion-list-header>
        <ion-item>
          <ion-label>Not Played Before</ion-label>
          <ion-checkbox slot="start" :checked="tournament.pairingAbsolutePlayed" @ionChange="
            tournament.pairingAbsolutePlayed = $event.target.checked == true
            "></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-label>Not Same Team</ion-label>
          <ion-checkbox slot="start" :checked="tournament.pairingAbsoluteTeam"
            @ionChange="tournament.pairingAbsoluteTeam = $event.target.checked == true"></ion-checkbox>
        </ion-item>

      </ion-item-group>
      <ion-item-group v-if="tournament.pairing == 'RoundRobin'">
        <ion-list-header>
          <h1>Round Robin</h1>
        </ion-list-header>
        <ion-list-header>
          <ion-label class="ion-text-wrap">Adjust each weight accroding to your needs. Absolute values can cause a
            bye. Round Robin pairing is focused on not playing the same player twice. Round Robin ignores score, grade,
            rating. </ion-label>
        </ion-list-header>
        <ion-item>
          <div class="input-row">
            <label>Different Team</label>
            <input type="range" v-model="tournament.pairingWeightTeam">
            <span>{{ tournament.pairingWeightTeam }}</span>
          </div>
        </ion-item>
        <ion-item>
          <div class="input-row">
            <label>Played Before</label>
            <input type="range" v-model="tournament.pairingWeightPlayed">
            <span>{{ tournament.pairingWeightPlayed }}</span>
          </div>
        </ion-item>
        <ion-list-header>
          <ion-label>Absolutes</ion-label>
        </ion-list-header>
        <ion-item>
          <ion-label>Not Played Before</ion-label>
          <ion-checkbox slot="start" :checked="tournament.pairingAbsolutePlayed" @ionChange="
            tournament.pairingAbsolutePlayed = $event.target.checked == true
            "></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-label>Not Same Team</ion-label>
          <ion-checkbox slot="start" :checked="tournament.pairingAbsoluteTeam"
            @ionChange="tournament.pairingAbsoluteTeam = $event.target.checked == true"></ion-checkbox>
        </ion-item>
      </ion-item-group>

      <ion-item-group v-if="tournament.pairing == 'Stable'">
        <ion-list-header>
          <h1>Stable Matching</h1>
        </ion-list-header>
        <ion-list-header>
          <ion-label class="ion-text-wrap">Adjust each weight accroding to your needs. Absolute values can cause a
            bye. Stable Matching is more powerful than basic Weights, but requires more processing power and time. Each
            player's match compatibility is calculated with all other players regardless of order. </ion-label>
        </ion-list-header>
       

        <ion-item>
          <div class="input-row">
            <label>Score Match</label>
            <input type="range" v-model="tournament.pairingWeightScore">
            <span>{{ tournament.pairingWeightScore }}</span>
          </div>
        </ion-item>
        <ion-item>
          <div class="input-row">
            <label>Different Team</label>
            <input type="range" v-model="tournament.pairingWeightTeam">
            <span>{{ tournament.pairingWeightTeam }}</span>
          </div>
        </ion-item>
        <ion-item>
          <div class="input-row">
            <label>Played Before</label>
            <input type="range" v-model="tournament.pairingWeightPlayed">
            <span>{{ tournament.pairingWeightPlayed }}</span>
          </div>
        </ion-item>
        <ion-item>
          <div class="input-row">
            <label>Same Grade</label>
            <input type="range" v-model="tournament.pairingWeightGrade">
            <span>{{ tournament.pairingWeightGrade }}</span>
          </div>
        </ion-item>
        <ion-item>
          <div class="input-row">
            <label>Same Rating</label>
            <input type="range" v-model="tournament.pairingWeightRating">
            <span>{{ tournament.pairingWeightRating }}</span>
          </div>
        </ion-item>

        <ion-list-header>
          <ion-label>Absolutes</ion-label>
        </ion-list-header>
        <ion-item>
          <ion-label>Not Played Before</ion-label>
          <ion-checkbox slot="start" :checked="tournament.pairingAbsolutePlayed" @ionChange="
            tournament.pairingAbsolutePlayed = $event.target.checked == true
            "></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-label>Not Same Team</ion-label>
          <ion-checkbox slot="start" :checked="tournament.pairingAbsoluteTeam"
            @ionChange="tournament.pairingAbsoluteTeam = $event.target.checked == true"></ion-checkbox>
        </ion-item>


      </ion-item-group>
      <ion-item-group>
      
          <details>
          <summary style="padding:15px;">Advanced</summary>
          <ion-item>
            <ion-label>Round Number</ion-label>
            <ion-input style="" :value="round" @input="round = $event.target.value"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Table Offset</ion-label>
            <ion-input style="" :value="tableOffset" @input="tableOffset = $event.target.value"></ion-input>
          </ion-item>
        </details> 
     

      </ion-item-group>
      <div class="ion-padding">
        <ion-button xexpand="block" @click="save()">Save Settings</ion-button>
        <ion-button xexpand="block" @click="generatePairing()">Generate Pairing (Preview)</ion-button>

      </div>

      <div v-if="matches.length">
        <div class="ion-padding">
          <div>
            After you have reviewed the proposed round, scroll to the bottom and
            click "Save".
          </div>
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
              <th title="Match Value">MV</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="match of matches">
              <tr :key="`${match.table}-${match.playerId}`">
                <!-- <td>
                  <input v-model="match.table" style="width: 40px;" />
                </td> -->
                <td>
                  <input :value="match.table" @change="match.table = $event.target.value" type="number" min="0"
                    max="999"></input>
                  <!-- {{ match.table }} -->
                </td>
                <td>{{ match.firstName }} {{ match.lastName }}</td>
                <td>{{ match.color }}</td>
                <td>{{ match.team }}</td>
                <td>{{ match.totalPoints }}</td>
                <td>{{ match.grade }}</td>
                <td>{{ match.division }}</td>
                <td>{{ match.rating }}</td>
                <td>{{ match.matchScore }}</td>
              </tr>
            </template>
          </tbody>
        </table>
        <div class="ion-padding">
          <ion-list>

          </ion-list>
          <ion-button expand="block" @click="saveMatches()">Create Round {{ roundToCreate }}</ion-button>
        </div>
      </div>

      <div class="ion-padding">
        <div style="color: green">{{ message }}</div>
        <ul style="color: red">
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
      round: null,
      tournament: {},
      tournamentId: tournamentId,
      matches: [],
      errors: [],
      message: "",
    };
  },
  methods: {
    generatePairing() {
      this.errors = [];
      let tournament = this.tournament;
      let tournamentId = this.$route.params.tournament;
      let round = this.round;
      let tableOffset = this.tableOffset ?? 1;
      let filter = {
        pairing: tournament.pairing,
        scoreMatchWeight: tournament.pairingWeightScore,
        sameTeamWeight: tournament.pairingWeightTeam,
        playedBeforeWeight: tournament.pairingWeightPlayed,
        sameGradeWeight: tournament.pairingWeightGrade,
        sameRatingWeight: tournament.pairingWeightRating,
        sameTeamAbsolute: tournament.pairingAbsoluteTeam,
        playedBeforeAbsolute: tournament.pairingAbsolutePlayed,
        tableOffset: tableOffset
      };

      tournamentAPI
        .generatePairing(tournamentId, round, filter)
        .then((data) => {
          this.matches = data;
          //get round number from matches, check first match else nothing
          this.roundToCreate = this.matches.length ? this.matches[0].round : null;

          console.log(data);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    async saveMatches() {
      this.errors = [];

      let tournamentId = this.$route.params.tournament;
      let matches = this.matches;
      let round = this.roundToCreate;


      try {
        const data = await tournamentAPI.matchesCreate(tournamentId, matches);

        console.log(`Created : ${data}`);
        await tournamentAPI.flowAction(tournamentId, "play");

        //go to round page
        this.$router.push({
          name: "Round",
          params: { tournament: tournamentId, id: round },
        });
      }
      catch (e) {
        this.errors.push(e);
      }

    },
    // sendRoundNotifications(tournamentId, round) {
    //   if (tournamentId && round) {
    //     tournamentAPI
    //       .sendRoundNotifications(tournamentId, round)
    //       .then((data) => {
    //         this.success = "Sent: " + data || "";
    //         console.log(data);
    //       })
    //       .catch((e) => {
    //         this.error = "Error: " + e;
    //         console.warn(e);
    //       });
    //   }
    // },
    // sendRoundGameInvites(tournamentId, round) {
    //   if (tournamentId && round) {
    //     tournamentAPI
    //       .sendRoundGameInvite(tournamentId, round)
    //       .then((data) => {
    //         this.success = "Sent: " + data || "";
    //         console.log(data);
    //       })
    //       .catch((e) => {
    //         this.error = "Error: " + e;
    //         console.warn(e);
    //       });
    //   }
    // },
    populate(tournament) {
      this.tournament = tournament;
    },
    loadData() {
      var tournamentId = this.tournamentId;
      return tournamentAPI
        .tournamentView(tournamentId)
        .then((data) => {
          this.populate(data);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    async save() {
      let tournamentId = this.tournamentId;
      let tournament = this.tournament;

      await tournamentAPI
        .tournamentUpdate(tournamentId, tournament)
        .then((response) => {
          console.log(response);
          console.log("Tournament settings saved");
          this.message = "Tournament settings saved";
        })
        .catch((e) => {
          this.error = "Error: Save failed";
          console.warn(e);
        });
    },
  },
  created() {
    this.loadData();
  },
};
</script>

<style>
.input-row {
  display: flex;
  width: 100%;
  gap: 15px
}

.input-row input {
  flex: 1;
}

.input-row label {
  flex-basis: 150px;
}
</style>