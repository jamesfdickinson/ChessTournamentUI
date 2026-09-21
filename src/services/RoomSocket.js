
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
export default class RoomSocket {
    constructor() {
        this.onConnected = function () { };
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
        this.connection.onreconnected(() => this.onSocketConnected());
        this.connection.onclose((error) => {
            if (error) {
                console.log('RoomSocket connection closed with error:', error.message);
            } else {
                console.log('RoomSocket connection closed.');
            }
        });
        // this.connection.on("UserInfo", this.onSUserInfo.bind(this));
        // this.connection.on("JoinRoom", this.onSJoinRoom.bind(this));
        // this.connection.on("LeaveRoom", this.onSLeaveRoom.bind(this));
        // this.connection.on("Message", this.onSMessage.bind(this));
        // this.connection.on("Signal", this.onSSignal.bind(this));
        this.connection.on("Update", this.onSocketUpdate.bind(this));
        this.connection.on("Signal", this.onSocketSignal.bind(this));
        return this.connection.start().then(() => this.onSocketConnected()).catch(err => {
            console.error('RoomSocket connection error:', err.message);
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
    //events//
    onSocketConnected() {
        if (this.onConnected) this.onConnected();
        // if (this.room)
        //     this.joinRoom(this.room);
    }
    onSocketUpdate(data) {
        if (this.onUpdate)
            this.onUpdate(data);
    }
    onSocketSignal(from,user, type, data) {

        if (type == "Offer") {
            if (this.onOffer)
                this.onOffer(from,user, JSON.parse(data));
        }
        if (type == "Answer")
            if (this.onAnswer) {
                this.onAnswer(from,user, JSON.parse(data));
            }
        if (type == "Candidate") {
            if (this.onCandidate)
                this.onCandidate(from,user, JSON.parse(data));
        }
    }
    //actions//
    update(room) {
        if (this.connection && this.connection.connectionState == "Connected")
            return this.connection.invoke("Update", room).catch(err => {
                console.error('RoomSocket Update error:', err.message);
            });
    }
    offer(to, from, data) {
        if (this.connection && this.connection.connectionState == "Connected")
            return this.connection.invoke("Signal", to, from, "Offer", JSON.stringify(data)).catch(err => {
                console.error('RoomSocket Offer error:', err.message);
            });
    }
    answer(to,from, data) {
        if (this.connection && this.connection.connectionState == "Connected")
            return this.connection.invoke("Signal", to, from, "Answer", JSON.stringify(data)).catch(err => {
                console.error('RoomSocket Answer error:', err.message);
            });
    }
    candidate(to,from, data) {
        if (this.connection && this.connection.connectionState == "Connected")
            return this.connection.invoke("Signal", to, from, "Candidate", JSON.stringify(data)).catch(err => {
                console.error('RoomSocket Candidate error:', err.message);
            });
    }
    joinRoom(room, name,avatar) {
        if (this.connection && this.connection.connectionState == "Connected")
            return this.connection.invoke("JoinRoom", room, name,avatar).catch(err => {
                console.error('RoomSocket JoinRoom error:', err.message);
            });
    }
}
