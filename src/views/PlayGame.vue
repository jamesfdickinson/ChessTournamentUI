<template>
  <layout-menu>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon
            name="arrow-round-back"
            size="large"
            @click="$router.go(-1)"
          ></ion-icon>
        </ion-buttons>
        <ion-title>{{id}}</ion-title>

        <ion-buttons slot="end">
          <ion-button
            fill="outline"
            :href="getRoomLink(id, spectate)"
            target="_blank"
            @click="$router.go(-1)"
            >Open in App</ion-button
          >
          <ion-button fill="outline" @click="fullScreen()">
            Full Screen
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content id="gameFrame">
      <iframe
        :src="getRoomLink(id, spectate)"
        style="width: 100%; min-height: 100%"
      >
      </iframe>
    </ion-content>
  </layout-menu>
</template>

<script>
import Authentication from "@/services/Authentication";
const authentication = new Authentication();
export default {
  name: "PlayGame",
  components: {},
  data() {
    let id = this.$route.params.id; //https://cardgames.app/cribbage/game/?room=T6R4T27&name=Jimmy&email=jimmy@jdsoftwarellc.com&id=
    let tournamentId = this.$route.params.tournament;
    let spectate = this.$route.params.spectate;
    return {
      id: id,
      tournamentId: tournamentId,
      spectate: spectate,
      errors: [],
    };
  },
  methods: {
    getRoomLink(room, spectate) {
      //todo: pass template in from tournament settings or position
      let linkTemplate =
        "https://cardgames.app/cribbage/game/?room=[room]&name=[name]&email=[email]&id=[id]&spectate=[spectate]";
      //let linkTemplate = "http://192.168.1.5:8081/CribbageUI/www/?room=[room]&name=[name]&email=[email]&id=[id]&spectate=[spectate]";

      if (!linkTemplate) return "";
      let user = authentication.getUser();
      var userName = user && user.name ? user.name : "unknown";
      let email = user && user.email ? user.email : "";
      let name = user && user.name ? user.name : "";
      let gamerId = user && user.gamerId ? user.gamerId : user.email;

      let url = linkTemplate;

      // //get gamerId from player if user is player
      // let round = this.round;
      // if (round && round.positions) {
      //   let position = round.positions.filter(
      //     p => p.room === room && p.playerEmail === email && email
      //   );
      //   if (position.length > 0) {
      //     gamerId = position.playerGamerId;
      //   }
      // }

      url = url.replace("[room]", room);
      url = url.replace("[email]", email);
      url = url.replace("[userName]", userName);
      url = url.replace("[name]", name);
      url = url.replace("[id]", gamerId);
      url = url.replace("[spectate]", spectate);

      // url = url.replace("[tournament]", tournament);
      // url = url.replace("[round]", round);
      // url = url.replace("[table]", table);

      return url;
    },
    fullScreen() {
      const elem = document.getElementById("page");
      this.toggleFullscreen(elem);
    },
    toggleFullscreen(elem) {
      elem = elem || document.documentElement;

      if (
        !document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement
      ) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    },
    loadData() {},
    onChildWindowMessage(event) {
      const data = event.data;
      if (data == "quitGame") {
        this.$router.back();
      }
    },
  },
  computed: {},
  mounted() {
    this.loadData();
    window.addEventListener("message", this.onChildWindowMessage);
  },
  created() {},
  beforeDestroy() {
    window.removeEventListener("message", this.onChildWindowMessage);
  },
};
</script>
