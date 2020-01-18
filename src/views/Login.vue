<template>
  <layout-no-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <form @submit.prevent="handleSubmit">
        <ion-grid>
          <ion-row justify-content-center>
            <ion-col align-self-center size-md="6" size-lg="5" size-xs="12">
              <div text-center>
                <h4>Login</h4>
              </div>
              <div padding>
                <ion-item>
                  <ion-input
                    type="text"
                    placeholder="Username"
                    :value="userName"
                    @input="userName=$event.target.value"
                  ></ion-input>
                </ion-item>

                <ion-item>
                  <ion-input
                    type="password"
                    placeholder="Password"
                    :value="password"
                    @input="password=$event.target.value"
                  ></ion-input>
                </ion-item>
              </div>

              <div padding>
                <ion-button type="submit" size="large" expand="block">Login</ion-button>
                <ul style="color:red;">
                  <li v-for="error in errors" v-bind:key="error">*{{ error }}</li>
                </ul>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </form>

      <div padding style="text-align:center;margin-top:15px;">
        <p>Need an account?</p>
        <ion-button type="button" size="large" expand v-on:click="openSignUp()">Sign up</ion-button>
      </div>
    </ion-content>
    <!-- </ion-page> -->
  </layout-no-menu>
</template>

<script>
import Authentication from "@/services/Authentication.js";
import Notification from "@/services/Notification.js";
const authentication = new Authentication();
const notification = new Notification();
export default {
  name: "home",

  components: {},
  data() {
    let tournamentId = this.$route.params.tournament;
    let redirect = this.$route.query.redirect;
    return {
      tournamentId: tournamentId,
      userName: "",
      password: "",
      redirect: redirect,
      errors: []
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    openSignUp() {
      this.$router.push({ path: "UserCreate" });
    },
    handleSubmit() {
      this.login();
    },
    login() {
      let userName = this.userName;
      let password = this.password;
      let redirect = this.redirect;
      let tournamentId = this.tournamentId;
      this.errors = [];
      authentication
        .login(userName, password)
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
          notification.requestNotificationToken();
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  created() {}
};
</script>
