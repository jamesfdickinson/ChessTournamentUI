<template>
  <layout-no-menu>
    <!-- <ion-page class="ion-page" main> -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <!-- <ion-buttons slot="start">
          <ion-menu-toggle>
            <ion-button>
              <ion-icon slot="icon-only" name="menu"></ion-icon>
            </ion-button>
          </ion-menu-toggle>
        </ion-buttons>-->
        <ion-title>Tournament Overview</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <div style="text-align: center;">

        <h1>{{ tournament.name }}</h1>

        <p>{{ tournament.type }} Tournament</p>
        <table class="summary-table">
          <tr>
            <td>Start Date</td>
            <td>{{ getLocalDate(tournament.startDateTime) }}</td>
          </tr>
          <tr>
            <td>Host</td>
            <td>{{ tournament.hostName || "" }}</td>
          </tr>
          <tr>
            <td>Rounds</td>
            <td>{{ tournament.rounds }}</td>
          </tr>


          <tr>
            <td>Access</td>
            <td>{{ !tournament.accessCodeBasic ? "Public" : "Private" }}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{{ tournament.state }}</td>
          </tr>
        </table>


        <p><ion-button size="large" v-on:click="tournamentOpen(tournament.id)">Enter</ion-button></p>

        <p> <img class="tournament-img" v-if="tournament.image" :src="tournament.image" :alt="tournament.type" /></p>




        <details>
          <summary>Read FAQ</summary>
          <div class="content" v-html="tournament.faqContent"></div>
        </details>
        <details>
          <summary>SignUp Details</summary>
          <div class="content" v-html="tournament.signUpText"></div>
        </details>

        <p><a href="/Tournaments">More tournaments</a></p>
      </div>



    </ion-content>


    <!-- </ion-page> -->
  </layout-no-menu>
</template>

<style scoped>
.content {
  margin-left: auto;
  margin-right: auto;
  padding: 10px 10px;
  max-width: 500px;
  text-align: left;
}

.tournament-img {
  width: 200px;
  height: auto;
}

.summary-table {
  text-align: left;
  margin-left: auto;
  margin-right: auto;
}

.summary-table th,
.summary-table td {
  padding: 5px;
}

summary {
  font-weight: bold;
  margin: -0.5em -0.5em 0;
  padding: 0.5em;
}

details[open] {
  padding: 0.5em;
}

details[open] summary {
  border-bottom: 1px solid #aaa;
  margin-bottom: 0.5em;
}
</style>

<script>
import fetch from "@/services/fetch";

export default {
  name: "TournamentOverview",
  metaInfo() {
    const titleName = this.tournament.name ? " - " + this.tournament.name : "";
    const type = this.tournament.type ? this.tournament.type + " Tournament" : "Tournament";
    const title = type + titleName;
    return {
      title: title,
      meta: [
        {
          name: 'description', content: title
        }
      ]
    }
  },
  components: {},
  data() {
    var tournamentId = this.$route.params.tournament;
    return {
      tournamentId: tournamentId,
      tournament: {},
      errors: []
    };
  },
  methods: {
    tournamentOpen(tournamentId) {
      this.$router.push({
        name: "Tournament",
        params: { tournament: tournamentId },
      });
    },
    getLocalDate(date) {
      if (!date) return null;
      let localDate = new Date(date);
      if (!localDate) return null;
      let options = { dateStyle: "medium", timeStyle: "short" };
      return localDate.toLocaleString(undefined, options);
    },
    loadData() {
      var tournamentId = this.tournamentId;
      fetch
        .get(`tournament/${tournamentId}`)
        .then(response => {
          this.tournament = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  created() {
    this.loadData();
  }
};
</script>
