import Vue from 'vue'
import Router from 'vue-router'
//import Home from './views/Home.vue'
import Tournament from './views/Tournament.vue'
import Tournaments from './views/Tournaments.vue'
import Players from './views/Players.vue'
import Player from './views/Player.vue'
import PlayerEdit from './views/PlayerEdit.vue'
import Rounds from './views/Rounds.vue'
import Round from './views/Round.vue'
import FAQ from './views/FAQ.vue'
import Admin from './views/Admin.vue'
import Reports from './views/Reports.vue'
import ReportScoreByAll from './views/ReportScoreByAll.vue'
import ReportScoreByGrade from './views/ReportScoreByGrade.vue'
import ReportScoreByDivision from './views/ReportScoreByDivision.vue'
import ReportScoreDetailed from './views/ReportScoreDetailed.vue'



//import RoundEdit from './views/PlayerEdit.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL || "",
  routes: [
    {
      path: '/',
      name: 'home',
      component: Tournaments
    },
    {
      path: '/tournaments',
      name: 'tournaments',
      component: Tournaments
    },
    {
      path: '/:tournament',
      name: 'tournament',
      component: Tournament
    },

    {
      path: '/:tournament/players',
      name: 'players',
      component: Players
    },
    {
      path: '/:tournament/player/:id',
      name: 'player',
      component: Player
    },
    {
      path: '/:tournament/playeredit/:id',
      name: 'playerEdit',
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
      path: '/:tournament/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/:tournament/faq',
      name: 'faq',
      component: FAQ
    },
    {
      path: '/:tournament/reports',
      name: 'reports',
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
    },  {
      path: '/:tournament/ReportScoreDetailed',
      name: 'ReportScoreDetailed',
      component: ReportScoreDetailed
    },
    

  ]
})
