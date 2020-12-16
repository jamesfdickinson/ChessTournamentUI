import fetch from "@/services/fetch";
export default class TournamentAPI {
    constructor() {
    }
    matchUpdate(match) {
        return fetch.post(`match/${match.id}`, match);
    }
    rounds(tournamentId) {
        return fetch
            .get(`rounds/${tournamentId}`)
            .then(response => {
                let data = response.data;
                return data
            })
    }
    roundRaw(tournamentId,roundId){
        //api/round/5?tournament=27
        return fetch
            .get(`round/${roundId}?tournament=${tournamentId}`)
            .then(response => {
                let data = response.data;
                return data;
            });
    }
    tableGet(tournamentId, round, tableId) {
        //api/table/1?round=2&tournament=117
        return fetch
            .get(`table/${tableId}?round=${round}&tournament=${tournamentId}`)
            .then(response => {
                let table = response.data;
                return table;
            });
    }
    players(tournamentId){
        //api/players/27
        return fetch
            .get(`players/${tournamentId}`)
            .then(response => {
                let data = response.data;
                return data;
            });
    }
    generateTopDownRound(tournamentId, round, filter) {
        return fetch
            .post(
                `round/GenerateTopDown/${round}?tournament=${tournamentId}`,
                filter
            )
            .then(response => {
                let matches = response.data;
                return matches;
            })
    }
    matchDelete(matchId) {
        return fetch
            .delete(`match/${matchId}`)
            .then(response => {
                let data = response.data;
                return data;
            });
    }
    matchesSave(tournamentId, matches) {
        return fetch
            .put(`match/${tournamentId}`, matches)
            .then(response => {
                let data = response.data;
                return data;
            });
    }
    sendTournamentUsersNotifications(tournamentId, title, body, url) {
        const message = {
            title: title,
            body: body,
            url: url
        };

        if (tournamentId) {
            let url = `notification/SendPushNotificationToAllUsers/${tournamentId}`;
            return fetch.post(url, message)
                .then(response => {
                    let data = response.data;
                    return data;
                });
        }
    }
    sendTournamentPlayersNotifications(tournamentId, title, body, url) {
        const message = {
            title: title,
            body: body,
            url: url
        };

        if (tournamentId) {
            let url = `notification/SendPushNotificationToAllPlayers/${tournamentId}`;
            return fetch.post(url, message)
                .then(response => {
                    let data = response.data;
                    return data;
                });
        }
    }
    sendRoundNotifications(tournamentId, round) {
        if (tournamentId && round) {
            let url = `notification/roundpushNotification/${tournamentId}?round=${round}`;
            return fetch.post(url)
                .then(response => {
                    let data = response.data;
                    return data;
                });
        }
    }
    sendRoundGameInvite(tournamentId, round) {
        if (tournamentId && round) {
            let url = `notification/RoundGameInvite/${tournamentId}?round=${round}`;
            return fetch.post(url)
                .then(response => {
                    let data = response.data;
                    return data;
                });
        }
    }
}