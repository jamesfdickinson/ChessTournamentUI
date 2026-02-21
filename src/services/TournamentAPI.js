import fetch from "@/services/fetch";
import Authentication from './Authentication'
export default class TournamentAPI {
    constructor() {
        this.authentication = new Authentication();
    }
    async tournaments(type) {
        const token = this.authentication.getToken();
        const response = await fetch(`tournament/type/${type}`, {
            method: 'get',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`, // notice the Bearer before your token
            }
        });
        let data = response.data;
        return data;
    }
    tournament(tournamentId) {
        return fetch
            .get(`tournament/${tournamentId}`)
            .then((response) => {
                let data = response.data;
                return data
            })
    }
    tournamentView(tournamentId) {
        return fetch
            .get(`TournamentView/${tournamentId}`)
            .then((response) => {
                let data = response.data;
                return data
            })
    }
    tournamentCreate(tournament) {
        return fetch
            .post(`tournament`, tournament)
            .then(response => {
                let data = response.data;
                return data;
            });
    }
    tournamentUpdate(tournamentId, tournament) {
        return fetch
            .put(`tournament/${tournamentId}`, tournament)
            .then(response => {
                let data = response.data;
                return data;
            });
    }
    tournamentDelete(tournamentId) {
        return fetch
            .delete(`tournament/${tournamentId}`)
    }
    round(tournamentId, roundId) {
        return fetch
            .get(`round/${roundId}?tournament=${tournamentId}`)
            .then(response => {
                let data = response.data;
                return data
            })
    }
    roundGrouped(tournamentId, roundId) {
        return fetch
            .get(`round/Grouped/${roundId}?tournament=${tournamentId}`)
            .then(response => {
                let data = response.data;
                return data
            })
    }
    rounds(tournamentId) {
        return fetch
            .get(`rounds/${tournamentId}`)
            .then(response => {
                let data = response.data;
                return data
            })
    }
    roundRaw(tournamentId, roundId) {
        //api/round/5?tournament=27
        return fetch
            .get(`round/${roundId}?tournament=${tournamentId}`)
            .then(response => {
                let data = response.data;
                return data;
            });
    }
    tableGet(tableId) {
        //api/table/1?round=2&tournament=117
        return fetch
            .get(`table/${tableId}`)
            .then(response => {
                let table = response.data;
                return table;
            });
    }
    players(tournamentId) {
        //api/players/27
        return fetch
            .get(`players/${tournamentId}`)
            .then(response => {
                let data = response.data;
                return data;
            });
    }
    async playerCreate(player) {
        const response = await fetch.post(`player`, player);
        let data = response.data;
        return data;
    }

    flowGet(tournamentId) {
        return fetch
            .get(`TournamentFlow/${tournamentId}`)
            .then(response => {
                let data = response.data;
                return data;
            })
    }
    flowAction(tournamentId, action) {
        return fetch
            .post(`TournamentFlow/${tournamentId}?action=${action}`)
            .then(response => {
                let data = response.data;
                return data;
            })
    }
    generatePairing(tournamentId, round, filter) {
        return fetch
            .post(
                `pairing/${tournamentId}?round=${round}`,
                filter
            )
            .then(response => {
                let matches = response.data;
                return matches;
            });
    }

    savePairing(tournamentId, round, pairingDetails) {
        return fetch
            .post(
                `pairing/Save/${tournamentId}`,
                pairingDetails
            )
            .then(response => {
                let data = response.data;
                return data;
            });
    }
    pairingReports(tournamentId) {
        return fetch
            .get(`report/PairingReport/${tournamentId}`)
            .then(response => {
                let data = response.data;
                return data;
            });
    }
    matchDelete(matchId) {
        return fetch
            .delete(`match/${matchId}`)
            .then(response => {
                let data = response.data;
                return data;
            });
    }
    matchUpdate(match) {
        return fetch.put(`match/${match.id}`, match);
    }
    matchesUpdate(tournamentId, matches) {
        return fetch
            .put(`match/${tournamentId}`, matches)
            .then(response => {
                let data = response.data;
                return data;
            });
    }
    matchesCreate(tournamentId, matches) {
        return fetch
            .post(`match/${tournamentId}`, matches)
            .then(response => {
                let data = response.data;
                return data;
            });
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
    sendTournamentPlayersEmail(tournamentId, title, body, isTest) {
        const message = {
            title: title,
            body: body,
            isTest: !!isTest
        };


        if (tournamentId) {
            let url = `email/MessageAll/${tournamentId}`;
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
    sendRoundSMS(tournamentId, round) {
        if (tournamentId && round) {
            let url = `SMSRound/${tournamentId}?round=${round}`;
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

    async muteUserForTournament(tournamentId, userId, mute) {
        const token = this.authentication.getToken();
        const response = await fetch(`tournament/${tournamentId}/mutedusers/${userId}/${mute}`, {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`, // notice the Bearer before your token
            }
        });
        let data = response.data;
        return data;
    }
    requestHostAccess(userName, name, email, reason) {
        const token = this.authentication.getToken();
        return fetch
            .post('RequestHostAccess', { userName, name, email, reason }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(response => response.data)
            .catch(error => {
                if (error.response) throw error.response.data || error.response.statusText;
                throw error;
            });
    }
    getTournamentUsers(tournamentId) {
        const token = this.authentication.getToken();
        return fetch
            .get(`tournamentuser/${tournamentId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(response => response.data)
            .catch(error => {
                if (error.response) throw error.response.data || error.response.statusText;
                throw error;
            });
    }
    addTournamentUser(tournamentId, userName, role) {
        const token = this.authentication.getToken();
        return fetch
            .post(`tournamentuser/${tournamentId}`, {
                TournamentId: parseInt(tournamentId),
                userName,
                role,
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(response => response.data)
            .catch(error => {
                if (error.response) throw error.response.data || error.response.statusText;
                throw error;
            });
    }
    removeTournamentUser(tournamentUserId) {
        const token = this.authentication.getToken();
        return fetch
            .delete(`tournamentuser/${tournamentUserId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(response => response.data)
            .catch(error => {
                if (error.response) throw error.response.data || error.response.statusText;
                throw error;
            });
    }
}