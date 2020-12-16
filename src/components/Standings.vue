<template>
  <ion-list>
    <template v-for="player of players">
      <ion-item :key="player.playerId">
        <!-- <ion-icon slot="start" name="contact" ></ion-icon> -->
        <ion-icon
          size="small"
          slot="start"
          v-if="!player.isPresent"
          name="pause"
          :color="[player.isOnline ? 'primary' : '']"
        ></ion-icon>
        <ion-icon
          size="small"
          slot="start"
          v-if="player.isPresent"
          name="play"
          :color="[player.isOnline ? 'primary' : '']"
        ></ion-icon>

        <ion-label
          style="cursor: pointer"
          v-on:click="openPlayer(player.playerId)"
          >{{ player.firstName }} {{ player.lastName }}</ion-label
        >
        <ion-icon
          slot="end"
          v-if="player.room"
          :color="[player.roundPoints == null ? 'success' : 'light']"
          name="eye"
          @click="watchGame(player.room)"
        ></ion-icon>
        <ion-badge slot="end" color="light">{{ player.points }}</ion-badge>
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
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    openPlayer(id) {
      this.$router.push({ name: "Player", params: { id: id } });
    },
    watchGame(id) {
      if (!id) return;
      this.$router.push({
        name: "PlayGame",
        params: { id: id, spectate: true },
      });
    },
  },
  created() {},
};
</script>
