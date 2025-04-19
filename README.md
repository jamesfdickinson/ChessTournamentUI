# Chess Tournament

This is the UI for https://bracketjd.com.  It relies on the Chess Tournament web API for the backend.  

Currently several local schools are using bracketjd.com.

The tournament software is a web based and mobile optimized solution needed for our growing tournaments. After volunteering to run the pairings and scoring for local grade school chess club tournaments, we ran into multiple bottlenecks.  We tried different softwares and none could support larger groups than 50 without delaying the tournaments timeline even with multiple scorekeepers.  

This project is designed to be a web based solution designed for mobile and tables that allows multiple scorekeepers to enter scores at the same time.  The software allows for quick corrections by coaches and exception without halting the full tournament.  The parents could also see their children's scores in real time.  

We have ran multiple tournaments with 200+ students all of which ended on time or ahead of schedule. The tournament have also moved to paperless and without cables. All registration, score keeping and pairing were done on mobile devices or tablets.  Push notification all for quick and seamless round transitions and communication.

Other tournament software had limited pairing algorithms. The new system took into account grade, team, previously played opponents, and ELO ranking and rating. All the weights can be adjusted on the fly as seen fit by the chess club coaches. Once pairing are created, the students start finding their next table via the app and a text message, often even before we announce a new round.  FIDE ratings are not connected to the internal system at this time.


<img src="./screenshots/Tournaments.png" alt="Tournaments" width="200"/><img src="./screenshots/TournamentPage.png" alt="Tournament" width="200"/><img src="./screenshots/RoundsPage.png" alt="RoundsPage" width="200"/><img src="./screenshots/RoundPage.png" alt="RoundPage" width="200"/><img src="./screenshots/Menu.png" alt="Menu" width="200"/><img src="./screenshots/Reports.png" alt="Reports" width="200"/>


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

## Change Log
### 2.9 "Swiss Pairing"
- Swiss pairing sing FIDE rules
- Rounds filter-able by team
- Pairing Reports: Tournament + Save



### 2.5 "Pairing / Gender / Cohost"
- 4 pairing options Weights, Swiss, Round Robin, and Stable
- Pairing setting save for simple mode
- Gender option for chess and added to admin player report
- Cohost option added to touranment settings and will carry over if tourmanet is copied

### 2.5 "Create Round Swiss / Report"
- Swiss create round option
- Player detailed report
- fix wall chart and other reports

### 2.4 "Create Tournament"
- Copy tournament
- Better data and time picker
- Twitch settings are now just your Twitch username in the tournament settings.
- Many bug fixes (should need to refresh less)
- Chat scrolling reworked 
- Configuable Check-in duration
- Upgraded to .net 5

### 2.3 "Admin"
- Create new tables (simple)
### 2.12 "Embed game / Round Check in"
- Play the game directly through the tournament software
- Spectate other players' games
- Online status indicator.  This will help with the no-shows
- Live player status and score updates
- Cribbage Id no longer needed to play games
- One Click sign up
