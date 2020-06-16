<template>
  <layout-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title>User Access</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-list>
          <ion-item>
            <ion-label position="stacked">Email</ion-label>
            <ion-input :value="userName" @input="userName = $event.target.value"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Role</ion-label>
            <ion-select
              placeholder="Select One"
              :value="role"
              @ionChange="role= $event.target.value;"
            >
              <ion-select-option value="Basic">Basic</ion-select-option>
              <ion-select-option value="Recorder">Recorder</ion-select-option>
              <ion-select-option value="Admin">Admin</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>

        <ion-button @click="addUser()" expand="block">Add</ion-button>
      </ion-card>

      <ion-searchbar
        placeholder="Name, Role, or Email"
        :value="searchInput"
        @ionInput="searchInput = $event.target.value;"
        @ionChange="searchInput= $event.target.value;"
      ></ion-searchbar>

      <table class="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="tournamentUser of filteredItems">
            <tr :key="tournamentUser.id">
              <td>{{tournamentUser.userName}}</td>
              <td>{{tournamentUser.role}}</td>
              <td>

                <ion-button @click="removeUser(tournamentUser.id)"><ion-icon name="trash"></ion-icon></ion-button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </ion-content>
    <!-- </ion-page> -->
  </layout-menu>
</template>

<script>
import fetch from "@/fetch.js";

export default {
  name: "home",

  data() {
    return {
      searchInput: "",
      userName: "",
      role: "",
      users: [],
      errors: []
    };
  },
  methods: {
    loadData() {
      var tournamentId = this.$route.params.tournament;
      fetch
        .get(`tournamentuser/${tournamentId}`)
        .then(response => {
          this.users = response.data;
          this.users.sort(function(a, b) {
            if (a.role < b.role) return -1;
            if (a.role > b.role) return 1;
            if (a.userName < b.userName) return -1;
            if (a.userName > b.userName) return 1;
          });
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    addUser() {
      var tournamentId = this.$route.params.tournament;
      var userName = this.userName;
      var role = this.role;
      fetch
        .post(`tournamentuser/${tournamentId}`, {
          TournamentId:tournamentId,
          userName:userName,
          role:role,

           })
        .then(() => {
          this.loadData();
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    removeUser(tournamentUserId) {
      fetch
        .delete(`tournamentuser/${tournamentUserId}`)
        .then(() => {
          this.loadData();
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  computed: {
    filteredItems() {
      let filteredRound = this.users;
      let searchInput = this.searchInput;
      if (searchInput) {
        searchInput = searchInput.toLowerCase();
        filteredRound = filteredRound.filter(p => {
          if (p.role && p.role.toLowerCase().startsWith(searchInput))
            return true;
          if (p.userName && p.userName.toLowerCase().startsWith(searchInput))
            return true;
          if (p.email && p.email.toLowerCase().startsWith(searchInput))
            return true;
          if (p.userId === searchInput) return true;
          return false;
        });
      }
      return filteredRound;
    }
  },
  created() {
    this.loadData();
  }
};
</script>
