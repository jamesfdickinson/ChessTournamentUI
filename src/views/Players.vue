<template>
  <layout-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title>Players</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-searchbar
        placeholder="First Name, Last Name, or School"
        :value="searchInput"
        @ionInput="searchInput = $event.target.value;"
        @ionChange="searchInput= $event.target.value;"
      ></ion-searchbar>
      <!-- <ul>
        <li v-for="tournament of tournaments" :key="tournament.id">
          <p>
            <strong>{{tournament.name}}</strong>
          </p>
          <p>{{tournament.name}}</p>
        </li>
      </ul>-->
      <ion-list>
         <ion-item
          detail="true"
          v-for="player of filteredItems"
          :key="player.playerId"
          v-bind:mhref="`player/${player.playerId}`"
          v-on:click="openPlayer(player.playerId)"
        >
 
    <!-- <ion-icon name="contact" slot="start"></ion-icon>  -->
               <SchoolIcon :title="player.school" slot="start"></SchoolIcon>
        
          <ion-label>{{player.firstName}} {{player.lastName}}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <!-- </ion-page> -->
  </layout-menu>
</template>

<script>
import fetch from "@/fetch.js";
import SchoolIcon from "@/components/SchoolIcon.vue";
export default {
  name: "home",
  components: { SchoolIcon },
  data() {
    return {
      searchInput: "",
      players: [],
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
    openPlayer(id) {
      this.$router.push({ name: "Player", params: { id: id } });
    },
    clearData() {
      this.players = [];
    },
    loadData() {
      var tournamentId = this.$route.params.tournament;
      fetch
        .get(`players/${tournamentId}`)
        .then(response => {
          this.players = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  computed: {
    filteredItems() {
      let filteredRound = this.players;
      let searchInput = this.searchInput;
      if (searchInput) {
        searchInput = searchInput.toLowerCase();
        filteredRound = filteredRound.filter(p => {
          if (p.firstName && p.firstName.toLowerCase().startsWith(searchInput))
            return true;
          if (p.lastName && p.lastName.toLowerCase().startsWith(searchInput))
            return true;
          if (p.school && p.school.toLowerCase().startsWith(searchInput))
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
