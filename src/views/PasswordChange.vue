<template>
  <layout-no-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>

        <ion-title>Change Password</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form @submit.prevent="handleSubmit">
        <ion-list>
          <ion-item>
            <ion-label position="stacked">User Name</ion-label>
            <ion-input type="text" :value="userName" @input="userName = $event.target.value" required></ion-input>
          </ion-item>
          <ion-item v-if="token">
            <ion-label position="stacked">Token</ion-label>
            <ion-input type="text" :value="token" @input="token = $event.target.value" required></ion-input>
          </ion-item>
          <ion-item v-if="!token">
            <ion-label position="stacked">Old Password</ion-label>
            <ion-input type="password" :value="oldPassword" @input="oldPassword = $event.target.value"
              required></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">New Password</ion-label>
            <ion-input type="password" :value="newPassword" @input="newPassword = $event.target.value"
              required></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Repeat New Password</ion-label>
            <ion-input type="password" :value="newPasswordVerify" @input="newPasswordVerify = $event.target.value"
              required></ion-input>
          </ion-item>
        </ion-list>
        <ion-button type="submit" expand="block">Submit</ion-button>
        <ul style="color:red;">
          <li v-for="error in errors" v-bind:key="error">*{{ error }}</li>
        </ul>
      </form>
    </ion-content>
    <!-- </ion-page> -->
  </layout-no-menu>
</template>

<script>
import Authentication from "@/services/Authentication.js";
const authentication = new Authentication();
export default {
  name: "PasswordChange",
  components: {},
  data() {
    var user = authentication.getUser() || {};
    var userName = this.$route.query.userName;
    var token = this.$route.query.token;
    return {
      userName: userName || user.userName,
      oldPassword: null,
      newPassword: null,
      newPasswordVerify: null,
      token: token,
      errors: []
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    async handleSubmit() {
      let userName = this.userName;
      let oldPassword = this.oldPassword;
      let newPassword = this.newPassword;
      let newPasswordVerify = this.newPasswordVerify;
      let token = this.token;

      let redirect = this.redirect;

      //validation
      this.errors = [];
      if (!userName) this.errors.push("Username is required");
      if (!newPasswordVerify || newPassword != newPasswordVerify)
        this.errors.push("New Passwords does not match");
      if (this.errors.length > 0) return;

      try {
        const results = await authentication.changePassword(userName, oldPassword, newPassword, token);

        console.log("Password Updated: " + results);

        //log in the user
        const userData = await authentication.login(userName, newPassword);
        console.log("User Logged in: " + userData.username, userData);

        //back
        if (redirect) {
          this.$router.push({ path: redirect });
        } else {
          this.$router.push({ path: `/` });
        }

      } catch (e) {
        console.error(e);
        this.errors.push("Error: " + e.message);
        this.errors.push(e);
      }

    }
  }
};
</script>
