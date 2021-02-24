
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { DiffPatcher } from 'jsondiffpatch';
//import { diff, Config, DiffPatcher, formatters } from 'jsondiffpatch';
let instance = null;
export default class NotificationSocket {
    constructor() {
        if (instance) {
            return instance;
        }

        this.onUpdate = function () { };
        this.onNotification = function () { };
        this.baseURL = process.env.VUE_APP_API_URL || 'https://bracketjd-api.azurewebsites.net/api/' || 'https://localhost:5001/api/';
        this.hub = "notificationhub";
        this.tournamentId = null;
        this.tournamentView = null;
        this.jsondiffpatch = new DiffPatcher();

        instance = this;

    }
    connect(bearerToken) {
        let hub = this.hub;
        let url = this.baseURL + hub;
        if (this.connection) this.connection.stop();
        this.connection = new HubConnectionBuilder()
            .withUrl(url, { accessTokenFactory: () => bearerToken })
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect([0, 3000, 5000, 10000, 15000, 30000, 60000, 60000 * 2, 60000 * 4])
            .build();
        this.connection.onreconnected(() => this.onConnected());
        this.connection.on("Notification", this.notification.bind(this));
        this.connection.on("Update", this.update.bind(this));
        this.connection.on("Patch", this.patch.bind(this));
        return this.connection.start().then(() => this.onConnected());
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
    reconnect(bearerToken) {
        return this.close()
            .then(() => {
                this.connect(bearerToken);
            });
    }
    onConnected() {
        if (this.tournamentId) {
            this.joinTournament(this.tournamentId);
            this.getTournament(this.tournamentId);
        }
    }
    notification(notification) {
        if (this.onNotification)
            this.onNotification(notification);
    }
    track(location) {
        if (this.connection && this.connection.connectionState == "Connected")
            this.connection.invoke("Track", location);
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
            console.warn("patch(data)", ex);
            this.getTournament();
            return;
        }
    }
    joinTournament(tournamentId) {
        if (!tournamentId) return
        this.tournamentId = tournamentId; //set to be called onConnected if needed
        if (this.connection && this.connection.connectionState == "Connected")
            this.connection.invoke("JoinTournament", tournamentId);
    }
    getTournament(tournamentId) {
        if (this.connection && this.connection.connectionState == "Connected")
            this.connection.invoke("GetTournament", tournamentId);
    }
}
