<template>
  <layout-no-menu>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>

        <ion-title>Verify Email</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form @submit.prevent="handleSubmit">
        <ion-list>
          <ion-item>
            <ion-label position="stacked">Email</ion-label>
            <ion-input type="email" :value="email" @input="email = $event.target.value" required readonly></ion-input>
          </ion-item>
          <ion-item>
            <ion-text color="medium">
              <p>Click the button below to send a verification email to {{ email }}.</p>
            </ion-text>
          </ion-item>
        </ion-list>
        <ion-button type="submit" expand="block" :disabled="isSubmitting">
          {{ buttonText }}
        </ion-button>
        <ul style="color:red;" v-if="errors.length">
          <li v-for="error in errors" v-bind:key="error">*{{ error }}</li>
        </ul>
        <div v-if="success" style="color:green; padding: 16px;">
          <p>{{ successMessage }}</p>
        </div>
      </form>
    </ion-content>
  </layout-no-menu>
</template>

<script>
import Authentication from "@/services/Authentication.js";
const authentication = new Authentication();
export default {
  name: "VerifyEmail",
  components: {},
  data() {
    var user = authentication.getUser() || {};
    return {
      email: user.email,
      isSubmitting: false,
      buttonText: "Send Verification Email",
      errors: [],
      success: false,
      successMessage: ""
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    async handleSubmit() {
      this.errors = [];
      this.success = false;
      
      if (!this.email) {
        this.errors.push("Email is required");
        return;
      }

      try {
        this.isSubmitting = true;
        this.buttonText = "Sending...";
        
        await authentication.verifyEmail(this.email);
        
        this.success = true;
        this.successMessage = "Verification email sent successfully! Please check your inbox.";
        this.buttonText = "Sent";
        
      } catch (e) {
        console.error("Error verifying email", e);
        this.errors.push("Error: " + (e.message || "Failed to send verification email"));
        this.buttonText = "Send Verification Email";
        this.isSubmitting = false;
      }
    }
  }
};
</script>
