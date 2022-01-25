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

        <ion-title>Create User</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form @submit.prevent="handleSubmit">
        <ion-list>
          <ion-item>
            <ion-label position="stacked">Display Name</ion-label>
            <ion-input
              :value="user.name"
              @input="user.name = $event.target.value"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Email</ion-label>
            <ion-input
              type="email"
              :value="user.email"
              @input="user.email = $event.target.value"
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

          <!-- <ion-item>
            <ion-label>Allow Notifications</ion-label>
            <ion-checkbox
              slot="start"
              :checked="user.allowNotifications"
              @ionChange="user.allowNotifications = ($event.target.checked == true);"
            ></ion-checkbox>
          </ion-item> -->
          <ion-item v-if="tournament.type == 'Cribbage'">
            <ion-label position="stacked">Cribbage ID</ion-label>
            <ion-input
              type="number"
              :value="user.gamerId"
              @input="user.gamerId = $event.target.value"
              @change="gameIdChange(user.gamerId)"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Avatar</ion-label>
          </ion-item>
          <ion-item>
            <div>
              <template v-for="avatar in avatars">
                <label :for="avatar.name" :key="avatar.url">
                  <input
                    :value="avatar.url"
                    type="radio"
                    :id="avatar.name"
                    name="avatar"
                    v-model="user.avatar"
                  />
                  <img
                    style="width: 60px; height: 60px; max-width: 60px"
                    :src="avatar.url"
                  />
                </label>
              </template>
              <template v-if="gamificationAvatar">
                <label for="gamification">
                  <input
                    :value="gamificationAvatar"
                    type="radio"
                    id="gamification"
                    name="avatar"
                    v-model="user.avatar"
                  />
                  <img
                    style="width: 60px; height: 60px; max-width: 60px"
                    :src="gamificationAvatar"
                  />
                </label>
              </template>
            </div>
          </ion-item>
        </ion-list>
        <ion-item>
          <ion-label>Subscribe to Newsletter  </ion-label>
          <ion-checkbox
            slot="start"
            :checked="user.emailSubscribe"
            @ionChange="user.emailSubscribe = $event.target.checked == true"
          ></ion-checkbox>
        </ion-item>
        <ion-button type="submit" expand="block">Submit</ion-button>

        <ul style="color: red">
          <li v-for="error in errors" v-bind:key="error">*{{ error }}</li>
        </ul>
      </form>
    </ion-content>
    <!-- </ion-page> -->
  </layout-no-menu>
</template>
<style scoped>
div.radio img {
  border: solid 4px #bbb;
  padding: 2px;
}
div.radio label {
  font-family: arial;
}
input[type="radio"] {
  display: none;
}
input[type="radio"]:checked + img {
  border: solid 4px #ff0000;
}
</style>
<script>
import Authentication from "@/services/Authentication.js";
const authentication = new Authentication();
import Avatar from "@/services/Avatar.js";
const avatar = new Avatar();
import Gamification from "@/services/Gamification.js";
const gamification = new Gamification();

export default {
  name: "home",
  components: {},
  data() {
    var userId = this.$route.params.id;
    let avatars = avatar.getAll();
    return {
      user: {
        id: userId,
        username: null,
        email: null,
        name: null,
        gamerId: null,
        avatar: null,
        password: null,
        allowNotifications: true,
      },
      passwordVerify: null,
      avatars: avatars,
      gamificationAvatar: null,
      errors: [],
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
      user.username = user.email;

      //validation
      this.errors = [];
      if (!user.name) this.errors.push("Display Name is required");
      if (!user.email) this.errors.push("Email is required");
      if (!user.username) this.errors.push("Username is required");
      //if (!user.gamerId) this.errors.push("gamerId is required");

      if (!passwordVerify || user.password != passwordVerify)
        this.errors.push("Passwords does not match");
      if (this.errors.length > 0) return;

      user.email = user.username;

      authentication
        .register(user)
        .then((userData) => {
          let user = userData;
          console.log("User Logged in: " + user.username, user);
          //back
          if (redirect) {
            this.$router.push({ path: redirect });
          } else {
            this.$router.push({ path: `/` });
          }
        })
        .catch((e) => {
          console.error(e);
          this.errors.push("Error: Save failed");
          this.errors.push(e);
        });
    },
    gameIdChange(gamerId) {
      gamification.GetUser(gamerId).then((userData) => {
        if (!userData) return;
        let avatar = userData.Avatar;
        this.gamificationAvatar = avatar;
      });
    },
  },
};
</script>
