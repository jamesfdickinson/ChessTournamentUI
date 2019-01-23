<template>
  <div class="ion-page" main>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar>
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
          <ion-input v-bind:value="player.firstName"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Last Name</ion-label>
          <ion-input v-bind:value="player.lastName"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">School</ion-label>
          <ion-input v-bind:value="player.school"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Grade</ion-label>
          <ion-input v-bind:value="player.grade"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Rating</ion-label>
          <ion-input v-bind:value="player.rating"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Division</ion-label>
          <ion-input v-bind:value="player.division"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>IsPresent</ion-label>
          <ion-checkbox slot="start" v-bind:checked="player.isPresent"></ion-checkbox>
          {{player.IsPresent}}
        </ion-item>
        <ion-item>
          <ion-label>Paid</ion-label>
          <ion-checkbox slot="start" v-bind:checked="player.paid"></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-label>Allow SMS Notifications</ion-label>
          <ion-checkbox slot="start" v-bind:checked="player.allowNotifications"></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Parent's Name</ion-label>
          <ion-input v-bind:value="player.parentName"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Parent's Email</ion-label>
          <ion-input v-bind:value="player.parentEmail"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Parent's Phone Number</ion-label>
          <ion-input v-bind:value="player.parentPhone"></ion-input>
        </ion-item>
        <ion-item></ion-item>
      </ion-list>

      <ion-button expand="block">Save</ion-button>
      <ion-button color="light">Cancel</ion-button>
      <ion-button color="danger">Delete</ion-button>
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
    return {
      tournamentId: tournamentId,
      player: {},
      errors: []
    };
  },
  methods: {
    loadData() {
      var id = this.$route.params.id;

      fetch
        .get(`player/${id}`)
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
