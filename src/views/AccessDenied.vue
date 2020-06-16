<template>
  <layout-no-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title>Access Denied</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-grid>
        <ion-row justify-content-center>
          <ion-col align-self-center size-md="6" size-lg="5" size-xs="12">
            <div padding>
              <h3>Access Denied</h3>
              <p>Ask the Tournament Director to grant you access or enter the invite code below.</p>
            </div>

            <ion-card>
              <form @submit.prevent="handleSubmit">
                <div padding>
                  <ion-item>
                    <ion-input
                      type="text"
                      placeholder="Invite Code"
                      :value="inviteCode"
                      @input="inviteCode=$event.target.value"
                    ></ion-input>
                  </ion-item>
                </div>
                <div padding>
                  <ion-button type="submit" size="large" expand="block">Submit</ion-button>
                  <ul style="color:red;">
                    <li v-for="error in errors" v-bind:key="error">*{{ error }}</li>
                  </ul>
                </div>
              </form>
            </ion-card>
            <div padding style="text-align:center;margin-top:15px;">
              <p>Need to change accounts?</p>
              <a v-on:click="login()">Login</a>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <!-- </ion-page> -->
  </layout-no-menu>
</template>

<script>
import Authentication from "@/services/Authentication.js";
const authentication = new Authentication();
export default {
  name: "home",

  components: {},
  data() {
    let tournamentId = this.$route.params.tournament;
    //let redirect = this.$route.query.redirect;
    return {
      tournamentId: tournamentId,
      inviteCode: "",
      errors: []
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    login() {
      this.$router.push({ path: "/Login" });
    },
    handleSubmit() {
      this.requestAccess();
    },
    requestAccess() {
      let inviteCode = this.inviteCode;
      let redirect = this.redirect;
      let tournamentId = this.tournamentId;
      this.errors = [];
      authentication
        .inviteCode(inviteCode, tournamentId)
        .then(userData => {
          let user = userData;
          console.log("User Logged in: " + user.username, user);
          if (redirect) {
            this.$router.push({ path: redirect });
          } else if (tournamentId) {
            this.$router.push({ path: `/${tournamentId}` });
          } else {
            this.$router.push({ path: `/` });
          }
        })
        .catch(e => {
          this.errors.push(e);
        });
    },

  },
  created() {
    //check for updated rights from server
  }
};
</script>
