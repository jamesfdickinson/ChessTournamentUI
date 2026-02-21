import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import PasswordChange from './views/PasswordChange.vue'
import PasswordResetRequest from './views/PasswordResetRequest.vue'
import VerifyEmail from './views/VerifyEmail.vue'
import AccessDenied from './views/AccessDenied.vue'
import Tournament from './views/Tournament.vue'
import TournamentEdit from './views/TournamentEdit.vue'
import TournamentCreate from './views/TournamentCreate.vue'
import HostAccessRequest from './views/HostAccessRequest.vue'
import HostAccess from './views/HostAccess.vue'
import Tournaments from './views/Tournaments.vue'
import TournamentVideoEdit from './views/TournamentVideoEdit.vue'
import TournamentOverview from './views/TournamentOverview.vue'
import CheckIn from './views/CheckIn.vue'
import SignUp from './views/SignUp.vue'
import SignUpRegister from './views/SignUpRegister.vue'
import SignUpChess from './views/SignUpChess.vue'
import SignUpComplete from './views/SignUpComplete.vue'
import SignUpEdit from './views/SignUpEdit.vue'
import Payment from './views/Payment.vue'
import TeamEdit from './views/TeamEdit.vue'
import PlayGame from './views/PlayGame.vue'
import ChatRoom from './views/ChatRoom.vue'
import Players from './views/Players.vue'
import Player from './views/Player.vue'
import PlayerEdit from './views/PlayerEdit.vue'
import Rounds from './views/Rounds.vue'
import RoundsEdit from './views/RoundsEdit.vue'
import Round from './views/Round.vue'
import RoundEdit from './views/RoundEdit.vue'
import RoundEditRaw from './views/RoundEditRaw.vue'
//import RoundCreate from './views/RoundCreate.vue'
import RoundCreate from './views/RoundCreate.vue'
import RoundDetails from './views/RoundDetails.vue'
import RoundCurrent from './views/RoundCurrent.vue'
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
import ReportScoreGroupRankiframe from './views/ReportScoreGroupRankiframe.vue'
import ReportScoreGroupRankDetails from './views/ReportScoreGroupRankDetails.vue'
import ReportScoreSubGradeGroupRank from './views/ReportScoreSubGradeGroupRank.vue'
import ReportWallChart from './views/ReportWallChart.vue'
import ReportPlayerDetailed from './views/ReportPlayerDetailed.vue'
import ReportPlayerDetailedAdmin from './views/ReportPlayerDetailedAdmin.vue'
import ReportTournamentStats from './views/ReportTournamentStats.vue'
import ReportPairingReport from './views/ReportPairingReport.vue'
import User from './views/User.vue'
import UserCreate from './views/UserCreate.vue'
import UserEdit from './views/UserEdit.vue'
import UserAccess from './views/UserAccess.vue'
import Help from './views/Help.vue'
import HelpHowToHost from './views/HelpHowToHost.vue'

//import RoundEdit from './views/PlayerEdit.vue'

Vue.use(VueRouter)

export default new VueRouter({
  base: process.env.BASE_URL || "",
  mode: (process.env.BASE_URL === "." || process.env.BASE_URL === "" || process.env.BASE_URL === "./") ? 'hash' : 'history',

  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/index.html',
      name: 'Home',
      component: Home
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
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
      path: '/VerifyEmail',
      name: 'VerifyEmail',
      component: VerifyEmail
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
      path: '/Help',
      name: 'Help',
      component: Help
    },
    
    {
      path: '/Help/HowToHost',
      name: 'HelpHowToHost',
      component: HelpHowToHost
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
      path: '/Tournaments/:type',
      name: 'Tournaments',
      component: Tournaments
    },    
    {
      path: '/Tournaments/:type/:stateFilter',
      name: 'Tournaments',
      component: Tournaments
    },
    {
      path: '/TournamentCreate',
      name: 'TournamentCreate',
      component: TournamentCreate
    },
    {
      path: '/HostAccessRequest',
      name: 'HostAccessRequest',
      component: HostAccessRequest
    },
    {
      path: '/HostAccess',
      name: 'HostAccess',
      component: HostAccess
    },
    {
      path: '/TournamentCopy/:copyId',
      name: 'TournamentCopy',
      component: TournamentEdit
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
      path: '/:tournament/TournamentVideoEdit',
      name: 'TournamentVideoEdit',
      component: TournamentVideoEdit 
    },   
     {
      path: '/:tournament/TournamentOverview',
      name: 'TournamentOverview',
      component: TournamentOverview 
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
      path: '/:tournament/SignUpRegister',
      name: 'SignUpRegister',
      component: SignUpRegister
    },
    {
      path: '/:tournament/SignUpChess',
      name: 'SignUpChess',
      component: SignUpChess
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
      path: '/:tournament/Payment',
      name: 'Payment',
      component: Payment
    },
  
    {
      path: '/:tournament/TeamEdit/:id',
      name: 'TeamEdit',
      component: TeamEdit
    },
    
    {
      path: '/:tournament/PlayGame/:id',
      name: 'PlayGame',
      component: PlayGame
    },    {
      path: '/:tournament/ChatRoom/:id',
      name: 'ChatRoom',
      component: ChatRoom
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
      component: RoundCreate
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
      path: '/:tournament/RoundCurrent',
      name: 'RoundCurrent',
      component: RoundCurrent
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
      path: '/:tournament/ReportScoreGroupRankiframe',
      name: 'ReportScoreGroupRankiframe',
      component: ReportScoreGroupRankiframe
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
    {
      path: '/:tournament/ReportPlayerDetailed',
      name: 'ReportPlayerDetailed',
      component: ReportPlayerDetailed
    },      
    {
      path: '/:tournament/ReportPlayerDetailedAdmin',
      name: 'ReportPlayerDetailedAdmin',
      component: ReportPlayerDetailedAdmin
    }, 
    {
      path: '/:tournament/ReportTournamentStats',
      name: 'ReportTournamentStats',
      component: ReportTournamentStats
    }, 
    {
      path: '/:tournament/ReportPairingReport',
      name: 'ReportPairingReport',
      component: ReportPairingReport
    }, 
    
    
  ]
});

