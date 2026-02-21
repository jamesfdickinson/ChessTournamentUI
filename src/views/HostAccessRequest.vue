<template>
  <layout-no-menu>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.push({ name: 'Home' })"></ion-icon>
        </ion-buttons>
        <ion-title>Request Tournament Access</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content >
      <ion-grid>
        <ion-row justify-content-center>
          <ion-col align-self-center size-md="6" size-lg="5" size-xs="12">
            <div padding>
              <h3>Request Access to Create Tournaments</h3>
              <p>
                You don't currently have permission to create tournaments. Fill out
                the form below and an administrator will review your request.
              </p>
            </div>

            <ion-card>
              <ion-card-content>
                <div v-if="submitted" style="color:green; padding:16px; text-align:center;">
                  Your request has been submitted. An administrator will review it shortly.
                </div>
                <form v-else @submit.prevent="submit()">

                  <ion-item lines="none">
                    <ion-label>Account</ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-label position="stacked">Name</ion-label>
                    <ion-input
                      :value="name"
                      @input="name = $event.target.value"
                    ></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="stacked">Email</ion-label>
                    <ion-input
                      readonly
                      :value="email"
                      style="color: var(--ion-color-medium);"
                    ></ion-input>
                  </ion-item>

                  <ion-item lines="none" style="margin-top:16px;">
                    <ion-label>How will you use hosting access?</ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-label position="stacked">Please describe the tournaments you plan to run</ion-label>
                    <ion-textarea
                      auto-grow="false"
                      rows="6"
                      style="min-height: 120px;"
                      placeholder="e.g. I run a weekly chess club and would like to manage our in-person Swiss tournaments..."
                      :value="reason"
                      @input="reason = $event.target.value"
                    ></ion-textarea>
                  </ion-item>

                  <ion-item lines="none" style="margin-top:16px;">
                    <ion-label class="ion-text-wrap">
                      <strong>Terms &amp; Conditions</strong>
                      <p style="white-space: normal; margin-top:8px;">
                        By requesting host access you agree to the following:
                      </p>
                      <ul style="white-space: normal; margin-top:4px; padding-left:18px;">
                        <li>You will conduct yourself and your tournaments in a respectful and professional manner.</li>
                        <li>Foul language, harassment, hate speech, or abusive behavior of any kind is strictly prohibited.</li>
                        <li>You will not use the platform to promote illegal activities or violate any applicable laws or regulations.</li>
                        <li>Tournament information you provide will be accurate and not misleading to participants.</li>
                        <li>Host access may be revoked at any time, without notice, if these terms are violated or at the discretion of the administrators.</li>
                      </ul>
                    </ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-label>I agree to the terms and conditions</ion-label>
                    <ion-checkbox
                      slot="start"
                      :checked="agreedToTerms"
                      @ionChange="agreedToTerms = $event.detail.checked"
                    ></ion-checkbox>
                  </ion-item>

                  <div v-if="errors.length" style="color:red; padding:8px 16px;">
                    <ul>
                      <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                  </div>

                  <div padding style="margin-top:16px;">
                    <ion-button
                      type="submit"
                      expand="block"
                      :disabled="submitting"
                    >
                      {{ submitting ? 'Submitting...' : 'Submit Request' }}
                    </ion-button>
                  </div>

                </form>
              </ion-card-content>
            </ion-card>

          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </layout-no-menu>
</template>

<script>
import Authentication from "@/services/Authentication.js";
import TournamentAPI from "@/services/TournamentAPI.js";

const authentication = new Authentication();
const tournamentAPI = new TournamentAPI();

export default {
  name: "HostAccessRequest",
  data() {
    return {
      username: "",
      name: "",
      email: "",
      reason: "",
      agreedToTerms: false,
      submitting: false,
      submitted: false,
      errors: [],
    };
  },
  methods: {
    validate() {
      this.errors = [];
      if (!this.reason || this.reason.trim().length < 30) {
        this.errors.push("Please describe how you plan to use hosting access (at least 30 characters).");
      }
      if (!this.agreedToTerms) {
        this.errors.push("You must agree to the terms and conditions.");
      }
      return this.errors.length === 0;
    },
    submit() {
      if (!this.validate()) return;

      this.submitting = true;
      const user = authentication.getUser();

      tournamentAPI
        .requestHostAccess(this.username, this.name, this.email, this.reason)
        .then(() => {
          this.submitted = true;
        })
        .catch((error) => {
          const msg =
            (error.response && (error.response.data || error.response.statusText)) ||
            error.message ||
            "An error occurred. Please try again.";
          this.errors.push(msg);
        })
        .finally(() => {
          this.submitting = false;
        });
    },
    loadData() {
      const user = authentication.getUser();
      if (user) {
        this.username = user.userName || "";
        this.name = user.name || "";
        this.email = user.email || user.userName || "";
      }
    },
  },
  created() {
    this.loadData();
  },
};
</script>
