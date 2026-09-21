# Chess Tournament

This is the UI for https://tournamentjd.com.  It relies on the Chess Tournament web API for the backend.  

Currently several local schools are using tournamentjd.com.

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

### GitHub deployment

Both GitHub Actions workflows install Node.js 22, run `npm ci` and
`npm run build`, then deploy the newly generated `www/` folder:

- `master_tournamentjd.yml`: `master` to the Azure app **tournamentjd** (live site).
- `beta_tournamentjd-beta.yml`: `beta` to **TournamentJD-Beta**.

Both target the app's `Production` slot. A failed install or build stops
deployment. No local build or commit of generated files is needed for these
workflows. They can also be run manually; the production job only runs from
`master`.

The optional GitHub Actions repository variable `VUE_APP_API_URL` sets the API
URL at build time. It defaults to `https://bracketjd-api.azurewebsites.net/` and
must include a trailing slash. This value is public frontend configuration.
Beta Azure login continues to use its existing repository secrets.

Production setup (one time):

1. Configure an Azure deployment identity with a GitHub OIDC federated credential
   for `repo:jamesfdickinson/ChessTournamentUI:ref:refs/heads/master` and audience
   `api://AzureADTokenExchange`, and deployment access to the `tournamentjd` app
   in resource group `Tournament`.
2. Add GitHub repository secrets `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and
   `AZURE_SUBSCRIPTION_ID` for that identity.
3. Disconnect the old Azure DevOps continuous deployment source for `tournamentjd`
   in Azure Deployment Center when switching to GitHub Actions. Otherwise pushes
   to the old source could overwrite the GitHub deployment.
4. Push these source/workflow changes to the **github** remote's `master` branch
   (the **origin** remote is Azure DevOps), and verify the production workflow.

The old tracked `www/` is retained during this handover because production was
configured to deploy from Azure DevOps. Once all deployments build from source,
add `/www/` to `.gitignore` and run `git rm -r --cached www` once. Keep `public/`
tracked as the source of static assets and `web.config`.

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
