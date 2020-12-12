import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from './views/Home.vue'
import Login from './views/Login.vue'
import PasswordChange from './views/PasswordChange.vue'
import PasswordResetRequest from './views/PasswordResetRequest.vue'
import AccessDenied from './views/AccessDenied.vue'
import Tournament from './views/Tournament.vue'
import TournamentEdit from './views/TournamentEdit.vue'
import Tournaments from './views/Tournaments.vue'
import CheckIn from './views/CheckIn.vue'
import SignUp from './views/SignUp.vue'
import SignUpComplete from './views/SignUpComplete.vue'
import SignUpEdit from './views/SignUpEdit.vue'
import PlayGame from './views/PlayGame.vue'
import Players from './views/Players.vue'
import Player from './views/Player.vue'
import PlayerEdit from './views/PlayerEdit.vue'
import Rounds from './views/Rounds.vue'
import RoundsEdit from './views/RoundsEdit.vue'
import Round from './views/Round.vue'
import RoundEdit from './views/RoundEdit.vue'
import RoundEditRaw from './views/RoundEditRaw.vue'
//import RoundCreate from './views/RoundCreate.vue'
import RoundCreateSwiss from './views/RoundCreateSwiss.vue'
import RoundCreateSingleElimination from './views/RoundCreateSingleElimination.vue'
import RoundDetails from './views/RoundDetails.vue'
import TableEdit from './views/TableEdit.vue'
import FAQ from './views/FAQ.vue'
import FAQEdit from './views/FAQEdit.vue'
import Admin from './views/Admin.vue'
import AdminTools from './views/AdminTools.vue'
import SendMessage from './views/SendMessage.vue'
import Standings from './views/Standings.vue'
import Reports from './views/Reports.vue'
import ReportScoreByAll from './views/ReportScoreByAll.vue'
import ReportScoreByGrade from './views/ReportScoreByGrade.vue'
import ReportScoreByDivision from './views/ReportScoreByDivision.vue'
import ReportScoreDetailed from './views/ReportScoreDetailed.vue'
import ReportScoreGroupRank from './views/ReportScoreGroupRank.vue'
import ReportScoreGroupRankDetails from './views/ReportScoreGroupRankDetails.vue'
import ReportScoreSubGradeGroupRank from './views/ReportScoreSubGradeGroupRank.vue'
import ReportWallChart from './views/ReportWallChart.vue'
import User from './views/User.vue'
import UserCreate from './views/UserCreate.vue'
import UserEdit from './views/UserEdit.vue'
import UserAccess from './views/UserAccess.vue'


//import RoundEdit from './views/PlayerEdit.vue'

Vue.use(VueRouter)

export default new VueRouter({
  base: process.env.BASE_URL || "",
  mode: (process.env.BASE_URL === "." || process.env.BASE_URL === "" || process.env.BASE_URL === "./") ? 'hash' : 'history',

  routes: [
    {
      path: '/',
      name: 'Home',
      component: Tournaments
    },
    {
      path: '/index.html',
      name: 'Home',
      component: Tournaments
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/PasswordChange',
      name: 'PasswordChange',
      component: PasswordChange
    },
    {
      path: '/PasswordResetRequest',
      name: 'PasswordResetRequest',
      component: PasswordResetRequest
    },
    {
      path: '/User',
      name: 'User',
      component: User
    },
    {
      path: '/UserCreate',
      name: 'UserCreate',
      component: UserCreate
    },
    {
      path: '/UserEdit',
      name: 'UserEdit',
      component: UserEdit
    },
    {
      path: '/:tournament/UserAccess',
      name: 'UserAccess',
      component: UserAccess
    },
    {
      path: '/:tournament/AccessDenied',
      name: 'AccessDenied',
      component: AccessDenied
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
      path: '/:tournament/TournamentEdit',
      name: 'TournamentEdit',
      component: TournamentEdit
    },
    {
      path: '/:tournament/CheckIn',
      name: 'CheckIn',
      component: CheckIn
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
      path: '/:tournament/SignUpEdit',
      name: 'SignUpEdit',
      component: SignUpEdit
    }, 
    {
      path: '/:tournament/PlayGame/:id',
      name: 'PlayGame',
      component: PlayGame
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
      path: '/:tournament/Rounds',
      name: 'Rounds',
      component: Rounds
    },
    {
      path: '/:tournament/RoundCreate',
      name: 'RoundCreate',
      component: RoundCreateSwiss
    },
    {
      path: '/:tournament/RoundCreateSwiss',
      name: 'RoundCreateSwiss',
      component: RoundCreateSwiss
    },
    {
      path: '/:tournament/RoundCreateSingleElimination',
      name: 'RoundCreateSingleElimination',
      component: RoundCreateSingleElimination
    },
    {
      path: '/:tournament/RoundEdit/:id',
      name: 'RoundEdit',
      component: RoundEdit
    },
    {
      path: '/:tournament/RoundEditRaw/:id',
      name: 'RoundEditRaw',
      component: RoundEditRaw
    },
    {
      path: '/:tournament/RoundsEdit',
      name: 'RoundsEdit',
      component: RoundsEdit
    },
    {
      path: '/:tournament/Round/:id',
      name: 'Round',
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
      path: '/:tournament/AdminTools',
      name: 'AdminTools',
      component: AdminTools
    },
    {
      path: '/:tournament/SendMessage',
      name: 'SendMessage',
      component: SendMessage
    },
    {
      path: '/:tournament/FAQ',
      name: 'FAQ',
      component: FAQ
    },
    {
      path: '/:tournament/FAQEdit',
      name: 'FAQEdit',
      component: FAQEdit
    },
    {
      path: '/:tournament/standings',
      name: 'Standings',
      component: Standings
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
      path: '/:tournament/ReportScoreGroupRankDetails',
      name: 'ReportScoreGroupRankDetails',
      component: ReportScoreGroupRankDetails
    },
    {
      path: '/:tournament/ReportScoreSubGradeGroupRank',
      name: 'ReportScoreSubGradeGroupRank',
      component: ReportScoreSubGradeGroupRank
    },
    {
      path: '/:tournament/ReportWallChart',
      name: 'ReportWallChart',
      component: ReportWallChart
    },


  ]
});

