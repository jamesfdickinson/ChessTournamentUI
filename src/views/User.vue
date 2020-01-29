<template>
  <layout-no-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>

        <ion-title>Create User</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>
          <ion-label position="fixed">User Name</ion-label>
          <ion-label>{{user.userName}}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Email</ion-label>
          <ion-label>{{user.email}}</ion-label>
        </ion-item>

        <ion-item>
          <ion-label position="fixed">Password</ion-label>
          <ion-button v-on:click="PasswordChange()">Change Password</ion-button>
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

      <div style="text-align: center;">
        <ion-button type="submit" size="large" v-on:click="logOut()">Log Out</ion-button>
      </div>

      <div style="color:red;">{{error}}</div>
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
    var user = authentication.getUser() || {};
    return {
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email,
        firstName: null,
        lastName: null,
        password: null,
        passwordVerify: null,
        allowNotifications: user.allowNotifications
      },
      error: ""
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    logOut() {
      authentication.logout();
      this.$router.push({ path: `/` });
    },
    PasswordChange(){
        this.$router.push({ path: `PasswordChange` });
    },
    save() {
      let user = this.user;
      let redirect = this.redirect;
      authentication
        .register(user)
        .then(userData => {
          let user = userData;
          console.log("User Logged in: " + user.username, user);
          //back
          if (redirect) {
            this.$router.push({ path: redirect });
          } else {
            this.$router.push({ path: `/` });
          }
        })
        .catch(e => {
          this.error = "Error: Save failed";
          console.warn(e);
        });
    }
  }
};
</script>
