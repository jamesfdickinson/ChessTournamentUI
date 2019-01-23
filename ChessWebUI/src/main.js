import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import  Ionic  from '@ionic/vue';

Vue.config.productionTip = true;

Vue.config.ignoredElements = [/^ion-/]
//Vue.use(Ionic);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
