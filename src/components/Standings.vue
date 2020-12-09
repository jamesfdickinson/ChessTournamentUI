<template>
  <ion-list>
    <template v-for="player of players">
      <ion-item detail="true" :key="player.playerId" v-on:click="openPlayer(player.playerId)" >
        <!-- <ion-icon slot="start" name="contact" ></ion-icon> -->
        <ion-icon size="small" slot="start" v-if="!player.isPresent" name="pause" :style="[player.isOnline ?{'border-left': '3px solid #00f000'}:{'border-left': '3px solid #cfcfcf'}]" ></ion-icon>
        <ion-icon size="small" slot="start" v-if="player.isPresent" name="play" :style="[player.isOnline ?{'border-left': '3px solid #00f000'}:{'border-left': '3px solid #cfcfcf'}]" ></ion-icon>
        <ion-label>{{player.firstName}} {{player.lastName}}</ion-label>
        <ion-badge slot="end" color="light">{{player.points}}</ion-badge>
      </ion-item>
    </template>
  </ion-list>
</template>
<script>
export default {
  name: "Standings",
  components: {},
  props: {
    players: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  methods: {
    openPlayer(id) {
      this.$router.push({ name: "Player", params: { id: id } });
    }
  },
  created() {
  }
};
</script>
