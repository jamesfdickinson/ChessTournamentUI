<template>
  <layout-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon
            name="arrow-round-back"
            size="large"
            @click="$router.go(-1)"
          ></ion-icon>
        </ion-buttons>
        <ion-title>Edit Video</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Generate stream code</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item>
              <ion-label position="stacked">Twitch username</ion-label>
              <ion-input
                placeholder="twitchName"
                :value="twitchName"
                @input="twitchName = $event.target.value"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Subscribe link</ion-label>
              <ion-input
                placeholder="https://somelink.com/321f4"
                :value="subscribeURL"
                @input="subscribeURL = $event.target.value"
              ></ion-input>
            </ion-item>
          </ion-list>
          <ion-button v-on:click="generate()">Generate</ion-button>
        </ion-card-content>
      </ion-card>
      <ion-list>
        <ion-list-header>
          <ion-label>Raw HTML</ion-label>
        </ion-list-header>
        <ion-item>
          <ion-textarea
            rows="6"
            cols="20"
            :value="tournament.video"
            @input="tournament.video = $event.target.value"
          ></ion-textarea>
        </ion-item>
      </ion-list>

      <div style="padding: 15px 15px">
        <ion-button expand="block" v-on:click="save()">Save</ion-button>
        <hr />
        <ion-button expand="block" color="light" v-on:click="back()"
          >Cancel</ion-button
        >

        <div style="color: red">{{ error }}</div>
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
        signUpText: "",
        type: null,
      },
      twitchName: "",
      subscribeURL: "",
      error: "",
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    generate() {
      let html = "";
      let twitchName = this.twitchName;
      let subscribeURL = this.subscribeURL;
      if (twitchName) {
        html += `<iframe
              src="https://player.twitch.tv/?channel=${twitchName}&parent=bracketjd.com&parent=localhost&muted=false"
              width="100%"
              height="200"
              allowfullscreen="true">
          </iframe>`;
      }
      if (subscribeURL) {
        html += `<br>
          <a href="${subscribeURL}" style="padding: 10px 12px;margin:4px 4px;font-size: 16px;text-align: center;text-decoration: none;color: white;display: inline-block;border-radius: 4px;background-color: #008CBA;"> Subscribe</a> Get notified for upcoming tournaments`;
          // <a href="${subscribeURL}">${subscribeURL}</a>
      }
      if (html) {
        this.tournament.video = html;
      }
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
          .then((response) => {
            this.tournament = response.data;
          })
          .catch((e) => {
            this.error = "Error: Load failed";
            console.warn(e);
          });
      }
    },
  },
  created() {
    this.loadData();
  },
};
</script>
