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
        <ion-title>User</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>
          <ion-label position="stacked">Email</ion-label>
          <ion-input
            type="email"
            :value="user.email"
            @input="user.email = $event.target.value"
            readonly
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Name</ion-label>
          <ion-input
            :value="user.name"
            @input="user.name = $event.target.value"
            required
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Cribbage ID</ion-label>
          <ion-input
            type="number"
            :value="user.gamerId"
            @input="user.gamerId = $event.target.value"
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
        <!-- <ion-item>
          <ion-label position="stacked">Password</ion-label>
          <ion-input
            type="password"
            :value="user.password"
            @input="user.password = $event.target.value"
            required
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Repeat Password</ion-label>
          <ion-input
            type="password"
            :value="user.passwordVerify"
            @input="user.passwordVerify = $event.target.value"
            required
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Allow Notifications</ion-label>
          <ion-checkbox
            slot="start"
            :checked="user.allowNotifications"
            @ionChange="user.allowNotifications = $event.target.checked == true"
          ></ion-checkbox>
        </ion-item> -->
        <ion-item>
          <ion-label position="fixed">Password</ion-label>
          <ion-button v-on:click="PasswordChange()">Change Password</ion-button>
        </ion-item>
      </ion-list>

      <ion-button expand="block" v-on:click="save()">Sumbit</ion-button>
      <hr />
      <div style="color: red">{{ error }}</div>
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
        name: user.name,
        gamerId: user.gamerId,
        password: null,
        passwordVerify: null,
        allowNotifications: user.allowNotifications,
      },
      error: "",
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    save() {
      let user = this.user;
      authentication
        .update(user)
        .then((userData) => {
          let user = userData;
          console.log("User Logged in: " + user.username, user);
          //back
          this.$router.back();
        })
        .catch((e) => {
          this.error = "Error: Save failed";
          console.warn(e);
        });
    },
  },
};
</script>
