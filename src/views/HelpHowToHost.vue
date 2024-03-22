<template>
  <layout-no-menu>
    <ion-page class="ion-page" main>
      <ion-content>
        <div style="background-color:#3880ff;color:#FFFFFF;">
          <ion-img slot="" style="height: 100px" src="./images/trophyflat.png"></ion-img>
          <ion-title>
            <h1 style="text-align: center">Bracket JD</h1>
          </ion-title>
        </div>
        <div style="margin:20px 20px;">

          <h1>Tournament Hosting</h1>
          <p>Bracket JD is used as a tournament tool to help run tournaments hosted either in-person or online.  
            It is designed to be easy to use and flexible to support many different types of tournaments. 
            Ultimately it is up to the tournament director to decide how to run the tournament. </p>
            <p>Below is a guide to help you get started hosting a tournament. </p> 

          <h2>Flow</h2>
          <p>The tournament flow has automatic mode, semi automatic, or manual mode.  The flow switches between the
            different tournament states.</p>
          <ul>
            <li><b>Setup:</b> Admin setting up the tournament. No one is allowed to register.</li>
            <li><b>Registration:</b>Users are allowed to register. For in-person tournaments, this is also the stage for
              the Admins and Recorders to check-in all the players and mark them as "present"</li>
            <li><b>Check-in:</b>Self check-in to be included in the upcoming round. This is primarily used for online
              tournaments and is turned off for in-person tournaments.</li>
            <li><b>Play:</b>The round has been created and all players find their seats and start their game. This can
              also trigger the notifications to each player with the pairings. For online tournaments, check-in will
              flow at this stage until all rounds are completed.</li>
            <li><b>End:</b>The tournament is over. All players will get an email with the score cards.</li>

          </ul>
          <p>The flow of the tournament is controlled on the Admin Page in the top section. The Blue button is the
            primary flow.</p>

          <p> <img style="max-width:400px;" src="/images/help/AdminFlowRegistation.png" alt="Admin Flow Tournament" />
          </p>


          <h2>Registration</h2>
          <p>Online registration allows players to register their player before the tournament and only while
            registration is open. </p>
          <p>A welcome email is sent when the player registers with the tournament details.</p>
          <p>Tournaments can be set to public, private, or hidden. Tournaments with basic access codes restrict random
            players from registering without the basic access code. </p>

          <p><img style="max-width:400px;" src="/images/help/UserRegistration.png" alt="Tournament User Registration" />
          </p>


          <h2>Access</h2>
          <p>There are three levels of access; <b>Basic, Recorder, Admin</b>. An access code is created for each level. Sharing
            the access code allows a user access to that level. Access codes are randomly set, but can be changed to
            easier to remember more field access codes in the admin settings. </p>
          <p>Alternatively, an admin can manually grant a player access in the admin settings "User Access".</p>
          <p><b>Basic</b> - A player participating in the tournament <br />
            <b>Recorder</b> - Register players, updates players details, record match results<br />
            <b>Admin</b> - Create tournament, manage tournament flow, create rounds, and all other tournament settings.</p>
          <p> <img style="max-width:400px;" src="/images/help/AdminAccessCodes.png" alt="Tournament Access Codes" /></p>


          <h2>Check in</h2>
          <p>Admin or recorders have access to verify registration and mark as present (and paid if required)
            Multiple users with access can register players at the same time. </p>
          <p>In typical in-person tournaments to save time, players have already registered online using the basic
            access code beforehand and the check-in step is used to mark the player as "present", collect payment and
            mark as paid (if a paid tournament) and verify their details (name, grade and school).</p>
          <p>Online tournaments are required to self-check-in each round. This is turned off for in-person tournaments.
          </p>
          <p> <img style="max-width:400px;" src="/images/help/RecorderCheck-in.png" alt="Tournament Check-in" /></p>




          <h2>Round Create</h2>
          <p>There are two ways to create rounds. The easiest way is to use the "One click" create round button found on
            the tournament flow controller. This uses the default round creation settings which work for most scenarios.
            Online players marked as "present" will be included in the round creation.</p>
          <p>The advanced "create round" mode allows the admin to choose a weighted or swiss system match up. </p>
          <p>The weighted mode is flexible and powerful creating no to minimal byes while satisfying all the
            requirements of the tournament director. The weights are; score, not same club, not same player, rating, and
            grade. Some weights can be set to absolute mode to force a weight to never happen. The more absolutes, the
            higher chance of more byes. They can be toggled to fit your tournaments requirements for your club or
            league.</p>
          <p>The swiss sys mode follows a more strict pairing. Some customizable options are still available that
            support the rules of a swiss sys matchup.</p>

          <p>More modes are coming soon, but many can be created by adjusting the weights and absolutes </p>
          <h4>Create Round - Simple Mode</h4>
          <p>
            <img style="max-width:400px;" src="/images/help/AdminCreateRoundFlow.png" alt="Tournament Create Round" />
          </p>
          <h4>Create Round - Advanced Mode</h4>
          <p> <img style="max-width:400px;" src="/images/help/AdminCreateRoundAdvanced.png"
              alt="Tournament Create Advanced Round" /></p>
          <p> <img style="max-width:400px;" src="/images/help/AdminCreateRoundAdvancedVerfiy.png"
              alt="Tournament Verfiy Round" /></p>




          <h2>Communicate pairings</h2>
          <p>All players have access to the round chart with seating assignments and results on the "Rounds" page.</p>
          <p>All players are notified of the "round pairing" via Push notifications or sms. The round pairing will
            appear on the main page for each user. This will include more than one player that is a user registered to
            multiple players under their login (email), such as a parent of multiple children or a coach.</p>
          <p>Most in-person tournaments have gone "paperless" with the three methods of communication and the abundance
            of players owning a mobile device.</p>

          <h2>Record matches</h2>
          <p>On the Rounds page, Admin or Recorders can record match results. Multiple users with access can record
            matches at the same time. </p>
          <p>To record the results, go to the "Rounds" page, find the match, and click win,lose, or tie with a single
            click. The round page can be searched by name, table number, or club for larger tournaments.</p>
          <p>There is an advanced recording mode for any expectation. Manual table creation is available to support new
            tables or adjust by the tournament director or judges.</p>
          <p>All standings reports update instantly.</p>

          <p> <img style="max-width:400px;" src="/images/help/Round.png" alt="Tournament Round List" /> <img
              style="max-width:400px;" src="/images/help/RecorderRecordMatch.png" alt="Record Match" /></p>

          <h2>Standings Reports</h2>
          <p>The main page displays a basic standing and updates live. The reports section offers several other standing
            reports; Grade standings, Teams standing (top 5 per team), Wall chart, and more. If teams are used, a
            tournament setting can display this standing on the main page with live updates.</p>
          <p>Choose your winner using the standings besed on your tournament rules.</p>

          <h2>End Tournament</h2>
          <p>When the tournament is completed an "email" is sent to all users with score card of all their games and
            scores</p>


          <h2>FAQ</h2>
          <p>Tournament directors can add any text to the FAQ section for players to read. The welcome email also has a
            link to it.</p>


          <h2>Registration instructions</h2>
          <p>Tournament directors can add any text to the Registration for players to read. </p>

          <h2>Main page widget</h2>


          <p>Custom text can be added to the main page.</p>




          <h2>Basic Setup</h2>
          <ul>
            <li>Name* - The name of the tournament</li>
            <li>Start Date* - The date the tournament starts</li>
            <li>Start Time* - The local time the tournament will starts</li>
            <li>Rounds - Number of rounds until the tournament ends</li>
            <li>Twitch Profile (optional) - The Twitch Streaming account name. (See blow for more info)</li>
            <li>FAQ Content - Information and rules about your tournament displayed in the FAQ (help) section </li>
            <li>Signup Page - Custom instructions to display to on the sign up page. </li>
          </ul>
          <p>* Required</p>
          <img style="max-width:400px;" src="/images/help/AdminCreateBasic.png"
            alt="screen shot of create tournament Settings" />

          <h2>Create Tournament</h2>
          <p>
            To create a tournament click the create tournament button at the
            bottom of the tournaments page. You can also copy an old tournament
            from the admin section of that tournament.
          </p>
          <p><a href="https://bracketjd.com/Tournaments">https://bracketjd.com/Tournaments</a></p>
          <img style="max-width:400px;" src="/images/help/CreateTournamentButton.png"
            alt="screen shot of create tournament Button" />


          <h2>Copy Tournament</h2>
          <p>You can copy an existing tournament when creating a new tournament. This will create a copy all the setting
            and clear all the players and rounds.</p>
          <img style="max-width:400px;" src="/images/help/AdminCopyTournament.png" alt="Admin Copy Tournament" />

          <h2>Advanced Setup</h2>
          <p>The ** items are required, The * items are common:</p>
          <ul>
            <li>**Name - The name of the tournament</li>
            <li>**Start Date - The date the tournament starts</li>
            <li>**Start Time - The local time the tournament will starts</li>
            <li>*Twitch Profile - The streaming twitch profile name</li>
            <li>
              *Access Code: Admin - The access code to grant Admin level
              privileges. (full access: start tournament, progress tournament,
              change settings)
            </li>
            <li>
              Access Code: Recorder - The access code to grant Recorder level
              privileges (record and modify matches)
            </li>
            <li>
              Access Code: Basic- The access code to grant User level privileges.
              (register for the tournament. Basic access is also need to view the
              tournament if isPublic is not checked)
            </li>
            <li>Image: The url to an image used for the tournament icon.</li>
            <li>
              Team: A list of teams the users can select from when registering
            </li>
            <li>Max player: Max players allowed to register.</li>
            <li>
              Auto Advance Rounds:
              <ul>
                <li>Auto start check-in when all games have been recorded</li>
                <li>
                  Auto start the rounds when check-in is completed
                </li>
                <li>Auto end the tournament</li>
                <li>Auto start the tournament (not implemented yet)</li>
              </ul>
            </li>
            <li>Is Hidden: hide the tournament on the tournaments page</li>
            <li>
              Require Check-in: Players are required to check-in for each round.
              This is highly recommended for online tournaments. For small
              tournaments online when the host has a direct line of communication
              with each player, check-in may not be needed. For offline
              tournaments, check-in for each round may not be needed
            </li>
            <li>Allow Registration: Allow players to register.</li>
            <li>
              Is Public: Allow players to view the tournament without an access
              code.
            </li>
          </ul>

          <h2>Advanced Flow ("auto advance" is not set)</h2>
          <p>Non Auto Advance mode it best for inperson tournaments.</p>
          <p>The flow of the tournament is as follows:</p>
          <ol>
            <li>
              Setup
              <ul>
                <li>Setup the tournament</li>
                <li></li>
              </ul>
            </li>
            <li>
              Registration
              <ul>
                <li>Click " Registration" at the top of the admin page</li>
                <li>Player register</li>
              </ul>
            </li>
            <li>
              Check-in
              <ul>
                <li>Click "Check-in" at the top of the admin page</li>
                <li>
                  All players check-in. There is a timer, but it does not auto
                  create the round, yet.
                </li>
              </ul>
            </li>
            <li>
              Create Round
              <ul>
                <li>Click "create round" at the top of the admin page</li>
              </ul>
            </li>
            <li>
              Play Games
              <ul>
                <li>Find your table/room and play your opponent.</li>
                <li>
                  You can click on the "Room" button on the table to be sent
                  directly to a Cribbage private room with your opponent.
                </li>
              </ul>
            </li>
            <li>
              Record Results
              <ul>
                <li>
                  Most is recorded automatically by the system, but in some cases
                  the admins will need to record the score. Such as a player no
                  show, a bye, or the system didn't not score the player.
                </li>
                <li>
                  Once all the matches have been scored, continue to che-in for
                  the next round.
                </li>
              </ul>
            </li>
            <li>
              Check-in/Create Round 2-5 (step 3)
              <ul>
                <li>Repeat steps 3-6 for all your rounds.</li>
              </ul>
            </li>
            <li>
              End Tournament
              <ul>
                <li>Use the reports to decide a winner based on your criteria</li>
              </ul>
            </li>
          </ol>
          <img style="max-width:400px;" src="/images/help/AdminFlow.png" alt="screen shot of admin flow" />
          <h2 id="stream">Stream</h2>
          <p>
            To stream you will need to create a twitch account. Twitch also has a
            free user-friendly streaming application you can download for free.
            Once you have created the twitch account, you need to enter the
            streaming using name in the tournament settings.
          </p>
          <img style="max-width:400px;" src="/images/help/AdminStream.png" alt="screen shot of admin stream settings" />
        </div>
      </ion-content>
    </ion-page>
  </layout-no-menu>
</template>
