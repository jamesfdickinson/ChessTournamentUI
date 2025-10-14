<template>
  <layout-no-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="back()"></ion-icon>
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
                  <ion-input type="email" placeholder="Email" :value="userName"
                    @input="userName = $event.target.value"></ion-input>
                </ion-item>

                <ion-item>
                  <ion-input type="password" placeholder="Password" :value="password"
                    @input="password = $event.target.value"></ion-input>
                </ion-item>
              </div>
              <!-- Needs a sumbit button so the form will submit on enter. <input type="submit"> or <button>(defaults to submit) will work. The ion-button is in the shadow dom and the form does not see it !-->
              <input type="submit" style="display: none" />
              <div padding>
                <ion-button type="submit" size="large" expand="block">Login</ion-button>
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
        <ion-button type="button" size="large" expand v-on:click="openSignUp()">Sign up</ion-button>
      </div>
      <div padding style="text-align: center; margin-top: 15px">
        <p><a v-on:click="openPasswordReset()"> Forgot password?</a></p>
      </div>

      <div padding style="text-align: center; margin-top: 30px; border-top: 1px solid #ccc; padding-top: 20px;">
        <p>Or login with your <a v-on:click="redirectToBracketJD()">Bracket JD account</a></p>
       
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
    title: 'Tournament JD - Login',
    titleTemplate: null, // override the parent template and just use the above title only
    meta: [
      { name: 'description', content: 'Login to play online tournaments. Need an account? Sign up. Forgot password?' },
    ]
  },
  data() {
    let tournamentId = this.$route.params.tournament;
    let redirect = this.$route.query.redirect;
    let userdata = this.$route.query.userdata;
    return {
      tournamentId: tournamentId,
      userName: "",
      password: "",
      redirect: redirect,
      userdata: userdata,
      errors: [],
    };
  },
  methods: {
    back() {
      //switch back to this after removing auto login
      //this.$router.go(-1);

      // Clear the redirect count to prevent auto-redirect loop
      localStorage.removeItem("login-redirect-count");
      // Navigate to home instead of going back in history to avoid redirect loop
      this.$router.push({ path: "/" });
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
    //----auth call back ------
    //todo: delete in a few months - 10/9/25
    redirectToBracketJD() {
      // Build the return URL pointing to our callback page
      const currentUrl = window.location.origin;
      const returnUrl = `${currentUrl}/Login`;
      const redirectParam = this.redirect ? `&redirect=${encodeURIComponent(this.redirect)}` : '';

      // Redirect to bracketjd.com's auth-callback page which will extract the token and redirect back
      window.location.href = `https://bracketjd.com/statichtml/auth-callback.html?returnUrl=${encodeURIComponent(returnUrl)}${redirectParam}`;
    },
    handleTokenCallback() {
      // If we have a token in the URL, attempt to use it for authentication
      if (this.userdata) {
        console.log('Token received from callback', this.userdata);
        if (!this.userdata || this.userdata.length < 10) {
          console.error("Invalid userdata received.");
          return;
        }
        // Extract all user data from query parameters
        const userData = JSON.parse(this.userdata);


        console.log('User data received:', userData);

        //validate token format here if needed
        if (!userData.token || userData.token.length < 10) {
          console.error("Invalid token received.");
          return;
        }
        if (!userData.userName) {
          console.error("Invalid userName received.");
          return;
        }
        if (!userData.email) {
          console.error("Invalid email received.");
          return;
        }
        if (!userData.name) {
          console.error("Invalid name received.");
          return;
        }
        if (!userData.avatar) {
          console.error("Invalid avatar received.");
          return;
        }

        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        notification.requestNotificationToken();
        notificationSocket.reconnect(userData.token);

        // Redirect to the intended destination
        if (this.redirect) {
          this.$router.push({ path: this.redirect });
        } else {
          this.$router.push({ path: `/` });
        }
      }
    },
    //----end auth call back ------
  },
  created() {
    //todo: delete in a few months - 10/9/25
    // Check if we're returning from bracketjd.com with a token
    this.handleTokenCallback();
    //auto login with bracketjd authcallback
    //if no this.userdata try authcallback
    //check if is on https://tournamentjd.com
    const currentUrl = window.location.href;
    const hasUserdata = this.userdata && this.userdata.length > 10;
    const isOnTournamentJD = currentUrl.startsWith("https://tournamentjd.com");
    if (!this.userdata && this.redirect && isOnTournamentJD ) {

      //check count the number of redirects to avoid loop
      //if more than 4 times, stop trying
      let redirectCount = parseInt(localStorage.getItem("login-redirect-count") || "0");
      if (redirectCount < 5) {
        // Increment the count and redirect
        localStorage.setItem("login-redirect-count", (redirectCount + 1).toString());
        //auto login with bracketjd
        this.redirectToBracketJD();
      }
    }
  },
};
</script>
