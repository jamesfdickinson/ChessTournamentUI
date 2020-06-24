import Firebase from "@/services/Firebase.js";
import FirebaseNative from "@/services/FirebaseNative.js";

let instance = null;
export default class Notification {
    constructor() {
        if (instance) {
            return instance;
        }

        if (typeof cordova !== 'undefined')
            this.firebase = new FirebaseNative();
        else
            this.firebase = Firebase;//add as static

        this.firebase.onMessage = this.message.bind(this);
        this.firebase.onTokenUpdated = this.tokenRefresh.bind(this);
        this.onTokenRefresh = function () { };
        this.onMessage = function () { };
        instance = this;
    }
    init() {
        this.firebase.init();
    }
    message(payload) {
        if (this.onMessage) this.onMessage(payload);
    }
    tokenRefresh(token) {
        console.log("Notification Token refreshed: " + token)
        if (this.onTokenRefresh) this.onTokenRefresh(token);
    }
    requestNotificationToken() {
        console.log('Requesting permission...');
        // [START request_permission]
        return this.firebase.requestPermission()
            .then((permission) => {
                if (permission === true) {
                    console.log('Notification permission granted.');
                    return this.firebase.getToken().then((token) => {
                        if (this.tokenRefresh) this.tokenRefresh(token);
                        return token;
                    });
                } else {
                    console.log("Notification: Unable to get permission to notify.");
                    return null;
                }
            });
    }
}
