
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
          <router-view :key="$route.fullPath" />
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
    var tournamentId = this.$route.params.tournament || 120;
    return {
      tournamentId: tournamentId
    };
  },
  methods: {
    openHome() {
      var tournamentId = this.$route.params.tournament || 120;
      this.$router.push({
        name: "Tournament",
        params: { tournament: tournamentId }
      });
    },
    openPlayers() {
      var tournamentId = this.$route.params.tournament || 120;
      this.$router.push({
        name: "Players",
        params: { tournament: tournamentId }
      });
    },
    openRounds() {
      var tournamentId = this.$route.params.tournament || 120;
      this.$router.push({
        name: "Rounds",
        params: { tournament: tournamentId }
      });
    }
  }
};
</script>

