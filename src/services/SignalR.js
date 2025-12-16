import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
export default class SignalR {
    constructor() {
        this.connection = null;
        this.onUpdate = function () { };
        this.onNotification = function () { };
        this.onReconnect = function () { };
        this.onReceiveMessage = function () { };
        this.onReceiveMessages = function () { };
        this.baseURL = process.env.VUE_APP_API_URL || 'https://bracketjd-api.azurewebsites.net/api/' || 'https://localhost:5001/api/';

    }
    connect(bearerToken, hub) {

        let url = this.baseURL + hub;
        this.connection = new HubConnectionBuilder()
            .withUrl(url)
            //.withUrl(url, { accessTokenFactory: () => bearerToken })//bearerToken gets too large for the url and fails on azure with a 2000 limit
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
        this.connection.onclose((error) => {
            if (error) {
                console.log('SignalR connection closed with error:', error.message);
            } else {
                console.log('SignalR connection closed.');
            }
        });
        return this.connection.start().catch(err => {
            console.error('SignalR connection error:', err.message);
            throw err;
        });
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
            return this.connection.invoke(action, ...args).catch(err => {
                console.error('SignalR invocation error:', err.message);
            });
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
    receiveMessage(user, message, userId, tag) {
        console.log(user + "-" + message);
        if (this.onReceiveMessage)
            this.onReceiveMessage(user, message, userId, tag);
    }
}