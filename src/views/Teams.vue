<template>
    <layout-menu>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-icon name="arrow-round-back" size="large" @click="openTournament()"></ion-icon>
                </ion-buttons>
                <ion-title>Teams</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-searchbar placeholder="Search teams" :value="searchInput" @ionInput="searchInput = $event.target.value"
                @ionChange="searchInput = $event.target.value"></ion-searchbar>
            <ion-list>
                <ion-item v-for="team of filteredTeams" :key="team.name" button detail="true" @click="openTeam(team.name)">
                    <div slot="start" class="team-icon-slot">
                        <TeamIcon :title="team.name" :size="26"></TeamIcon>
                    </div>
                    <ion-label>{{ team.name }}</ion-label>

                    <ion-note slot="end">{{ team.presentCount }}/{{ team.playerCount }}</ion-note>
                </ion-item>
            </ion-list>
            <ion-item v-if="!filteredTeams.length">
                <ion-label>No teams found.</ion-label>
            </ion-item>
        </ion-content>
    </layout-menu>
</template>

<script>
import TournamentAPI from "@/services/TournamentAPI";
import LayoutMenu from "@/components/LayoutMenu.vue";
import TeamIcon from "@/components/TeamIcon.vue";
const tournamentAPI = new TournamentAPI();

export default {
    name: "Teams",
    components: { LayoutMenu, TeamIcon },
    data() {
        return {
            searchInput: "",
            players: [],
            errors: [],
        };
    },
    computed: {
        tournamentId() {
            return this.$route.params.tournament;
        },
        teams() {
            const teamCounts = this.players.reduce((counts, player) => {
                const teamName = (player.team || "").trim();
                if (!teamName) {
                    return counts;
                }

                if (!counts[teamName]) {
                    counts[teamName] = {
                        playerCount: 0,
                        presentCount: 0,
                    };
                }
                counts[teamName].playerCount += 1;
                if (player.isPresent) {
                    counts[teamName].presentCount += 1;
                }
                return counts;
            }, {});

            return Object.keys(teamCounts)
                .map((teamName) => ({
                    name: teamName,
                    playerCount: teamCounts[teamName].playerCount,
                    presentCount: teamCounts[teamName].presentCount,
                }))
                .sort((left, right) => left.name.localeCompare(right.name));
        },
        filteredTeams() {
            let filteredTeams = this.teams;
            let searchInput = (this.searchInput || "").toLowerCase().trim();

            if (searchInput) {
                filteredTeams = filteredTeams.filter((team) =>
                    team.name.toLowerCase().includes(searchInput)
                );
            }

            return filteredTeams;
        },
    },
    methods: {
        openTournament() {
            this.$router.push({
                name: "Tournament",
                params: { tournament: this.tournamentId },
            });
        },
        openTeam(teamName) {
            this.$router.push({
                name: "Team",
                params: { tournament: this.tournamentId, teamName: teamName },
            });
        },
        loadData() {
            tournamentAPI
                .tournamentView(this.tournamentId)
                .then((tournament) => {
                    this.players = (tournament && tournament.players) || [];
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

<style scoped>
.team-icon-slot {
    width: 38px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
</style>