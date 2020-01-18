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
      <form @submit.prevent="handleSubmit">
        <ion-list>
          <ion-item>
            <ion-label position="stacked">Email</ion-label>
            <ion-input
              type="email"
              :value="user.username"
              @input="user.username = $event.target.value"
            ></ion-input>
          </ion-item>
          <!-- <ion-item>
          <ion-label position="stacked">First Name</ion-label>
          <ion-input :value="user.firstName" @input="user.firstName = $event.target.value"></ion-input>
        </ion-item>
                 <ion-item>
          <ion-label position="stacked">Last Name</ion-label>
          <ion-input :value="user.lastName" @input="user.lastName = $event.target.value"></ion-input>
          </ion-item>-->
          <ion-item>
            <ion-label position="stacked">Password</ion-label>
            <ion-input
              type="password"
              :value="user.password"
              @input="user.password = $event.target.value"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Repeat Password</ion-label>
            <ion-input
              type="password"
              :value="passwordVerify"
              @input="passwordVerify = $event.target.value"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Allow Notifications</ion-label>
            <ion-checkbox
              slot="start"
              :checked="user.allowNotifications"
              @ionChange="user.allowNotifications = ($event.target.checked == true);"
            ></ion-checkbox>
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
  name: "home",
  components: {},
  data() {
    var userId = this.$route.params.id;
    return {
      user: {
        id: userId,
        username: null,
        email: null,
        firstName: null,
        lastName: null,
        password: null,
        allowNotifications: true
      },
      passwordVerify: null,
      errors: []
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    handleSubmit() {
      let user = this.user;
      let passwordVerify = this.passwordVerify;
      let redirect = this.redirect;

      //validation
      this.errors = [];
      if (!user.username) this.errors.push("Username is required");
      if (!passwordVerify || user.password != passwordVerify)
        this.errors.push("Passwords does not match");
      if (this.errors.length > 0) return;

      user.email = user.username;

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
          console.error(e);
          this.errors.push("Error: Save failed");
          this.errors.push(e);
        });
    }
  }
};
</script>
