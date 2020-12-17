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
import LayoutTabs from "@/components/LayoutTabs.vue";
import Toast from "@/components/Toast.js";
import JsonCSV from 'vue-json-csv'
import NotificationSocket from "@/services/NotificationSocket.js";
//import TournamentSocket from "@/services/TournamentSocket.js";
import EventBus from "@/services/EventBus.js";

//install ionic vue - https://www.youtube.com/watch?v=k6LH1L61E0Q

const version = "2.1";
const analyticsGA = new AnalyticsGA();
analyticsGA.TrackStart("Tournament", version, "UA-2052018-24");
analyticsGA.TrackPage("Start");

const authentication = new Authentication();
const authorization = new Authorization();

const toast = new Toast();

const notification = new Notification();
notification.init();
notification.onTokenRefresh = function (token) {
  authentication.sendNotificationToken(token);
};
// notification.onMessage = function (payload) {
//   // //show toast message
//   // if (!payload) return false;
//   // if (!payload.notification) return false;

//   // let notification = payload.notification;
//   // let message = notification.title;
//   // let url = (payload.fcmOptions) ? payload.fcmOptions.link : null;
//   // toast.show(message, 15000, "/audio/arpeggio.mp3", url, "_self");
// };

const token = authentication.getToken();


// const tournamentSocket = new TournamentSocket();
// tournamentSocket.connect(token);

const notificationSocket = new NotificationSocket();
notificationSocket.connect(token);
// notificationSocket.connect(token).then(() => {
//   let user = authentication.getUser();
//   if (user) signalR.send("Login", user.userName);
// });
notificationSocket.onUpdate = function (data) {
  EventBus.$emit('updated', data);
};
notificationSocket.onNotification = function (notification) {
  //show toast message
  if (!notification) return false;

  let message = notification.title;
  let url = notification.link;
  toast.show(message, 15000, "/audio/arpeggio.mp3", url, "_self");
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

  if (user) {
    userName = user.userName;
    roles = user.roles || [];
  }
  //check roles locally
  let allowAccess = authorization.isPageAllowed(toPage, tournamentId, roles, userName);
  if (allowAccess) {
    next();
  } else {
    //check roles from server
    authorization.requestAccess(userName, tournamentId)
      //authorization.refreshAccess(userName)
      .then((user) => {
        if (!user) throw "no user found";
        let roles = user.roles || [];
        let allowAccess2ndTry = authorization.isPageAllowed(toPage, tournamentId, roles, userName);
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
router.afterEach((to) => {
  let tournamentIdParameter = to.params.tournament;
  let tournamentId = parseInt(tournamentIdParameter);
  if (!isNaN(tournamentId))
    notificationSocket.joinTournament(tournamentId);
});

Vue.component('downloadCsv', JsonCSV)
Vue.component('layout-menu', LayoutMenu);
Vue.component('layout-no-menu', LayoutNoMenu);
Vue.component('layout-raw', LayoutRaw);
Vue.component('layout-tabs', LayoutTabs);
new Vue({
  router,
  render: h => h(App),

}).$mount('#app')
