<template>
  <layout-no-menu>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title>Payment</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="ion-padding">
        <ion-item lines="none">
          <ion-label class="ion-text-center">
            <h1>Payment</h1>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label text-wrap>
            <p>Complete your payment to finalize your tournament registration.</p>
          </ion-label>
        </ion-item>
      </div>
    </ion-content>
  </layout-no-menu>
</template>

<script>
export default {
  name: "Payment",
  data() {
    return {
      tournamentId: this.$route.params.tournament
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  created() {
    // Load payment data here
  }
};
</script>
