<template>
  <layout-raw>
    <ion-toolbar color="primary">
      <ion-buttons slot="start">
        <ion-icon
          name="arrow-round-back"
          size="large"
          @click="$router.go(-1)"
        ></ion-icon>
      </ion-buttons>
      <ion-title>Wall Chart</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="print()">
          <ion-icon name="print" size="large"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>

    <div class="report-options section-not-to-print">
      <fieldset>
        <legend>Division</legend>
        <label
          v-for="divisionOption in divisions"
          :key="divisionOption"
          class="division-option"
        >
          <input
            v-model="division"
            type="radio"
            name="division"
            :value="divisionOption"
            @change="loadData(division)"
          />
          Division {{ divisionOption }}
        </label>
      </fieldset>
    </div>

    <div class="section-to-print">
      <h1>{{ tournamentName || "Tournament" }}</h1>
      <h2>Wall Chart - Division {{ division }}</h2>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Team</th>
            <th>Gr</th>
            <th>Rd1</th>
            <th>Rd2</th>
            <th>Rd3</th>
            <th>Rd4</th>
            <th>Rd5</th>
          </tr>
        </thead>
        <tbody v-for="row in data" :key="row.playerId">
          <tr>
              <td>{{ row.rankId }}</td>
              <td>{{ row.firstName }} {{ row.lastName }}</td>
              <td>{{ row.team }}</td>
              <td>{{ row.grade }}</td>
              <td>{{ row.rd1Color }} {{ row.rd1Played }}</td>
              <td>{{ row.rd2Color }} {{ row.rd2Played }}</td>
              <td>{{ row.rd3Color }} {{ row.rd3Played }}</td>
              <td>{{ row.rd4Color }} {{ row.rd4Played }}</td>
              <td>{{ row.rd5Color }} {{ row.rd5Played }}</td>
          </tr>
          <tr>
            <td></td>
            <td>{{ row.rating }}</td>
            <td></td>
            <td></td>
            <td>{{ row.rd1Score }}</td>
            <td>{{ row.rd2Score }}</td>
            <td>{{ row.rd3Score }}</td>
            <td>{{ row.rd4Score }}</td>
            <td>{{ row.rd5Score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </layout-raw>
</template>

<script>
// @ is an alias to /src
import fetch from "@/services/fetch";
import TournamentAPI from "@/services/TournamentAPI";

const tournamentAPI = new TournamentAPI();

export default {
  name: "ReportWallChart",
  components: {},
  data() {
    var tournamentId = this.$route.params.tournament || 118;
    return {
      tournamentId: tournamentId,
      tournamentName: "",
      data: [],
      division: 1,
      divisions: [],
      errors: [],
    };
  },
  methods: {
    loadReportOptions() {
      return tournamentAPI
        .tournamentView(this.tournamentId)
        .then((tournament) => {
          this.tournamentName = tournament.name || "";

          const players = tournament.players || [];
          this.divisions = [
            ...new Set(
              players
                .map((player) => player.division)
                .filter(
                  (division) => division !== null && division !== undefined
                )
            ),
          ].sort((a, b) => Number(a) - Number(b));

          if (this.divisions.length === 0) {
            this.divisions = [1];
          }

          if (!this.divisions.includes(this.division)) {
            this.division = this.divisions[0];
          }

          return this.loadData(this.division);
        })
        .catch((e) => {
          this.errors.push(e);
          this.divisions = [this.division];
          return this.loadData(this.division);
        });
    },
    loadData(division) {
      var tournamentId = this.tournamentId;

      fetch
        .get(`report/WallChart/${tournamentId}?division=${division}`)
        .then((response) => {
          this.data = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    print() {
      window.print();
    },
  },
  created() {
    this.loadReportOptions();
  },
};
</script>
<style scoped>
.report-options {
  padding: 15px;
}

.report-options fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}

.report-options legend {
  font-weight: bold;
  margin-bottom: 8px;
}

.division-option {
  display: inline-block;
  margin: 0 16px 8px 0;
}

.division-option input {
  margin-right: 4px;
}

.section-to-print {
  padding: 0 15px 15px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table,
th,
td {
  padding: 2px 4px;
  border: 1px solid black;
}
</style>

<style>
@media print {
  body * {
    visibility: hidden;
  }

  .section-to-print,
  .section-to-print * {
    visibility: visible;
  }

  .section-to-print {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    padding: 0;
  }

  .section-not-to-print {
    visibility: hidden;
  }
}
</style>