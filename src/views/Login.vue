<template>
  <layout-no-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon
            name="arrow-round-back"
            size="large"
            @click="$router.go(-1)"
          ></ion-icon>
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
                    type="email"
                    placeholder="Email"
                    :value="userName"
                    @input="userName = $event.target.value"
                  ></ion-input>
                </ion-item>

                <ion-item>
                  <ion-input
                    type="password"
                    placeholder="Password"
                    :value="password"
                    @input="password = $event.target.value"
                  ></ion-input>
                </ion-item>
              </div>
              <!-- Needs a sumbit button so the form will submit on enter. <input type="submit"> or <button>(defaults to submit) will work. The ion-button is in the shadow dom and the form does not see it !-->
              <input type="submit" style="display: none" />
              <div padding>
                <ion-button type="submit" size="large" expand="block"
                  >Login</ion-button
                >
                <ul style="color: red">
                  <li v-for="error in errors" v-bind:key="error">
                    *{{ error }}
                  </li>
                </ul>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </form>

      <div padding style="text-align: center; margin-top: 15px">
        <p>Need an account?</p>
        <ion-button type="button" size="large" expand v-on:click="openSignUp()"
          >Sign up</ion-button
        >
      </div>
      <div padding style="text-align: center; margin-top: 15px">
        <p><a v-on:click="openPasswordReset()"> Forgot password?</a></p>
      </div>
    </ion-content>
    <!-- </ion-page> -->
  </layout-no-menu>
</template>

<script>
import Authentication from "@/services/Authentication.js";
import Notification from "@/services/Notification.js";
import NotificationSocket from "@/services/NotificationSocket.js";
const authentication = new Authentication();
const notification = new Notification();
const notificationSocket = new NotificationSocket();
export default {
  name: "home",

  components: {},
  metaInfo: {
    title: 'Bracket JD - Login',
    titleTemplate: null, // override the parent template and just use the above title only
    meta: [
      { name: 'description', content: 'Login to play online tournaments. Need an account? Sign up. Forgot password?' },
    ]
  },
  data() {
    let tournamentId = this.$route.params.tournament;
    let redirect = this.$route.query.redirect;
    return {
      tournamentId: tournamentId,
      userName: "",
      password: "",
      redirect: redirect,
      errors: [],
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    openSignUp() {
      this.$router.push({ path: "UserCreate" });
    },
    openPasswordReset() {
      this.$router.push({ path: "PasswordResetRequest" });
    },
    handleSubmit() {
      this.errors = [];
      let userName = this.userName;
      let password = this.password;

      if (!password) this.errors.push("Password is required.");
      if (!userName) this.errors.push("Username is required.");
      if (userName && !userName.includes("@"))
        this.errors.push("Not a valid email address");
      if (this.errors.length > 0) return;

      this.login();
    },
    login() {
      let userName = this.userName;
      let password = this.password;
      let redirect = this.redirect;
      let tournamentId = this.tournamentId;

      authentication
        .login(userName, password)
        .then((userData) => {
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
          notificationSocket.reconnect(user.token);
        })
        .catch((e) => {
          if (e || e.title) {
            this.errors.push(e.title);
          } else {
            this.errors.push("Unauthorized");
          }
          console.warn(e);
        });
    },
  },
  created() {},
};
</script>
