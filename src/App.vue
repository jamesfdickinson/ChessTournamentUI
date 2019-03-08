
<template>
  <router-view :key="$route.fullPath"/>
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
        name: "rounds",
        params: { tournament: tournamentId }
      });
    }
  }
};
</script>

