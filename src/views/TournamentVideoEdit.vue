<template>
  <layout-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title>Edit Tournament</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-list-header>
          <ion-label>Tournament Video Edit</ion-label>
        </ion-list-header>
        <ion-item>
          <ion-textarea rows="6" cols="20"  :value="tournament.video" @input="tournament.video = $event.target.value" ></ion-textarea>
        </ion-item>
      </ion-list>
     
      <div style="padding:15px 15px;">
        <ion-button expand="block" v-on:click="save()">Save</ion-button>
        <hr />
        <ion-button expand="block" color="light" v-on:click="back()">Cancel</ion-button>

        <div style="color:red;">{{error}}</div>
      </div>
    </ion-content>
    <!-- </ion-page> -->
  </layout-menu>
</template>

<script>
import fetch from "@/services/fetch";
export default {
  name: "home",
  components: {},
  data() {
    var tournamentId = this.$route.params.tournament;
    return {
      tournamentId: tournamentId,
      tournament: {
        name: "",
        accessCodeBasic: "",
        details: "",
        faqcontent: "",
        hidden: false,
        id: null,
        image: null,
        isPublic: true,
        owner: null,
        teams: "",
        showSignUpPage: true,
        signUpText: "",
        type: null
      },
      error: ""
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    save() {
      let tournamentId = this.tournamentId;
      let tournament = this.tournament;

      fetch
        .put(`tournament/${tournamentId}`, tournament)
        .then((response) => {
          console.log(response);
          //back
          this.$router.back();
        })
        .catch((e) => {
          this.error = "Error: Save failed";
          console.warn(e);
        });
    },
    loadData() {
      let tournamentId = this.tournamentId;
      if (tournamentId) {
        fetch
          .get(`tournament/${tournamentId}`)
          .then(response => {
            this.tournament = response.data;
          })
          .catch(e => {
            this.error = "Error: Load failed";
            console.warn(e);
          });
      }
    }
  },
  created() {
    this.loadData();
  }
};
</script>
