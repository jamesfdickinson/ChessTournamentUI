import fetch from "@/fetch.js";
import Firebase from "@/services/Firebase.js";
import FirebaseNative from "@/services/FirebaseNative.js";
import Authentication from '@/services/Authentication'

export default class Notification {
    constructor() {
        if (FirebaseNative.isAvailable())
            this.firebase = FirebaseNative;//add as static
        else
            this.firebase = Firebase;//add as static
        this.firebase.onMessage = function () { };
        this.firebase.onTokenUpdated = this.tokenRefresh.bind(this);
        this.authentication = new Authentication();
        this.onTokenRefresh =  function (token) { };
    }
    init() {
        this.firebase.init();
    }
    tokenRefresh(token) {
        if(this.onTokenRefresh)this.onTokenRefresh(token);
    }
    requestNotificationToken() {
        console.log('Requesting permission...');
        // [START request_permission]
        return this.firebase.requestPermission()
            .then((permission) => {
                if (permission === 'granted') {
                    console.log('Notification permission granted.');
                    return this.firebase.getToken();
                } else {
                    console.log("Notification: Unable to get permission to notify.");
                    return null;
                }
            });
    }
}