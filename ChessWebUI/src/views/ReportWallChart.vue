<template>
  <layout-raw>
 <a href="#" onclick="window.history.back();">Back</a>
      <h1>Wall Chart</h1>
        <!-- <form @submit.prevent="handleSubmit">
        <ion-item color>
          <ion-label slot>Division</ion-label>
          <ion-card background="light">
            <ion-input  type="text" v-bind:value="division"/>
          </ion-card>
          <ion-button slot type="submit">Submit</ion-button>
        </ion-item>
      </form>-->
      <!-- @submit handles any form of submission. -->
      <!-- .prevent keeps the event from bubbling around and doing anything else. -->
      <form @submit.prevent="handleSubmit">
        <label>
          Division:
          <input type="text" v-model="division">
        </label>
        <button type="submit">Submit</button>
      </form>
      <hr>
    
      <!-- <h3>Division: {{division}}</h3> -->

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>School/Team</th>
            <th>Gr</th>
            <th>Rd1</th>
            <th>Rd2</th>
            <th>Rd3</th>
            <th>Rd4</th>
            <th>Rd5</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="row in data">
            <tr :key="row.playerId">
              <td>{{row.rankId}}</td>
              <td>{{row.firstName}} {{row.lastName}}</td>
              <td>{{row.school}}</td>
              <td>{{row.grade}}</td>
              <td>{{row.rd1Color}} {{row.rd1Played}}</td>
              <td>{{row.rd2Color}} {{row.rd2Played}}</td>
              <td>{{row.rd3Color}} {{row.rd3Played}}</td>
              <td>{{row.rd4Color}} {{row.rd4Played}}</td>
              <td>{{row.rd5Color}} {{row.rd5Played}}</td>
            </tr>
            <tr :key="row.rankId">
              <td></td>
              <td>{{row.rating}}</td>
              <td></td>
              <td></td>
              <td>{{row.rd1Score}}</td>
              <td>{{row.rd2Score}}</td>
              <td>{{row.rd3Score}}</td>
              <td>{{row.rd4Score}}</td>
              <td>{{row.rd5Score}}</td>
            </tr>
          </template>
        </tbody>
      </table>
  
 </layout-raw>
</template>

<script>
// @ is an alias to /src
import fetch from "@/fetch.js";

export default {
  name: "ReportScoreByGrade",
  components: {},
  data() {
    var tournamentId = this.$route.params.tournament || 118;
    return {
      tournamentId: tournamentId,
      data: [],
      division: "",
      errors: []
    };
  },
  methods: {
    handleSubmit() {
      let division = this.division;
      if (division != "") {
        this.loadData(division);
      }
    },
    loadData(division) {
      var tournamentId = this.tournamentId;

      fetch
        .get(`report/WallChart/${tournamentId}?division=${division}`)
        .then(response => {
          this.data = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  created() {
    //this.loadData();
  }
};
</script>
<style scoped>
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