
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

let instance = null;
export default class NotificationSocket {
    constructor() {
        if (instance) {
            return instance;
        }

        this.onUpdate = function () { };
        this.onNotification = function () { };
        this.baseURL = process.env.VUE_APP_API_URL || 'https://chesstournamentapi.azurewebsites.net/api/' || 'https://localhost:5001/api/';
        this.hub = "notificationhub"

        instance = this;
    }
    connect(bearerToken) {
        let hub = this.hub;
        let url = this.baseURL + hub;
        this.connection = new HubConnectionBuilder()
            .withUrl(url, { accessTokenFactory: () => bearerToken })
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();
        this.connection.on("Update", this.update.bind(this));
        this.connection.on("Notification", this.notification.bind(this));
        return this.connection.start();
    }
    close() {
        if (this.connection)
            return this.connection.stop();
        else
            return Promise.resolve();
    }
    reconnect(bearerToken) {
        return this.close()
            .then(() => {
                this.connect(bearerToken);
            });
    }
    update(messages) {
        if (this.onUpdate)
            this.onUpdate(messages);
    }
    notification(notification) {
        if (this.onNotification)
            this.onNotification(notification);
    }
}
