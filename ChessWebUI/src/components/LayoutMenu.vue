<template>
  <div id="app">
    <ion-app>
      <ion-split-pane when="sm" >
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
                <router-link :to="{ name: 'Tournament'}">
                  <ion-item button detail="true">
                    <ion-icon slot="start" name="home"></ion-icon>
                    <ion-label>Home</ion-label>
                  </ion-item>
                </router-link>
                <Menu/>
              </ion-menu-toggle>
            </ion-list>
          </ion-content>
        </ion-menu>
        <ion-page class="ion-page" main>

            <slot></slot>
          
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