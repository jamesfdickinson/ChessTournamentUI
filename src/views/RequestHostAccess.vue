<template>
  <layout-no-menu>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.push('/')"></ion-icon>
        </ion-buttons>
        <ion-title>Request Tournament Access</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content >
      
        <ion-row justify-content-center>
          <ion-col align-self-center size-md="6" size-lg="5" size-xs="12">
            <div padding>
              <h3>Request Access to Host</h3>
              <p>
                You don't currently have permission to create tournaments. Fill out
                the form below and an administrator will review your request.
              </p>
            </div>

            <ion-card>
              <ion-card-content>
                <form @submit.prevent="submit()">


                  <ion-item>
                    <ion-label position="stacked">Email</ion-label>
                    <ion-input readonly :value="email" style="color: var(--ion-color-medium);"></ion-input>
                  </ion-item>

                  <ion-item>
                    <ion-label position="stacked">Type of game</ion-label>
                    <ion-input
                      placeholder="Chess, Cribbage, Other"
                      :value="gameType"
                      @input="gameType = $event.target.value"
                    ></ion-input>
                  </ion-item>

   
                  <ion-item>
                    <ion-label position="stacked">How will you use hosting access?</ion-label>
                    <ion-textarea auto-grow="true" rows="4"
                      placeholder="Please describe the tournaments you plan to run. e.g. I run a weekly chess club and would like to manage our in-person Swiss tournaments..."
                      :value="reason" @input="reason = $event.target.value"></ion-textarea>
                  </ion-item>

                  <ion-item lines="none" style="margin-top:16px;">
                    <ion-label class="ion-text-wrap">
                      <strong>Terms &amp; Conditions</strong>
                      <p style="white-space: normal; margin-top:8px;">
                        By requesting host access you agree to the following:
                      </p>
                      <ul style="white-space: normal; margin-top:4px; padding-left:18px;">
                        <li>You will conduct yourself and your tournaments in a respectful and professional manner.</li>
                        <li>Foul language, harassment, hate speech, or abusive behavior of any kind is strictly
                          prohibited.</li>
                        <li>You will not use the platform to promote illegal activities or violate any applicable laws
                          or regulations.</li>
                        <li>Tournament information you provide will be accurate and not misleading to participants.</li>
                        <li>Host access may be revoked at any time, without notice, if these terms are violated or at
                          the discretion of the administrators.</li>
                      </ul>
                    </ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-label>I agree to the terms and conditions</ion-label>
                    <ion-checkbox slot="start" :checked="agreedToTerms"
                      @ionChange="agreedToTerms = $event.detail.checked"></ion-checkbox>
                  </ion-item>

                  <div padding style="margin-top:16px;">
                    <ion-button type="submit" expand="block" :disabled="submitting || submitted">
                      {{ submitting ? 'Submitting...' : 'Submit Request' }}
                    </ion-button>
                  </div>

                  <div v-if="errors.length" style="color:red; padding:8px 16px;">
                    <ul>
                      <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                  </div>

                  <div v-if="submitted" style="color:green; padding:8px 16px;">
                    Your request has been submitted. An administrator will review it shortly.
                  </div>

                </form>
              </ion-card-content>
            </ion-card>

          </ion-col>
        </ion-row>
    
    </ion-content>
  </layout-no-menu>
</template>

<script>
import Authentication from "@/services/Authentication.js";
import TournamentAPI from "../services/TournamentAPI";
const tournamentAPI = new TournamentAPI();

const authentication = new Authentication();

export default {
  name: "RequestHostAccess",
  data() {
    return {
      email: "",
      gameType: "",
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
      if (!this.gameType) {
        this.errors.push("Please select a type of game.");
      }
      if (!this.reason || !this.reason.trim()) {
        this.errors.push("Please describe how you plan to use hosting access.");
      }
      if (!this.agreedToTerms) {
        this.errors.push("You must agree to the terms and conditions.");
      }
      return this.errors.length === 0;
    },
    async submit() {
      if (!this.validate()) return;

      this.submitting = true;
      const user = authentication.getUser();
      const reasonWithGameType = `${this.reason.trim()}\n\nType of game: ${this.gameType}`;


      try {
        await tournamentAPI.requestHostAccess({
          userName: user ? user.userName : this.email,
          name: user ? user.name : this.name,
          email: this.email,
          reason: reasonWithGameType
        });
        this.submitted = true;
      } catch (error) {
        const msg =
          (error.response && (error.response.data || error.response.statusText)) ||
          error.message ||
          "An error occurred. Please try again.";
        this.errors.push(msg);
      } finally {
        this.submitting = false;
      }

    },
    loadData() {
      const user = authentication.getUser();
      if (user) {
        this.email = user.userName || user.email || "";
      }
    },
  },
  created() {
    this.loadData();
  },
};
</script>

