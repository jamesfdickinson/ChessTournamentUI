import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
export default class SignalR {
    constructor() {
        this.connection = null;
        this.onUpdate = function () { };
        this.onNotification = function () { };
        this.onReconnect = function () { };
        this.onReceiveMessage = function () { };
        this.onReceiveMessages = function () { };
        this.baseURL = process.env.VUE_APP_API_URL || 'https://chesstournamentapi.azurewebsites.net/api/' || 'https://localhost:5001/api/';

    }
    connect(bearerToken,hub) {

        let url = this.baseURL + hub;
        this.connection = new HubConnectionBuilder()
            .withUrl(url, { accessTokenFactory: () => bearerToken })
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect([0, 3000, 5000, 10000, 15000, 30000, 60000, 60000 * 2, 60000 * 4])
            .build();
        this.connection.on("Update", this.update.bind(this));
        this.connection.on("ReceiveMessage", this.receiveMessage.bind(this));
        this.connection.on("ReceiveMessages", this.receiveMessages.bind(this));
        this.connection.on("Notification", this.notification.bind(this));
        this.connection.onreconnected(() => {
            if (this.onReconnect) this.onReconnect();
        });
        return this.connection.start();
    }
    close() {
        this.connection.stop();
    }
    isConnected() {
        let connected = this.connection && this.connection.connectionState == "Connected";
        return connected;
    }
    send(action, ...args) {
        // this.connection.invoke("SendMessage","jh", "user","message");
        if (this.connection && this.connection.connectionState == "Connected")
        this.connection.invoke(action, ...args);
    }
    notification(notification) {
        if (this.onNotification)
            this.onNotification(notification);
    }
    update(messages) {
        if (this.onUpdate)
            this.onUpdate(messages);
    }
    receiveMessages(messages) {
        if (this.onReceiveMessages)
            this.onReceiveMessages(messages);
    }
    receiveMessage(user, message) {
        console.log(user + "-" + message);
        if (this.onReceiveMessage)
            this.onReceiveMessage(user, message);
    }
}