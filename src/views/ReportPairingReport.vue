<template>
  <layout-raw>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title id="title">{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="print()">
            <ion-icon name="print" size="large"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <div class="section-to-print" style="padding: 15px;">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <div v-for="(report, index) in pairingReports" :key="index" class="pairing-report">
        <details class="styled-details">
          <summary class="styled-summary">
            Round {{ report.round }}
          </summary>  
          <div class="markdown" v-html="renderMarkdown(report.content)"></div>
        </details>
      </div>
    </div>
  </layout-raw>
</template>

<script>
// @ is an alias to /src
import TournamentAPI from "@/services/TournamentAPI";
const tournamentAPI = new TournamentAPI();

import MarkdownIt from "markdown-it";
const markdown = new MarkdownIt();

export default {
  name: "TournamentPairingReport",
  components: {
   
  },
  data() {
    var tournamentId = this.$route.params.tournament;
    var title = "Pairing Report";
    var description = "A breakdown of the pairings for each round.";
    return {
      tournamentId: tournamentId,
      pairingReports: [],
      title: title,
      description: description,
      errors: []
    };
  },
  methods: {
    print() {
      window.print();
    },
    async loadData() {
      var tournamentId = this.tournamentId;

      try {
        let reports = await tournamentAPI.pairingReports(tournamentId);
        this.pairingReports = reports;
      } catch (e) {
        this.errors.push(e);
      }
    },
    renderMarkdown(text) {
      return markdown.render(text || '');
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style scoped>
.styled-summary {
  padding: 12px 15px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
}

.styled-summary:hover {
  background-color: #e9e9e9;
}

.styled-summary::marker {
  color: #3880ff; /* Ionic primary color */
}

.styled-details {
  margin-bottom: 15px;
}

</style>
