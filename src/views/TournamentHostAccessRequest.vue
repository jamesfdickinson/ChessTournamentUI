<template>
  <layout-no-menu>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title>Request Tournament Access</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
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
                <form @submit.prevent="submit()">

                  <ion-item lines="none">
                    <ion-label>Account</ion-label>
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
                    <ion-label>Tournament Types Requested</ion-label>
                  </ion-item>
                  <ion-item v-for="type in tournamentTypeOptions" :key="type.value">
                    <ion-label>{{ type.label }}</ion-label>
                    <ion-checkbox
                      slot="start"
                      :checked="selectedTypes.includes(type.value)"
                      @ionChange="toggleType(type.value, $event.detail.checked)"
                    ></ion-checkbox>
                  </ion-item>

                  <ion-item lines="none" style="margin-top:16px;">
                    <ion-label class="ion-text-wrap">
                      <strong>Terms &amp; Conditions</strong>
                      <p style="white-space: normal; margin-top:8px;">
                        By requesting access you agree to use the tournament creation
                        features responsibly, comply with all applicable rules and
                        regulations, and acknowledge that your access may be revoked
                        at any time if these terms are violated.
                      </p>
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

                  <div padding style="margin-top:16px;">
                    <ion-button
                      type="submit"
                      expand="block"
                      :disabled="submitting"
                    >
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
      </ion-grid>
    </ion-content>
  </layout-no-menu>
</template>

<script>
import Authentication from "@/services/Authentication.js";
import fetch from "@/services/fetch.js";

const authentication = new Authentication();

export default {
  name: "TournamentHostAccessRequest",
  data() {
    return {
      email: "",
      selectedTypes: [],
      agreedToTerms: false,
      submitting: false,
      submitted: false,
      errors: [],
      tournamentTypeOptions: [
        { value: "CribbageOnline",   label: "Cribbage Online" },
        { value: "CribbageInPerson", label: "Cribbage In-Person" },
        { value: "ChessInPerson",    label: "Chess In-Person" },
        { value: "Other",            label: "Other" },
      ],
    };
  },
  methods: {
    toggleType(value, checked) {
      if (checked) {
        if (!this.selectedTypes.includes(value)) {
          this.selectedTypes.push(value);
        }
      } else {
        this.selectedTypes = this.selectedTypes.filter((t) => t !== value);
      }
    },
    validate() {
      this.errors = [];
      if (this.selectedTypes.length === 0) {
        this.errors.push("Please select at least one tournament type.");
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

      fetch
        .post("authentication/RequestCreateAccess", {
          userName: user ? user.userName : this.email,
          tournamentTypes: this.selectedTypes,
          agreedToTerms: this.agreedToTerms,
        })
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
        this.email = user.userName || user.email || "";
      }
    },
  },
  created() {
    this.loadData();
  },
};
</script>
