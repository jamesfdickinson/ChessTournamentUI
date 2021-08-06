<template>
  <div class="section-to-print">
  
    <GridSort :data="filteredItems" :columns="gridColumns"></GridSort>
    <p style="padding: 0px 4px;" v-show="description || title" class="description"><span style="font-weight:bold;">{{ title }}</span>: {{ description }}
     <router-link :to="{ name: 'ReportScoreGroupRankDetails', params: { tournament: tournamentId }}">Details</router-link>
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
import GridSort from "@/components/GridSort.vue";
export default {
  name: "ReportScoreGroupRank",
  components: {
    GridSort,
  },
  props: {
    players: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    var tournamentId = this.$route.params.tournament;
    var title = "Score Team Rank";
    var description =
      "This report ranks teams based on the top 5 total points from each team.";
    return {
      tournamentId: tournamentId,
      data: [],
      searchQuery: "",
      //gridColumns: ["team", "teamPoints", "players","playersTotal", "division"],
      gridColumns: ["team", "teamPoints", "players","playersTotal"],
      gridData: [],
      title: title,
      description: description,
      errors: [],
    };
  },
  methods: {
    print() {
      window.print();
    },
  },
  created() {},
  computed: {
    filteredItems() {
      console.log("filteredItems");
      //group players
      const groupedByTeam = this.players.reduce(function (acc, item) {
        if (!item.team) return acc;
        let key = item.team + "-" + item.division;
        if (!key) return acc;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
        return acc;
      }, {});
      const teamSummarys = [];
      for (var key in groupedByTeam) {
        let teamData = groupedByTeam[key];
        let team = teamData[0].team;
        let division = teamData[0].division;
        //sort by points
        teamData.sort((a, b) => {
          return b.points - a.points;
        });
        let teamTopScores = teamData.slice(0, 5);
        let teamSummary = {
          team: team,
          rank: 0,
          teamPoints: teamTopScores.reduce(
            (acc, item) => acc + item.points,
            0
          ),
          players: teamTopScores.length,
          playersTotal: teamData.length,
          division: division,
        };
        teamSummarys.push(teamSummary);
      }
      teamSummarys.sort(function (a, b) {
        return b.teamPoints - a.teamPoints;
      });
      return teamSummarys;
    },
  },
};
</script>
