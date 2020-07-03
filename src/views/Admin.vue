<template>
  <layout-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title>Admin</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- <ion-item>{{tournament.name}}</ion-item> -->
      <ion-list-header>
        <ion-label>Tornament Mode</ion-label>
      </ion-list-header>
      <ion-card v-if="state === 'setup'">
        <ion-card-header>
          <ion-card-title>Setup</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>
            "Setup" blocks all registration and check-in's.
            During this step the tournament admin can configure
            the tournament settings, FAQ content, Sign Up content, and user access.
            When you are ready for players to sign up click "Registration".
          </p>
          <ion-item>
            <ion-button slot="end" @click="changeState('registration')">Registration</ion-button>
          </ion-item>
        </ion-card-content>
      </ion-card>
      <ion-card v-if="state === 'registration'">
        <ion-card-header>
          <ion-card-title>Registration</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>
            "Registration" allows players to register, but still blocks check-in's.
            During this step players should invited to register / sign up.
            Click "Check-In" when you are for checking in player for the tournament.
          </p>
          <ion-item>
            <ion-button @click="changeState('setup')">Setup</ion-button>
            <ion-button slot="end" @click="changeState('check-in')">Check-In</ion-button>
          </ion-item>
        </ion-card-content>
      </ion-card>
      <ion-card v-if="state === 'check-in'">
        <ion-card-header>
          <ion-card-title>Check-In</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>
            "Check-In" allows players to check-in.
            During this step players should "check in" to be included.
            Players not checked-in will not be matched up when a round is created.
            When all players have checked in, click "Start Tournament".
          </p>
          <ion-item>
            <ion-button @click="changeState('registration')">Registration</ion-button>
            <ion-button slot="end" @click="changeState('play')">Start Tournament</ion-button>
          </ion-item>
        </ion-card-content>
      </ion-card>
      <ion-card v-if="state === 'play'">
        <ion-card-header>
          <ion-card-title>Play</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>
            "Play" step starts the tournament play. It blocks registration and check-in's.
            Now you should create your first round, unless the "Auto Advance Rounds" is enabled and creates it for you.
            Play all rounds until the tournament is over.
          </p>
          <ion-item>
            <ion-button @click="changeState('check-in')">Check-In</ion-button>
            <ion-button slot="end" @click="changeState('end')">End Tournament</ion-button>
          </ion-item>
        </ion-card-content>
      </ion-card>
      <ion-card v-if="state === 'end'">
        <ion-card-header>
          <ion-card-title>End</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>"End" step means the tournament is over.</p>
          <ion-item>
            <ion-button @click="changeState('play')">Start Tournament</ion-button>
            <ion-button slot="end" @click="changeState('setup')">Set Up</ion-button>
          </ion-item>
        </ion-card-content>
      </ion-card>

      <!-- Sign up link:
            <a
              :href="'https://bracketjd.com/'+tournament.id+'/SignUp'"
            >https://bracketjd.com/{{tournament.id}}/SignUp</a>.
      Access Code: {{tournament.accessCodeBasic}}-->

      <!-- <ion-card>
        <ion-card-header>
          <ion-card-title>Status</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item>
              <ion-icon slot="start" name="albums"></ion-icon>
              <ion-label>Mode: {{tournament.state}}</ion-label>
              <ion-button slot="end" @click="changeState('setup')">Change</ion-button>
            </ion-item>
            <ion-item>
              <ion-icon slot="start" name="clipboard"></ion-icon>

              <ion-label>Checked-in: 23/54</ion-label>
              <ion-button slot="end" @click="changeState('registration')">View</ion-button>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>-->

      <!-- <ion-card>
        <ion-card-header>
          <ion-card-title>State: {{tournament.state}}</ion-card-title>
        </ion-card-header>
      <ion-card-content>-->
      <!-- <ion-list-header>
        <ion-label>Tournament Mode</ion-label>
        <ion-icon slot="end" name="question"></ion-icon>
      </ion-list-header>
      <ion-list>
        <ion-radio-group :value="state" @ionChange="state = $event.target.value;">
          <ion-item>
            <ion-radio slot="start" value="setup"></ion-radio>
            <ion-label>Setup</ion-label>
            <ion-icon slot="end" name="cog"></ion-icon>
          </ion-item>
          <ion-item>
            <ion-radio slot="start" value="registration"></ion-radio>

            <ion-label>Registration</ion-label>
            <ion-icon slot="end" name="clipboard"></ion-icon>
          </ion-item>

          <ion-item>
            <ion-radio slot="start" value="check-in"></ion-radio>
            <ion-label>Check-in</ion-label>
            <ion-icon slot="end" name="checkbox-outline"></ion-icon>
          </ion-item>
          <ion-item>
            <ion-radio slot="start" value="play"></ion-radio>

            <ion-label>Play</ion-label>
            <ion-icon slot="end" name="trophy"></ion-icon>
          </ion-item>
          <ion-item>
            <ion-radio slot="start" value="end"></ion-radio>

            <ion-label>End</ion-label>
            <ion-icon slot="end" name="hand"></ion-icon>
          </ion-item>
        </ion-radio-group>
        <ion-item>
          <ion-button slot="end" @click="changeState(state)">Update</ion-button>
        </ion-item>
      </ion-list>-->
      <!-- </ion-card-content>
      </ion-card>-->

      <!-- <ion-card>
        <ion-card-header>
          <ion-card-title>Setup</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>
            "Setup" blocks all registration and check-in's.
            During this step the tournament admin can configure
            the tournament settings, FAQ content, Sign Up content, and user access.
            When you are ready for players to sign up click "Start Registration".
          </p>
          <ion-item>
            <ion-button slot="end" @click="changeState('setup')">Start Setup</ion-button>
          </ion-item>
        </ion-card-content>
      </ion-card>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Registration</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>
            "Registration" allows players to register, but still blocks check-in's.
            During this step players should invited to register / sign up.
          </p>
          <p>
            Sign up link:
            <a
              :href="'https://bracketjd.com/'+tournament.id+'/SignUp'"
            >https://bracketjd.com/{{tournament.id}}/SignUp</a>.
          </p>
          <p>Access Code: {{tournament.accessCodeBasic}}</p>
          <ion-item>
            <ion-button slot="start" @click="changeState('setup')">Setup</ion-button>
            <ion-button slot="end" @click="changeState('registration')">Check-In</ion-button>
          </ion-item>
        </ion-card-content>
      </ion-card>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Check-In</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>
            "Check-In" allows players to check-in.
            During this step players should "check in" to be included.
            Player not checked-in will not be matched up when a round is created.
            If self check-in is not enabled, users with Admin or Recorder privileges need to mark each player as present or not.
            When all players have checked in, click "Start Tournament".
          </p>
          <ion-item>
            <ion-button slot="end" @click="changeState('check-in')">Start Check-In</ion-button>
          </ion-item>
        </ion-card-content>
      </ion-card>
      <ion-card class="selected">
        <ion-card-header>
          <ion-card-title>Play</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>
            "Play" step starts the tournament play. It blocks registration and check-in's.
            Now you should create your first round, unless the "Auto Advance Rounds" is enabled and creates it for you.
            Play all rounds until the tournament is over.
          </p>
          <p style="text-align:right">
            <ion-button slot="end" @click="changeState('play')">Start Tournament</ion-button>
          </p>
        </ion-card-content>
      </ion-card>
      <ion-card>
        <ion-card-content>
          <p>"End" step means the tournament is over.</p>
          <ion-item>
            <ion-button slot="end" @click="changeState('end')">End Tournament</ion-button>
          </ion-item>
        </ion-card-content>
      </ion-card>
      -->
      <ion-list>
        <!-- <ion-list-header>
          <ion-label>Players</ion-label>
        </ion-list-header>
        <router-link :to="{ name: 'Players', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="people"></ion-icon>
            <ion-label>Players</ion-label>
          </ion-item>
        </router-link> 
        <router-link :to="{ name: 'PlayerNew', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="person-add"></ion-icon>
            <ion-label>Add Player</ion-label>
          </ion-item>
        </router-link>
        -->

        <!-- <ion-item button detail="true" v-on:click="openRounds()">
          <ion-icon slot="start" name="paper"></ion-icon>
          <ion-label>*Edit Players Bulk 1</ion-label>
        </ion-item>
        <ion-item button detail="true" v-on:click="openScores()">
          <ion-icon slot="start" name="podium"></ion-icon>
          <ion-label>*Edit Players Bulk 2</ion-label>
        </ion-item>-->
        <!-- <router-link :to="{ name: 'Registration', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="clipboard"></ion-icon>
            <ion-label>Registration</ion-label>
          </ion-item>
        </router-link>-->

        <!-- <ion-item button detail="true" v-on:click="openRoster()">
          <ion-icon slot="start" name="filing"></ion-icon>
          <ion-label>Roster</ion-label>
        </ion-item>-->

        <!-- <ion-list-header>
          <ion-label>Manage Rounds</ion-label>
        </ion-list-header>
        <router-link :to="{ name: 'RoundCreate', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="list"></ion-icon>
            <ion-label>Create Round</ion-label>
          </ion-item>
        </router-link>
        <router-link :to="{ name: 'RoundsEdit', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="list"></ion-icon>
            <ion-label>*Edit Rounds</ion-label>
          </ion-item>
        </router-link>-->

        <ion-list-header>
          <ion-label>Tournament Settings</ion-label>
        </ion-list-header>

        <router-link :to="{ name: 'TournamentEdit', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="cog"></ion-icon>
            <ion-label>Tournament</ion-label>
          </ion-item>
        </router-link>
        <router-link :to="{ name: 'FAQEdit', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="cog"></ion-icon>
            <ion-label>FAQ</ion-label>
          </ion-item>
        </router-link>
        <router-link :to="{ name: 'SignUpEdit', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="cog"></ion-icon>
            <ion-label>Sign Up</ion-label>
          </ion-item>
        </router-link>
        <router-link :to="{ name: 'UserAccess', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="cog"></ion-icon>
            <ion-label>Users Access</ion-label>
          </ion-item>
        </router-link>
        <ion-list-header>
          <ion-label>Tools</ion-label>
        </ion-list-header>
        <router-link :to="{ name: 'SendMessage', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="notifications"></ion-icon>
            <ion-label>*Send Message</ion-label>
          </ion-item>
        </router-link>
        <router-link :to="{ name: 'AdminTools', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="hammer"></ion-icon>
            <ion-label>Tools</ion-label>
          </ion-item>
        </router-link>
        <!-- <a v-bind:href="'https://admin.chessclub.io/'+ tournamentId+'/'">
          <ion-item button detail="true">
            <ion-icon slot="start" name="cog"></ion-icon>
            <ion-label>Old Admin Site</ion-label>
          </ion-item>
        </a>-->
        <!-- <ion-list-header>
          <ion-label>Reports</ion-label>
        </ion-list-header>
        <router-link :to="{ name: 'ReportWallChart', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="cog"></ion-icon>
            <ion-label>Wall Chart</ion-label>
          </ion-item>
        </router-link>-->
      </ion-list>

      <!-- <ion-button v-on:click="openPlayers()">Players</ion-button>fdfggdfg
      <ion-button v-on:click="loadData()">Load</ion-button>
      <ion-button color="danger" v-on:click="clearData()">Clear</ion-button>

      <ion-button color="light">Light</ion-button>
      <ion-button>Default</ion-button>
      <ion-button color="secondary">Secondary</ion-button>
      <ion-button color="danger">Danger</ion-button>
      <ion-button color="dark">Dark</ion-button>

      <ion-fab-button class="todo-fab">
        <ion-icon name="add"></ion-icon>
      </ion-fab-button>-->
    </ion-content>
    <!-- </ion-page> -->
  </layout-menu>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import fetch from "@/fetch.js";
import Toast from "@/components/Toast.js";
const toast = new Toast();

export default {
  name: "home",
  components: {
    //HelloWorld
  },
  data() {
    var tournamentId = this.$route.params.tournament || 118;
    return {
      tournamentId: tournamentId,
      tournament: {},
      state: null,
      errors: []
    };
  },
  methods: {
    changeState(state) {
      this.results = "";
      var tournamentId = this.tournamentId;
      fetch
        .post(`tournamentState/${tournamentId}?state=${state}`)
        .then(() => {
          this.loadData();
          const message = "Mode updated to " + state;
          toast.show(message);
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    loadData() {
      var tournamentId = this.tournamentId;
      fetch
        .get(`tournament/${tournamentId}`)
        .then(response => {
          this.tournament = response.data;
          this.state = this.tournament.state;
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