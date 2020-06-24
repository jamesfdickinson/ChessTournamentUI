// import '@ionic/core/css/core.css'
// import '@ionic/core/css/ionic.bundle.css'
import Vue from 'vue'
import VueSimpleAlert from "vue-simple-alert";
import CKEditor from '@ckeditor/ckeditor5-vue';
import App from './App.vue'
import router from './router'

// import Ionic from "@ionic/vue"
// import "@ionic/core/css/core.css"
// import "@ionic/core/css/ionic.bundle.css"

// import Ionic  from '@ionic/vue';
import AnalyticsGA from './services/AnalyticsGA'
import Authentication from './services/Authentication'
import Authorization from './services/Authorization'
import Notification from './services/Notification'
import LayoutMenu from "@/components/LayoutMenu.vue";
import LayoutNoMenu from "@/components/LayoutNoMenu.vue";
import LayoutRaw from "@/components/LayoutRaw.vue";
import JsonCSV from 'vue-json-csv'

//install ionic vue - https://www.youtube.com/watch?v=k6LH1L61E0Q

let version = "2.1";
let analyticsGA = new AnalyticsGA();
analyticsGA.TrackStart("Tournament", version, "UA-2052018-24");
analyticsGA.TrackPage("Start");

let authentication = new Authentication();
let authorization = new Authorization();

let notification = new Notification();
notification.init();
notification.onTokenRefresh = function (token) {
  authentication.sendNotificationToken(token);
};

Vue.config.productionTip = true;

Vue.config.ignoredElements = [/^ion-/]
//Vue.use(Ionic);
Vue.use(VueSimpleAlert);
Vue.use(CKEditor);
router.beforeEach((to, from, next) => {
  analyticsGA.TrackPage(to.path);

  //todo: user meta data on route table to determin roles needed - https://jasonwatmore.com/post/2019/03/08/vuejs-role-based-authorization-tutorial-with-example#fake-backend-js
  //todo: move auth class //////

  //get user
  let user = authentication.getUser();


  //require
  const pagesNoAuthenticationRequired = ['UserCreate', 'Login', 'PasswordResetRequest', 'PasswordChange'];
  const authRequired = !pagesNoAuthenticationRequired.includes(to.name);
  if (authRequired && !user) {
    return next(`/Login?redirect=${to.path}`);
  }

  let toPage = to.name;
  let tournamentId = to.params.tournament;
  let userName = null;
  let roles = [];

  if (user){
    userName = user.userName;
    roles = user.roles||[];
  }
  //check server roles locally
  let allowAccess = authorization.isPageAllowed(toPage, tournamentId, roles,userName);
  if (allowAccess) {
    next();
  } else {
    //check server roles from server
    authorization.refreshAccess(userName)
      .then((user) => {
        if(!user) throw "no user found";
        let roles = user.roles||[];
        let allowAccess2ndTry = authorization.isPageAllowed(toPage, tournamentId, roles,userName);
        if (allowAccess2ndTry) {
          next();
        } else {
          return next(`/${tournamentId}/AccessDenied?redirect=${to.path}`);
        }
      })
      .catch(() => {
        return next(`/${tournamentId}/AccessDenied?redirect=${to.path}`);
      });
  }
});

Vue.component('downloadCsv', JsonCSV)
Vue.component('layout-menu', LayoutMenu);
Vue.component('layout-no-menu', LayoutNoMenu);
Vue.component('layout-raw', LayoutRaw);
new Vue({
  router,
  render: h => h(App),

}).$mount('#app')
