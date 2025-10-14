<template>
  <layout-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
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
              <ion-input placeholder="twitchName" :value="twitchName"
                @input="twitchName = $event.target.value"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">YouTube Channel ID</ion-label>
              <ion-input placeholder="YouTube Channel Id" :value="youtubeChannelId"
                @input="youtubeChannelId = $event.target.value"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Subscribe link</ion-label>
              <ion-input placeholder="https://somelink.com/321f4" :value="subscribeURL"
                @input="subscribeURL = $event.target.value"></ion-input>
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
          <ion-textarea rows="6" cols="20" :value="tournament.video"
            @input="tournament.video = $event.target.value"></ion-textarea>
        </ion-item>
      </ion-list>

      <div style="padding: 15px 15px">
        <ion-button expand="block" v-on:click="save()">Save</ion-button>
        <hr />
        <ion-button expand="block" color="light" v-on:click="back()">Cancel</ion-button>

        <div style="color: red">{{ error }}</div>
      </div>
      <ion-list>
        <ion-list-header>
          Help
        </ion-list-header>
        <ion-item> <a href="https://support.google.com/youtube/answer/3250431?hl=en"
          target="_blank">How to find YouTube Channel ID </a>
        </ion-item> 
        <ion-item> <a href="https://www.youtube.com/account_advanced"
          target="_blank">YouTube Channel ID link</a>
        </ion-item>   
      </ion-list>
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
        faqContent: "",
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
      youtubeChannelId: "",
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
      let youtubeChannelId = this.youtubeChannelId;
      let subscribeURL = this.subscribeURL;
      if (twitchName) {
        html += `<iframe
              src="https://player.twitch.tv/?channel=${twitchName}&parent=tournamentjd.com&parent=localhost&muted=false"
              width="100%"
              height="200"
              allowfullscreen="true">
          </iframe>`;
      }
      if (youtubeChannelId) {
        html += `<iframe width="100%" height="200" src="https://www.youtube.com/embed/live_stream?channel=${youtubeChannelId}" ;autoplay=1" title="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
      }
      // if (facebookPageId) {
      //   html += `<iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FCribbageJD%2Fvideos%2F488266577552838%2F&width=480" width="480" height="360" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>`;
      // }
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
