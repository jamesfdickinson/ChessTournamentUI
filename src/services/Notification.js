import Firebase from "@/services/Firebase.js";
import FirebaseNative from "@/services/FirebaseNative.js";

class Notification {
    constructor() {
    
        if (typeof cordova !== 'undefined')
            this.firebase = new FirebaseNative();
        else
            this.firebase = Firebase;//add as static

        this.firebase.onMessage = function () { };
        this.firebase.onTokenUpdated = this.tokenRefresh.bind(this);
        this.onTokenRefresh =  function () { };
    }
    init() {
        this.firebase.init();
    }
    tokenRefresh(token) {
        console.log("Notification Token refreshed: "+ token)
        if(this.onTokenRefresh)this.onTokenRefresh(token);
    }
    requestNotificationToken() {
        console.log('Requesting permission...');
        // [START request_permission]
        return this.firebase.requestPermission()
            .then((permission) => {
                if (permission === 'granted') {
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
export default new Notification(); 