<template>
  <ion-menu>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-list-header>Navigate</ion-list-header>
        <ion-menu-toggle auto-hide="false" v-for="p in appPages" :key="p.title">
          <ion-item button @click="navigate(p.url)">
            <ion-icon slot="start" :name="p.icon"></ion-icon>
            <ion-label>{{p.title}}</ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>


      <ion-list >
        <ion-list-header>Account</ion-list-header>

        <ion-menu-toggle auto-hide="false">
          <ion-item button @click="navigate('/login')">
            <ion-icon slot="start" name="log-in"></ion-icon>
            <ion-label>Login</ion-label>
          </ion-item>
        </ion-menu-toggle>

        <ion-menu-toggle auto-hide="false">
          <ion-item button @click="navigate('/support')">
            <ion-icon slot="start" name="help"></ion-icon>
            <ion-label>Support</ion-label>
          </ion-item>
        </ion-menu-toggle>

        <ion-menu-toggle auto-hide="false">
          <ion-item button @click="navigate('/signup')">
            <ion-icon slot="start" name="person-add"></ion-icon>
            <ion-label>Signup</ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>

      <ion-list>
        <ion-list-header>Tutorial</ion-list-header>
        <ion-menu-toggle auto-hide="false">
          <ion-item button @click="openTutorial()">
            <ion-icon slot="start" name="hammer"></ion-icon>
            <ion-label>Show Tutorial</ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script >
//  import { Component, Vue } from 'vue-property-decorator';
// //  import { mapGetters } from 'vuex';
// //import Vue from "vue";
//import axios from 'axios';
// @Component({
//   computed: {
//     loggedIn: function() {
//       return this.$store.state.user.isAuthenticated;
//     }
//   }
// })


export default  {
  data() {
    return {
      name: "",
      appPages: [
        {
          title: "Schedule",
          url: "/app/tabs/(schedule:schedule)",
          icon: "calendar"
        },
        {
          title: "Speakers",
          url: "/app/tabs/(speakers:speakers)",
          icon: "contacts"
        },
        {
          title: "Map",
          url: "/app/tabs/(map:map)",
          icon: "map"
        },
        {
          title: "About",
          url: "/app/tabs/(about:about)",
          icon: "information-circle"
        }
      ]
    };
  },
  methods: {
    // navigate() {
    //   const newTodo = { name: this.name }
    //   axios.post('http://localhost:3001/todos', newTodo)
    //     .then(res => {
    //       this.$router.push({path: '/todos'})
    //     })
    // },
    // openTutorial() {
    //   this.name = this.$refs.newTodoItem.value
    // }
  }
}
</script>
