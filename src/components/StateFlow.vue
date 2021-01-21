<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ flow.state }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <p>{{ flow.description }}</p>
      <ion-item>
        <template v-for="action of flow.actions">
          <ion-button  :key="action" slot="end" @click="sendFlowAction(action)">
            {{ action }}
          </ion-button>
        </template>
      </ion-item>
    </ion-card-content>
  </ion-card>
</template>

<script>
import TournamentAPI from "@/services/TournamentAPI";
const tournamentAPI = new TournamentAPI();
import Toast from "@/components/Toast.js";
const toast = new Toast();
export default {
  name: "StateFlow",
  components: {},
  props: {
    // flow: {
    //   type: Object,
    //   default: () => ({}),
    // },
  },
  data() {
    let tournamentId = this.$route.params.tournament || 27;
    return {
      tournamentId: tournamentId,
      flow: {},
      errors: [],
    };
  },
  methods: {
    loadData() {
      var tournamentId = this.tournamentId;
      tournamentAPI.flowGet(tournamentId).then((data) => {
        this.flow = data;
      });
    },
    sendFlowAction(action) {
      this.results = "";
      var tournamentId = this.tournamentId;
      tournamentAPI
        .flowAction(tournamentId, action)
        .then((message) => {
          this.loadData();
          toast.show(message);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  created() {
    this.loadData();
  },
};
</script>
