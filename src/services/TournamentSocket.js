
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { DiffPatcher } from 'jsondiffpatch';
//import { diff, Config, DiffPatcher, formatters } from 'jsondiffpatch';
let instance = null;
export default class TournamentSocket {
    constructor() {
        if (instance) {
            return instance;
        }

        this.onUpdate = function () { };
        this.baseURL = process.env.VUE_APP_API_URL || 'https://bracketjd-api.azurewebsites.net/api/' || 'https://localhost:5001/api/';
        this.hub = "tournamenthub"
        this.tournamentId = null;
        this.tournamentView = null;
        this.jsondiffpatch = new DiffPatcher();

        instance = this;

    }
    connect(tournamentId) {
        this.tournamentId = tournamentId;
        let hub = this.hub;
        let url = this.baseURL + hub + "?tournamentId=" + tournamentId;
        if (this.connection) this.connection.stop();
        this.connection = new HubConnectionBuilder()
            .withUrl(url)
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect([0, 3000, 5000, 10000, 15000, 30000, 60000, 60000 * 2, 60000 * 4])
            .build();
        this.connection.onreconnected(() => this.onConnected());
        this.connection.onclose((error) => {
            if (error) {
                console.log('TournamentSocket connection closed with error:', error.message);
            } else {
                console.log('TournamentSocket connection closed.');
            }
        });
        this.connection.on("Update", this.update.bind(this));
        this.connection.on("Patch", this.patch.bind(this));
        return this.connection.start().then(() => this.onConnected()).catch(err => {
            console.error('TournamentSocket connection error:', err.message);
            throw err;
        });
    }
    close() {
        if (this.connection)
            return this.connection.stop();
        else
            return Promise.resolve();
    }
    isConnected() {
        let connected = this.connection && this.connection.connectionState == "Connected";
        return connected;
    }
    onConnected() {
        this.getTournament();
    }
    update(data) {
        this.tournamentView = data;
        if (this.onUpdate)
            this.onUpdate(data);
    }
    patch(data) {
        let tournamentView = this.tournamentView;
        if (!data) return;
        if (!tournamentView) {
            //request full data
            this.getTournament();
            return;
        }
        try {
            this.jsondiffpatch.patch(tournamentView, data);
            console.log("patch", data);
            if (this.onUpdate)
                this.onUpdate(tournamentView);
        } catch (ex) {
            //it may be out of sync, get full sync
            console.warn("patch(data)",ex);
            this.getTournament();
            return;
        }
    }
    getTournament() {
        let tournamentId = this.tournamentId;
        if (this.connection && this.connection.connectionState == "Connected")
            return this.connection.invoke("GetTournament", tournamentId).catch(err => {
                console.error('TournamentSocket GetTournament error:', err.message);
            });
    }
}
