<template>
  <layout-menu>
    <ion-page class="ion-page" main>
      <!-- <ion-page class="ion-page" main> -->
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-menu-toggle>
              <ion-button>
                <ion-icon slot="icon-only" name="menu"></ion-icon>
              </ion-button>
            </ion-menu-toggle>
          </ion-buttons>
          <ion-title>Chess Tournament</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <template v-for="tournament of tournaments">
            <router-link :key="tournament.id">
              <ion-card :to="{ name: 'Tournament', params: { tournament: tournamentId }}">
                <ion-img src="./images/chess-board.jpg"></ion-img>
                <ion-card-header>
                  <ion-card-title>{{tournament.name}}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <p>{{tournament.details}}</p>
                </ion-card-content>
              </ion-card>
            </router-link>
          </template>
        </ion-list>
        <router-link :to="{ name: 'Tournament', params: { tournament: 120 }}">
          <ion-card>
            <!-- <ion-img src="./images/chess-board.jpg"></ion-img> -->
            <ion-card-header>
              <ion-card-title>Brookwood and Minter Bridge</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>Jan 26th Chess Tournament at Witch hazel led by Brookwood and Minter Bridge</p>
            </ion-card-content>
          </ion-card>
        </router-link>
      </ion-content>
    </ion-page>
  </layout-menu>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import LayoutMenu from "@/components/LayoutMenu.vue";

export default {
  name: "home",
  components: { LayoutMenu },
  data() {
    return {
      tournaments: [],
      errors: []
    };
  },
  methods: {
    loadData() {
      fetch
        .get(`tournament`)
        .then(response => {
          this.tournaments = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  created() {
    this.loadData();
  }
};
</script>
