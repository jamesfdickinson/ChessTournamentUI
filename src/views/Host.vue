<template>
    <layout-no-menu>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-button @click="$router.push({ name: 'Home' })">
                        <ion-icon slot="icon-only" name="home"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title>Host</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="$router.go(-1)">
                        <ion-icon slot="icon-only" name="arrow-round-back"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
                <ion-refresher-content></ion-refresher-content>
            </ion-refresher>

            <div style="padding: 20px 16px 8px; text-align: center">
                <avatar-icon :image="host.avatar" :name="displayHostName" :showBackground="true"
                    style="display: inline-block; width: 96px; height: 96px" />
                <h1 style="margin: 12px 0 4px">{{ displayHostName }}</h1>
                <p style="margin: 0; color: var(--ion-color-medium)">
                    {{ hostTournamentCount }} tournaments
                </p>
            </div>

            <ion-list>
                <ion-list-header color="primary">Upcoming Tournaments</ion-list-header>
                <ion-item v-if="!isLoading && upcomingTournaments.length === 0">
                    <ion-label>No upcoming tournaments found.</ion-label>
                </ion-item>
                <ion-item v-for="tournament of upcomingTournaments" :key="`future-${tournament.id}`" button
                    detail="true" @click="tournamentSummary(tournament.id)">
                    <ion-thumbnail slot="start">
                        <img v-if="tournament.image" :src="tournament.image" />
                        <img v-else src="/images/chess-board-thin.jpg" />
                    </ion-thumbnail>
                    <ion-label>
                        <h2>{{ tournament.name ? tournament.name.substring(0, 75) : '' }}</h2>
                        <p>{{ getLocalDate(tournament.startDateTime) }}</p>
                        <p>{{ tournament.type }} • {{ tournament.state }}</p>
                    </ion-label>
                </ion-item>

                <ion-list-header color="primary">Past 90 Days</ion-list-header>
                <ion-item v-if="!isLoading && pastTournaments.length === 0">
                    <ion-label>No tournaments found in the last 90 days.</ion-label>
                </ion-item>
                <ion-item v-for="tournament of pastTournaments" :key="`past-${tournament.id}`" button detail="true"
                    @click="tournamentSummary(tournament.id)">
                    <ion-thumbnail slot="start">
                        <img v-if="tournament.image" :src="tournament.image" />
                        <img v-else src="/images/chess-board-thin.jpg" />
                    </ion-thumbnail>
                    <ion-label>
                        <h2>{{ tournament.name ? tournament.name.substring(0, 75) : '' }}</h2>
                        <p>{{ getLocalDate(tournament.startDateTime) }}</p>
                        <p>{{ tournament.type }} • {{ tournament.state }}</p>
                    </ion-label>
                </ion-item>
                <ion-item v-if="!showingMoreHistory">
                    <ion-button expand="block" @click="showMoreHistoryTournaments">
                        Show More ({{ EXTENDED_HOST_HISTORY_DAYS }} days)
                    </ion-button>
                </ion-item>
            </ion-list>
        </ion-content>
    </layout-no-menu>
</template>

<script>
import Authentication from "@/services/Authentication";
import TournamentAPI from "@/services/TournamentAPI";
import AvatarIcon from "@/components/AvatarIcon.vue";
import LayoutNoMenu from "@/components/LayoutNoMenu.vue";

const authentication = new Authentication();
const tournamentAPI = new TournamentAPI();
const DEFAULT_HOST_HISTORY_DAYS = 90;
const EXTENDED_HOST_HISTORY_DAYS = 356 ;

export default {
    name: "Host",
    components: {
        AvatarIcon,
        LayoutNoMenu,
    },
    metaInfo() {
        const hostName = this.displayHostName;
        return {
            title: hostName ? `${hostName} - Host` : "Host",
            meta: [
                {
                    name: "description",
                    content: hostName ? `${hostName} tournament host profile` : "Tournament host profile",
                },
            ],
        };
    },
    data() {
        return {
            tournaments: [],
            host: {},
            historyDays: DEFAULT_HOST_HISTORY_DAYS,
            isLoading: false,
            errors: [],
        };
    },
    computed: {
        EXTENDED_HOST_HISTORY_DAYS() {
            return EXTENDED_HOST_HISTORY_DAYS;
        },
        routeHostName() {
            return decodeURIComponent(this.$route.params.name || "").trim();
        },
        displayHostName() {
            if (this.host.name) return this.host.name;
            if (this.tournaments.length > 0) return this.tournaments[0].hostName || this.routeHostName;
            return this.routeHostName;
        },
        showingMoreHistory() {
            return this.historyDays === EXTENDED_HOST_HISTORY_DAYS;
        },
        hostTournamentCount() {
            return this.tournaments.length;
        },
        upcomingTournaments() {
            const now = new Date();
            return this.tournaments
                .filter((tournament) => new Date(tournament.startDateTime) >= now)
                .sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime));
        },
        pastTournaments() {
            const now = new Date();
            const cutoff = new Date();
            cutoff.setDate(cutoff.getDate() - this.historyDays);

            return this.tournaments
                .filter((tournament) => {
                    const startDate = new Date(tournament.startDateTime);
                    return startDate < now && startDate >= cutoff;
                })
                .sort((a, b) => new Date(b.startDateTime) - new Date(a.startDateTime));
        },
    },
    watch: {
        '$route.params.name'() {
            this.historyDays = DEFAULT_HOST_HISTORY_DAYS;
            this.loadData();
        },
    },
    methods: {
        getLocalDate(date) {
            if (!date) return "";
            const localDate = new Date(date);
            if (Number.isNaN(localDate.getTime())) return "";
            return localDate.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
        },
        tournamentSummary(tournamentId) {
            this.$router.push({
                name: "TournamentOverview",
                params: { tournament: tournamentId },
            });
        },
        async showMoreHistoryTournaments() {
            this.historyDays = EXTENDED_HOST_HISTORY_DAYS;
            await this.loadData();
        },
        async refresh(event) {
            await this.loadData();
            event.target.complete();
        },
        async loadData() {
            this.isLoading = true;
            this.errors = [];
            this.host = {};

            try {
                this.tournaments = await tournamentAPI.tournaments("all", this.historyDays, null, this.routeHostName);
                //get username from owner and filter all tournaments with that owner to get host profile info. 
                // This is a bit hacky but it avoids needing to create a new endpoint just for this.
                //for now this avoid puting the username (email) in the url which is a privacy concern, until usernames change to non emails

                //get username
                const owner = this.tournaments.find((tournament) => tournament.owner)?.owner;
                if (owner) {
                    const user = await authentication.getUserByUserName(owner);
                    this.tournaments = await tournamentAPI.tournaments("all", this.historyDays, user.userName, null);
                    this.host = user || {};
                }
            } catch (error) {
                this.errors.push(error);
            } finally {
                this.isLoading = false;
            }
        },

    },
    created() {
        this.loadData();
    },
};
</script>