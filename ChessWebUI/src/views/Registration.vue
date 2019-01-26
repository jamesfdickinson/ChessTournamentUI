<template>
  <div class="ion-page" main>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-toggle>
            <ion-button>
              <ion-icon slot="icon-only" name="menu"></ion-icon>
            </ion-button>
          </ion-menu-toggle>
        </ion-buttons>
        <ion-title>Registration</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list> 
      <ion-item>   
         <ion-searchbar 
        :value="searchInput"
        @ionInput="searchInput = $event.target.value;"
        @ionChange="searchInput= $event.target.value;"
      ></ion-searchbar>
    
        <ion-label>Hide Checked-In</ion-label>
        <ion-toggle slot="end"
          :checked="hideCheckedIn"

          @ionChange="hideCheckedIn= $event.target.checked;"
        ></ion-toggle>
      </ion-item>
     
        <ion-item color="light">
          <ion-icon v-on:click="sortBy('isPresent')" slot="start" name="checkmark"></ion-icon>
          <ion-label v-on:click="sortBy('firstName')">Name</ion-label>
          <ion-label v-on:click="sortBy('school')">School</ion-label>
        </ion-item>
        <ion-item
          detail="true" button
          v-for="player of filteredItems"
          :key="player.playerId"
          v-on:click="openPlayer(player.playerId)"
        >
          <ion-icon v-if="player.isPresent" slot="start" name="checkmark" color="secondary"></ion-icon>
          <ion-icon v-if="!player.isPresent" slot="start" name="radio-button-off" color="secondary"></ion-icon>

          <ion-label>{{player.firstName}} {{player.lastName}}</ion-label>
          <ion-label>{{player.school}}</ion-label>
        </ion-item>
      </ion-list>

       </ion-content>
    <!-- </ion-page> -->
  </div>
</template>

<script>
import fetch from "@/fetch.js";

export default {
  name: "home",

  components: {},
  data() {
    //todo: save app wide settings
    //remember hideCheckedIn
    var hideCheckedIn = localStorage.getItem("hideCheckedIn");
    if (hideCheckedIn == null) hideCheckedIn = true;
    else hideCheckedIn = JSON.parse(hideCheckedIn);

  

    var tournamentId = this.$route.params.tournament;
    return {
      tournamentId: tournamentId,
      searchInput: "",
      hideCheckedIn: hideCheckedIn,
      sortKey: "",
      sortKeys: [],
      sortOrders: [],
      players: [],
      errors: []
    };
  },
  methods: {
    openPlayer(id) {
      let tournamentId = this.tournamentId;
      this.$router.push({
        name: "PlayerEdit",
        params: { id: id, tournament: tournamentId }
      });
    },
    // toggleHideCheckedIn() {
    //   let hideCheckedIn = !this.hideCheckedIn;
    //   this.hideCheckedIn = hideCheckedIn;
    //   //remember hideCheckedIn
    //   localStorage.setItem("hideCheckedIn", hideCheckedIn);
    // },
    sortBy: function(key) {
      //remove it if it is in the list
      var index = this.sortKeys.indexOf(key);
      if (index > -1) {
        this.sortKeys.splice(index, 1);
      }
      //append key to begaining of list
      this.sortKeys.unshift(key);

      //sort order
      if (!this.sortOrders[key]) this.sortOrders[key] = -1;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    },
    // sortBy(key) {
    //   this.sortKey = key;
    //   //sort order
    //   if(!this.sortOrders[key]) this.sortOrders[key] = -1;
    //   this.sortOrders[key] = this.sortOrders[key] * -1;
    // },
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
      if(this.hideCheckedIn != null)
      localStorage.setItem("hideCheckedIn", this.hideCheckedIn);
      //todo: null
      let data = this.players;
      let hideCheckedIn = this.hideCheckedIn;
      var sortKeys = this.sortKeys;
      let sortOrders = this.sortOrders;
      let searchInput = this.searchInput;

      if (hideCheckedIn) {
        data = data.filter(p => {
          return !p.isPresent;
        });
      }
      if (sortKeys) {
        data = data.slice().sort(function(a, b) {
          for (let i = 0; i < sortKeys.length; i++) {
            let sortKey = sortKeys[i];
            let order = sortOrders[sortKey] || 1;
            let aV = a[sortKey];
            let bV = b[sortKey];
            let compValue = aV === bV ? 0 : aV > bV ? 1 : -1;
            if (compValue !== 0) return compValue * order;
          }
          return 0;
        });
      }
      if (searchInput) {
        searchInput = searchInput.toLowerCase();
        data = data.filter(p => {
          if (p.firstName && p.firstName.toLowerCase().startsWith(searchInput))
            return true;
          if (p.lastName && p.lastName.toLowerCase().startsWith(searchInput))
            return true;
          if (p.school && p.school.toLowerCase().startsWith(searchInput))
            return true;
          return false;
        });
      }
      return data;
    }
  },
  created() {
    this.loadData();
  }
};
</script>
