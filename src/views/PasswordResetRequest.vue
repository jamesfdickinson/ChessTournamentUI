<template>
  <layout-no-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title>Password Reset</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <form @submit.prevent="handleSubmit" v-if="!results">
        <ion-grid>
          <ion-row justify-content-center>
            <ion-col align-self-center size-md="6" size-lg="5" size-xs="12">
              <div text-center>
                <h4>Password Reset</h4>
              </div>
              <div padding>
                <ion-item>
                  <ion-input
                    type="text"
                    placeholder="Email"
                    :value="userName"
                    @input="userName=$event.target.value"
                  ></ion-input>
                </ion-item>
              </div>
              <div padding>
                <ion-button type="submit" size="large" expand="block">Reset</ion-button>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </form>
       <p>{{ results }}</p>
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
    return {
      userName: "",
      results: "",
      errors: []
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    handleSubmit() {
      this.passwordReset();
    },
    passwordReset() {
      let userName = this.userName;
      
      this.errors = [];
      authentication
        .passwordReset(userName)
        .then(results => {
          this.results = "Sent email with reset code. ";
          console.log(results);
        })
        .catch(e => {
          this.results ="Error sending request";
          this.errors.push(e);
        });
    }
  },
  created() {}
};
</script>
