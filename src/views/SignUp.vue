<template>
  <layout-no-menu>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="back"></ion-icon>
        </ion-buttons>

        <ion-title>Registration</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item>
        <ion-label class="ion-text-center">
          <h1>Players</h1>
        </ion-label>
      </ion-item>
      <ion-list>
        <ion-item v-for="player in registeredPlayers" :key="player.id">
          <ion-avatar slot="start">
            <AvatarIcon :name="player.firstName" :image="player.avatar"></AvatarIcon>
          </ion-avatar>
          <ion-label>
            <h2>{{ player.firstName }} {{ player.lastName }}</h2>
            <p v-if="player.grade || player.team">
              <span v-if="player.grade">Grade {{ player.grade }}</span>
              <span v-if="player.grade && player.team"> • </span>
              <span v-if="player.team">{{ player.team }}</span>
            </p>
          </ion-label>
          <ion-label v-if="tournament && tournament.allowPayment" :color="player.paid ? 'success' : 'danger'"
            slot="end">
            {{ player.paid ? '[Paid]' : '[Unpaid]' }}
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-item v-if="showClosed">
        <ion-label class="ion-text-center">
          <p>Registration is closed</p>
        </ion-label>
      </ion-item>

      <div class="ion-padding-horizontal ion-margin-top">
        <ion-button v-if="allowAnotherPlayer" expand="block" color="secondary" @click="goToRegister">
          Add Another Player
        </ion-button>
        <ion-button v-if="paymentNeeded" expand="block" class="ion-margin-top" @click="payment">
          Continue to Payment
        </ion-button>
      </div>

      <div style="height:200px"></div>
    </ion-content>
  </layout-no-menu>
</template>

<script>
import AvatarIcon from "@/components/AvatarIcon.vue";
import TournamentAPI from "@/services/TournamentAPI";
import Authentication from "@/services/Authentication";
const tournamentAPI = new TournamentAPI();
const authentication = new Authentication();
export default {
  name: "home",
  components: { AvatarIcon },
  data() {
    var tournamentId = this.$route.params.tournament;
    var playerId = this.$route.params.id;
    return {
      playerId: playerId,
      tournamentId: tournamentId,
      tournament: null,
      registeredPlayers: []
    };
  },
  computed: {
    allowAnotherPlayer() {
      if (!this.tournament) return false;
      if (!this.tournament.allowMultiplePlayersPerLogin) return false;
      if (!this.tournament.allowRegistration) return false;
      return true;
    },
    paymentNeeded() {
      if (!this.tournament) return false;
      if (!this.tournament.allowPayment) return false;
      const anyUnpaid = this.registeredPlayers.some(player => !player.paid);
      return anyUnpaid;
    },
    showClosed() {
      if (!this.tournament) return false;
      if (this.tournament.allowRegistration) return false;
      return true;
    }
  },
  methods: {
    back() {
      this.$router.push({ name: "Tournament", params: { tournament: this.tournamentId } });
    },
    getRegisteredPlayers() {
      const tournament = this.tournament;
      const user = authentication.getUser();
      if (!tournament) return [];
      if (!user) return [];

      const registeredPlayers = tournament?.players?.filter(player => player.email === user.email || (player.createdBy && player.createdBy === user.username));
      return registeredPlayers;
    },
    payment() {
      this.$router.push({ name: `Payment`, params: { tournament: this.tournamentId } });
    },
    goToRegister() {
      this.$router.push({ name: "SignUpRegister", params: { tournament: this.tournamentId } });
    },
    async loadData() {
      const tournamentId = this.tournamentId;
      this.tournament = await tournamentAPI.tournamentView(tournamentId)
      const tournament = this.tournament;

      const registeredPlayers = this.getRegisteredPlayers();
      this.registeredPlayers = registeredPlayers;

      //show registration page if no players are registered
      if (registeredPlayers.length === 0 && tournament.allowRegistration) {
        this.goToRegister();
      }
    },
  },
  mounted() {
    this.loadData();
  },
  watch: {
    $route() {
      this.loadData();
    }
  },
  created() { },
  beforeDestroy() {
  },
};
</script>
