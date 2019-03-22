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
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </form>
      <!-- <form @submit.prevent="handleSubmit">
        <ion-item color>
          <ion-label slot>Division</ion-label>
          <ion-card background="light">
            <ion-input  type="text" v-bind:value="division"/>
          </ion-card>
          <ion-button slot type="submit">Submit</ion-button>
        </ion-item>
      </form>-->
    </ion-content>
    <!-- </ion-page> -->
 </layout-no-menu>
</template>

<script>
import fetch from "@/fetch.js";

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
    handleSubmit() {
      this.login();
    },
    login() {
      let userName = this.userName.toLowerCase();
      let password = this.password.toLowerCase();
      let redirect = this.redirect;
      let tournamentId = this.tournamentId;
      //todo: use auth class
      //https://github.com/vuejs/vue-router/blob/dev/examples/auth-flow/auth.js

      let user = null;

      if (userName == "gcrecorder" && password == "chess2019") {
        user = {
          username: "jimmysmells",
          roles: { 117: "Recorder", 120: "Recorder" , 121: "Recorder", 122: "Recorder", 123: "Recorder"},
          token: "123123"
        };
        localStorage.setItem("user", JSON.stringify(user));
      }
      if (userName == "chessgirl" && password == "fun") {
        user = {
          username: "jimmysmells",
          roles: { 117: "Basic", 120: "Basic", 121: "Basic" , 122: "Basic", 123: "Basic" },
          token: "123123"
        };
        localStorage.setItem("user", JSON.stringify(user));
      }
       if (userName == "admin" && password == "admin") {
        user = {
          username: "jimmysmells",
          roles: { 117: "Admin", 120: "Admin", 121: "Admin" , 122: "Admin", 123: "Admin"},
          token: "123123"
        };
        localStorage.setItem("user", JSON.stringify(user));
      }
      if (!user) return;

      if (redirect) {
        this.$router.push({ path: redirect });
      } else if (tournamentId) {
        this.$router.push({ path: `/${tournamentId}` });
      } else {
        this.$router.push({ path: `/` });
      }
    }
  },
  created() {}
};
</script>
