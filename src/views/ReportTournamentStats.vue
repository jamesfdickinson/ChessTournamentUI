<template>
  <layout-raw>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon name="arrow-round-back" size="large" @click="$router.go(-1)"></ion-icon>
        </ion-buttons>
        <ion-title>Tournament Stats</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="print()">
            <ion-icon name="print" size="large"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <div class="section-to-print">
      <GridSort :data="gridData" :columns="gridColumns" :title="title" :description="description"></GridSort>
    </div>
  </layout-raw>
</template>

<script>
// @ is an alias to /src
import fetch from "@/services/fetch";
import GridSort from "@/components/GridSort.vue";
export default {
  name: "TournamentStats",
  components: {
    GridSort
  },
  data() {
    var tournamentId = this.$route.params.tournament;
    var title = "Tournament Stats";
    var description =
      "Tournament Stats";
    return {
      tournamentId: tournamentId,
      data: [],
      searchQuery: "",
      gridColumns: [
        "event",
        "startTime",
        "duration"
      ],
      gridData: [],
      title: title,
      description: description,
      errors: []
    };
  },
  methods: {
    print() {
      window.print();
    },
    parseUtcDate(value) {
      if (!value) {
        return null;
      }

      const rawValue = String(value).trim();
      if (!rawValue) {
        return null;
      }

      const normalizedValue = rawValue
        .replace(" ", "T")
        .replace(/(\.\d{3})\d+/, "$1");
      const hasTimezone = /[zZ]|[+\-]\d{2}:?\d{2}$/.test(normalizedValue);
      const utcValue = hasTimezone ? normalizedValue : `${normalizedValue}Z`;
      const parsedDate = new Date(utcValue);

      return isNaN(parsedDate.getTime()) ? null : parsedDate;
    },
    formatItem(item) {
      const startDate = this.parseUtcDate(item.startTime);
      const endDate = this.parseUtcDate(item.endTime);

      item.startTime = startDate ? startDate.toLocaleString() : "";
      item.endTime = endDate ? endDate.toLocaleString() : "";
    },
    loadData() {
      var tournamentId = this.tournamentId;

      fetch
        .get(`report/EventTimes/${tournamentId}`)
        .then(response => {
          this.data = response.data;
          this.data.forEach(item => this.formatItem(item));
          this.gridData = this.data;
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
