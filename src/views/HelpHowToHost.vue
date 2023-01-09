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


          <h1>"How to Host" Instruction Manual </h1>


          <h2>Create Tournament</h2>
          <p>
            To create a tournament click the create tournament button at the
            bottom of the tournaments page. You can also copy an old tournament
            from the admin section of that tournament.
          </p>
          <p><a href="https://bracketjd.com/Tournaments">https://bracketjd.com/Tournaments</a></p>
          <img src="/images/help/CreateTournamentButton.png" alt="screen shot of create tournament Button" />



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
          <img src="/images/help/AdminCreateBasic.png" alt="screen shot of create tournament Settings" />

          <h2>Basic Flow ("auto advance")</h2>
          <p>The basic flow of the tournament is as follows with "auto advance" set:</p>
          <ol>
            <li>
              Setup
              <ul>
                <li>Setup the tournament. Players cannot register while you set up the tournament.</li>
              </ul>
            </li>
            <li>
              Registration
              <ul>
                <li>Click "Registration" at the top of the admin page to allow players to register</li>
              </ul>
            </li>
            <li>
              Check-in
              <ul>
                <li>
                  All players check-in each round. This will start automatically when the tournament is scheduled to
                  start. After the timer elapeses, the system will automatically create the round.
                </li>
              </ul>
            </li>
            <li>
              Play
              <ul>
                <li>Players are assigned to their game. </li>
                <li>
                  Most mathces are recorded automatically by the system, but in some cases
                  the admins will need to record the score. Such as a player no
                  show, a bye, or the system didn't not score the player.
                </li>
                <li>
                  Once all player's matches have been recorded, the system will start the check-in for the next round.
                </li>
              </ul>
            </li>
            <li>
              End
              <ul>
                <li>
                  The tournament will end automatically when the last round is
                  completed.
                </li>
              </ul>
            </li>
          </ol>
          <p>The flow of the tournament is controlled on the Admin Page in the top section. The Blue button is the
            primary flow.</p>

          <img src="/images/help/AdminFlowRegistation.png" alt="Admin Flow Registation" />
          <p>The admin page can be found on the left menu.</p>
          <img src="/images/help/AdminMenuButton.png" alt="Admin Menu Button" />


          <h2>Copy Tournament</h2>
          <p>You can copy an existing tournament when creating a new tournament. This will create a copy all the setting
            and clear all the players and rounds.</p>
          <img src="/images/help/AdminCopyTournament.png" alt="Admin Copy Tournament" />
          
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
          <img src="/images/help/AdminFlow.png" alt="screen shot of admin flow" />
          <h2 id="stream">Stream</h2>
          <p>
            To stream you will need to create a twitch account. Twitch also has a
            free user-friendly streaming application you can download for free.
            Once you have created the twitch account, you need to enter the
            streaming using name in the tournament settings.
          </p>
          <img src="/images/help/AdminStream.png" alt="screen shot of admin stream settings" />
        </div>
      </ion-content>
    </ion-page>
  </layout-no-menu>
</template>
