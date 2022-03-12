<template>
  <div v-if="table.positions">
    <!-- <ion-list-header>Round {{table.round}} - Table {{table.table}}</ion-list-header>  -->
    <ion-item color="primary" :disabled="table.isCompleted">
      <!-- <ion-label slot="start">Table {{ table.table }} - "{{ table.id }}"</ion-label> -->
      <ion-label slot="start">Table "{{ table.id }}"</ion-label>
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
          :name="position.playerName"
          :image="position.avatar"
        ></AvatarIcon>
      </ion-avatar>
      <ion-icon
        v-if="position.color == 'Black'"
        src="/images/chess_pawn_black.svg"
        slot
      ></ion-icon>
      <ion-icon
        v-else-if="position.color == 'White'"
        src="/images/chess_pawn_white.svg"
        slot
      ></ion-icon>
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
