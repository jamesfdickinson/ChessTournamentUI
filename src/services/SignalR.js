import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
export default class SignalR {
    constructor() {
        this.connection = null;
        this.onReceiveMessage = function () { };
        this.onReceiveMessages = function () { };
        this.baseURL = process.env.VUE_APP_API_URL || 'https://chesstournamentapi.azurewebsites.net/api/' || 'https://localhost:5001/api/';

    }
    connect() {
        let url = this.baseURL + "chathub";
        this.connection = new HubConnectionBuilder()
            .withUrl(url)
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();
        this.connection.on("ReceiveMessage",  this.receiveMessage.bind(this));
        this.connection.on("ReceiveMessages",  this.receiveMessages.bind(this));

        return this.connection.start();
    }
    close() {
        this.connection.stop();
    }
    send(action, ...args) {
       // this.connection.invoke("SendMessage","jh", "user","message");
        this.connection.invoke(action,...args);
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