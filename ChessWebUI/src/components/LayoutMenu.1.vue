<template>
  <div id="app">
    <ion-app>
      <ion-split-pane when="sm">
        <ion-menu>
          <ion-header>
            <ion-toolbar color="primary">
              <ion-title>Menu</ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content>
            <ion-list>
              <ion-list-header>Navigate</ion-list-header>
              <ion-menu-toggle auto-hide="false">
                <ion-item button>
                  <ion-icon slot="start" name="home"></ion-icon>
                  <ion-label>Home</ion-label>
                </ion-item>
              </ion-menu-toggle>
            </ion-list>
          </ion-content>
        </ion-menu>

        <ion-page class="ion-page" main>
          <ion-header>
            <ion-toolbar>
              <ion-buttons slot="start">
                <ion-menu-toggle>
                  <ion-button>
                    <ion-icon slot="icon-only" name="menu"></ion-icon>
                  </ion-button>
                </ion-menu-toggle>
              </ion-buttons>
              <ion-title>Header</ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content padding>
            <h1>Main Content</h1>
            <slot></slot>
          </ion-content>
        </ion-page>
      </ion-split-pane>
    </ion-app>
  </div>
</template>
<script>
import Menu from "@/components/Menu.vue";

export default {
  name: "LayoutMenu",
  props: {
    //msg: String
  },
  components: {
    Menu
  }
};
</script>