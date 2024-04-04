<template>
  <layout-no-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title>Create Tournament</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>
          <ion-label position="stacked">Tournament Type</ion-label>
          <ion-select placeholder="Select One" :value="tournamentType"
            @ionChange="tournamentType = $event.target.value">
            <ion-select-option value="Cribbage">Cribbage</ion-select-option>
            <ion-select-option value="Chess">Chess</ion-select-option>
            <ion-select-option value="Other">Other</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>

      <ion-button expand="block" v-on:click="save()">Save</ion-button>
      <div style="color: red">{{ error }}</div>
    </ion-content>
    <!-- </ion-page> -->
  </layout-no-menu>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {

    return {
      tournamentType: null,
      error: "",
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    save() {
      let tournamentType = this.tournamentType;
      if(!tournamentType) {
        this.error = "Please select a tournament type";
        return;
      }
      this.$router.push({
        name: "TournamentEdit",
        params: { tournamentType: tournamentType },
      });
    },
    loadData() {

    },
  },
  created() {
    this.loadData();
  },
};
</script>
