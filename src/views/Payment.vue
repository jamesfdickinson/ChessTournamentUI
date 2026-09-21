<template>
  <layout-no-menu>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title>Payment</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-item lines="none">
          <ion-label class="ion-text-center">
            <h1>Cart</h1>
          </ion-label>
        </ion-item>
        <template v-if="!tournament?.allowPayment">
          <ion-item>
            <ion-label text-wrap>
              <p>Payments are not setup for this tournament.</p>
            </ion-label>
          </ion-item>
        </template>
        <template v-if="tournament?.allowPayment">
          <!-- <ion-item>
            <ion-label text-wrap>
              <p>Suggest Players</p>
            </ion-label>
          </ion-item> -->
          <ion-list>
            <ion-item v-for="(player, index) in players" :key="resolvePlayerId(player, index)">
              <ion-avatar slot="start">
                <AvatarIcon :name="player.firstName" :image="player.avatar"></AvatarIcon>
              </ion-avatar>
              <ion-label>
                <h2>{{ player.firstName }} {{ player.lastName }}</h2>
                <p v-if="player.grade || player.team">
                  <span v-if="player.grade">Grade {{ player.grade }}</span>
                  <span v-if="player.team"> {{ player.team }}</span>
                </p>
              </ion-label>
              <ion-note v-if="tournament && tournament.allowPayment" slot="end"
                :color="player.paid ? 'success' : 'danger'">
                {{ player.paid ? 'Paid' : 'Unpaid' }}
              </ion-note>
              <ion-checkbox v-if="tournament && tournament.allowPayment" slot="end"
                :checked="selectedPlayerIds.includes(resolvePlayerId(player, index))" :disabled="player.paid"
                @ionChange="togglePlayer(resolvePlayerId(player, index), $event)"></ion-checkbox>
            </ion-item>
          </ion-list>
           <ion-item lines="none">
            <ion-button slot="end" fill="outline" @click="addPlayer">
              Add Player
            </ion-button>
          </ion-item>
          <ion-item lines="none">
            <ion-label>
              Selected: {{ selectedPlayerIds.length }}
            </ion-label> 
         
            <ion-label>
              Total: {{ formattedTotalAmount }}
            </ion-label>
          </ion-item>

          <div class="ion-padding-horizontal ion-margin-top">
            <ion-button expand="block" :disabled="selectedPlayerIds.length === 0" @click="submitSelection">
              Continue to Payment
            </ion-button>
          </div>

        </template>
 
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
  name: "Payment",
  components: { AvatarIcon },
  data() {
    var tournamentId = this.$route.params.tournament;
    return {
      tournamentId: tournamentId,
      tournament: null,
      players: [],
      selectedPlayerIds: [],
      selectAllUnpaid: false
    };
  },
  computed: {
    unpaidPlayerIds() {
      return this.players
        .map((player, index) => ({ player, index }))
        .filter(({ player }) => !player.paid)
        .map(({ player, index }) => this.resolvePlayerId(player, index));
    },
    unitPrice() {
      return (
        this.tournament?.price
      );
    },
    totalAmount() {
      return this.selectedPlayerIds.length * (Number(this.unitPrice) || 0);
    },
    formattedTotalAmount() {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(this.totalAmount);
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    addPlayer() {

    },
    populate() {
      //if payment is not allowed, show message

    },
    getRegisteredPlayers() {
      const tournament = this.tournament;
      const user = authentication.getUser();
      if (!tournament) return [];
      if (!user) return [];

      const registeredPlayers = tournament?.players?.filter(player => player.email === user.email || (player.createdBy && player.createdBy === user.username));
      return registeredPlayers;
    },
    resolvePlayerId(player, index) {
      return player.id || player.playerId || player._id || player.email || `idx-${index}`;
    },
    togglePlayer(playerId, event) {
      const checked = event?.detail?.checked === true;
      const exists = this.selectedPlayerIds.includes(playerId);
      if (checked && !exists) {
        this.selectedPlayerIds = [...this.selectedPlayerIds, playerId];
      } else if (!checked && exists) {
        this.selectedPlayerIds = this.selectedPlayerIds.filter(id => id !== playerId);
      }
      this.selectAllUnpaid = this.unpaidPlayerIds.length > 0 && this.unpaidPlayerIds.every(id => this.selectedPlayerIds.includes(id));
    },
    toggleSelectAll(event) {
      const checked = event?.detail?.checked === true;
      this.selectAllUnpaid = checked;
      this.selectedPlayerIds = checked ? [...this.unpaidPlayerIds] : [];
    },
    submitSelection() {
      if (this.selectedPlayerIds.length === 0) return;
      // TODO: hook into payment provider with selectedPlayerIds
      console.log("Selected players for payment:", this.selectedPlayerIds);
    },
    async loadData() {
      const tournamentId = this.tournamentId;
      this.tournament = await tournamentAPI.tournamentView(tournamentId);

      this.selectedPlayerIds = [];
      this.selectAllUnpaid = false;
      const registeredPlayers = this.getRegisteredPlayers();
      this.players.push(...registeredPlayers);
      this.populate();
    },
  },
  created() {
    this.loadData();
  }
};
</script>
