<template>
  <ion-items>
    <ion-item button detail="true" v-on:click="openPlayers()">
      <ion-icon slot="start" name="contact"></ion-icon>
      <ion-label>Players</ion-label>
    </ion-item>
    <ion-item button detail="true" v-on:click="openRounds()">
      <ion-icon slot="start" name="paper"></ion-icon>
      <ion-label>Rounds</ion-label>
    </ion-item>
    <ion-item button detail="true" v-on:click="openScores()">
      <ion-icon slot="start" name="podium"></ion-icon>
      <ion-label>Scores</ion-label>
    </ion-item>

    <ion-item button detail="true" v-on:click="openSignUp()">
      <ion-icon slot="start" name="clipboard"></ion-icon>
      <ion-label>Sign Up</ion-label>
    </ion-item>

    <ion-item button detail="true" v-on:click="openFAQ()">
      <ion-icon slot="start" name="help"></ion-icon>
      <ion-label>FAQ</ion-label>
    </ion-item>

    <ion-list-header>
      <ion-label>Recorder</ion-label>
    </ion-list-header>
    <router-link :to="{ name: 'Registration', params: { tournament: tournamentId }}">
      <ion-item button detail="true">
        <ion-icon slot="start" name="clipboard"></ion-icon>
        <ion-label>Registration</ion-label>
      </ion-item>
    </router-link>

    <ion-list-header>
      <ion-label>Coach</ion-label>
    </ion-list-header>
    <ion-item button detail="true" v-on:click="openRoster()">
      <ion-icon slot="start" name="filing"></ion-icon>
      <ion-label>Roster</ion-label>
    </ion-item>
    <ion-list-header>
      <ion-label>Admin</ion-label>
    </ion-list-header>

    <router-link :to="{ name: 'admin', params: { tournament: tournamentId }}">
      <ion-item button detail="true">
        <ion-icon slot="start" name="cog"></ion-icon>
        <ion-label>Admin Settings</ion-label>
      </ion-item>
    </router-link>
    <ion-list-header>
      <ion-label>Other</ion-label>
    </ion-list-header>
    <router-link :to="{ name: 'tournaments'}">
      <ion-item button detail="true">
        <ion-icon slot="start" name="trophy"></ion-icon>
        <ion-label>Tournaments</ion-label>
      </ion-item>
    </router-link>
  </ion-items>
</template>

<script>
export default {
  name: "menutournament",
  components: {},
  data() {
    var tournamentId = this.$route.params.tournament || 117;
    return {
      tournamentId: tournamentId,
      errors: []
    };
  },
  methods: {
    openHome() {
      this.$router.push({
        name: "tournament",
        params: { tournament: this.tournamentId }
      });
    },
    openPlayers() {
      this.$router.push({
        name: "players",
        params: { tournament: this.tournamentId }
      });
    },
    openRounds() {
      this.$router.push({
        name: "rounds",
        params: { tournament: this.tournamentId }
      });
    },
    openScores() {
      this.$router.push({
        name: "reports",
        params: { tournament: this.tournamentId }
      });
    },
    openSignUp() {
      this.$router.push({
        name: "signup",
        params: { tournament: this.tournamentId }
      });
    },
    openFAQ() {
      this.$router.push({
        name: "faq",
        params: { tournament: this.tournamentId }
      });
    },
    clearData() {
      this.$router.push({ path: "home" });
      this.posts = [];
    },
    loadData() {
      // var tournamentId = this.tournamentId;
      // fetch
      //   .get(`tournament/${tournamentId}`)
      //   .then(response => {
      //     this.tournament = response.data;
      //   })
      //   .catch(e => {
      //     this.errors.push(e);
      //   });
    }
  },
  created() {
    this.loadData();
  }
};
</script>
