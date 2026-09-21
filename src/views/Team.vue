<template>
    <layout-menu>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-icon name="arrow-round-back" size="large" @click="goBack()"></ion-icon>
                </ion-buttons>
                <ion-title>Team</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>

                <ion-item>
                    <ion-label class="ion-text-center">
                        <div
                            style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; width: 100%;">
                            <TeamIcon :title="teamName" :size="56"></TeamIcon>
                            <h1 style="margin: 0;">{{ teamName }}</h1>
                            <div style="font-size: 12px; color: var(--ion-color-medium);">
                                {{ teamPlayers.length }} {{ teamPlayers.length === 1 ? 'player' : 'players' }}
                            </div>
                        </div>
                    </ion-label>
                </ion-item>
                <ion-list-header color="primary">Players</ion-list-header>
                <ion-item v-for="player of teamPlayers" :key="player.playerId" button detail="true"
                    @click="openPlayer(player.playerId)">
                    <ion-icon slot="start" :name="player.isPresent ? 'checkmark-circle' : 'radio-button-off'"
                        :color="player.isPresent ? 'secondary' : 'medium'"></ion-icon>
                    <ion-avatar slot="start">
                        <img :src="player.avatar ? player.avatar : '/images/avatars/agent.png'" />
                    </ion-avatar>
                    <ion-label>{{ player.firstName }} {{ player.lastName }}</ion-label>
                    <ion-badge slot="end" color="light">{{ player.points || 0 }}</ion-badge>
                </ion-item>
                <ion-item v-if="!teamPlayers.length">
                    <ion-label>No players found for this team.</ion-label>
                </ion-item>

                <ion-list-header color="primary">Pairings (Round {{ tournament.round || 0 }})</ion-list-header>
                <ion-item>
                    <ion-searchbar placeholder="Table #, First, Last Name, or Team" :value="searchInput"
                        @ionInput="searchInput = $event.target.value"
                        @ionChange="searchInput = $event.target.value"></ion-searchbar>
                    <ion-label>Hide Completed Games</ion-label>
                    <ion-toggle slot="end" :checked="hideCompletedGames"
                        @ionInput="hideCompletedGames = $event.target.checked"
                        @ionChange="hideCompletedGames = $event.target.checked"></ion-toggle>
                </ion-item>
                <template v-if="filteredTeamTables && filteredTeamTables.length > 0">
                    <Table v-for="table of filteredTeamTables" :key="table.id" :table="table" :showEdit="true" :avatarBackground="false"></Table>
                </template>
                <ion-item v-else>
                    <ion-label>No current round matches found for this team.</ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </layout-menu>
</template>

<script>
import TournamentAPI from "@/services/TournamentAPI";
import LayoutMenu from "@/components/LayoutMenu.vue";
import Table from "@/components/Table.vue";
import TeamIcon from "@/components/TeamIcon.vue";
import EventBus from "@/services/EventBus.js";
const tournamentAPI = new TournamentAPI();

export default {
    name: "Team",
    components: { LayoutMenu, Table, TeamIcon },
    data() {
        var hideCompletedGames = localStorage.getItem("hideCompletedGamesTeam");
        if (hideCompletedGames == null) hideCompletedGames = false;
        else hideCompletedGames = JSON.parse(hideCompletedGames);

        return {
            tournament: {},
            players: [],
            teamTables: [],
            hideCompletedGames: hideCompletedGames,
            searchInput: "",
            errors: [],
        };
    },
    computed: {
        tournamentId() {
            return this.$route.params.tournament;
        },
        teamName() {
            return this.$route.params.teamName || "Team";
        },
        normalizedTeamName() {
            return this.normalizeTeam(this.teamName);
        },
        teamPlayers() {
            return this.players
                .filter((player) => this.normalizeTeam(player.team) === this.normalizedTeamName)
                .sort((left, right) => {
                    const leftName = `${left.firstName || ""} ${left.lastName || ""}`.trim();
                    const rightName = `${right.firstName || ""} ${right.lastName || ""}`.trim();
                    return leftName.localeCompare(rightName);
                });
        },
        filteredTeamTables() {
            let filteredTables = this.teamTables || [];
            let hideCompletedGames = this.hideCompletedGames;
            let searchInput = this.searchInput;

            if (hideCompletedGames) {
                filteredTables = filteredTables.filter((t) => !this.isTableCompleted(t));
            }

            if (searchInput) {
                searchInput = searchInput.toLowerCase();
                filteredTables = filteredTables.filter((t) => this.matchesSearch(t, searchInput));
            }

            return filteredTables;
        },
    },
    watch: {
        hideCompletedGames(value) {
            if (value != null) {
                localStorage.setItem("hideCompletedGamesTeam", value);
            }
        },
    },
    methods: {
        goBack() {
            if (window.history.length > 1) {
                this.$router.go(-1);
                return;
            }

            this.openTeams();
        },
        openTeams() {
            this.$router.push({
                name: "Teams",
                params: { tournament: this.tournamentId },
            });
        },
        normalizeTeam(name) {
            return (name || "").trim();
        },
        isTableCompleted(table) {
            let totalPoints = (table.positions || []).reduce(
                (accumulator, position) => accumulator + (position.points || 0),
                0
            );
            return totalPoints !== 0;
        },
        matchesSearch(table, searchInput) {
            return (table.positions || []).some((position) => {
                if (position.table && position.table == searchInput) return true;
                if (
                    position.table &&
                    typeof position.table === "string" &&
                    position.table.startsWith(searchInput)
                )
                    return true;
                if (
                    position.playerFirstName &&
                    position.playerFirstName.toLowerCase().startsWith(searchInput)
                )
                    return true;
                if (
                    position.playerLastName &&
                    position.playerLastName.toLowerCase().startsWith(searchInput)
                )
                    return true;
                if (position.team && position.team.toLowerCase().startsWith(searchInput))
                    return true;
                if (
                    position.playerTeam &&
                    position.playerTeam.toLowerCase().startsWith(searchInput)
                )
                    return true;

                return false;
            });
        },
        groupBy(arr, criteria) {
            return arr.reduce(function (obj, item) {
                var key =
                    typeof criteria === "function" ? criteria(item) : item[criteria];
                if (!obj.hasOwnProperty(key)) {
                    obj[key] = [];
                }
                obj[key].push(item);
                return obj;
            }, {});
        },
        createTables(allPositions) {
            if (!allPositions || allPositions.length === 0) return [];
            let groupedPositions = this.groupBy(allPositions, "room");
            let tables = [];

            for (const [key, value] of Object.entries(groupedPositions)) {
                let isCompleted = value.some((x) => x.points > 0);
                let match = value.find((t) => !!t.table);
                if (!match) continue;
                const tableNumber = match.table;
                let table = {
                    id: key,
                    round: match.round,
                    table: tableNumber,
                    room: key,
                    positions: value,
                    isCompleted: isCompleted,
                };
                tables.push(table);
            }
            tables.sort((a, b) => a.id > b.id);
            return tables;
        },
        openPlayer(id) {
            this.$router.push({
                name: "Player",
                params: { id: id, tournament: this.tournamentId },
            });
        },
        populate(tournament) {
            this.tournament = tournament || {};
            this.players = (this.tournament && this.tournament.players) || [];

            let round = this.tournament.round;
            let tablePositions = this.tournament.tablePositions || [];
            let roundTables = tablePositions.filter((position) => position.round == round);

            let teamRooms = roundTables
                .filter((position) => this.normalizeTeam(position.playerTeam) === this.normalizedTeamName)
                .map((position) => position.room);
            let teamRoomSet = [...new Set(teamRooms)];
            let teamTablePositions = roundTables.filter((position) => teamRoomSet.includes(position.room));

            this.teamTables = this.createTables(teamTablePositions);
        },
        loadData() {
            tournamentAPI
                .tournamentView(this.tournamentId)
                .then((tournament) => {
                    this.populate(tournament);
                })
                .catch((e) => {
                    this.errors.push(e);
                });
        },
        onUpdate(data) {
            if (!data) return;
            if (data.id && data.id != this.tournamentId) return;
            this.populate(data);
        },
    },
    mounted() {
        this.loadData();
    },
    created() {
        EventBus.$on("updated", this.onUpdate);
    },
    beforeDestroy() {
        EventBus.$off("updated", this.onUpdate);
    },
};
</script>