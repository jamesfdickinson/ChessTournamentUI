import fetch from "@/fetch.js";
import firebase from "@/services/Firebase.js";
export default class Notification {
    constructor() {
        this.firebase = firebase;
        this.firebase.onMessage = function () { };
        this.firebase.onTokenRefresh = this.tokenRefresh.bind(this);
    }
    init(){
        this.firebase.init();
    }
    sendTokenToServer(currentToken, userId) {
        //todo: get userId should be from centralize class or passed in on request, but it can also be called from a token refresh
        //get user Id
        if (!userId) {
            let user = JSON.parse(localStorage.getItem("user"))||{};
            userId = user.id;
        }
        console.log('Sending token to server...');
        let data = {
            "token": currentToken,
            "userId": userId
        };
        return fetch.post(`NotificationToken`, data);
    };
    tokenRefresh(token) {
        return this.sendTokenToServer(token).then(function () {
            return "Notification: sent token to server";
        });
    }
    requestNotificationToken(userId) {
        if(userId) this.userId = userId;
        console.log('Requesting permission...');
        // [START request_permission]
        return Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
                return this.firebase.getToken();
                    // .then((token) => {
                    //     return this.sendTokenToServer(token, userId).then(function () {
                    //         return token;
                    //     });
                    // });
            } else {
                console.log("Notification: Unable to get permission to notify.");
                return null;
            }
        });
    }
}