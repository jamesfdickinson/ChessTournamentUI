<template>
  <layout-no-menu>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-button @click="$router.push({ name: 'Home' })" aria-label="Home">
            <ion-icon slot="icon-only" name="home"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>User Stats</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="$router.go(-1)" aria-label="Back">
            <ion-icon slot="icon-only" name="arrow-round-back"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="stats-header">
        <avatar-icon name="User Stats" :showBackground="true" class="stats-avatar" />
        <h1>User Stats</h1>
        <p>Tournament participation summary</p>
      </div>
      <ion-card>
        <ion-card-content>
          <form @submit.prevent="lookupStats()">
            <ion-item>
              <ion-label position="stacked">Username or email</ion-label>
              <ion-input :value="search" @ionInput="search = $event.target.value"
                :disabled="isLoading" placeholder="Enter username or email"></ion-input>
            </ion-item>
            <ion-button type="submit" expand="block" :disabled="isLoading" style="margin-top:12px;">
              {{ isLoading ? 'Loading...' : 'Look Up Stats' }}
            </ion-button>
          </form>
          <p v-if="error" role="alert" style="color:var(--ion-color-danger);">{{ error }}</p>
        </ion-card-content>
      </ion-card>
      <ion-card v-if="stats" aria-live="polite">
        <ion-card-header>
          <ion-card-title>Participation Summary</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p class="stats-count">{{ stats.tournamentCount }}</p>
          <p>Tournaments registered</p>
          <p v-if="stats.tournamentCount === 0">No tournament registrations found.</p>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </layout-no-menu>
</template>

<script>
import TournamentAPI from "@/services/TournamentAPI";
import AvatarIcon from "@/components/AvatarIcon.vue";
import LayoutNoMenu from "@/components/LayoutNoMenu.vue";

const tournamentAPI = new TournamentAPI();

export default {
  name: "UserStats",
  components: { AvatarIcon, LayoutNoMenu },
  metaInfo: { title: "User Stats" },
  data() {
    return { search: "", stats: null, error: "", isLoading: false, requestId: 0 };
  },
  methods: {
    async lookupStats() {
      const requestId = ++this.requestId;
      this.stats = null;
      this.error = "";
      this.isLoading = false;
      const lookup = this.search.trim();
      if (!lookup) {
        this.error = "Please enter a username or email.";
        return;
      }
      this.isLoading = true;
      try {
        const stats = await tournamentAPI.userStats(lookup);
        if (requestId === this.requestId) this.stats = stats;
      } catch (e) {
        if (requestId === this.requestId) {
          this.error = e.response && e.response.status === 404
            ? "User not found." : "Failed to load stats. Please try again.";
        }
      } finally {
        if (requestId === this.requestId) this.isLoading = false;
      }
    },
    loadRoute(route) {
      ++this.requestId;
      this.search = route.params.userName || "";
      this.stats = null;
      this.error = "";
      this.isLoading = false;
      if (this.search) this.lookupStats();
    },
  },
  created() {
    this.loadRoute(this.$route);
  },
  beforeRouteUpdate(to, from, next) {
    this.loadRoute(to);
    next();
  },
};
</script>

<style scoped>
.stats-header { padding: 20px 16px 8px; text-align: center; }
.stats-avatar { display: inline-block; width: 96px; height: 96px; }
.stats-header h1 { margin: 12px 0 4px; }
.stats-header p { color: var(--ion-color-medium); }
.stats-count { font-size: 36px; font-weight: bold; margin: 0; }
</style>
