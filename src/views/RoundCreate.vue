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
      <ion-list>
        <ion-list-header>
          <ion-label >Paring Algorithm</ion-label>
        </ion-list-header>
         <router-link :to="{ name: 'RoundCreateSwiss', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="options"></ion-icon>
            <ion-label>Swiss </ion-label>
          </ion-item>
        </router-link>
           <!-- <router-link :to="{ name: 'RoundCreateSingleElimination', params: { tournament: tournamentId }}">
          <ion-item button detail="true">
            <ion-icon slot="start" name="git-branch"></ion-icon>
            <ion-label>Single Elimination </ion-label>
          </ion-item>
        </router-link> -->
      </ion-list>
    </ion-content>
    <!-- </ion-page> -->
  </layout-menu>
</template>

<script>

export default {
  name: "home",

  components: {},
  data() {
    var tournamentId = this.$route.params.tournament;
    return {
      round: 1,
      tournamentId: tournamentId,
      errors: [],
      message: ""
    };
  },
  methods: {

  },
  created() {
  
  }
};
</script>

<style>
.roundMatches {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.roundMatches td,
.roundMatches th {
  border: 1px solid #ddd;
  padding: 8px;
}

.roundMatches tr:hover {
  background-color: #ddd;
}

.roundMatches th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: var(--ion-color-primary, #3880ff);
  color: white;
}

.xxroundMatches tr:nth-child(even) {
  background-color: #f2f2f2;
}

.roundMatches tr:nth-child(4n-3) td {
  background-color: #f2f2f2;
}
.roundMatches tr:nth-child(4n-2) td {
  background-color: #f2f2f2;
}
.roundMatches tr:nth-child(4n-1) td {
  background-color: #ffffff;
}
.roundMatches tr:nth-child(4n-0) td {
  background-color: #ffffff;
}
</style>
