<template>
  <layout-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon
            name="arrow-round-back"
            size="large"
            @click="$router.push({ name: 'Tournament'})"
          ></ion-icon>
        </ion-buttons>

        <ion-title>Sign Up Complete</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-item>
        <h3>Sign Up Complete</h3>
      </ion-item>
      <router-link :to="{ name: 'FAQ'}">
        <ion-item button detail="true">
          <ion-icon slot="start" name="book"></ion-icon>
          <ion-label>Read the FAQ and Rules</ion-label>
        </ion-item>
      </router-link>
      <router-link :to="{ name: 'Tournament'}">
        <ion-item button detail="true">
          <ion-icon slot="start" name="home"></ion-icon>
          <ion-label>Tournament Home</ion-label>
        </ion-item>
      </router-link>
      <router-link :to="{ name: 'Tournaments'}">
        <ion-item button detail="true">
          <ion-icon slot="start" name="trophy"></ion-icon>
          <ion-label>Other Tournaments</ion-label>
        </ion-item>
      </router-link>
    </ion-content>

    <!-- </ion-page> -->
  </layout-menu>
</template>

<script>
//import fetch from "@/fetch.js";

export default {
  name: "home",
  components: {},
  data() {
    var tournamentId = this.$route.params.tournament;

    return {
      tournamentId: tournamentId,
      errors: []
    };
  },
  methods: {
    back() {
      this.$router.back();
    },

    loadData() {}
  },
  created() {
    this.loadData();
  }
};
</script>
