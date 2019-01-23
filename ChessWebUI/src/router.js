import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Tournament from './views/Tournament.vue'
import Tournaments from './views/Tournaments.vue'
import Players from './views/Players.vue'
import Player from './views/Player.vue'
import PlayerEdit from './views/PlayerEdit.vue'
import Rounds from './views/Rounds.vue'
import Round from './views/Round.vue'
import Admin from './views/Admin.vue'
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
      name: 'playeredit',
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
  ]
})
