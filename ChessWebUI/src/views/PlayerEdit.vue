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

        <ion-title>Player Edit</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>
          <ion-label position="stacked">First Name</ion-label>
          <ion-input :value="player.firstName" @input="player.firstName = $event.target.value"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Last Name</ion-label>
          <ion-input :value="player.lastName" @input="player.lastName = $event.target.value"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">School</ion-label>
          <ion-input :value="player.school" @input="player.school = $event.target.value"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Grade</ion-label>
          <ion-input :value="player.grade" @input="player.grade = $event.target.value"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Rating</ion-label>
          <ion-input :value="player.rating" @input="player.rating = $event.target.value"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Division</ion-label>
          <ion-input :value="player.division" @input="player.division = $event.target.value"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label>IsPresent</ion-label>

          <ion-checkbox
            slot="start"
            :checked="player.isPresent"
            @ionChange="player.isPresent = ($event.target.checked == true);"
          ></ion-checkbox>
        </ion-item>

        <ion-item>
          <ion-label>Paid</ion-label>
          <ion-checkbox
            slot="start"
            :checked="player.paid"
            @ionChange="player.paid = ($event.target.checked == true);"
          ></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-label>Allow SMS Notifications</ion-label>
          <ion-checkbox
            slot="start"
            :checked="player.allowNotifications"
            @ionChange="player.allowNotifications = ($event.target.checked == true);"
          ></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Parent's Name</ion-label>
          <ion-input :value="player.parentName" @input="player.parentName = $event.target.value"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Parent's Email</ion-label>
          <ion-input :value="player.parentEmail" @input="player.parentEmail = $event.target.value"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Parent's Phone Number</ion-label>
          <ion-input :value="player.parentPhone" @input="player.parentPhone = $event.target.value"></ion-input>
        </ion-item>
        <ion-item></ion-item>
      </ion-list>

      <ion-button expand="block" v-on:click="save()">Save</ion-button>
      <hr/>
      <ion-button expand="block" color="light" v-on:click="back()">Cancel</ion-button>
      <!-- <ion-button color="danger">Delete</ion-button> -->
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
    var tournamentId = this.$route.params.tournament;
    var playerId = this.$route.params.id;
    return {
      playerId: playerId,
      tournamentId: tournamentId,
      player: {},
      errors: []
    };
  },
  methods: {
    back(){
      this.$router.back();
    },
    save() {
      let tournamentId = this.tournamentId;
      let redirect = this.redirect;
      var playerId = this.playerId;
      var player = this.player;

      fetch
        .post(`player/${playerId}`, player)
        .then(response => {
          //back
          this.$router.back();
           //if (redirect) {
          //   this.$router.push({ path: redirect });
          // } else {
         //    this.$router.push({ path: `/${tournamentId}/Player/${playerId}` });
          // }
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    loadData() {
      var playerId = this.playerId;

      fetch
        .get(`player/${playerId}`)
        .then(response => {
          this.player = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  created() {
    this.loadData();
  }
};
</script>
