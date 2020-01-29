import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import  Ionic  from '@ionic/vue';
import AnalyticsGA from './services/AnalyticsGA'
import Authentication from './services/Authentication'
import Firebase from './services/Firebase'
import LayoutMenu from "@/components/LayoutMenu.vue";
import LayoutNoMenu from "@/components/LayoutNoMenu.vue";
import LayoutRaw from "@/components/LayoutRaw.vue";
import JsonCSV from 'vue-json-csv'


let version = "2.1";
let analyticsGA = new AnalyticsGA();
analyticsGA.TrackStart("Chess", version, "UA-2052018-24");
analyticsGA.TrackPage("Start");

let authentication = new Authentication();

Firebase.init();

Vue.config.productionTip = true;

Vue.config.ignoredElements = [/^ion-/]
//Vue.use(Ionic);

router.beforeEach((to, from, next) => {
  analyticsGA.TrackPage(to.path);

  //todo: user meta data on route table to determin roles needed - https://jasonwatmore.com/post/2019/03/08/vuejs-role-based-authorization-tutorial-with-example#fake-backend-js
  //todo: move auth class //////

  //get user
  let user = authentication.getUser();
  

  //requirer 
  const pagesNoAuthenticationRequired = ['UserCreate','Login','SignUp','SignUpComplete','FAQ','PasswordResetRequest','PasswordChange'];
  const authRequired = !pagesNoAuthenticationRequired.includes(to.name);
  if (authRequired && !user) {
    return next(`/Login?redirect=${to.path}`);
  }

  //redirect to login page if not logged in and trying to access a restricted page
  const pagesAdmin = ['Admin'];
  const authRequiredAdmin = pagesAdmin.includes(to.name);

  const pagesRecorder = ['Registration', 'PlayerEdit', 'TableEdit'];
  const authRequiredRecorder = pagesRecorder.includes(to.name);

  const pagesBasic = ['Players', 'Reports', 'Tournament'];
  //const pagesBasic = [];
  const authRequiredBasic = pagesBasic.includes(to.name);


  let tournamentId = to.params.tournament;
  let roles = [];

  if (user && user.roles) {
    roles = user.roles;
  }

  //contains role "tournamentId-role".  
  let adminRole = tournamentId + "-Admin";
  let recorderRole = tournamentId + "-Recorder";
  let basicRole = tournamentId + "-Basic";

  //check if has Admin role for tournament
  if (authRequiredAdmin && !(roles.includes(adminRole))) {
    return next(`/${tournamentId}/AccessDenied?redirect=${to.path}`);
  }
  //check if has Recorder role for tournament
  if (authRequiredRecorder && !(roles.includes(adminRole) || roles.includes(recorderRole))) {
    return next(`/${tournamentId}/AccessDenied?redirect=${to.path}`);
  }
  //check if has Recorder role for tournament
  if (authRequiredBasic && !(roles.includes(adminRole) || roles.includes(recorderRole) || roles.includes(basicRole))) {
    return next(`/${tournamentId}/AccessDenied?redirect=${to.path}`);
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
