import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import  Ionic  from '@ionic/vue';

Vue.config.productionTip = true;

Vue.config.ignoredElements = [/^ion-/]
//Vue.use(Ionic);


router.beforeEach((to, from, next) => {
  //todo: move auth class
  // redirect to login page if not logged in and trying to access a restricted page
  const pagesAdmin = ['Admin'];
  const authRequiredAdmin = pagesAdmin.includes(to.name);

  const pagesRecorder = ['Registration', 'PlayerEdit'];
  const authRequiredRecorder = pagesRecorder.includes(to.name);

  const pagesBasic = ['Players', 'Tournament'];
  const authRequiredBasic = pagesBasic.includes(to.name);


  let tournamentId = to.params.tournament;
  let role = "";
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch{ }

  //get role for tournament
  if (user && user.roles && tournamentId) {
    role = user.roles[tournamentId];;
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

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
