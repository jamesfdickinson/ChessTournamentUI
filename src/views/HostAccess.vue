<template>
  <layout-no-menu>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title>Host Access</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>

      <ion-card>
        <ion-card-content>
          <ion-item>
            <ion-label position="stacked">Username (Email)</ion-label>
            <ion-input
              :value="newUserName"
              @input="newUserName = $event.target.value"
              placeholder="Enter username to grant host access"
            ></ion-input>
          </ion-item>
          <ion-button expand="block" style="margin-top:12px;" @click="grant()">
            Grant Host Access
          </ion-button>
          <div v-if="grantError" style="color:red; padding:8px 0;">{{ grantError }}</div>
          <div v-if="grantSuccess" style="color:green; padding:8px 0;">{{ grantSuccess }}</div>
        </ion-card-content>
      </ion-card>

      <ion-searchbar
        placeholder="Search by username"
        :value="searchInput"
        @ionInput="searchInput = $event.target.value"
        @ionChange="searchInput = $event.target.value"
      ></ion-searchbar>

      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.userName }}</td>
            <td>{{ user.email }}</td>
            <td>
              <ion-button color="danger" size="small" @click="revoke(user.id)">
                <ion-icon name="trash"></ion-icon> Revoke
              </ion-button>
            </td>
          </tr>
          <tr v-if="filteredUsers.length === 0">
            <td colspan="4" style="text-align:center; color: var(--ion-color-medium);">
              No users with host access found.
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="loadError" style="color:red; padding:8px 16px;">{{ loadError }}</div>

    </ion-content>
  </layout-no-menu>
</template>

<script>
import Authentication from "@/services/Authentication.js";
import TournamentAPI from "@/services/TournamentAPI.js";

const authentication = new Authentication();
const tournamentAPI = new TournamentAPI();

export default {
  name: "HostAccess",
  data() {
    return {
      newUserName: "",
      users: [],
      searchInput: "",
      grantError: "",
      grantSuccess: "",
      loadError: "",
    };
  },
  computed: {
    filteredUsers() {
      if (!this.searchInput) return this.users;
      const q = this.searchInput.toLowerCase();
      return this.users.filter(u =>
        (u.name && u.name.toLowerCase().includes(q)) ||
        (u.userName && u.userName.toLowerCase().includes(q)) ||
        (u.email && u.email.toLowerCase().includes(q))
      );
    },
  },
  methods: {
    grant() {
      this.grantError = "";
      this.grantSuccess = "";
      const userName = this.newUserName.trim();
      if (!userName) {
        this.grantError = "Please enter a username.";
        return;
      }
      tournamentAPI
        .addTournamentUser(0, userName, 'Create')
        .then(() => {
          this.grantSuccess = `Host access granted to ${userName}.`;
          this.newUserName = "";
          this.loadData();
        })
        .catch(e => {
          this.grantError = e || "Failed to grant access.";
        });
    },
    revoke(recordId) {
      this.grantError = "";
      this.grantSuccess = "";
      this.$confirm(`Are you sure you want to revoke host access?`).then(() => {
        tournamentAPI
          .removeTournamentUser(recordId)
          .then(() => {
            this.grantSuccess = `Host access revoked.`;
            this.loadData();
          })
          .catch(e => {
            this.grantError = e || "Failed to revoke access.";
          });
      });
    },
    loadData() {
      const user = authentication.getUser();
      if (!user) {
        this.$router.push({ name: 'Login' });
        return;
      }
      tournamentAPI
        .getTournamentUsers(0)
        .then(data => {
          this.users = (data || []).filter(u => u.role === 'Create');
        })
        .catch(e => {
          this.loadError = e || "Failed to load users.";
        });
    },
  },
  created() {
    this.loadData();
  },
};
</script>
