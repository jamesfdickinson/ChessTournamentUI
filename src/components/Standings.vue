<template>
  <ion-list>
    <template v-for="player of players">
      <ion-item :key="player.playerId">
        <!-- <div slot="start">
          <div style="">
            <ion-avatar>
              <AvatarIcon
                :name="player.name"
                :image="player.avatar"
                :disabled="!player.isOnline"
              ></AvatarIcon>
            </ion-avatar>
            <div style="position: absolute; top: 0; left: 10px">
              <TeamIcon
                style="font-size: 12px; padding: 2px 0px; width: default"
                :title="player.team"
                slot="start"
              ></TeamIcon>
            </div>
            <div v-if="player.isPresent" class="checkMark">✔</div>
          </div>
        </div> -->
        <ion-avatar slot="start">
          <AvatarIcon
            :name="player.name"
            :image="player.avatar"
            :disabled="!player.isOnline"
          ></AvatarIcon>
          <div class="team">
            <TeamIcon
              :title="player.team"
              slot="start"  >
            </TeamIcon>
          </div>
          <div v-if="player.isPresent" class="checkMark">✔</div>
        </ion-avatar>

        <ion-label
          style="cursor: pointer text-overflow: ellipsis;  max-width: 150px;"
          v-on:click="openPlayer(player.playerId)"
          >{{ player.firstName }} {{ player.lastName }}</ion-label
        >
        <ion-icon
          slot="end"
          v-if="player.room"
          :color="[
            player.location && player.location.includes('PlayGame')
              ? 'success'
              : player.roundPoints == null
              ? 'medium'
              : 'light',
          ]"
          name="eye"
          @click="watchGame(player.room)"
        ></ion-icon>
        <!-- <ion-badge slot="end" color="light">{{ player.points }} {{ player.tieBreaker }}</ion-badge>
       -->
        <!-- <ion-note slot="end" >{{ player.tieBreaker }}</ion-note >
        -->
        <ion-badge slot="end" color="light">{{ player.points }} </ion-badge>
      </ion-item>
    </template>
  </ion-list>
</template>
<style scoped>
.team{
  position: absolute; 
  bottom: 0; 
  left: 10px;
  font-size: 12px;
}
.checkMark {
  position: absolute;
  top: 2px;
  left: 10px;
  color: #ffffff;
  width: 20px;
  height: 20px;
  font-size: 15px;
  text-align: center;
  border-radius: 50%;
  background-color: #00cb00;
}
</style>
<script>
import AvatarIcon from "@/components/AvatarIcon.vue";
import TeamIcon from "@/components/TeamIcon.vue";
export default {
  name: "Standings",
  components: { AvatarIcon, TeamIcon },
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
    stringToColour(str) {
      if (!str) str = "";
      var hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      var colour = "#";
      for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xff;
        value = Math.floor(value * 0.7); //make darker
        colour += ("00" + value.toString(16)).substr(-2);
      }
      return colour;
    },
  },
  created() {},
};
</script>
