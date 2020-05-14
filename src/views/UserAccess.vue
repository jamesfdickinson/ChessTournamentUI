<template>
  <layout-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title>User Access</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content> 
      <ion-searchbar
        placeholder="Name, Role, or Email"
        :value="searchInput"
        @ionInput="searchInput = $event.target.value;"
        @ionChange="searchInput= $event.target.value;"
      ></ion-searchbar>
      <ion-list>
           <!-- <ion-item
          detail="true"
          v-for="users of filteredItems"
          :key="users.userId"
          v-bind:mhref="`player/${player.playerId}`"
          v-on:click="openPlayer(player.playerId)"
        > -->
        <ion-item
          detail="true"
          v-for="user of filteredItems"
          :key="user.id"

        >

          <ion-label>{{user.role}} - {{user.userName}}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <!-- </ion-page> -->
  </layout-menu>
</template>

<script>
import fetch from "@/fetch.js";

export default {
  name: "home",

  data() {
    return {
      searchInput: "",
      users: [],
      errors: []
    };
  },
  methods: {
    stringToColour(str) {
      var hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      var colour = "#";
      for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xff;
        value = Math.floor(value * 0.7); //make darker
        colour += ("00" + value.toString(16)).substr(-2);
      }
      return colour;
    },
    // openPlayer(id) {
    //  // this.$router.push({ name: "Player", params: { id: id } });
    // },
    clearData() {
      this.players = [];
    },
    loadData() {
      var tournamentId = this.$route.params.tournament;
      fetch
        .get(`users/${tournamentId}`)
        .then(response => {
          this.users = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  computed: {
    filteredItems() {
      let filteredRound = this.users;
      let searchInput = this.searchInput;
      if (searchInput) {
        searchInput = searchInput.toLowerCase();
        filteredRound = filteredRound.filter(p => {
          if (p.role && p.role.toLowerCase().startsWith(searchInput))
            return true;
          if (p.userName && p.userName.toLowerCase().startsWith(searchInput))
            return true;
          if (p.email && p.email.toLowerCase().startsWith(searchInput))
            return true;
          if (p.userId === searchInput)
            return true;
          return false;
        });
      }
      return filteredRound;
    }
  },
  created() {
    this.loadData();
  }
};
</script>
