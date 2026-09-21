<template>
  <layout-no-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>

        <ion-title>User</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="$router.push({ name: 'UserEdit' })">
            <ion-icon name="create"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <!-- <ion-item>
          <ion-label position="fixed">User Name</ion-label>
          <ion-label>{{ user.userName }}</ion-label>
        </ion-item> -->
        <ion-item>
          <ion-label position="fixed">Email</ion-label>
          <ion-label>{{ user.email }}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Name</ion-label>
          <ion-label>{{ user.name }}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label position="fixed">GamerId</ion-label>
          <ion-label>{{ user.gamerId }}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Avatar</ion-label>
          <ion-avatar><img :src="user.avatar" /></ion-avatar>
        </ion-item>
        <!-- <ion-item>
          <ion-label position="fixed">Newsletter</ion-label>
          <ion-label>{{ user.emailSubscribe ? "true" : "false" }}</ion-label>
        </ion-item> -->
        <ion-item>
          <ion-label position="fixed">Password</ion-label>
          <ion-button v-on:click="PasswordChange()">Change Password</ion-button>
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Verified?</ion-label>
          <ion-label v-if="isVerified">true</ion-label>
          <ion-button v-if="!isVerified" v-on:click="VerifyEmail()">Verify Email</ion-button>
        </ion-item>
        <!-- <ion-item>
          <ion-label>Allow Notifications</ion-label>
          <ion-checkbox
            slot="start"
            :checked="user.allowNotifications"
            @ionChange="user.allowNotifications = ($event.target.checked == true);"
          ></ion-checkbox>
        </ion-item>-->
      </ion-list>
      <hr />

      <div style="text-align: center">
        <ion-button type="submit" size="large" v-on:click="logOut()">Log Out</ion-button>
      </div>

      <ion-list v-if="user && user.userName" style="margin-top: 16px">
        <ion-list-header color="primary">Hosted Tournaments</ion-list-header>
        <ion-item v-if="tournaments.length > 0">
          <ion-searchbar
            :value="searchInput"
            placeholder="Search tournaments"
            @ionInput="searchInput = $event.target.value"
            @ionChange="searchInput = $event.target.value"
          ></ion-searchbar>
        </ion-item>
        <ion-item v-if="!isLoading && tournaments.length === 0">
          <ion-label>No tournaments found in the last 90 days.</ion-label>
        </ion-item>
        <ion-item
          v-for="tournament of filteredTournaments"
          :key="tournament.id"
          button
          detail="true"
          @click="openTournament(tournament.id)"
        >
          <ion-thumbnail slot="start">
            <img v-if="tournament.image" :src="tournament.image" />
            <img v-else src="/images/chess-board-thin.jpg" />
          </ion-thumbnail>
          <ion-label>
            <h2>{{ tournament.name ? tournament.name.substring(0, 75) : '' }}</h2>
            <p>{{ getLocalDate(tournament.startDateTime) }} - {{ tournament.state }}</p>
          
          </ion-label>
        </ion-item>
        <ion-item v-if="!showingMoreHistory">
          <ion-button expand="block" @click="showMoreHistoryTournaments">
            Show More ({{ EXTENDED_USER_TOURNAMENT_LOOKBACK_DAYS }} days)
          </ion-button>
        </ion-item>
      </ion-list>

      <div style="color: red">{{ error }}</div>
    </ion-content>
    <!-- </ion-page> -->
  </layout-no-menu>
</template>

<script>
import Authentication from "@/services/Authentication.js";
import TournamentAPI from "@/services/TournamentAPI";
const authentication = new Authentication();
const tournamentAPI = new TournamentAPI();
const DEFAULT_USER_TOURNAMENT_LOOKBACK_DAYS = 90;
const EXTENDED_USER_TOURNAMENT_LOOKBACK_DAYS = 356;
export default {
  name: "home",
  components: {},
  data() {
    var user = authentication.getUser() || {};
    return {
      user: user,
      isVerified: false,
      historyDays: DEFAULT_USER_TOURNAMENT_LOOKBACK_DAYS,
      isLoading: false,
      searchInput: "",
      tournaments: [],
      error: "",
    };
  },
  computed: {
    EXTENDED_USER_TOURNAMENT_LOOKBACK_DAYS() {
      return EXTENDED_USER_TOURNAMENT_LOOKBACK_DAYS;
    },
    showingMoreHistory() {
      return this.historyDays === EXTENDED_USER_TOURNAMENT_LOOKBACK_DAYS;
    },
    filteredTournaments() {
      let tournaments = this.tournaments || [];
      let searchInput = (this.searchInput || "").trim().toLowerCase();
      if (!searchInput) return tournaments;

      return tournaments.filter((tournament) => {
        if (tournament.name && tournament.name.toLowerCase().includes(searchInput)) return true;
        if (tournament.type && tournament.type.toLowerCase().includes(searchInput)) return true;
        if (tournament.state && tournament.state.toLowerCase().includes(searchInput)) return true;
        if (tournament.hostName && tournament.hostName.toLowerCase().includes(searchInput)) return true;
        return false;
      });
    },
  },
  methods: {
    back() {
      this.$router.back();
    },
    logOut() {
      authentication.logout();
      this.$router.push({ path: `/` });
    },
    PasswordChange() {
      this.$router.push({ path: `PasswordChange` });
    },
    VerifyEmail() {
      this.$router.push({ path: `VerifyEmail` });
    },
    openTournament(tournamentId) {
      this.$router.push({
        name: "TournamentOverview",
        params: { tournament: tournamentId },
      });
    },
    async showMoreHistoryTournaments() {
      this.historyDays = EXTENDED_USER_TOURNAMENT_LOOKBACK_DAYS;
      await this.loadData();
    },
    getLocalDate(date) {
      if (!date) return "";
      const localDate = new Date(date);
      if (Number.isNaN(localDate.getTime())) return "";
      return localDate.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
    },
     async loadData() {
      this.isLoading = true;
      this.error = "";
      //hackish way to get if user is verified.
      //the user data is pulling locally from storage.
      //we need to pull from the server to get the latest data.
      //but I dont have a endpoint to pull private data yet without proper authentication.
      try {
        const userName  = this.user?.userName;
        const userPublic = await authentication.getUserByUserName(userName);
        this.isVerified = userPublic?.verified || false;

        if (userName) {
          const tournaments = await tournamentAPI.tournaments("all", this.historyDays, userName, null);
          this.tournaments = (tournaments || []).sort((a, b) => new Date(b.startDateTime) - new Date(a.startDateTime));
        } else {
          this.tournaments = [];
        }
      } catch (error) {
        this.error = error?.message || error || "Error loading user data.";
      } finally {
        this.isLoading = false;
      }

     }
  },
  created() {
    // Redirect to login if no user is logged in
    if (!this.user || !this.user.userName) {
      this.$router.push({ name: 'Login' });
      return;
    }
    this.loadData();
  },
};
</script>
