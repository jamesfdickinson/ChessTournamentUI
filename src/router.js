import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Tournament from './views/Tournament.vue'
import Tournaments from './views/Tournaments.vue'
import Registration from './views/Registration.vue'
import SignUp from './views/SignUp.vue'
import SignUpComplete from './views/SignUpComplete.vue'
import Players from './views/Players.vue'
import Player from './views/Player.vue'
import PlayerEdit from './views/PlayerEdit.vue'
import Rounds from './views/Rounds.vue'
import Round from './views/Round.vue'
import RoundDetails from './views/RoundDetails.vue'
import TableEdit from './views/TableEdit.vue'
import FAQ from './views/FAQ.vue'
import Admin from './views/Admin.vue'
import Reports from './views/Reports.vue'
import ReportScoreByAll from './views/ReportScoreByAll.vue'
import ReportScoreByGrade from './views/ReportScoreByGrade.vue'
import ReportScoreByDivision from './views/ReportScoreByDivision.vue'
import ReportScoreDetailed from './views/ReportScoreDetailed.vue'
import ReportScoreGroupRank from './views/ReportScoreGroupRank.vue'
import ReportWallChart from './views/ReportWallChart.vue'


//import RoundEdit from './views/PlayerEdit.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL || "",
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Tournaments
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Tournaments',
      name: 'Tournaments',
      component: Tournaments
    },
    {
      path: '/:tournament',
      name: 'Tournament',
      component: Tournament
    },
    {
      path: '/:tournament/Tournament',
      name: 'TournamentHome',
      component: Tournament
    },

    {
      path: '/:tournament/Registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/:tournament/SignUp',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/:tournament/SignUpComplete',
      name: 'SignUpComplete',
      component: SignUpComplete
    },
    {
      path: '/:tournament/Players',
      name: 'Players',
      component: Players
    },
    {
      path: '/:tournament/Player/:id',
      name: 'Player',
      component: Player
    },
    {
      path: '/:tournament/PlayerEdit/:id',
      name: 'PlayerEdit',
      component: PlayerEdit
    },
    {
      path: '/:tournament/PlayerEdit',
      name: 'PlayerNew',
      component: PlayerEdit
    },
    {
      path: '/:tournament/rounds',
      name: 'rounds',
      component: Rounds
    },
    {
      path: '/:tournament/round/:id',
      name: 'round',
      component: Round
    },
    {
      path: '/:tournament/RoundDetails/:id',
      name: 'RoundDetails',
      component: RoundDetails
    },
    {
      path: '/:tournament/round/:round/TableEdit/:id',
      name: 'TableEdit',
      component: TableEdit
    },
    {
      path: '/:tournament/Admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/:tournament/FAQ',
      name: 'FAQ',
      component: FAQ
    },
    {
      path: '/:tournament/reports',
      name: 'Reports',
      component: Reports
    },
    {
      path: '/:tournament/ReportScoreByAll',
      name: 'ReportScoreByAll',
      component: ReportScoreByAll
    },
    {
      path: '/:tournament/ReportScoreByGrade',
      name: 'ReportScoreByGrade',
      component: ReportScoreByGrade
    },
    {
      path: '/:tournament/ReportScoreByDivision',
      name: 'ReportScoreByDivision',
      component: ReportScoreByDivision
    },
    {
      path: '/:tournament/ReportScoreDetailed',
      name: 'ReportScoreDetailed',
      component: ReportScoreDetailed
    },
    {
      path: '/:tournament/ReportScoreGroupRank',
      name: 'ReportScoreGroupRank',
      component: ReportScoreGroupRank
    },
    {
      path: '/:tournament/ReportWallChart',
      name: 'ReportWallChart',
      component: ReportWallChart
    },


  ]
});

