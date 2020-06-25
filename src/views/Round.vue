<template>
  <layout-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon
            name="arrow-round-back"
            size="large"
            @click="$router.push({ name: 'Rounds', params: { tournament:tournamentId } })"
          ></ion-icon>
        </ion-buttons>
        <ion-title>Round {{roundId}}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="details()">
            <ion-icon name="paper" size="large"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-searchbar
        placeholder="Table #, First, or Last Name"
        :value="searchInput"
        @ionInput="searchInput = $event.target.value;"
        @ionChange="searchInput= $event.target.value;"
      ></ion-searchbar>
      <ion-item>
        <ion-label>Hide Completed Games</ion-label>
        <ion-toggle
          :checked="hideCompletedGames"
          @ionInput="hideCompletedGames = $event.target.checked;"
          @ionChange="hideCompletedGames= $event.target.checked;"
        ></ion-toggle>
      </ion-item>

      <ion-list>
        <template v-for="table of filteredItems">
          <div :key="table.id">
            <ion-item color="primary">
              <!-- <ion-label slot="start">Table {{table.id}}</ion-label> -->

              <ion-label slot="start">Room {{table.id}}</ion-label>

              <ion-button
                slot="start"
                color="light"
                fill="outline"
                :href="getRoomLink(table.id)"
                target="_blank"
              >Join</ion-button>

              <!-- <ion-button slot="start" v-on:click="openTable(table.id)">
                  <ion-icon name="open"></ion-icon>
                </ion-button>
              -->
              <!-- <ion-icon slot="start" name="open"></ion-icon> -->

              <!--              
                <ion-icon slot="end" name="open"></ion-icon>
          
                <ion-icon slot="end" name="eye"></ion-icon>
              <ion-icon  slot="end" name="logo-game-controller-b"></ion-icon>-->
              <!--  -->
              <!-- <ion-buttons slot="start">
                <ion-button v-on:click="openTable(table.id)">
                <ion-icon name="add-circle-outline"></ion-icon>
                </ion-button>
              </ion-buttons>-->
              <!-- <ion-icon name="logo-game-controller-b"></ion-icon>
              <ion-icon name="open"></ion-icon>
              <ion-button v-on:click="openTable(table.id)">
                <ion-icon name="open"></ion-icon>
              </ion-button>-->

              <!-- <ion-icon name="open"></ion-icon>
              -->

              <!-- <ion-button
                slot="start"
                color="light"
                fill="outline"
                v-on:click="play(table.id);$event.stopPropagation();"
              >{{getRoomName(table.id,table.round,table.tournamentId)}}</ion-button>-->

              <!-- <ion-button slot="start" color="light" v-on:click="openTable(table.id)">🔊</ion-button> -->
              <!-- <ion-button slot="end" color="light" v-on:click="openTable(table.id)">Record</ion-button> -->

              <ion-buttons slot="end">
                <!-- <ion-button :href="getRoomLink(table.id,table.round,table.tournamentId)">
                  <ion-icon name="logo-game-controller-b"></ion-icon>
                </ion-button>-->
                <!-- <ion-button
                  :href="getRoomLink(table.id,table.round,table.tournamentId)"
                  target="_blank"
                >
                  <ion-icon name="open"></ion-icon>
                </ion-button>-->
                <ion-button v-on:click="openTable(table.id)">
                  <ion-icon name="create"></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-item>
            <ion-item
              detail="true"
              v-for="position of table.positions"
              :key="position.id"
              v-on:click="openPlayer(position.playerId)"
            >
              <!-- <ion-button
              
              color="light"
              v-on:click="play(table.id,position.playerId,position.playerFirstName,position.email);$event.stopPropagation();"
            >Play</ion-button>
              -->

              <!-- <ion-icon v-if="position.color=='Black'" src="images/chess_pawn_black.svg" slot="start"></ion-icon>
            <ion-icon
              v-else-if="position.color=='White'"
              src="images/chess_pawn_white.svg"
              slot="start"
            ></ion-icon>
            <ion-icon v-else name="contact" slot="start"></ion-icon>
              -->
              <TeamIcon :title="position.playerTeam" style="margin-right: 10px;"></TeamIcon>

              <ion-label>{{position.playerFirstName}} {{position.playerLastName}}</ion-label>
              <ion-badge slot="end" color="light">{{position.points}}</ion-badge>
            </ion-item>
            <!-- <ion-item>
              <ion-label slot="start">Room {{getRoom(table.id)}}</ion-label>
              <ion-button slot="end" expand="block" v-on:click="play(table.id)">Join</ion-button>
            </ion-item>
            <ion-item text-center>
              <ion-label>
                <ion-button v-on:click="play(table.id)" color="light">Join: {{getRoom(table.id)}}</ion-button>
              </ion-label>
            </ion-item>-->

            <!-- <ion-item>
              <ion-grid>
                <ion-row>
                  <ion-col class="ion-text-center">
                    <ion-button
                      expand="block"
                      v-on:click="play(table.id)"
                    >Join {{getRoom(table.id)}}</ion-button>
                  </ion-col>
                  <ion-col class="ion-text-center">
                    <ion-button expand="block" color="light" v-on:click="play(table.id)">Spectate</ion-button>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-item>-->
          </div>
        </template>
      </ion-list>
    </ion-content>
    <!-- </ion-page> -->
  </layout-menu>
</template>

<script>
import fetch from "@/fetch.js";
import TeamIcon from "@/components/TeamIcon.vue";
export default {
  name: "home",
  components: { TeamIcon },
  data() {
    var roundId = this.$route.params.id;
    var tournamentId = this.$route.params.tournament;
    //todo: save app wide settings
    var hideCompletedGames = localStorage.getItem("hideCompletedGames");
    if (hideCompletedGames == null) hideCompletedGames = false;
    else hideCompletedGames = JSON.parse(hideCompletedGames);

    return {
      tournamentId: tournamentId,
      roundId: roundId,
      hideCompletedGames: hideCompletedGames,
      searchInput: "",
      round: [],
      errors: []
    };
  },
  methods: {
    stringToColour(str) {
      var hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      var colour = "#";
      for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xff;
        value = Math.floor(value * 0.7); //make darker
        colour += ("00" + value.toString(16)).substr(-2);
      }
      return colour;
    },
    details() {
      let roundId = this.roundId;
      let tournamentId = this.tournamentId;
      this.$router.push({
        name: "RoundDetails",
        params: { id: roundId, tournament: tournamentId }
      });
    },
    getRoomName(table, round, tournament) {
      //todo: pass template in from tournament settings or position
      let tableNameTemplate = "Room [table]r[round]t[tournament]";

      if (!tableNameTemplate) tableNameTemplate = "Table [table]";
      let tableName = tableNameTemplate
        .replace("[tournament]", tournament)
        .replace("[round]", round)
        .replace("[table]", table);
      return tableName;
    },
    getRoomLink(room) {
      //todo: pass template in from tournament settings or position
      let linkTemplate = "https://cardgames.app/cribbage/game/?room=[room]";

      if (!linkTemplate) return "";

      let url = linkTemplate;

      url = url.replace("[room]", room);
      // url = url.replace("[tournament]", tournament);
      // url = url.replace("[round]", round);
      // url = url.replace("[table]", table);

      return url;
    },
    numToSSColumn(num) {
      let s = "";
      let t = "";
      while (num > 0) {
        t = (num - 1) % 26;
        s = String.fromCharCode(65 + t) + s;
        num = ((num - t) / 26) | 0;
      }
      return s || undefined;
    },
    getRoom2(table) {
      let tournamentId = this.tournamentId;
      let roundId = this.roundId;
      let tournamentCode = this.numToSSColumn(tournamentId);
      let room = `${tournamentCode}${roundId}${table}`;
      return room;
    },
    getRoom(table) {
      let tournamentId = this.tournamentId;
      let roundId = this.roundId;
      let room = `${tournamentId}r${roundId}t${table}`;
      return room;
    },
    play(table) {
      let room = this.getRoom(table);
      let parameters = `room=${room}`;
      let urlBase = "https://cardgames.app/cribbage/game/?";
      let url = urlBase + parameters;
      window.open(url, "_blank");
      return false;
    },
    // play2(table, id, name, avatar, email) {
    //   let roundId = this.roundId;
    //   let tournamentId = this.tournamentId;
    //   let room = "tournament-" + tournamentId + "-" + roundId + "-" + table;
    //   name = name ? window.encodeURI(name) : "";
    //   avatar = avatar ? window.encodeURI(avatar) : "";
    //   email = email ? window.encodeURI(email) : "";
    //   //todo: make this work for apps if installed - deep link
    //   //let parameters = `room=${room}&id=t-${id}&name=${name}&avatar=${avatar}&email=${email}`;

    //   let parameters = `room=${room}`;
    //   //let urlBase = "http://192.168.1.28:8081/CribbageUI/www/?";
    //   let urlBase = "https://cardgames.app/cribbage/game/?";
    //   let url = urlBase + parameters;
    //   window.open(url, "_blank");
    //   return false;
    // },
    openTable(id) {
      let roundId = this.roundId;
      let tournamentId = this.tournamentId;
      this.$router.push({
        name: "TableEdit",
        params: { id: id, round: roundId, tournament: tournamentId }
      });
    },
    openPlayer(id) {
      this.$router.push({ name: "Player", params: { id: id } });
    },
    clearData() {
      this.players = [];
    },
    loadData() {
      var tournamentId = this.tournamentId;
      var roundId = this.roundId;
      fetch
        .get(`round/Grouped/${roundId}?tournament=${tournamentId}`)
        .then(response => {
          this.round = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  computed: {
    filteredItems() {
      if (this.hideCompletedGames != null)
        localStorage.setItem("hideCompletedGames", this.hideCompletedGames);
      let filteredRound = this.round;
      let hideCompletedGames = this.hideCompletedGames;
      let searchInput = this.searchInput;

      if (hideCompletedGames) {
        filteredRound = filteredRound.filter(t => {
          let totalPoints = t.positions.reduce(
            (a, p) => a + (p.points || 0),
            0
          );
          return totalPoints == 0;
        });
      }
      if (searchInput) {
        searchInput = searchInput.toLowerCase();
        filteredRound = filteredRound.filter(t => {
          let anyMatched = t.positions.find(p => {
            if (p.table && p.table == searchInput) return true;
            if (
              p.table &&
              typeof p.table === "string" &&
              p.table.startsWith(searchInput)
            )
              return true;
            if (
              p.playerFirstName &&
              p.playerFirstName.toLowerCase().startsWith(searchInput)
            )
              return true;
            if (
              p.playerLastName &&
              p.playerLastName.toLowerCase().startsWith(searchInput)
            )
              return true;
            if (p.team && p.team.toLowerCase().startsWith(searchInput))
              return true;
            return false;
          });
          return anyMatched;
        });
      }
      return filteredRound;
      //  return this.items.filter(item => {
      //     return item.type.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      //  })
    }
  },
  created() {
    this.loadData();
  }
};
</script>
