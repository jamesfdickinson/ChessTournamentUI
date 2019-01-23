
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
                <ion-item button detail="true" v-on:click="openHome()">
                  <ion-icon slot="start" name="home"></ion-icon>
                  <ion-label>Home</ion-label>
                </ion-item>
                <Menu/>
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
import Menu from "@/components/Menu.vue";

export default {
  name: "home",
  components: {
    Menu
  },
  data() {
    var tournamentId = this.$route.params.tournament || 117;
    return {
      tournamentId: tournamentId
    };
  },
  methods: {
    openHome() {
      var tournamentId = this.$route.params.tournament || 117;
      this.$router.push({
        name: "tournament",
        params: { tournament: tournamentId }
      });
    },
    openPlayers() {
      var tournamentId = this.$route.params.tournament || 117;
      this.$router.push({
        name: "players",
        params: { tournament: tournamentId }
      });
    },
    openRounds() {
      var tournamentId = this.$route.params.tournament || 117;
      this.$router.push({
        name: "rounds",
        params: { tournament: tournamentId }
      });
    }
  }
};
</script>

