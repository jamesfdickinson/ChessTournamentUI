<template>
  <layout-no-menu>
    <div class="gamePortalContainer">
      <header>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-buttons slot="start">
              <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
            </ion-buttons>
            <ion-title text-left>{{ id }}</ion-title>

            <ion-buttons slot="end">
              <!-- <ion-button         
            fill="outline"
            :href="getRoomLink(id, spectate)"
            target="_blank"
            @click="$router.go(-1)"
            >Open in App</ion-button
          >
          <ion-icon name="scan" @click="fullScreen()"></ion-icon>
          <ion-button fill="outline" @click="fullScreen()">
            Full Screen
          </ion-button> -->

              <ion-button @click="fullScreen()">
                <ion-icon name="expand" size="large"></ion-icon>
              </ion-button>
              <ion-button :href="roomURL" target="_blank" @click="$router.go(-1)">
                <!-- <ion-icon name="globe" size="large"></ion-icon> -->
                <ion-icon name="browsers" size="large"></ion-icon>
                <!-- <ion-icon name="tv" size="large"></ion-icon>  -->
              </ion-button>
              <ion-button @click="openTable(id)">
                <ion-icon name="create" size="large"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

      </header>
      <div class="gameWrapper">
        <iframe id="iframe-game" :src="roomURL" style="width: 100%; min-height: 100%" allowfullscreen></iframe>
      </div>


    </div>
  </layout-no-menu>
</template>

<script>
import Authentication from "@/services/Authentication";
import TournamentAPI from "@/services/TournamentAPI";
const authentication = new Authentication();
const tournamentAPI = new TournamentAPI();
export default {
  name: "PlayGame",
  components: {},
  data() {
    let id = this.$route.params.id; //https://cardsjd.com/cribbage/game/?room=T6R4T27&name=Jimmy&email=jimmy@jdsoftwarellc.com&id=
    let tournamentId = this.$route.params.tournament;
    let spectate = this.$route.params.spectate;
    let gameRoomLink =
      "https://cardsjd.com/cribbage/game/?room=[room]&name=[name]&email=[email]&id=[id]&spectate=[spectate]&avatar=[avatar]";
    //let gameRoomLink = "http://192.168.1.25:8081/CribbageUI/www/?room=[room]&name=[name]&email=[email]&id=[id]&spectate=[spectate]";
    let roomURL = "";
    return {
      id: id,
      tournamentId: tournamentId,
      spectate: spectate,
      gameRoomLink: gameRoomLink,
      roomURL: roomURL,
      errors: [],
    };
  },
  methods: {
    getRoomLink(room, spectate, gameRoomLink) {
      //todo: pass template in from tournament settings or position

      if (!gameRoomLink) gameRoomLink = this.gameRoomLink;

      if (!gameRoomLink) return "";
      let user = authentication.getUser();
      var userName = user && user.name ? user.name : "unknown";
      let email = user && user.email ? user.email : "";
      let name = user && user.name ? user.name : "";
      let avatar = user && user.avatar ? user.avatar : "";

      //clear special characters found in name causing an issues with the url, & # and @
      name = name.replace("&", "");
      name = name.replace("#", "");
      name = name.replace("@", "");
      userName = userName.replace("&", "");
      userName = userName.replace("#", "");
      userName = userName.replace("@", "");



      //note: can't trust players to supply their own cribbage id.  Had an issue with many with the same number
      //note: now link the systems using their email
      //let gamerId = user && user.gamerId ? user.gamerId : user.email;
      let gamerId = user.email;

      let url = gameRoomLink;

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
      url = url.replace("[avatar]", avatar);

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
    openTable(id) {
      let roundId = this.roundId;
      let tournamentId = this.tournamentId;
      this.$router.push({
        name: "TableEdit",
        params: { id: id, round: roundId, tournament: tournamentId },
      });
    },
    loadData() {
      var tournamentId = this.tournamentId;
      return tournamentAPI
        .tournamentView(tournamentId)
        .then((data) => {
          this.populate(data);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    populate(data) {
      let room = this.id;
      let spectate = this.spectate;
      let gameRoomLink = data.gameRoomLink;
      this.roomURL = this.getRoomLink(room, spectate, gameRoomLink);
    },
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
  created() { },
  beforeDestroy() {
    window.removeEventListener("message", this.onChildWindowMessage);
    // //close window to clean up
    // document.getElementById("iframe-game").src = "about:blank";
  },
};
</script>
<style scoped>
.gamePortalContainer {
  width: 100%;
  max-height: 100%;
  height: 800px;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;

  background-size: 100%;
}

header {
  width: 100%;
  height: 100%;
  flex-basis: 40px;
  color: #000 !important;
  background-color: #ffffff !important;
  border-bottom: 1px solid #6e6e6e;
  margin-bottom: 0px;
}

nav {
  display: flex;
  flex-direction: row;
}

.gameWrapper {
  background: #000000;
  flex: 1;
}

.contentWrapper {
  max-width: 1000px;
  margin: 0 auto;
}


@media (orientation: landscape) and (max-height: 800px) {
  .gamePortalContainer {
    flex-direction: row;
  }
  header {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    max-width: 60px;
    width: inherit;
  }
  nav {
    flex-direction: column;
  }

}

@media (orientation: portrait) or (min-height: 800px) {
  .gamePortalContainer {
    flex-direction: column;
  }
}
</style>