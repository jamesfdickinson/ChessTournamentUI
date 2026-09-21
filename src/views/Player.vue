<template>
  <layout-menu>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title>Player</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="$router.push({ name: 'PlayerEdit', params: { id: id } })">
            <ion-icon name="create"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!--<ion-card>
        <ion-card-header color="primary">
          <ion-card-title>Profile</ion-card-title>
        </ion-card-header>
      <ion-card-content>-->
      <!-- </ion-card-content>
      </ion-card>-->
      <ion-avatar style="margin: 15px auto; width: 100px; height: 100px">
        <img :src="player.avatar ? player.avatar : '/images/avatars/agent.png'" />
      </ion-avatar>
      <div style="text-align: center; margin-bottom: 10px">
        <ion-button
          size="small"
          :disabled="!allowAvatarChange"
          @click="editAvatar"
        >
          Edit Avatar
        </ion-button>
          <ion-button size="small" :disabled="!allowTeamChange" @click="
            $router.push({
              name: 'TeamEdit',
              params: { id: player.playerId },
            })
            ">Update Team</ion-button>
      </div>
      <ion-list>
        <ion-item>
          <ion-label position="fixed">Name</ion-label>
          <ion-label slot>{{ player.firstName }} {{ player.lastName }}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Gamer ID</ion-label>
          <ion-label slot>{{ player.gamerId }}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Team</ion-label>
          <ion-label slot>{{ player.team }}</ion-label>
        
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Grade</ion-label>
          <ion-label slot>{{ player.grade }}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Rating</ion-label>
          <ion-label slot>{{ player.rating }}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Division</ion-label>
          <ion-label slot>{{ player.division }}</ion-label>
        </ion-item>
        <!-- </ion-list>
     
        <ion-list>-->
        <ion-list-header color="primary">Score</ion-list-header>
        <ion-item>
          <ion-label position="fixed">Score</ion-label>
          <ion-label slot>{{ player.points }}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Tie Breaker</ion-label>
          <ion-label slot>{{ player.tieBreaker }}</ion-label>
        </ion-item>
        <!-- </ion-list>

        <ion-list>-->
        <ion-list-header color="primary">Games</ion-list-header>
        <ion-item xdetail="true" v-for="playerGame of playerGames" :key="playerGame.Id"
          v-on:click="openPlayer(playerGame.opponentId)">
          <ion-icon v-if="playerGame.color == 'Black'" src="/images/chess_pawn_black.svg" slot></ion-icon>
          <ion-icon v-else-if="playerGame.color == 'White'" src="/images/chess_pawn_white.svg" slot></ion-icon>
          <!-- <ion-note slot="start" >{{  playerGame.round }}</ion-note> -->
          <ion-label>{{ playerGame.opponets }}</ion-label>
          <ion-badge slot="end">{{ playerGame.points }}</ion-badge>
          <ion-note slot="end">{{ playerGame.tieBreaker }}</ion-note>
        </ion-item>
        <ion-list-header v-if="achievements && achievements.length > 0" color="primary">Achievements</ion-list-header>
        <ion-item v-for="achievement of achievements" :key="achievement">
          <ion-icon slot="start" name="trophy"></ion-icon>
          <ion-label>{{ achievement }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <!-- </ion-page> -->
  </layout-menu>
</template>

<script>
import TournamentAPI from "@/services/TournamentAPI";
import fetch from "@/services/fetch";
import LayoutMenu from "@/components/LayoutMenu.vue";
import Authentication from "@/services/Authentication";
const tournamentAPI = new TournamentAPI();
const authentication = new Authentication();
export default {
  name: "home",

  components: { LayoutMenu },
  data() {
    var tournamentId = this.$route.params.tournament;
    var id = this.$route.params.id;
    let user = authentication.getUser();
    return {
      id: id,
      tournamentId: tournamentId,
      tournament: {},
      player: {},
      playerGames: {},
      achievements: [],
      errors: [],
      userId: user && (user.userName || user.username) ? (user.userName || user.username) : null,
      userEmail: user && user.email ? user.email : null,
      userRoles: user && user.roles ? user.roles : {},
      allowTeamChange: false,
      allowAvatarChange: false,
    };
  },
  methods: {
    openRound(id) {
      this.$router.push({ name: "Round", params: { id: id } });
    },
    openPlayer(id) {
      let tournamentId = this.tournamentId;
      this.$router.push({ name: "Player", params: { id: id, tournament: tournamentId } });
    },
    editPlayer() {
      var id = this.$route.params.id;
      let tournamentId = this.tournamentId;
      this.$router.push({
        name: "PlayerEdit",
        params: { id: id, tournament: tournamentId },
      });
    },
    editAvatar() {
      if (!this.allowAvatarChange) return;
      var id = this.$route.params.id;
      let tournamentId = this.tournamentId;
      this.$router.push({
        name: "AvatarEdit",
        params: { id: id, tournament: tournamentId },
      });
    },
    loadData() {
      var id = this.$route.params.id;

      fetch
        .get(`player/${id}`)
        .then((response) => {
          this.player = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });

      fetch
        .get(`player/games/${id}`)
        .then((response) => {
          this.playerGames = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });

      fetch
        .get(`achievement/${id}`)
        .then((response) => {
          this.achievements = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      //load tournament for team change
      //todo: this data should be used for the player and player/games and achievement to avoid multiple calls
      let tournamentId = this.tournamentId;
      let playerId = this.id;
      let userId = this.userId;
      let userEmail = this.userEmail;
      let userRoles = this.userRoles || {};
      tournamentAPI
        .tournamentView(tournamentId)
        .then((data) => {
          let tournament = data || {};
          this.tournament = tournament;
          //get player
          let player = tournament.players ? tournament.players.find((p) => p.playerId == playerId) : null;
          //this.player = player || {};

          // Check if current player is the logged-in user
          const isSelfPlayer = !!(player && ((userEmail && player.email === userEmail) || (userId && player.email === userId)));

          let hasTournamentAccess = null;
          if (Array.isArray(userRoles)) {
            if (userRoles.includes("0-SuperAdmin")) {
              hasTournamentAccess = true;
            } 
            if (userRoles.includes(tournamentId + "-Admin")) {
              hasTournamentAccess = true;
            } 
            if (userRoles.includes(tournamentId + "-Recorder")) {
              hasTournamentAccess = true;
            }
          } 

          this.allowTeamChange = (isSelfPlayer && tournament.allowTeamChange) || hasTournamentAccess;
          this.allowAvatarChange = isSelfPlayer || hasTournamentAccess;
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
