
<template>
  <div id="app">
    <ion-app>
      <ion-split-pane when="sm" content-id="content">
        <ion-menu>
          <ion-header>
            <ion-toolbar color="primary">
              <ion-title>Menu</ion-title>
            </ion-toolbar>
          </ion-header>

          <ion-content>
            <ion-list>
              <ion-list-header>Navigate</ion-list-header>
              <ion-menu-toggle auto-hide="false">
                <ion-list>
                  <ion-item button detail="true" v-on:click="openHome()">
                    <ion-icon slot="start" name="home"></ion-icon>
                    <ion-label>Home</ion-label>
                  </ion-item>
                  <ion-item button detail="true" v-on:click="openPlayers()">
                    <ion-icon slot="start" name="contact"></ion-icon>
                    <ion-label>Players</ion-label>
                  </ion-item>
                  <ion-item button detail="true" v-on:click="openRounds()">
                    <ion-icon slot="start" name="paper"></ion-icon>
                    <ion-label>Rounds</ion-label>
                  </ion-item>
                  <ion-item button detail="true" v-on:click="openPlayers()">
                    <ion-icon slot="start" name="podium"></ion-icon>
                    <ion-label>Scores</ion-label>
                  </ion-item>

                  <ion-item button detail="true" v-on:click="openPlayers()">
                    <ion-icon slot="start" name="clipboard"></ion-icon>
                    <ion-label>Sign Up</ion-label>
                  </ion-item>

                  <ion-item button detail="true" v-on:click="openPlayers()">
                    <ion-icon slot="start" name="help"></ion-icon>
                    <ion-label>FAQ</ion-label>
                  </ion-item>
                  <ion-list-header>
                    <ion-label>Admin</ion-label>
                  </ion-list-header>

                  <ion-item button detail="true" v-on:click="openPlayers()">
                    <ion-icon slot="start" name="filing"></ion-icon>
                    <ion-label>Roster</ion-label>
                  </ion-item>
                  <ion-item button detail="true" v-on:click="openPlayers()">
                    <ion-icon slot="start" name="create"></ion-icon>
                    <ion-label>Recorder</ion-label>
                  </ion-item>
                  <router-link :to="{ name: 'admin', params: { tournament: tournamentId }}">
                    <ion-item button detail="true">
                      <ion-icon slot="start" name="cog"></ion-icon>
                      <ion-label>Admin Settings</ion-label>
                    </ion-item>
                  </router-link>
                  <ion-list-header>
                    <ion-label>Other</ion-label>
                  </ion-list-header>
                  <ion-item button detail="true" v-on:click="openPlayers()">
                    <ion-icon slot="start" name="trophy"></ion-icon>
                    <ion-label>Tournaments</ion-label>
                  </ion-item>
                </ion-list>
              </ion-menu-toggle>
            </ion-list>
          </ion-content>
        </ion-menu>

        <div id="content">
          <router-view/>
        </div>
      </ion-split-pane>
    </ion-app>
  </div>
</template>
<!-- 
<style src='@ionic/core/css/core.css'></style>
<style src='@ionic/core/css/ionic.bundle.css'></style>
!-->

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Menu from "./components/Menu.vue";

export default {
  name: "home",
  components: {
    Menu
  },
  data() {
    var tournamentId = this.$route.params.tournament || 118;
    return {
      tournamentId: tournamentId
    };
  },
  methods: {
    openHome() {
      var tournamentId = this.$route.params.tournament || 118;
      this.$router.push({
        name: "tournament",
        params: { tournament: tournamentId }
      });
    },
    openPlayers() {
      var tournamentId = this.$route.params.tournament || 118;
      this.$router.push({
        name: "players",
        params: { tournament: tournamentId }
      });
    },
    openRounds() {
      var tournamentId = this.$route.params.tournament || 118;
      this.$router.push({
        name: "rounds",
        params: { tournament: tournamentId }
      });
    }
  }
};
</script>

