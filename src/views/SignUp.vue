<template>
  <layout-no-menu>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>

        <ion-title>Registration</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div v-if="this.state === 'players'">
        <ion-item>
          <ion-label class="ion-text-center">
            <h1>Players</h1>
          </ion-label>
        </ion-item>
        <ion-list>
          <ion-item v-for="player in regirestedPlayers" :key="player.id">
            <ion-avatar slot="start">
              <AvatarIcon :name="player.firstName" :image="player.avatar"></AvatarIcon>
            </ion-avatar>
            <ion-label>
              <h2>{{ player.firstName }} {{ player.lastName }}</h2>
              <p v-if="player.grade || player.team">
                <span v-if="player.grade">Grade {{ player.grade }}</span>
                <span v-if="player.grade && player.team"> • </span>
                <span v-if="player.team">{{ player.team }}</span>
              </p>
            </ion-label>
            <ion-label v-if="tournament.allowPayment" :color="player.paid ? 'success' : 'danger'" slot="end">
              {{ player.paid ? '[Paid]' : '[Unpaid]' }}
            </ion-label>
          </ion-item>
        </ion-list>

        <ion-item v-if="showClosed">
          <ion-label class="ion-text-center">
            <p>Registration is closed</p>
          </ion-label>
        </ion-item>

        <div class="ion-padding-horizontal ion-margin-top">
          <ion-button v-if="allowAnotherPlayer" expand="block" color="secondary" @click="addAnotherPlayer">
            Add Another Player
          </ion-button>
          <ion-button v-if="paymentNeeded" expand="block" class="ion-margin-top" @click="payment">
            Continue to Payment
          </ion-button>
        </div>

      </div>
      <div v-if="this.state === 'register'">
        <ion-item>
          <ion-label class="ion-text-center">
            <h1>Player Registration</h1>
          </ion-label>
        </ion-item>
        <ion-item v-if="tournament.signUpText">
          <p v-html="tournament.signUpText"></p>
        </ion-item>
        <ion-item>
          <router-link :to="{ name: 'FAQ' }">
            <a>FAQ, Rules, and Terms and Conditions</a>
          </router-link>
        </ion-item>
        <form @submit.prevent="handleSubmit">
          <ion-list>
            <ion-item>
              <ion-label position="stacked">Name</ion-label>
              <ion-input :value="player.firstName" @input="player.firstName = $event.target.value"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Last Name</ion-label>
              <ion-input :value="player.lastName" @input="player.lastName = $event.target.value"></ion-input>
            </ion-item>
            <ion-item v-if="teams.length > 0">
              <ion-label position="stacked">Team/Club</ion-label>
              <div style="width: 100%">
                <select v-model="player.team">
                  <option disabled value="">Select One</option>
                  <option v-for="team in teams" :key="team" :value="team">
                    {{ team }}
                  </option>
                  <option value="">Other</option>
                </select>
              </div>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Team/Club (optional)</ion-label>
              <ion-input :value="player.team" @input="player.team = $event.target.value"></ion-input>
            </ion-item>

            <ion-item v-if="type === 'Chess'">
              <ion-label position="stacked">Grade</ion-label>
              <div style="width: 100%">
                <select v-model="player.grade"
                  @change="player.rating = player.grade * 100 + parseInt(skillLevelAdjustment)">
                  <option disabled value="">Select One</option>
                  <option value="0">K</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>

                </select>
              </div>
            </ion-item>
            <ion-item v-if="type === 'Chess'">
              <ion-label position="stacked">Rating</ion-label>
              <ion-input type="number" :value="player.rating" @input="player.rating = $event.target.value"></ion-input>
            </ion-item>

            <ion-item v-if="type === 'Chess'">
              <ion-label position="stacked">Gender</ion-label>
              <div style="width: 100%;">
                <select v-model="player.gender">
                  <option disabled value="">Select One</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </ion-item>
            <ion-item v-if="type === 'Chess'">
              <ion-label position="stacked">Parent's Name</ion-label>
              <ion-input :value="player.parentName" @input="player.parentName = $event.target.value"></ion-input>
            </ion-item>

            <ion-item v-if="type === 'Chess'">
              <ion-label position="stacked">Phone Number</ion-label>
              <ion-input inputmode="tel" :value="player.parentPhone"
                @input="player.parentPhone = $event.target.value"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Email</ion-label>
              <ion-input type="email" :value="player.email" @input="player.email = $event.target.value"></ion-input>
            </ion-item>

            <ion-item v-if="tournament.accessCodeBasic">
              <ion-label position="stacked">Access Code</ion-label>
              <ion-input :value="password" @input="password = $event.target.value"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label text-wrap>I agree to the terms of use, privacy policy, and tournament
                rules</ion-label>
              <ion-checkbox slot="start" :checked="agreeTerms"
                @ionChange="agreeTerms = $event.target.checked == true"></ion-checkbox>
            </ion-item>
          </ion-list>

          <ul style="color: red">
            <li v-for="error in errors" v-bind:key="error">*{{ error }}</li>
          </ul>
          <div class="ion-padding-horizontal">
            <ion-button type="submit" expand="block">Next</ion-button>
          </div>
        </form>
      </div>
      <div style="height:200px"></div>
    </ion-content>
  </layout-no-menu>
</template>

<script>
import AvatarIcon from "@/components/AvatarIcon.vue";
import TournamentAPI from "@/services/TournamentAPI";
import Authentication from "@/services/Authentication";
const tournamentAPI = new TournamentAPI();
const authentication = new Authentication();
export default {
  name: "home",
  components: { AvatarIcon },
  data() {
    var tournamentId = this.$route.params.tournament;
    var playerId = this.$route.params.id;
    var player = {
      tournamentId: tournamentId,
      firstName: "",
      lastName: "",
      grade: "",
      team: "",
      rating: 1000,
      division: 1,
      isPresent: false,
      paid: false,
      parentName: "",
      email: "",
      gender: "",
      parentPhone: "",
      emailHelpList: true,
      allowNotifications: true,
    };
    return {
      state: "loading",
      playerId: playerId,
      tournamentId: tournamentId,
      tournament: {},
      teams: [],
      skillLevelAdjustment: 0,
      type: null,
      player: player,
      agreeTerms: false,
      password: null,
      errors: [],
      regirestedPlayers: []
    };
  },
  computed: {
    allowAnotherPlayer() {
      if (!this.tournament) return false;
      if (!this.tournament.allowMultiplePlayersPerLogin) return false;
      if (!this.tournament.allowRegistration) return false;
      return true;
    },
    paymentNeeded() {
      if (!this.tournament) return false;
      if (!this.tournament.allowPayment) return false;
      const anyUnpaid = this.regirestedPlayers.some(player => !player.paid);
      return anyUnpaid;
    },
    showClosed() {
      if (!this.tournament) return false;
      if (this.tournament.allowRegistration) return false;
      return true;
    }
  },
  methods: {
    //if player arealdy regirested show list of players.  Find them by email or new field called CreatedBy (username)
    //next state function
    async flow() {
      const tournament = this.tournament;
      const registeredPlayers = this.getRegisteredPlayers();

      //show registration form if no players are registered
      if (registeredPlayers.length === 0 && tournament.allowRegistration) {
        await this.populateForm();
        this.state = "register";
      } else {
        await this.populateRegisteredPlayers();
        this.state = "players";
      }
    },
    async populateRegisteredPlayers() {
      this.state = "players";
      let tournamentId = this.tournamentId;
      try {
        this.tournament = await tournamentAPI.tournamentView(tournamentId)
        const tournament = this.tournament;

        //gets all players with the same email as the current user
        this.regirestedPlayers = this.getRegisteredPlayers()
      } catch (e) {
        this.errors.push(e);
      }

    },
    getRegisteredPlayers() {
      const tournament = this.tournament;
      const user = authentication.getUser();
      if (!tournament) return [];
      if (!user) return [];

      const regirestedPlayers = tournament?.players?.filter(player => player.email === user.email || (player.createdBy && player.createdBy === user.username));
      return regirestedPlayers;
    },
    back() {
      this.$router.back();
    },
    addAnotherPlayer() {
      this.populateForm();
    },
    validatePlayer(player, agreeTerms, isTeamRequired, accessCodeBasic, password) {
      const errors = [];
      
      if (!agreeTerms) errors.push("Agree to terms is required.");
      if (!player.firstName) errors.push("First name is required.");
      if (!player.team && isTeamRequired) errors.push("Team is required.");
      if (!player.grade) errors.push("Grade is required.");
      if (isNaN(player.grade)) errors.push("Grade is not a number.");
      if (isNaN(player.rating)) errors.push("Rating is not a number.");
      if (!player.email) errors.push("Email is required.");
      
      const trimmedAccessCode = accessCodeBasic ? accessCodeBasic.trim() : null;
      if (trimmedAccessCode && trimmedAccessCode != password) {
        errors.push("Incorrect access code");
      }
      
      return errors;
    },
    payment(){
      this.$router.push({ name: `Payment`, params: { tournament: this.tournamentId } });
    },
    finish() {
      //check if payment is required
      let paymentRequired = this.tournament && this.tournament.allowPayment;
      if (paymentRequired) {
        this.$router.push({ name: `Payment`, params: { tournament: this.tournamentId } });
        return;
      } else {
        this.$router.push({ name: `Tournament`, params: { tournament: this.tournamentId } });
      }

    },
    populateForm() {
      //reset all fields
      this.player = {
        tournamentId: this.tournamentId,
        firstName: "",
        lastName: "",
        grade: "",
        team: "",
        rating: 1000,
        division: 1,
        isPresent: false,
        paid: false,
        parentName: "",
        email: "",
        gender: "",
        parentPhone: "",
        emailHelpList: true,
        allowNotifications: true,
      };
      this.agreeTerms = false;
      //this.password = null; //dont reset password
      this.errors = [];


      //load tournament data
      let tournament = this.tournament;
      if (tournament) {
        const allowRegistration = tournament.allowRegistration;

        if (allowRegistration) this.state = "register";
        if (!allowRegistration) this.state = "players";

        if (tournament.type) {
          this.type = tournament.type;
          if (tournament.type === "Chess") {
            this.player.firstName = "";
          }
        }
        if (tournament.teams) {
          this.teams = tournament.teams.split(",").map(function (item) {
            return item.trim();
          }).sort();
        }
      }

      //load user data
      let user = authentication.getUser();
      if (user) {
        if (user.email) this.player.email = user.email;
        if (user.name) this.player.firstName = user.name;
        if (user.gamerId) this.player.gamerId = user.gamerId;
        if (user.avatar) this.player.avatar = user.avatar;
        if (user.timeZone) this.player.timeZone = user.timeZone;
        if (user.userName) this.player.createUser = user.userName;
      }

      if (user) {
        const regirestedPlayers = tournament?.players?.filter(player => player.email === user.email || (player.createdBy && player.createdBy === user.username));
        this.regirestedPlayers = regirestedPlayers;
        console.log(regirestedPlayers);
      }
    },
    async handleSubmit() {
      let tournamentId = parseInt(this.tournamentId);
      let player = this.player;
      let agreeTerms = this.agreeTerms;
      let tournament = this.tournament;
      let password = this.password;
      let accessCodeBasic = null;
      let isTeamRequired = this.teams.length > 0;

      //add default grade
      if (!player.grade) player.grade = 12;

      if (!player.timeZone) {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        player.timeZone = timezone;
      }


      player.tournamentId = tournamentId;
      if (tournament) {
        accessCodeBasic = tournament.accessCodeBasic;
      }

      if (isNaN(player.rating)) player.rating = 1000;

      this.errors = this.validatePlayer(player, agreeTerms, isTeamRequired, accessCodeBasic, password);
      if (this.errors.length > 0) return;

      //todo: handle flow in flow()
      try {
        const response = await tournamentAPI.playerCreate(player);
        console.log(response);
        if (this.tournament.allowMultiplePlayersPerLogin) {
          this.populateRegisteredPlayers();
        }
        else {
          this.finish();
        };
      } catch (e) {
        //display error
        console.error(e);
        this.errors.push("error signing up.");
        if (e.response && e.response.data) {
          console.error(e.response.data);
          this.errors.push(e.response.data);
        }
      }

    },
    async loadData() {
      let tournamentId = this.tournamentId;
      try {
        this.tournament = await tournamentAPI.tournamentView(tournamentId);
      } catch (e) {
        this.errors.push(e);
      }
      this.flow();

    },
  },
  created() {
    this.loadData();
  },
};
</script>
