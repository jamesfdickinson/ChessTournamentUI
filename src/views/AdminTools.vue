<template>
  <layout-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title>Admin Tools</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-list-header>
          <ion-label>Players</ion-label>
        </ion-list-header>
        <ion-item button detail="true" v-on:click="markAsPresent()">
          <ion-icon slot="start" name="checkbox"></ion-icon>
          <ion-label>Mark all as present</ion-label>
        </ion-item>
        <ion-item button detail="true" v-on:click="markAsNotPresent()">
          <ion-icon slot="start" name="checkbox"></ion-icon>
          <ion-label>Mark all as NOT present</ion-label>
        </ion-item>
        <ion-item button detail="true" v-on:click="resetRatings()">
          <ion-icon slot="start" name="star"></ion-icon>
          <ion-label>Reset ratings to 1000</ion-label>
        </ion-item>
        <ion-item button detail="true" v-on:click="resetRatingsByGrade()">
          <ion-icon slot="start" name="star"></ion-icon>
          <ion-label>Reset ratings based on grade</ion-label>
        </ion-item>
        <ion-item button detail="true" v-on:click="randomWins()">
          <ion-icon slot="start" name="trophy"></ion-icon>
          <ion-label>Random wins for current round</ion-label>
        </ion-item>
        <ion-item button detail="true" v-on:click="deleteAllRounds()">
          <ion-icon slot="start" name="trash"></ion-icon>
          <ion-label>Delete all rounds</ion-label>
        </ion-item>
        <ion-item button detail="true" v-on:click="deleteAllPlayers()">
          <ion-icon slot="start" name="trash"></ion-icon>
          <ion-label>Delete all players</ion-label>
        </ion-item>
         <ion-item button detail="true" v-on:click="updateAllAvatars()">
          <ion-icon slot="start" name="contact"></ion-icon>
          <ion-label>Update all avatars from JD</ion-label>
        </ion-item>
        <ion-item button detail="true" v-on:click="showToast()">
          <ion-icon slot="start" name="contact"></ion-icon>
          <ion-label>Test Show Toast</ion-label>
        </ion-item>
      </ion-list>
      <div style="color:green;">{{message}}</div>
      <div style="color:red;">{{error}}</div>
    </ion-content>
    <!-- </ion-page> -->
  </layout-menu>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import fetch from "@/services/fetch";
import Toast from "@/components/Toast.js";
export default {
  name: "home",
  components: {
    //HelloWorld
  },
  data() {
    var tournamentId = this.$route.params.tournament || 118;
    return {
      tournamentId: tournamentId,
      error: null,
      message: null
    };
  },
  methods: {
    markAsPresent() {
      var tournamentId = this.tournamentId;
      fetch
        .get(`tools/SetAllPlayersPresent/${tournamentId}`)
        .then(response => {
          this.message = response.data;
        })
        .catch(e => {
          this.error = e;
        });
    },
    markAsNotPresent() {
      var tournamentId = this.tournamentId;
      fetch
        .get(`tools/SetAllPlayersNotPresent/${tournamentId}`)
        .then(response => {
          this.message = response.data;
        })
        .catch(e => {
          this.error = e;
        });
    },
    resetRatings() {
      var tournamentId = this.tournamentId;
      fetch
        .get(`tools/ResetRankings/${tournamentId}`)
        .then(response => {
          this.message = response.data;
        })
        .catch(e => {
          this.error = e;
        });
    },
    resetRatingsByGrade() {
      var tournamentId = this.tournamentId;
      fetch
        .get(`tools/ResetAllRankingsBasedOnGrade/${tournamentId}`)
        .then(response => {
          this.message = response.data;
        })
        .catch(e => {
          this.error = e;
        });
    },
    randomWins() {
      var tournamentId = this.tournamentId;
      fetch
        .get(`tools/RandomWins/${tournamentId}`)
        .then(response => {
          this.message = response.data;
        })
        .catch(e => {
          this.error = e;
        });
    },
    deleteAllRounds() {
      this.$confirm(`Do you want to delete all rounds?`).then(() => {
        var tournamentId = this.tournamentId;
        fetch
          .get(`tools/DeleteAllRounds/${tournamentId}`)
          .then(response => {
            this.message = response.data;
          })
          .catch(e => {
            this.error = e;
          });
      });
    },
    deleteAllPlayers() {
      this.$confirm(`Do you want to delete all players?`).then(() => {
        var tournamentId = this.tournamentId;
        fetch
          .get(`tools/DeleteAllPlayers/${tournamentId}`)
          .then(response => {
            this.message = response.data;
          })
          .catch(e => {
            this.error = e;
          });
      });
    },
    updateAllAvatars() {
      this.$confirm(`Do you want to update all Avatars?`).then(() => {
        var tournamentId = this.tournamentId;
        fetch
          .get(`tools/UpdateAllAvatars/${tournamentId}`)
          .then(response => {
            this.message = response.data;
          })
          .catch(e => {
            this.error = e;
          });
      });
    },
    showToast() {
      let toast = new Toast();
      toast.show("Round 5 has started",8000,"/audio/arpeggio.mp3","/27/Round/5",null);
    }
  },
  created() {}
};
</script>
