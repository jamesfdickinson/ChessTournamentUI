<template>
  <div id="app">
    <ion-app>

    <ion-tabs>

      <ion-tab tab="music">
        <ion-header translucent>
          <ion-toolbar>
            <ion-title>Music</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content fullscreen class="ion-padding">
          <h1>Music</h1>
        </ion-content>
      </ion-tab>

      <ion-tab tab="movies">
        <slot></slot>
      </ion-tab>

      <ion-tab tab="games">
        <ion-header translucent>
          <ion-toolbar>
            <ion-title>Games</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content fullscreen class="ion-padding">
              <Chat channel="123" userName="userName"></Chat>
  
        </ion-content>
      </ion-tab>

      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="music">
          <ion-label>Music</ion-label>
          <ion-icon name="musical-note"></ion-icon>
        </ion-tab-button>
        <ion-tab-button tab="movies">
          <ion-label>Movies</ion-label>
          <ion-icon name="videocam"></ion-icon>
        </ion-tab-button>
        <ion-tab-button tab="games">
          <ion-label>Games</ion-label>
          <ion-icon name="game-controller"></ion-icon>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>

 
    </ion-app>
  </div>
</template>
<script>
import Chat from "@/components/Chat.vue";
export default {
  name: "LayoutTabs",
  props: {
  },
  components: {
    Chat
  },
};
</script>