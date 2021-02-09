
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
export default class RoomSocket {
    constructor() {
        this.onUpdate = function () { };
        this.onOffer = function () { };
        this.onAnswer = function () { };
        this.onCandidate = function () { };
        this.baseURL = process.env.VUE_APP_API_URL || 'https://bracketjd-api.azurewebsites.net/api/' || 'https://localhost:5001/api/';
        this.hub = "roomhub"
    }
    connect(room) {
        this.room = room;
        let hub = this.hub;
        let url = this.baseURL + hub + "?room=" + room;
        if (this.connection) this.connection.stop();
        this.connection = new HubConnectionBuilder()
            .withUrl(url)
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();
        this.connection.onreconnected(() => this.onConnected());
        this.connection.on("Update", this.onSUpdate.bind(this));
        this.connection.on("Offer", this.onSOffer.bind(this));
        this.connection.on("Answer", this.onSAnswer.bind(this));
        this.connection.on("Candidate", this.onSCandidate.bind(this));
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
    //events//
    onConnected() {
        // if (this.room)
        //    this.joinRoom(this.room);
    }
    onSUpdate(data) {
        if (this.onUpdate)
            this.onUpdate(data);
    }
    onSOffer(from,description) {
        if (this.onOffer)
            this.onOffer(from,JSON.parse(description));
    }
    onSAnswer(id,description) {
        if (this.onAnswer)
            this.onAnswer(id,JSON.parse(description));
    }
    onSCandidate(id,candidate) {
        if (this.onCandidate)
            this.onCandidate(id,JSON.parse(candidate));
    }
    update(room) {
        if (this.connection && this.connection.connectionState == "Connected")
            this.connection.invoke("Update", room);
    }
    offer(id,data) {
        if (this.connection && this.connection.connectionState == "Connected")
            this.connection.invoke("Offer", id,JSON.stringify(data));
    }
    answer(id,data) {
        if (this.connection && this.connection.connectionState == "Connected")
            this.connection.invoke("Answer", id,JSON.stringify(data));
    }
    candidate(id,data) {
        if (this.connection && this.connection.connectionState == "Connected")
        this.connection.invoke("Candidate", id,JSON.stringify(data));
    }
    //actions//
    joinRoom(room) {
        if (this.connection && this.connection.connectionState == "Connected")
            this.connection.invoke("JoinRoom", room);
    }
}
