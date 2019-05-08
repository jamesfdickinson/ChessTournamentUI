import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import  Ionic  from '@ionic/vue';
import AnalyticsGA from './services/AnalyticsGA'
import LayoutMenu from "@/components/LayoutMenu.vue";
import LayoutNoMenu from "@/components/LayoutNoMenu.vue";
import LayoutRaw from "@/components/LayoutRaw.vue";
import JsonCSV from 'vue-json-csv'


let version = "2.1";
let analyticsGA = new AnalyticsGA();
analyticsGA.TrackStart("Chess", version, "UA-2052018-24");
analyticsGA.TrackPage("Start");

Vue.config.productionTip = true;

Vue.config.ignoredElements = [/^ion-/]
//Vue.use(Ionic);

router.beforeEach((to, from, next) => {
  analyticsGA.TrackPage(to.path);
  //todo: move auth class
  // redirect to login page if not logged in and trying to access a restricted page
  const pagesAdmin = ['Admin'];
  const authRequiredAdmin = pagesAdmin.includes(to.name);

  const pagesRecorder = ['Registration', 'PlayerEdit', 'TableEdit'];
  const authRequiredRecorder = pagesRecorder.includes(to.name);

  //const pagesBasic = ['Players', 'Reports', 'Tournament'];
  const pagesBasic = [];
  const authRequiredBasic = pagesBasic.includes(to.name);


  let tournamentId = to.params.tournament;
  let role = "";
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch{
    user = null;
  }

  //get role for tournament
  if (user && user.roles && tournamentId) {
    role = user.roles[tournamentId];
  }

  //check if has Admin role for tournament
  if (authRequiredAdmin && !(role == "Admin")) {
    return next(`/Login?redirect=${to.path}`);
  }
  //check if has Recorder role for tournament
  if (authRequiredRecorder && !(role == "Admin" || role == "Recorder")) {
    return next(`/Login?redirect=${to.path}`);
  }
  //check if has Recorder role for tournament
  if (authRequiredBasic && !(role == "Admin" || role == "Recorder" || role == "Basic")) {
    return next(`/Login?redirect=${to.path}`);
  }


  next();
});

Vue.component('downloadCsv', JsonCSV)
Vue.component('layout-menu', LayoutMenu);
Vue.component('layout-no-menu', LayoutNoMenu);
Vue.component('layout-raw', LayoutRaw);
new Vue({
  router,
  render: h => h(App),

}).$mount('#app')
