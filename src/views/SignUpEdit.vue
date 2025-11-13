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
          <ion-label>Signup Page</ion-label>
        </ion-list-header>
        <ion-item>
          <ion-label>Show Signup Page</ion-label>
          <ion-checkbox
            slot="start"
            :checked="tournament.allowRegistration"
            @ionChange="tournament.allowRegistration = ($event.target.checked == true);"
          ></ion-checkbox>
        </ion-item>
        <ion-item>
          <ckeditor :editor="editor" v-model="tournament.signUpText" :config="editorConfig"></ckeditor>
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
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import TournamentAPI from "@/services/TournamentAPI";
const tournamentAPI = new TournamentAPI();

export default {
  name: "home",
  components: {},
  data() {
    var tournamentId = this.$route.params.tournament;
    return {
      tournamentId: tournamentId,
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the rich-text editor.
        link: {
          addTargetToExternalLinks: true
        }
      },
      tournament: {
        name: "",
        accessCodeBasic: "",
        details: "",
        faqContent: "",
        hidden: false,
        id: null,
        image: null,
        isPublic: true,
        owner: null,
        teams: "",
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
    async save() {
      let tournamentId = this.tournamentId;
      let tournament = this.tournament;

      await tournamentAPI
        .tournamentUpdate(tournamentId, tournament)
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
    async loadData() {
      let tournamentId = this.tournamentId;
      if (tournamentId) {
         await tournamentAPI
          .tournament(tournamentId)
          .then(data => {
            this.tournament = data;
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
