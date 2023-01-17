<template>
  <layout-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title>Edit Tournament</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>
          <ion-label position="stacked">Name</ion-label>
          <ion-input :value="tournament.name" @input="tournament.name = $event.target.value"></ion-input>
        </ion-item>
        <!-- <ion-item>
          <ion-label position="stacked">Type</ion-label>
          <ion-input
            :value="tournament.type"
            @input="tournament.type = $event.target.value"
          ></ion-input>
        </ion-item> -->
        <!-- <ion-item>
          <ion-label position="stacked">Details</ion-label>
          <ion-textarea
            auto-grow="true"
            :value="tournament.details"
            @input="tournament.details = $event.target.value"
          ></ion-textarea>
        </ion-item> -->
        <!-- <ion-item>
          <ion-label position="stacked">Start Date/Time</ion-label>
          <ion-datetime
            display-format="D MMM YYYY H:mm"
            :value="new Date(tournament.startDateTime+'Z').toISOString()"
          ></ion-datetime>
        </ion-item> -->
        <!-- <ion-item>
          <ion-label position="stacked">Start Date/Time</ion-label>
          <ion-datetime
            display-format="D MMM YYYY H:mm"
            :value="tournament.startDateTime"
            @ionChange="tournament.startDateTime = $event.target.value"
          ></ion-datetime>
        </ion-item> -->
        <ion-item>
          <ion-label position="stacked">Start Date</ion-label>
          <input type="date" :value="startDate" @input="startDate = $event.target.value" style="border: 0" />
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Start Time</ion-label>
          <input type="time" :value="startTime" @input="startTime = $event.target.value" style="border: 0" />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Rounds</ion-label>
          <ion-input :value="tournament.rounds" @input="tournament.rounds = $event.target.value"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Streaming: Twitch Profile</ion-label>
          <ion-input :value="tournament.twitchProfile" @input="tournament.twitchProfile = $event.target.value">
          </ion-input>
        </ion-item>
        <!-- <ion-item>
          <ion-label position="stacked">Current Round</ion-label>
          <ion-input
            :value="tournament.round"
            @input="tournament.round = $event.target.value"
          ></ion-input>
        </ion-item> -->
        <!-- <ion-item>
          <ion-label position="stacked">Pairing Algorithm</ion-label>
          <ion-select
            placeholder="Select One"
            :value="tournament.pairing"
            @ionChange="tournament.pairing = $event.target.value"
          >
            <ion-select-option value="Swiss">Swiss</ion-select-option>
            <ion-select-option value="SingleElimination">Single Elimination</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Status</ion-label>
          <ion-input
            :value="tournament.status"
            @input="tournament.status = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">StatusProgress</ion-label>
          <ion-input
            type="number"
            :value="tournament.statusProgress"
            @input="tournament.statusProgress = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">State</ion-label>
          <ion-input
            :value="tournament.state"
            @input="tournament.state = $event.target.value"
          ></ion-input>
        </ion-item> -->
        <ion-item>
          <ion-label position="stacked">Access Code: Basic</ion-label>
          <ion-input :value="tournament.accessCodeBasic" @input="tournament.accessCodeBasic = $event.target.value">
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Access Code: Recorder</ion-label>
          <ion-input :value="tournament.accessCodeRecorder"
            @input="tournament.accessCodeRecorder = $event.target.value"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Access Code: Admin</ion-label>
          <ion-input :value="tournament.accessCodeAdmin" @input="tournament.accessCodeAdmin = $event.target.value">
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Image (url)</ion-label>
          <ion-input :value="tournament.image" @input="tournament.image = $event.target.value"></ion-input>
          <ion-thumbnail slot="end">
            <ion-img :src="tournament.image"></ion-img>
          </ion-thumbnail>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Teams (separated by commas)</ion-label>
          <ion-textarea auto-grow="true" :value="tournament.teams" @input="tournament.teams = $event.target.value">
          </ion-textarea>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Max Players</ion-label>
          <ion-input :value="tournament.maxPlayers" @input="tournament.maxPlayers = $event.target.value"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Check-In Duration (seconds)</ion-label>
          <ion-input :value="tournament.checkInDuration" @input="tournament.checkInDuration = $event.target.value">
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">gameRoomLink</ion-label>
          <ion-input :value="tournament.gameRoomLink" @input="tournament.gameRoomLink = $event.target.value">
          </ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Win Points</ion-label>
          <ion-input :value="tournament.winPoints" @input="tournament.winPoints = $event.target.value"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Tie Points</ion-label>
          <ion-input :value="tournament.tiePoints" @input="tournament.tiePoints = $event.target.value"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Loss Points</ion-label>
          <ion-input :value="tournament.lossPoints" @input="tournament.lossPoints = $event.target.value"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Auto Advance Rounds</ion-label>
          <ion-checkbox slot="start" :checked="tournament.autoAdvanceRounds" @ionChange="
            tournament.autoAdvanceRounds = $event.target.checked == true
          "></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-label>Allow Notifications</ion-label>
          <ion-checkbox
            slot="start"
            :checked="tournament.allowNotifications"
            @ionChange="
              tournament.allowNotifications = $event.target.checked == true
            "
          ></ion-checkbox>
        </ion-item>

        <ion-item>
          <ion-label>Is Hidden</ion-label>
          <ion-checkbox slot="start" :checked="tournament.hidden"
            @ionChange="tournament.hidden = $event.target.checked == true"></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-label>Require Check-In</ion-label>
          <ion-checkbox slot="start" :checked="tournament.requireCheckIn" @ionChange="
            tournament.requireCheckIn = $event.target.checked == true
          "></ion-checkbox>
        </ion-item>
        <!-- <ion-item>
          <ion-label>Allow Check-In</ion-label>
          <ion-checkbox
            slot="start"
            :checked="tournament.allowCheckIn"
            @ionChange="tournament.allowCheckIn = $event.target.checked == true"
          ></ion-checkbox>
        </ion-item> -->
        <ion-item>
          <ion-label>Allow Registration</ion-label>
          <ion-checkbox slot="start"  :checked="tournament.allowRegistration" @ionChange="
            tournament.allowRegistration = $event.target.checked == true
          "></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-label>Show Team Scores</ion-label>
          <ion-checkbox slot="start"  :checked="tournament.ShowTeamScores" @ionChange="
            tournament.ShowTeamScores = $event.target.checked == true
          "></ion-checkbox>
        </ion-item>
        
        <ion-item>
          <ion-label>Is Public</ion-label>
          <ion-checkbox slot="start" :checked="tournament.isPublic"
            @ionChange="tournament.isPublic = $event.target.checked == true"></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-label>Allow Multiple Players Per Login</ion-label>
          <ion-checkbox slot="start" :checked="tournament.allowMultiplePlayersPerLogin"
            @ionChange="tournament.allowMultiplePlayersPerLogin = $event.target.checked == true"></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-label>Auto Open Game</ion-label>
          <ion-checkbox slot="start" :checked="tournament.autoOpenGame"
            @ionChange="tournament.autoOpenGame = $event.target.checked == true"></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-label>Allow Chat</ion-label>
          <ion-checkbox slot="start" :checked="tournament.allowChat"
            @ionChange="tournament.allowChat = $event.target.checked == true"></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-label>Send Post Email</ion-label>
          <ion-checkbox slot="start" :checked="tournament.sendPostEmail"
            @ionChange="tournament.sendPostEmail = $event.target.checked == true"></ion-checkbox>
        </ion-item>
        <ion-list-header>
          <ion-label>Signup Page</ion-label>
        </ion-list-header>
        <ion-item>
          <ckeditor :editor="editor" v-model="tournament.signUpText" :config="editorConfig"></ckeditor>
        </ion-item>
        <ion-list-header>
          <ion-label>FAQ Content</ion-label>
        </ion-list-header>
        <ion-item>
          <ckeditor :editor="editor" v-model="tournament.faqContent" :config="editorConfig"></ckeditor>
        </ion-item>
        <!-- <ion-item>
          <ion-label position="stacked">Signup Content</ion-label>
           <ion-label position="stacked">(Use &lt;br&gt; for new line)</ion-label>
          
          <ion-textarea auto-grow="true"
            :value="tournament.signUpText"
            @input="tournament.signUpText = $event.target.value"
          ></ion-textarea>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">FAQ Content</ion-label>
          <ion-label position="stacked">(Use &lt;br&gt; for new line)</ion-label>
             <ion-textarea auto-grow="true"
            :value="tournament.faqContent"
            @input="tournament.faqContent = $event.target.value"
          ></ion-textarea>
        </ion-item>-->
      </ion-list>
      <div style="color: red">{{ error }}</div>
      <ion-button expand="block" v-on:click="save()">Save</ion-button>
      <hr />
      <ion-button expand="block" color="light" v-on:click="back()">Cancel</ion-button>
      <ion-button expand="block" color="danger" v-if="tournamentId" v-on:click="deleteTournament()">Delete</ion-button>
      <hr />
      <!-- <ion-button color="danger" v-on:click="deletePlayer()">Delete</ion-button> -->
      <!-- <ion-button @click="presentAlertConfirm">Show Alert (confirm)</ion-button> -->
      <!-- <ion-button color="danger">Delete</ion-button> -->
    </ion-content>
    <!-- </ion-page> -->
  </layout-menu>
</template>

<script>
import fetch from "@/services/fetch";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import TournamentTemplate from "@/services/TournamentTemplate";
import Authentication from "@/services/Authentication";
const authentication = new Authentication();
const tournamentTemplate = new TournamentTemplate();
export default {
  name: "home",
  components: {},
  data() {
    let tournamentId = this.$route.params.tournament;
    let copyId = this.$route.params.copyId;
    let tournamentType = this.$route.params.tournamentType;

    //default tournament settings
    let tournamentDefault = tournamentTemplate.getTournamentTemplate(tournamentType);

    return {
      tournamentId: tournamentId,
      copyId: copyId,
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the rich-text editor.
        link: {
          addTargetToExternalLinks: true,
        },
      },
      tournament: tournamentDefault,
      startDate: null,
      startTime: null,
      error: "",
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    save() {
      let tournamentId = this.tournamentId;
      let tournament = this.tournament;
      let startDate = this.startDate;
      let startTime = this.startTime;
      tournament.rounds = parseInt(tournament.rounds);
      if (isNaN(tournament.rounds)) {
        this.error = "Error: rounds is not a number";
        return;
      }
      tournament.round = parseInt(tournament.round);
      if (isNaN(tournament.round)) {
        this.error = "Error: round is not a number";
        return;
      }
      tournament.maxPlayers = parseInt(tournament.maxPlayers);
      if (isNaN(tournament.maxPlayers)) {
        this.error = "Error: maxPlayers is not a number";
        return;
      }
      if (!tournament.name) {
        this.error = "Error: No tournament name is set";
        return;
      }
      if (!startDate) {
        this.error = "Error: No start date is set";
        return;
      }
      if (!startTime) {
        this.error = "Error: No start time is set";
        return;
      }
      tournament.startDateTime = new Date(startDate + "T" + startTime);
      tournament.timerDateTime = tournament.startDateTime;
      if (!tournament.startDateTime) {
        this.error = "Error: No start datetime is set";
        return;
      }
      if (tournament.owner == null) {
        //set owner
        let user = authentication.getUser();
        let userName = user ? user.userName : null;
        tournament.owner = userName;
      }

      if (tournamentId && tournament) {
        fetch
          .put(`tournament/${tournamentId}`, tournament)
          .then((response) => {
            console.log(response);
            this.$router.back(); //back
          })
          .catch((e) => {
            this.error = "Error: Save failed";
            console.warn(e);
          });
      } else {
        fetch
          .post(`tournament`, tournament)
          .then((response) => {
            console.log(response);
            if (response.data && response.data.id) {
              let newTournamentId = response.data.id;
              this.$router.push({
                name: "Tournament",
                params: { tournament: newTournamentId },
              });
            } else {
              this.$router.push({
                name: "Tournaments"
              });
            }
            //back

          })
          .catch((e) => {
            this.error = "Error: Save failed";
            console.warn(e);
          });
      }
    },
    deleteTournament() {
      let tournamentId = this.tournamentId;
      this.$confirm(`Are you sure you want to delete the Tournament?`).then(
        () => {
          fetch
            .delete(`tournament/${tournamentId}`)
            .then((response) => {
              console.log(response);
              this.$router.push({
                name: "Tournaments"
              });
            })
            .catch((e) => {
              this.error = "Error: Delete failed";
              console.warn(e);
            });
        }
      );
    },
    loadData() {
      let tournamentId = this.tournamentId;
      let copyId = this.copyId;
      if (tournamentId) {
        fetch
          .get(`tournament/${tournamentId}`)
          .then((response) => {
            this.tournament = response.data;
            if (this.tournament && this.tournament.startDateTime) {
              let date = new Date(this.tournament.startDateTime);
              this.startDate = this.getHTML5DateStringsFromDate(date);
              this.startTime = this.getHTML5TimeStringsFromDate(date);
            }
            //this.tournament.startDateTime = new Date(tournament.startDateTime+'Z').toISOString()
          })
          .catch((e) => {
            this.error = "Error: Load failed";
            console.warn(e);
          });
      }
      if (copyId) {
        fetch
          .get(`tournament/${copyId}`)
          .then((response) => {
            this.tournament = response.data;
            this.tournament.id = 0;
            this.tournament.round = 0;
            this.tournament.state = "setup";
            this.tournament.status = "Setup - In Progress";
            this.tournament.startDateTime = null;
            if (this.tournament && this.tournament.startDateTime) {
              let date = new Date(this.tournament.startDateTime);
              this.startDate = this.getHTML5DateStringsFromDate(date);
              this.startTime = this.getHTML5TimeStringsFromDate(date);
            }
            //this.tournament.startDateTime = new Date(tournament.startDateTime+'Z').toISOString()
          })
          .catch((e) => {
            this.error = "Error: Load failed";
            console.warn(e);
          });
      }
    },
    getHTML5DateStringsFromDate(d) {
      // Date string
      let ds =
        d.getFullYear().toString() +
        "-" +
        (d.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        d.getDate().toString().padStart(2, "0");
      return ds;
    },
    getHTML5TimeStringsFromDate(d) {
      // Time string
      let ts =
        d.getHours().toString().padStart(2, "0") +
        ":" +
        d.getMinutes().toString().padStart(2, "0") +
        ":" +
        d.getSeconds().toString().padStart(2, "0");

      return ts;
    },
  },
  created() {
    this.loadData();
  },
};
</script>
