<template>
  <div v-if="table.positions">
    <!-- <ion-list-header>Round {{table.round}} - Table {{table.table}}</ion-list-header>  -->
    <ion-item color="primary">
      <!-- <ion-label slot="start">Table {{ table.table }} - "{{ table.id }}"</ion-label> -->
      <ion-label slot="start">Room "{{ table.id }}"</ion-label>
      <ion-button
        v-if="table.positions.some((p) => p.playerEmail == user.email)"
        slot="end"
        color="light"
        fill="outline"
        @click="openGame(table.id)"
        target="_blank"
        >Play</ion-button
      >
      <ion-button
        v-else
        slot="end"
        color="light"
        fill="outline"
        @click="watchGame(table.id)"
        target="_blank"
        >Watch</ion-button
      >
      <!-- <ion-buttons slot="end">
        <ion-button v-on:click="openTable(table.id)">
          <ion-icon name="create"></ion-icon>
        </ion-button>
      </ion-buttons>-->
    </ion-item>
    <ion-item
      detail="true"
      v-for="position of table.positions"
      :key="position.id"
      v-on:click="openPlayer(position.playerId)"
    >
      <!-- <ion-icon slot="start" name="contact"></ion-icon> -->
      <ion-avatar slot="start">
        <AvatarIcon
          :name="position.playerFirstName"
          :image="position.avatar"
        ></AvatarIcon>
      </ion-avatar>

      <ion-label
        >{{ position.playerFirstName }} {{ position.playerLastName }}</ion-label
      >
      <ion-badge slot="end" color="light">{{ position.points }}</ion-badge>
    </ion-item>
    <!-- <ion-grid>
      <ion-row>
        <ion-col class="ion-text-center">
          <ion-button xexpand="block" :href="getRoomLink(table.id)">Room {{table.id}}</ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>-->
  </div>
</template>

<script>
// @ is an alias to /src
import AvatarIcon from "@/components/AvatarIcon.vue";
import Authentication from "@/services/Authentication";
const authentication = new Authentication();
export default {
  name: "Table",
  components: { AvatarIcon },
  props: {
    table: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    let tournamentId = this.$route.params.tournament || 118;
    let user = authentication.getUser();
    return {
      tournamentId: tournamentId,
      user: user,
      isLoaded: false,
      errors: [],
    };
  },
  methods: {
    openPlayer(id) {
      this.$router.push({ name: "Player", params: { id: id } });
    },
    openTable(id) {
      this.$router.push({
        name: "TableEdit",
        params: { id: id },
      });
    },
    openGame(id) {
      this.$router.push({
        name: "PlayGame",
        params: { id: id },
      });
    },
    watchGame(id) {
      this.$router.push({
        name: "PlayGame",
        params: { id: id, spectate: true },
      });
    },
    getRoomLink(room) {
      //todo: pass template in from tournament settings or position
      let linkTemplate =
        "https://cardgames.app/cribbage/game/?room=[room]&name=[name]&email=[email]&id=[id]";

      if (!linkTemplate) return "";
      let user = this.user;
      var userName = user && user.name ? user.name : "unknown";
      let email = user && user.email ? user.email : "";
      let name = user && user.name ? user.name : "";
      //note: can't trust players to supply their own cribbage id.  Had an issue with many with the same number
      //note: now link the systems using their email
      //let gamerId = user && user.gamerId ? user.gamerId : "";
      let gamerId = null;

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

      // url = url.replace("[tournament]", tournament);
      // url = url.replace("[round]", round);
      // url = url.replace("[table]", table);

      return url;
    },
    loadData() {
      //var tournamentId = this.tournamentId;
      let table = {
        id: "T54621",
        round: "3",
        table: "5",
        room: "T54621",
        positions: [
          {
            playerId: 123,
            playerFirstName: "Jimmy",
            playerLastName: "D",
          },
          {
            playerId: 123,
            playerFirstName: "Mark",
            playerLastName: "Moomoo",
          },
        ],
      };
      this.isLoaded = true;
      this.table = table;
    },
  },
  created() {
    //this.loadData();
  },
};
</script>
